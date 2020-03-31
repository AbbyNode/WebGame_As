import { GameComponent } from "../gameobject/GameComponent.js";
import { EventName } from "./EventName.js";
export class ShapeRenderer extends GameComponent {
    constructor(gameObject, graphics) {
        super(gameObject);
        this._shape = new createjs.Shape(graphics);
        this.gameObject.container.addChild(this._shape);
        this.gameObject.eventManager.addListener(EventName.GameObject_Destroy, () => {
            this.destroy();
        });
        // this.gameObject.eventManager.addListener(EventName.Transform_PositionChange, data => {
        // 	this._shape.x = data.x;
        // 	this._shape.y = data.y;
        // });
    }
    get shape() {
        return this._shape;
    }
    set shape(v) {
        this._shape = v;
    }
    destroy() {
        this.gameObject.container.removeChild(this._shape);
    }
}
//# sourceMappingURL=ShapeRenderer.js.map