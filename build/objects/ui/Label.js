import { GameObject } from "../../engine/gameobject/GameObject.js";
import { TextRenderer } from "../../engine/components/TextRenderer.js";
export class Label extends GameObject {
    constructor(text, centered = false) {
        super();
        this._textRenderer = new TextRenderer(this, text);
        if (centered) {
            this._textRenderer.centered = centered;
        }
        this.addComponent(TextRenderer, this._textRenderer);
    }
    get text() {
        return this._textRenderer.text;
    }
    set text(text) {
        this._textRenderer.text = text;
    }
}
//# sourceMappingURL=Label.js.map