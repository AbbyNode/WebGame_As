import { Size2D } from "../../engine/interfaces/Size2D.js";

export class HurtOverlay {
	// public static readonly strokeSize = 2;
	// public static readonly strokeColor = "#000000";
	public static readonly overlayColor = "#ff0000";

	private _shape : createjs.Shape;

	public get shape() : createjs.Shape {
		return this._shape;
	}
	public set shape(v : createjs.Shape) {
		this._shape = v;
	}
	
	constructor(size: Size2D = { width: 800, height: 600 }) {
		const graphic = new createjs.Graphics()
			// .setStrokeStyle(HurtOverlay.strokeSize)
			// .beginStroke(HurtOverlay.strokeColor)
			.beginFill(HurtOverlay.overlayColor)
			.drawRect(0, 0, size.width, size.height);
		
		this._shape = new createjs.Shape(graphic);
		this._shape.alpha = 0;
	}

	public show(duration: number = 600): void {
		createjs.Tween.get(this._shape)
		.to({alpha: 0.6}, duration/2)
		.to({alpha: 0}, duration/2);
	}
}