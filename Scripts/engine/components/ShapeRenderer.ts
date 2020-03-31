import { GameComponent } from "../gameobject/GameComponent.js";
import { GameObject } from "../gameobject/GameObject.js";
import { EventName } from "./EventName.js";

export class ShapeRenderer extends GameComponent {
	private _shape: createjs.Shape;
	
	public get shape(): createjs.Shape {
		return this._shape;
	}
	public set shape(v: createjs.Shape) {
		this._shape = v;
	}
	
	constructor(gameObject: GameObject, graphics: createjs.Graphics) {
		super(gameObject);

		this._shape = new createjs.Shape(graphics);

		this.gameObject.container.addChild(this._shape);

		this.gameObject.eventManager.addListener(EventName.GameObject_Destroy, () => {
			this.destroy();
		});
		
		// this.gameObject.eventManager.addListener(EventName.Transform_PositionChange, data => {
		// 	this._shape.x = data.x;
		// 	this._shape.y = data.y;
		// });
	}

	public destroy(): void {
		this.gameObject.container.removeChild(this._shape);
	}
}