import { GameObject } from "../../engine/gameobject/GameObject.js";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { Collider } from "../../engine/components/Collider.js";
import { ColliderTag } from "../managers/ColliderTag.js";
import { EventName } from "../../engine/components/EventName.js";
export class Portal extends GameObject {
    constructor() {
        super();
        this._spriteRenderer = new SpriteRenderer(this, {
            images: [Global.assetManager.getResult(AssetName.Image_PortalSpriteSheet)],
            frames: { width: 256, height: 256, regX: 128, regY: 128 },
            animations: {
                idle: [0, 7, undefined, 0.1],
            }
        });
        this._spriteRenderer.sprite.scaleX = -1;
        this.addComponent(SpriteRenderer, this._spriteRenderer);
        this.addComponent(Collider, new Collider(this, {
            tag: ColliderTag.Portal,
            isTrigger: true,
            size: { width: 80, height: 200 },
            offset: { x: 0, y: 0 }
            // regXY: { x: 32, y: 48 }
        }));
        this.eventManager.addListener(EventName.GameObject_Init, () => {
            this._spriteRenderer.sprite.gotoAndPlay("idle");
        });
    }
}
//# sourceMappingURL=Portal.js.map