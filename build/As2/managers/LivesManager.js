import { Global } from "./Global.js";
import { AssetName } from "./AssetManager.js";
export class LivesManager {
    //#endregion
    constructor(lives, deadCallback) {
        this._numLives = 0;
        this._spacing = 64;
        this._numLives = lives;
        this._sprites = [];
        this._container = new createjs.Container();
        this._deadCallback = deadCallback;
        // Generate sprite for lives
        const lifeSpriteData = {
            images: [Global.assetManager.getResult(AssetName.Image_SlimeSpriteSheet)],
            frames: { width: 128, height: 128, regX: 64, regY: 64 },
            animations: {
                idle: 40,
                die: [40, 48, "dead", 0.2],
                dead: 49,
            },
        };
        const lifeSpriteSheet = new createjs.SpriteSheet(lifeSpriteData);
        // Add sprites to array
        for (let index = 0; index < lives; index++) {
            const sprite = new createjs.Sprite(lifeSpriteSheet);
            sprite.scaleX = -0.8;
            sprite.scaleY = 0.8;
            sprite.x = index * this._spacing;
            sprite.gotoAndPlay("idle");
            this._sprites.push(sprite);
            this._container.addChild(sprite);
        }
    }
    //#region props
    get container() {
        return this._container;
    }
    set container(v) {
        this._container = v;
    }
    loseLife() {
        var _a;
        const sprite = this._sprites.pop();
        (_a = sprite) === null || _a === void 0 ? void 0 : _a.gotoAndPlay("die");
        this._numLives--;
        if (this._numLives <= 0) {
            this._deadCallback();
        }
    }
}
//# sourceMappingURL=LivesManager.js.map