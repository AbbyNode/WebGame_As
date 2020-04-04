import { GameObject } from "../../engine/gameobject/GameObject.js";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { Collider } from "../../engine/components/Collider.js";
import { ColliderTag } from "../managers/ColliderTag.js";
import { Mover } from "../../engine/components/Mover.js";
import { EventName } from "../../engine/components/EventName.js";
export class Player extends GameObject {
    constructor() {
        super();
        this._spriteRenderer = new SpriteRenderer(this, {
            images: [Global.assetManager.getResult(AssetName.Image_PlayerSpriteSheet)],
            frames: { width: 64, height: 96, regX: 32, regY: 48 },
            animations: {
                idle: [5, 6, undefined, 0.1],
                walk: [2, 3, undefined, 0.1],
            }
        });
        this.addComponent(SpriteRenderer, this._spriteRenderer);
        this.addComponent(Collider, new Collider(this, {
            tag: ColliderTag.Player,
            isTrigger: false,
            size: { width: 41, height: 60 },
            offset: { x: 12, y: 4 }
        }));
        this.addComponent(Mover, new Mover(this));
        this.eventManager.addListener(EventName.GameObject_Init, () => {
            this._spriteRenderer.sprite.gotoAndPlay("idle");
        });
    }
}
//# sourceMappingURL=Player.js.map