import { GameObject } from "../../engine/gameobject/GameObject.js";
import { ShapeRenderer } from "../../engine/components/ShapeRenderer.js";
export class SolidBackground extends GameObject {
    //#endregion
    constructor(size = { width: 400, height: 400 }, color = "black") {
        super();
        this._size = size;
        const solidBgGraphic = new createjs.Graphics()
            .beginFill(color)
            .drawRect(0, 0, this._size.width, this._size.height);
        this._shapeRenderer = new ShapeRenderer(this, solidBgGraphic);
        this._shapeRenderer.shape.alpha = 0.8;
        this.addComponent(ShapeRenderer, this._shapeRenderer);
    }
    //#region props
    get size() {
        return this._size;
    }
    set size(v) {
        this._size = v;
    }
}
//# sourceMappingURL=SolidBackground.js.map