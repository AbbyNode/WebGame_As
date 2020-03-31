import { GameObject } from "../../engine/gameobject/GameObject.js";
import { ShapeRenderer } from "../../engine/components/ShapeRenderer.js";
import { Size2D } from "../../engine/interfaces/Size2D.js";

export class UIBackground extends GameObject {
	public static readonly strokeSize = 2;
	public static readonly strokeColor = "#000000";

	private _shapeRenderer: ShapeRenderer;

	private _size: Size2D;
	private _sizeWithStroke: Size2D;

	//#region props

	public get size(): Size2D {
		return this._size;
	}
	public set size(v: Size2D) {
		this._size = v;
		this._sizeWithStroke = {
			width: this._size.width + UIBackground.strokeSize * 2,
			height: this._size.height + UIBackground.strokeSize * 2
		};
	}

	public get sizeWithStroke(): Size2D {
		return this._sizeWithStroke;
	}

	//#endregion

	constructor(size: Size2D = { width: 400, height: 400 }, color: string) {
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
}
