import { GameObject } from "../../engine/gameobject/GameObject.js";
import { ShapeRenderer } from "../../engine/components/ShapeRenderer.js";
import { Size2D } from "../../engine/interfaces/Size2D.js";

export class SolidBackground extends GameObject {
	private _shapeRenderer: ShapeRenderer;

	private _size: Size2D;

	//#region props

	public get size(): Size2D {
		return this._size;
	}
	public set size(v: Size2D) {
		this._size = v;
	}

	//#endregion

	constructor(size: Size2D = { width: 400, height: 400 }, color = "black") {
		super();

		this._size = size;

		const solidBgGraphic = new createjs.Graphics()
			.beginFill(color)
			.drawRect(0, 0, this._size.width, this._size.height);
		this._shapeRenderer = new ShapeRenderer(this, solidBgGraphic);
		this._shapeRenderer.shape.alpha = 0.8;
		this.addComponent(ShapeRenderer, this._shapeRenderer);
	}
}
