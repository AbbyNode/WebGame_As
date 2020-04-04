import { GameObject } from "../../engine/gameobject/GameObject.js";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { Collider } from "../../engine/components/Collider.js";
import { ColliderTag } from "../managers/ColliderTag.js";
export class Platform extends GameObject {
    constructor(size) {
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
        this.addComponent(Collider, new Collider(this, {
            tag: ColliderTag.Platform,
            isTrigger: true,
            size: { width: this._size.width, height: 20 },
            offset: { x: 0, y: -(this._size.height / 2) + 20 }
            // regXY: { x: this._size.width/2, y: this._size.height/2}
        }));
        // this.eventManager.addListener(EventName.GameObject_Init, () => {
        // 	this._spriteRenderer.sprite.gotoAndPlay("idle");
        // });
    }
}
Platform.fillColor = "#33ccff";
Platform.fillColorHover = "#3399ff";
Platform.strokeSize = 2;
Platform.strokeColor = "#000000";
Platform.fontColor = "#000000";
//# sourceMappingURL=Platform.js.map