import { GameObject } from "../../engine/gameobject/GameObject.js";
import { ShapeRenderer } from "../../engine/components/ShapeRenderer.js";
import { Collider } from "../../engine/components/Collider.js";
import { ColliderTag } from "../managers/ColliderTag.js";
export class Bullet extends GameObject {
    constructor() {
        super();
        this._speed = 5;
        this._duration = 1500;
        const buttonGraphic = new createjs.Graphics()
            .setStrokeStyle(Bullet.strokeSize)
            .beginStroke(Bullet.strokeColor)
            .beginFill(Bullet.fillColor)
            .drawCircle(0, 0, 5);
        this._shapeRenderer = new ShapeRenderer(this, buttonGraphic);
        this.addComponent(ShapeRenderer, this._shapeRenderer);
        this.addComponent(Collider, new Collider(this, {
            tag: ColliderTag.Bullet,
            isTrigger: true,
            size: { width: 10, height: 10 },
            offset: { x: 0, y: 0 }
            // regXY: { x: 32, y: 48 }
        }));
        setTimeout(() => {
            this.destroy();
        }, this._duration);
    }
    update() {
        const newPos = this.transform.position;
        newPos.x += this._speed;
        this.transform.position = newPos;
    }
}
Bullet.fillColor = "#33ccff";
Bullet.fillColorHover = "#3399ff";
Bullet.strokeSize = 2;
Bullet.strokeColor = "#000000";
Bullet.fontColor = "#000000";
//# sourceMappingURL=Bullet.js.map