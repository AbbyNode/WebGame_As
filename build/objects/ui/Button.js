import { GameObject } from "../../engine/gameobject/GameObject.js";
import { EventName } from "../../engine/components/EventName.js";
import { TextRenderer } from "../../engine/components/TextRenderer.js";
import { ShapeRenderer } from "../../engine/components/ShapeRenderer.js";
export class Button extends GameObject {
    //#endregion
    constructor(text, onClick, size = { width: 180, height: 60 }) {
        super();
        this._size = size;
        this._sizeWithStroke = {
            width: this._size.width + Button.strokeSize * 2,
            height: this._size.height + Button.strokeSize * 2
        };
        this._onClick = onClick;
        const buttonGraphic = new createjs.Graphics()
            .setStrokeStyle(Button.strokeSize)
            .beginStroke(Button.strokeColor)
            .beginFill(Button.fillColor)
            .drawRect(0, 0, this._size.width, this._size.height);
        this._shapeRenderer = new ShapeRenderer(this, buttonGraphic);
        this.addComponent(ShapeRenderer, this._shapeRenderer);
        this._textRenderer = new TextRenderer(this, text, Button.fontColor, {
            x: this._size.width / 2,
            y: this._size.height / 2
        });
        this._textRenderer.centered = true;
        this.addComponent(TextRenderer, this._textRenderer);
        //
        this._hoverFilter = new createjs.ColorFilter(0.9, 0.9, 1, 1);
        //
        this.eventManager.addListener(EventName.GameObject_Init, () => {
            this._initEvents();
        });
        this.eventManager.addListener(EventName.GameObject_Destroy, () => {
            this._destroyEvents();
        });
    }
    //#region props
    get text() {
        return this._textRenderer.text;
    }
    set text(text) {
        this._textRenderer.text = text;
    }
    get size() {
        return this._size;
    }
    set size(v) {
        this._size = v;
        this._sizeWithStroke = {
            width: this._size.width + Button.strokeSize * 2,
            height: this._size.height + Button.strokeSize * 2
        };
    }
    get sizeWithStroke() {
        return this._sizeWithStroke;
    }
    get onClick() {
        return this._onClick;
    }
    set onClick(v) {
        this._onClick = v;
    }
    _initEvents() {
        this.container.on("click", this._onClick);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.container.on("mouseover", event => {
            this._shapeRenderer.shape.filters = [this._hoverFilter];
            this._shapeRenderer.shape.cache(-Button.strokeSize, -Button.strokeSize, this._size.width + Button.strokeSize * 2, this._size.height + Button.strokeSize * 2);
        });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        this.container.on("mouseout", event => {
            this._shapeRenderer.shape.filters = [];
            this._shapeRenderer.shape.cache(-Button.strokeSize, -Button.strokeSize, this._sizeWithStroke.width, this._sizeWithStroke.height);
        });
    }
    _destroyEvents() {
        const shape = this._shapeRenderer.shape;
        if (shape) {
            shape.removeAllEventListeners();
        }
    }
}
Button.fillColor = "#33ccff";
Button.fillColorHover = "#3399ff";
Button.strokeSize = 2;
Button.strokeColor = "#000000";
Button.fontColor = "#000000";
//# sourceMappingURL=Button.js.map