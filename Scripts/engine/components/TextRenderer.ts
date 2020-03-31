import { GameComponent } from "../gameobject/GameComponent.js";
import { GameObject } from "../gameobject/GameObject.js";
import { EventName } from "./EventName.js";
import { Point2D } from "../interfaces/Point2D.js";

export class TextRenderer extends GameComponent {
	public static readonly font = "24pt consolas";

	private _text: string;
	private _textView: createjs.Text;

	private _centered: boolean;
	private _offset: Point2D;

	//#region props

	public get text(): string {
		return this._text;
	}
	public set text(v: string) {
		this._text = v;

		this._textView.text = this._text;

		if (this.centered) {
			this.setCentered(this.centered);
		}
	}

	public get centered(): boolean {
		return this._centered;
	}
	public set centered(v: boolean) {
		if (this._centered != v) {
			this.setCentered(v);
		}

		this._centered = v;
	}

	public get offset(): Point2D {
		return this._offset;
	}
	public set offset(v: Point2D) {
		this._offset = v;
		this._textView.x = this._offset.x;
		this._textView.y = this._offset.y;
	}

	//#endregion

	constructor(
		gameObject: GameObject,
		text: string,
		color = "black",
		offset: Point2D = { x: 0, y: 0 }
	) {
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

	public destroy(): void {
		this.gameObject.container.removeChild(this._textView);
	}

	private setCentered(toggle: boolean): void {
		if (toggle) {
			this._textView.regX = this._textView.getBounds().width * 0.5;
			this._textView.regY = this._textView.getMeasuredLineHeight() * 0.5;
		} else {
			this._textView.regX = 0;
			this._textView.regY = 0;
		}
	}
}
