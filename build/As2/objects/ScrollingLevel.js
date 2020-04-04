import { EventName } from "../../engine/components/EventName.js";
/**
 * Scrolling Level class creates a level where the player stays stationary but the objects move as the player "scrolls".
 * Ideal for 2D scrolling games.
 *
 * @export
 * @class ScrollingLevel
 */
export class ScrollingLevel {
    //#endregion
    constructor(objects, background, scrollSpeed = 1) {
        this._objects = objects;
        this._background = background;
        this._scrollSpeed = scrollSpeed;
        this._isScrolling = false;
        this._objectCount = 0;
        this._requestedMove = false;
        this._allowedMovements = 0;
    }
    //#region props
    get isScrolling() {
        return this._isScrolling;
    }
    set isScrolling(v) {
        this._isScrolling = v;
    }
    init() {
        this._objectCount = this._objects.length;
        this._objects.forEach(object => {
            object.eventManager.addListener(EventName.Collider_MoveRequestAccepted, () => {
                this._oneMoveRequestAccepted();
            });
            object.eventManager.addListener(EventName.Collider_MoveRequestDenied, () => {
                this._oneMoveRequestDenied();
            });
        });
    }
    update() {
        if (this._isScrolling) {
            this._attemptScrollRight();
        }
        this._objects.forEach(enemy => {
            enemy.update();
        });
    }
    destroy() {
        this._objects.forEach(object => {
            object.destroy();
        });
    }
    /**
     * Attempt to scroll to the right
     *
     * @private
     * @memberof ScrollingLevel
     */
    _attemptScrollRight() {
        this._requestedMove = true;
        this._allowedMovements = 0;
        this._objects.forEach(object => {
            const newPos = object.transform.position;
            newPos.x -= this._scrollSpeed;
            object.eventManager.invoke(EventName.Collider_RequestMove, newPos);
        });
    }
    /**
     * Could not scroll due to collision
     *
     * @private
     * @memberof ScrollingLevel
     */
    _oneMoveRequestDenied() {
        this._requestedMove = false;
    }
    /**
     * No collision with specified object
     *
     * @private
     * @memberof ScrollingLevel
     */
    _oneMoveRequestAccepted() {
        if (this._requestedMove) {
            this._allowedMovements++;
            if (this._allowedMovements >= this._objectCount) {
                this._allMoveRequestsAccepted();
            }
        }
    }
    /**
     * No collision with any object, can scroll as requested
     *
     * @private
     * @memberof ScrollingLevel
     */
    _allMoveRequestsAccepted() {
        this._objects.forEach(object => {
            const newPos = object.transform.position;
            newPos.x -= this._scrollSpeed;
            object.transform.position = newPos;
        });
        this._background.scroll(this._scrollSpeed);
    }
}
//# sourceMappingURL=ScrollingLevel.js.map