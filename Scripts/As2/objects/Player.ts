import { GameObject } from "../../engine/gameobject/GameObject.js";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { Collider } from "../../engine/components/Collider.js";
import { ColliderTag } from "../managers/ColliderTag.js";
import { Mover } from "../../engine/components/Mover.js";
import { EventName } from "../../engine/components/EventName.js";

/**
 * Player GameObject. This class is the core of the player sprite and movement.
 *
 * @export
 * @class Player
 * @extends {GameObject}
 */
export class Player extends GameObject {
	private _spriteRenderer: SpriteRenderer;

	private _isMoving : boolean = false;

	private _jumpSpeed: number = 5;
	private _jumpDuration: number = 600;
	private _jumping: boolean;
	private _hasJump: boolean;
	private _jumpingTimeout: any;

	private _grounded: boolean;
	private _numGrounds: number = 0;
	private _fallSpeed: number = 3;

	//#region props

	public get isMoving() : boolean {
		return this._isMoving;
	}
	public set isMoving(v : boolean) {
		this._isMoving = v;
		if (this._grounded) {
			if (this._isMoving) {
				this._spriteRenderer.sprite.gotoAndPlay("walk");
			} else {
				this._spriteRenderer.sprite.gotoAndPlay("idle");
			}
		}
	}
	
	//#endregion

	constructor() {
		super();

		this._jumping = false;
		this._hasJump = true;
		this._grounded = false;

		this._spriteRenderer = new SpriteRenderer(this, {
			images: [Global.assetManager.getResult(AssetName.Image_SlimeSpriteSheet)],
			frames: { width: 128, height: 128, regX: 64, regY: 64 },
			animations: {
				idle: [0, 9, undefined, 0.1],
				// idle: 5,
				walk: [10, 19, undefined, 0.2],
				// run: [2, 3, undefined, 0.2]
				jump: [20, 23, "midair", 0.2],
				midair: 24,
				land: [25, 29, "idle", 0.2]
			},
		});
		this.addComponent(SpriteRenderer, this._spriteRenderer);

		this._spriteRenderer.sprite.scaleX = -1;

		this.addComponent(
			Collider,
			new Collider(this, {
				tag: ColliderTag.Player,
				isTrigger: false,
				size: { width: 48, height: 20 },
				offset: { x: 0, y: 60 },
			})
		);

		// Player will have special movement since it's a scrolling game
		// this.addComponent(Mover, new Mover(this));

		this.eventManager.addListener(EventName.GameObject_Init, () => {
			this._spriteRenderer.sprite.gotoAndPlay("idle");
		});

		this.eventManager.addListener(EventName.Collider_MoveRequestAccepted, (newPos) => {
			this.transform.position = newPos;
		});

		this.eventManager.addListener(EventName.Collider_TriggerEnter, (collider) => {
			if (collider.tag == ColliderTag.Platform) {
				if (!this._grounded) {
					this._grounded = true;
					this._spriteRenderer.sprite.gotoAndPlay("land");
				}

				this._numGrounds++;
				this._hasJump = true;
			}
		});

		this.eventManager.addListener(EventName.Collider_TriggerExit, (collider) => {
			if (collider.tag == ColliderTag.Platform) {
				this._numGrounds--;
				if (this._numGrounds <= 0) {
					this._grounded = false;
				}
			}
		});
	}

	public update(): void {
		super.update();
		
		if (this._jumping) {
			const newPos = this.transform.position;
			newPos.y -= this._jumpSpeed;
			this.eventManager.invoke(EventName.Collider_RequestMove, newPos);
		} else if (!this._grounded) {
			const newPos = this.transform.position;
			newPos.y += this._fallSpeed;
			this.eventManager.invoke(EventName.Collider_RequestMove, newPos);
		}
	}

	public jump(): void {
		if (this._jumping || !this._hasJump) {
			return;
		}

		this._hasJump = false;
		this._jumping = true;
		this._spriteRenderer.sprite.gotoAndPlay("jump");

		this._jumpingTimeout = setTimeout(() => {
			this._jumping = false;
		}, this._jumpDuration);
	}

	stopJump() {
		if (!this._jumping) {
			return;
		}

		this._jumping = false;
		if (this._jumpingTimeout) {
			clearTimeout(this._jumpingTimeout);
		}
	}
}