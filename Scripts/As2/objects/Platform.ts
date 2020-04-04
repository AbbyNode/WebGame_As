import { GameObject } from "../../engine/gameobject/GameObject.js";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { Collider } from "../../engine/components/Collider.js";
import { ColliderTag } from "../managers/ColliderTag.js";
import { EventName } from "../../engine/components/EventName.js";
import { Point2D } from "../../engine/interfaces/Point2D.js";
import { Size2D } from "../../engine/interfaces/Size2D.js";
import { ShapeRenderer } from "../../engine/components/ShapeRenderer.js";

/**
 * Platform GameObject
 *
 * @export
 * @class Platform
 * @extends {GameObject}
 */
export class Platform extends GameObject {
	public static readonly fillColor = "#33ccff";
	public static readonly fillColorHover = "#3399ff";
	public static readonly strokeSize = 2;
	public static readonly strokeColor = "#000000";
	public static readonly fontColor = "#000000";

	private _spriteRenderer: SpriteRenderer;
	// private _shapeRenderer: ShapeRenderer;
	
	private _size: Size2D;

	constructor(size: Size2D) {
		super();

		this._size = size;

		this._spriteRenderer = new SpriteRenderer(this, {
			images: [Global.assetManager.getResult(AssetName.Image_Platform)],
			frames: { width: 128, height: 128, regX: 64, regY: 64 },
			animations: {
				idle: 0
				// walk: [4, 7, undefined, 0.1],
				// run: [4, 7, undefined, 0.2]
			}
		});
		this.addComponent(SpriteRenderer, this._spriteRenderer);

		this._spriteRenderer.sprite.scaleX = this._size.width / 128;
		this._spriteRenderer.sprite.scaleY = this._size.height / 128;

		this.addComponent(
			Collider,
			new Collider(this, {
				tag: ColliderTag.Platform,
				isTrigger: true,
				size: { width: this._size.width, height: 20 },
				offset: { x: 0, y: -(this._size.height/2) + 20 }
				// regXY: { x: this._size.width/2, y: this._size.height/2}
			})
		);

		// this.eventManager.addListener(EventName.GameObject_Init, () => {
		// 	this._spriteRenderer.sprite.gotoAndPlay("idle");
		// });
	}
}
