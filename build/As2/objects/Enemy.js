import { GameObject } from "../../engine/gameobject/GameObject.js";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { Collider } from "../../engine/components/Collider.js";
import { ColliderTag } from "../managers/ColliderTag.js";
import { EventName } from "../../engine/components/EventName.js";
export class Enemy extends GameObject {
    constructor() {
        super();
        this._spriteRenderer = new SpriteRenderer(this, {
            images: [Global.assetManager.getResult(AssetName.Image_EnemySpriteSheet)],
            frames: { width: 64, height: 96, regX: 32, regY: 48 },
            animations: {
                idle: [0, 3, undefined, 0.1],
            }
        });
        this.addComponent(SpriteRenderer, this._spriteRenderer);
        this.addComponent(Collider, new Collider(this, {
            tag: ColliderTag.Enemy,
            isTrigger: false,
            size: { width: 40, height: 50 },
            offset: { x: 14, y: 14 }
        }));
        this.eventManager.addListener(EventName.GameObject_Init, () => {
            this._spriteRenderer.sprite.gotoAndPlay("idle");
        });
    }
}
//# sourceMappingURL=Enemy.js.map