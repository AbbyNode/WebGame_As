import { GameComponent } from "../gameobject/GameComponent.js";
import { EventName } from "./EventName.js";
export class TextRenderer extends GameComponent {
    //#endregion
    constructor(gameObject, text, color = "black", offset = { x: 0, y: 0 }) {
        super(gameObject);
        this._text = text;
        this._textView = new createjs.Text(this._text, TextRenderer.font, color);
        this._offset = offset;
        this._textView.x = this._offset.x;
        this._textView.y = this._offset.y;
        this._centered = false;
        this.gameObject.container.addChild(this._textView);
        this.gameObject.eventManager.addListener(EventName.GameObject_Destroy, () => {
            this.destroy();
        });
    }
    //#region props
    get text() {
        return this._text;
    }
    set text(v) {
        this._text = v;
        this._textView.text = this._text;
        if (this.centered) {
            this.setCentered(this.centered);
        }
    }
    get centered() {
        return this._centered;
    }
    set centered(v) {
        if (this._centered != v) {
            this.setCentered(v);
        }
        this._centered = v;
    }
    get offset() {
        return this._offset;
    }
    set offset(v) {
        this._offset = v;
        this._textView.x = this._offset.x;
        this._textView.y = this._offset.y;
    }
    destroy() {
        this.gameObject.container.removeChild(this._textView);
    }
    setCentered(toggle) {
        if (toggle) {
            this._textView.regX = this._textView.getBounds().width * 0.5;
            this._textView.regY = this._textView.getMeasuredLineHeight() * 0.5;
        }
        else {
            this._textView.regX = 0;
            this._textView.regY = 0;
        }
    }
}
TextRenderer.font = "24pt consolas";
//# sourceMappingURL=TextRenderer.js.map