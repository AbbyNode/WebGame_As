import { GameObject } from "../../engine/gameobject/GameObject.js";
import { TextRenderer } from "../../engine/components/TextRenderer.js";

export class Label extends GameObject {
	private _textRenderer: TextRenderer;
	
	public get text(): string {
		return this._textRenderer.text;
	}

	public set text(text: string) {
		this._textRenderer.text = text;
	}

	constructor(text: string, centered = false) {
		super();

		this._textRenderer = new TextRenderer(this, text);
		if (centered) {
			this._textRenderer.centered = centered;
		}
		this.addComponent(TextRenderer, this._textRenderer);
	}
}