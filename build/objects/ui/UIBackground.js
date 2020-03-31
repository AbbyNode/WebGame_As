import { GameObject } from "../../engine/gameobject/GameObject.js";
import { ShapeRenderer } from "../../engine/components/ShapeRenderer.js";
export class UIBackground extends GameObject {
    //#endregion
    constructor(size = { width: 400, height: 400 }, color) {
        super();
        this._size = size;
        this._sizeWithStroke = {
            width: this._size.width + UIBackground.strokeSize * 2,
            height: this._size.height + UIBackground.strokeSize * 2
        };
        const uiBgGraphic = new createjs.Graphics()
            .setStrokeStyle(UIBackground.strokeSize)
            .beginStroke(UIBackground.strokeColor)
            .beginFill(color)
            .drawRect(0, 0, this._size.width, this._size.height);
        this._shapeRenderer = new ShapeRenderer(this, uiBgGraphic);
        this._shapeRenderer.shape.alpha = 0.8;
        this.addComponent(ShapeRenderer, this._shapeRenderer);
    }
    //#region props
    get size() {
        return this._size;
    }
    set size(v) {
        this._size = v;
        this._sizeWithStroke = {
            width: this._size.width + UIBackground.strokeSize * 2,
            height: this._size.height + UIBackground.strokeSize * 2
        };
    }
    get sizeWithStroke() {
        return this._sizeWithStroke;
    }
}
UIBackground.strokeSize = 2;
UIBackground.strokeColor = "#000000";
//# sourceMappingURL=UIBackground.js.map