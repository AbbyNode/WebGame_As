import { GameComponent } from "../gameobject/GameComponent.js";
import { EventName } from "./EventName.js";
export class Transform extends GameComponent {
    constructor(gameObject) {
        super(gameObject);
        this._position = { x: 0, y: 0 };
    }
    get position() {
        return Object.assign({}, this._position);
    }
    set position(position) {
        this._position = Object.assign({}, position);
        this.gameObject.container.x = position.x;
        this.gameObject.container.y = position.y;
        this.gameObject.eventManager.invoke(EventName.Transform_PositionChange, position);
    }
}
//# sourceMappingURL=Transform.js.map