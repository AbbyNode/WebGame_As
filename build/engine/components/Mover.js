import { GameComponent } from "../gameobject/GameComponent.js";
import { Collider } from "./Collider.js";
import { EventName } from "./EventName.js";
import { Vector2 } from "../math/Vector2.js";
export var MoveDirection;
(function (MoveDirection) {
    MoveDirection[MoveDirection["Up"] = 0] = "Up";
    MoveDirection[MoveDirection["Down"] = 1] = "Down";
    MoveDirection[MoveDirection["Left"] = 2] = "Left";
    MoveDirection[MoveDirection["Right"] = 3] = "Right";
})(MoveDirection || (MoveDirection = {}));
export class Mover extends GameComponent {
    constructor(gameObject, speed = 5) {
        super(gameObject);
        this._speed = speed;
        this._moving = { x: 0, y: 0 };
        this.transform = this.gameObject.transform;
        this.collider = this.gameObject.getComponent(Collider); // may be undefined
        this.gameObject.eventManager.addListener(EventName.GameObject_Update, () => {
            this.update();
        });
        // this.gameObject.eventManager.addListener(EventName.GameObject_Destroy, () => {
        // 	this.destroy();
        // });
        this.gameObject.eventManager.addListener(EventName.Mover_RequestStart, moveDirection => {
            this.moveStart(moveDirection);
        });
        this.gameObject.eventManager.addListener(EventName.Mover_RequestStop, moveDirection => {
            this.moveStop(moveDirection);
        });
        this.gameObject.eventManager.addListener(EventName.Collider_MoveRequestAccepted, position => {
            this.transform.position = position;
        });
    }
    moveStart(moveDirection) {
        switch (moveDirection) {
            case MoveDirection.Up:
                this._moving.y = -1;
                break;
            case MoveDirection.Down:
                this._moving.y = 1;
                break;
            case MoveDirection.Left:
                this.gameObject.eventManager.invoke(EventName.Mover_Turned, { facingRight: false });
                this._moving.x = -1;
                break;
            case MoveDirection.Right:
                this.gameObject.eventManager.invoke(EventName.Mover_Turned, { facingRight: true });
                this._moving.x = 1;
                break;
        }
        if (this._moving.x != 0 || this._moving.y != 0) {
            this.gameObject.eventManager.invoke(EventName.Mover_StartedMoving);
        }
    }
    moveStop(moveDirection) {
        switch (moveDirection) {
            case MoveDirection.Up:
            case MoveDirection.Down:
                this._moving.y = 0;
                break;
            case MoveDirection.Left:
            case MoveDirection.Right:
                // this.gameObject.eventManager.invoke(EventName.Mover_Turned, {facingRight: true});
                this._moving.x = 0;
                break;
        }
        if (this._moving.x == 0 && this._moving.y == 0) {
            this.gameObject.eventManager.invoke(EventName.Mover_StoppedMoving);
        }
    }
    update() {
        if (this._moving.x != 0 || this._moving.y != 0) {
            this._updateMove();
        }
    }
    _updateMove() {
        // Get current pos
        const newPos = Object.assign({}, this.transform.position);
        // Normalize and scale movement
        const movement = new Vector2(this._moving.x, this._moving.y);
        movement.normalize();
        movement.scale(this._speed);
        // Add movement amt to new pos
        newPos.x += movement.x;
        newPos.y += movement.y;
        // If collider is defined,
        if (this.collider) {
            // request movement from collider
            this.gameObject.eventManager.invoke(EventName.Collider_RequestMove, newPos);
        }
        else {
            // Otherwise, set transform directly
            this.transform.position = newPos;
        }
    }
    destroy() {
        // Don't need to remove anything since everything is done through events
        // This component is basically a connection between Transforms, Controllers, and Colliders
    }
}
//# sourceMappingURL=Mover.js.map