import { GameObject } from "../../engine/gameobject/GameObject.js";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { Collider } from "../../engine/components/Collider.js";
import { ColliderTag } from "../managers/ColliderTag.js";
import { Mover } from "../../engine/components/Mover.js";
import { EventName } from "../../engine/components/EventName.js";

/**
 * Enemy GameObject
 *
 * @export
 * @class Enemy
 * @extends {GameObject}
 */
export class Enemy extends GameObject {
	private _spriteRenderer: SpriteRenderer;

	constructor() {
		super();

		this._spriteRenderer = new SpriteRenderer(this, {
			images: [Global.assetManager.getResult(AssetName.Image_EnemySpriteSheet)],
			frames: { width: 64, height: 96, regX: 32, regY: 48 },
			animations: {
				idle: [0, 3, undefined, 0.1],
				// walk: [4, 7, undefined, 0.1],
				// run: [4, 7, undefined, 0.2]
			}
		});
		this.addComponent(SpriteRenderer, this._spriteRenderer);

		this.addComponent(
			Collider,
			new Collider(this, {
				tag: ColliderTag.Enemy,
				isTrigger: true,
				size: { width: 40, height: 100 },
				offset: { x: 0, y: 0 }
				// regXY: { x: 32, y: 48 }
			})
		);

		this.eventManager.addListener(EventName.GameObject_Init, () => {
			this._spriteRenderer.sprite.gotoAndPlay("idle");
		});
	}
}
