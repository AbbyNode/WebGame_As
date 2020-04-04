import { GameComponent } from "../gameobject/GameComponent.js";
import { EventName } from "./EventName.js";
// FEATURE: Add priorities?
// FEATURE: Allow glide on walls?
export class Collider extends GameComponent {
    //#endregion
    //#region initialization
    constructor(gameObject, data) {
        super(gameObject);
        this._tag = data.tag;
        this._isTrigger = data.isTrigger;
        this._aabb = {
            position: { x: 0, y: 0 },
            size: Object.assign({}, data.size)
        };
        this._aabbOffset = Object.assign({}, data.offset);
        this._moveRequested = false;
        this._requestedPos = { x: 0, y: 0 };
        this._requestedAABB = Object.assign({}, this._aabb);
        this._currentTriggerOverlaps = [];
        this._solidCollisionsInLastTick = [];
        this._solidNoncollisions = [];
        const graphics = new createjs.Graphics().beginStroke("#ff0000").drawRect(0, 0, data.size.width, data.size.height);
        this._debugShape = new createjs.Shape(graphics);
        // REMINDER: Don't hard-code regXY values
        // this._debugShape.regX = 32;
        // this._debugShape.regY = 32;
        this._debugShape.regX = data.size.width / 2;
        this._debugShape.regY = data.size.height / 2;
        this._debugShape.visible = Collider._debugViewEnabled;
        this.gameObject.container.addChild(this._debugShape);
        this._initEvents();
        // Add to list of all colliders
        Collider._colliders.push(this);
    }
    //#endregion
    //#region props
    get isTrigger() {
        return this._isTrigger;
    }
    set isTrigger(v) {
        this._isTrigger = v;
    }
    get tag() {
        return this._tag;
    }
    set tag(v) {
        this._tag = v;
    }
    _initEvents() {
        this.gameObject.eventManager.addListener(EventName.GameObject_Update, () => {
            this.update();
        });
        this.gameObject.eventManager.addListener(EventName.GameObject_Destroy, () => {
            this.destroy();
        });
        this.gameObject.eventManager.addListener(EventName.Transform_PositionChange, position => {
            this.setPosition(position);
        });
        this.gameObject.eventManager.addListener(EventName.Collider_RequestMove, position => {
            this._moveRequested = true;
            this._requestedPos = position;
            this._setRequestedPosition(position);
        });
    }
    //#endregion
    //#region update, destroy
    update() {
        // Reset reference of non-collisions
        if (this._solidNoncollisions.length >= 1) {
            this._solidNoncollisions = [];
        }
        // Attempt movement
        if (this._moveRequested) {
            this._attemptMoveRequest();
            this._moveRequested = false;
        }
    }
    destroy() {
        const index = Collider._colliders.indexOf(this);
        Collider._colliders.splice(index, 1);
        this.gameObject.container.removeChild(this._debugShape);
    }
    setPosition(position) {
        // this._aabb.position = Object.assign({}, position);
        // world pos
        this._aabb.position.x = position.x + this._aabbOffset.x - (this._aabb.size.width / 2);
        this._aabb.position.y = position.y + this._aabbOffset.y - (this._aabb.size.height / 2);
        // local pos
        this._debugShape.x = this._aabbOffset.x;
        this._debugShape.y = this._aabbOffset.y;
    }
    //#endregion
    //#region Movement
    _attemptMoveRequest() {
        let _moveRestricted = false;
        // For all colliders
        for (let i = 0; i < Collider._colliders.length; i++) {
            // Get collider
            const otherCollider = Collider._colliders[i];
            // Skip self
            if (otherCollider == this) {
                continue;
            }
            // If self movement is already restricted by another collider in the loop,
            if (_moveRestricted) {
                // and this new collider isn't a trigger,
                // also self is not a trigger, otherwise it wouldn't be restricted
                if (!otherCollider.isTrigger) {
                    // Skip
                    continue;
                }
            }
            // Get other collider's aabb
            const otherColliderAABB = Collider.ResolveAABB(otherCollider);
            // Both colliders are solid (non-triggers),
            const bothSolids = (!this.isTrigger && !otherCollider.isTrigger);
            // If collision was already calculated for this solid collider and it was not colliding
            const index = otherCollider._solidNoncollisions.indexOf(this);
            if (index != -1) {
                // Skip
                continue;
            }
            // Check for collision
            const hasCollision = Collider.AABB(this._requestedAABB, otherColliderAABB);
            // If there is a collision
            if (hasCollision) {
                // If both colliders are solid (non-triggers),
                if (bothSolids) {
                    // Can't move
                    // If not already restricted by a previous collision, resovle and then restrict
                    if (!_moveRestricted) {
                        this._resolveSolidCollision(otherCollider);
                        _moveRestricted = true;
                    }
                }
                else { // At least one of the colliders is a trigger
                    if (this.isTrigger) {
                        this._addTriggerOverlap(otherCollider);
                    }
                    if (otherCollider.isTrigger) {
                        otherCollider._addTriggerOverlap(this);
                    }
                }
            }
            else { // Not colliding
                // If both colliders are solid (non-triggers),
                if (bothSolids) {
                    // Save reference to other collider
                    this._solidNoncollisions.push(otherCollider);
                }
                else { // At least one of the collider is a trigger
                    if (this.isTrigger) {
                        this._removeTriggerOverlap(otherCollider);
                    }
                    if (otherCollider.isTrigger) {
                        otherCollider._removeTriggerOverlap(this);
                    }
                }
            }
        } // end for all colliders
        // If no solid collisions, accept movement request
        if (!_moveRestricted) {
            this._acceptMoveRequest();
        }
    }
    _setRequestedPosition(position) {
        this._requestedAABB.position.x = position.x + this._aabbOffset.x - (this._aabb.size.width / 2);
        this._requestedAABB.position.y = position.y + this._aabbOffset.y - (this._aabb.size.height / 2);
    }
    _acceptMoveRequest() {
        this.gameObject.eventManager.invoke(EventName.Collider_MoveRequestAccepted, this._requestedPos);
        this._moveRequested = false;
    }
    _denyMoveRequest() {
        this.gameObject.eventManager.invoke(EventName.Collider_MoveRequestDenied, this._requestedPos);
        this._moveRequested = false;
    }
    //#endregion
    //#region Solid collision
    _resolveSolidCollision(otherCollider) {
        // Deny move request
        this._denyMoveRequest();
        // Deny other collider's movement too
        if (otherCollider._moveRequested) {
            otherCollider._denyMoveRequest();
        }
        // Call collision frame event
        this.gameObject.eventManager.invoke(EventName.Collider_CollidedFrame, otherCollider);
        otherCollider.gameObject.eventManager.invoke(EventName.Collider_CollidedFrame, this);
        // Call collision tick event
        if (this._addSolidCollision(otherCollider)) {
            this.gameObject.eventManager.invoke(EventName.Collider_CollidedTick, otherCollider);
            otherCollider.gameObject.eventManager.invoke(EventName.Collider_CollidedTick, this);
        }
    }
    _addSolidCollision(otherCollider) {
        const index = this._solidCollisionsInLastTick.indexOf(otherCollider);
        const hasNotBeenAdded = (index == -1);
        if (hasNotBeenAdded) {
            // Add to array
            this._solidCollisionsInLastTick.push(otherCollider);
            // Remove after fixed interval
            setTimeout(() => {
                this._removeSolidCollision(otherCollider);
            }, Collider.clearCollisionTimeout);
        }
        return hasNotBeenAdded;
    }
    _removeSolidCollision(otherCollider) {
        const index = this._solidCollisionsInLastTick.indexOf(otherCollider);
        if (index != -1) {
            this._solidCollisionsInLastTick.splice(index, 1);
        }
    }
    //#endregion
    //#region Trigger collision
    _addTriggerOverlap(otherCollider) {
        const index = this._currentTriggerOverlaps.indexOf(otherCollider);
        if (index == -1) {
            this._currentTriggerOverlaps.push(otherCollider);
            this.gameObject.eventManager.invoke(EventName.Collider_TriggerEnter, otherCollider);
            otherCollider.gameObject.eventManager.invoke(EventName.Collider_TriggerEnter, this);
        }
    }
    _removeTriggerOverlap(otherCollider) {
        const index = this._currentTriggerOverlaps.indexOf(otherCollider);
        if (index != -1) {
            this._currentTriggerOverlaps.splice(index, 1);
            this.gameObject.eventManager.invoke(EventName.Collider_TriggerExit, otherCollider);
            otherCollider.gameObject.eventManager.invoke(EventName.Collider_TriggerExit, this);
        }
    }
    //#endregion
    //#region static functions
    static init() {
        if (!this._initialized) {
            Collider._colliders = [];
            // Collider.timePerCheck = 1000 / Collider.checksPerSecond;
            this._initialized = true;
        }
    }
    static ResolveAABB(collider) {
        let aabb;
        // If other collider also has a move requested,
        if (collider._moveRequested) {
            // Use other collider's requested aabb
            aabb = collider._requestedAABB;
        }
        else {
            // Otherwise use other collider's original aabb
            aabb = collider._aabb;
        }
        return aabb;
    }
    static AABB(aabb1, aabb2) {
        if (aabb1.position.x < aabb2.position.x + aabb2.size.width &&
            aabb1.position.x + aabb1.size.width > aabb2.position.x &&
            aabb1.position.y < aabb2.position.y + aabb2.size.height &&
            aabb1.position.y + aabb1.size.height > aabb2.position.y) {
            return true;
        }
        else {
            return false;
        }
    }
    static toggleDebugView(toggle) {
        this._debugViewEnabled = toggle;
        this._colliders.forEach(collider => {
            collider._debugShape.visible = toggle;
        });
    }
}
//#region static vars
Collider.clearCollisionTimeout = 1000; // milliseconds
Collider._initialized = false;
Collider._debugViewEnabled = false;
//# sourceMappingURL=Collider.js.map