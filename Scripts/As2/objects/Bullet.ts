import { GameObject } from "../../engine/gameobject/GameObject.js";
import { ShapeRenderer } from "../../engine/components/ShapeRenderer.js";
import { Collider } from "../../engine/components/Collider.js";
import { ColliderTag } from "../managers/ColliderTag.js";
import { EventName } from "../../engine/components/EventName.js";

export class Bullet extends GameObject {
	public static readonly fillColor = "#33ccff";
	public static readonly fillColorHover = "#3399ff";
	public static readonly strokeSize = 2;
	public static readonly strokeColor = "#000000";
	public static readonly fontColor = "#000000";

	private _speed: number = 5;
	private _duration: number = 1500;
	private _shapeRenderer: ShapeRenderer;
	
	constructor() {
		super();

		const buttonGraphic = new createjs.Graphics()
			.setStrokeStyle(Bullet.strokeSize)
			.beginStroke(Bullet.strokeColor)
			.beginFill(Bullet.fillColor)
			.drawCircle(0, 0, 5)
		this._shapeRenderer = new ShapeRenderer(this, buttonGraphic);
		this.addComponent(ShapeRenderer, this._shapeRenderer);

		this.addComponent(
			Collider,
			new Collider(this, {
				tag: ColliderTag.Bullet,
				isTrigger: true,
				size: { width: 10, height: 10 },
				offset: { x: 0, y: 0 }
				// regXY: { x: 32, y: 48 }
			})
		);

		setTimeout(() => {
			this.destroy();
		}, this._duration);

		this.eventManager.addListener(EventName.Collider_MoveRequestAccepted, (newPos) => {
			this.transform.position = newPos;
		});
		
		this.eventManager.addListener(EventName.Collider_MoveRequestDenied, (newPos) => {
			this.transform.position = newPos;
		});

		this.eventManager.addListener(EventName.Collider_TriggerEnter, (collider) => {
			if (collider instanceof Collider) {
				if (collider.tag == ColliderTag.Enemy) {
					// console.log(collider);
					// console.trace();
					// console.log(collider.gameObject);
					collider.gameObject.destroy();
					this.destroy();
				}
			}
		});
	}

	public update(): void {
		super.update();

		const newPos = this.transform.position;
		newPos.x += this._speed;
		this.eventManager.invoke(EventName.Collider_RequestMove, newPos);
	}
}