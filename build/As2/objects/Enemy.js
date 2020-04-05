import { GameObject } from "../../engine/gameobject/GameObject.js";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { Collider } from "../../engine/components/Collider.js";
import { ColliderTag } from "../managers/ColliderTag.js";
import { EventName } from "../../engine/components/EventName.js";
/**
 * Enemy GameObject
 *
 * @export
 * @class Enemy
 * @extends {GameObject}
 */
export class Enemy extends GameObject {
    constructor() {
        super();
        this._scoreOnKill = 10;
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
            isTrigger: true,
            size: { width: 40, height: 100 },
            offset: { x: 0, y: 0 }
            // regXY: { x: 32, y: 48 }
        }));
        this.eventManager.addListener(EventName.GameObject_Init, () => {
            this._spriteRenderer.sprite.gotoAndPlay("idle");
        });
    }
    kill() {
        createjs.Sound.play(AssetName.Sound_EnemyDie);
        Global.score += this._scoreOnKill;
        this.destroy();
    }
}
//# sourceMappingURL=Enemy.js.map