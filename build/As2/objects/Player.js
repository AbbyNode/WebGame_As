import { GameObject } from "../../engine/gameobject/GameObject.js";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { Collider } from "../../engine/components/Collider.js";
import { ColliderTag } from "../managers/ColliderTag.js";
import { EventName } from "../../engine/components/EventName.js";
export class Player extends GameObject {
    constructor() {
        super();
        this._jumpSpeed = 5;
        this._jumpDuration = 600;
        this._numGrounds = 0;
        this._fallSpeed = 3;
        this._jumping = false;
        this._grounded = false;
        this._spriteRenderer = new SpriteRenderer(this, {
            images: [Global.assetManager.getResult(AssetName.Image_PlayerSpriteSheet)],
            frames: { width: 64, height: 96, regX: 32, regY: 48 },
            animations: {
                idle: [5, 6, undefined, 0.1],
                walk: [2, 3, undefined, 0.1],
            },
        });
        this.addComponent(SpriteRenderer, this._spriteRenderer);
        this.addComponent(Collider, new Collider(this, {
            tag: ColliderTag.Player,
            isTrigger: false,
            size: { width: 40, height: 60 },
            offset: { x: 0, y: 0 },
        }));
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
                this._numGrounds++;
                this._grounded = true;
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
    update() {
        super.update();
        if (this._jumping) {
            const newPos = this.transform.position;
            newPos.y -= this._jumpSpeed;
            this.eventManager.invoke(EventName.Collider_RequestMove, newPos);
        }
        else if (!this._grounded) {
            const newPos = this.transform.position;
            newPos.y += this._fallSpeed;
            this.eventManager.invoke(EventName.Collider_RequestMove, newPos);
        }
    }
    jump() {
        if (this._jumping || !this._grounded) {
            return;
        }
        this._jumping = true;
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
//# sourceMappingURL=Player.js.map