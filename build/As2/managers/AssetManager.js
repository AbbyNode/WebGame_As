/* eslint-disable @typescript-eslint/camelcase */
export var AssetName;
(function (AssetName) {
    // Images
    // Image_SpriteSheet = "Image_SpriteSheet",
    AssetName["Image_Background"] = "Image_Background";
    AssetName["Image_PlayerSpriteSheet"] = "Image_PlayerSpriteSheet";
    AssetName["Image_EnemySpriteSheet"] = "Image_EnemySpriteSheet";
    AssetName["Image_Platform"] = "Image_Platform";
    AssetName["Image_SlimeSpriteSheet"] = "Image_SlimeSpriteSheet";
})(AssetName || (AssetName = {}));
/* eslint-enable @typescript-eslint/camelcase */
export var AssetType;
(function (AssetType) {
    AssetType["IMAGE"] = "image";
    AssetType["TEXT"] = "text";
    AssetType["CSV"] = "text";
    AssetType["SOUND"] = "sound";
})(AssetType || (AssetType = {}));
/**
 * Asset manager initializes and tracks assets for the game.
 *
 * @export
 * @class AssetManager
 */
export class AssetManager {
    constructor() {
        this._assetManifest = [
            // Images
            {
                id: AssetName.Image_Background,
                src: "./Assets/As2/images/LavaBackground.png",
                type: AssetType.IMAGE
            },
            {
                id: AssetName.Image_PlayerSpriteSheet,
                src: "./Assets/As2/images/WaterSpriteSheet.png",
                type: AssetType.IMAGE
            },
            {
                id: AssetName.Image_EnemySpriteSheet,
                src: "./Assets/As2/images/FlameSpriteSheet.png",
                type: AssetType.IMAGE
            },
            {
                id: AssetName.Image_Platform,
                src: "./Assets/As2/images/Platform.png",
                type: AssetType.IMAGE
            },
            {
                id: AssetName.Image_SlimeSpriteSheet,
                src: "./Assets/As2/images/SlimeBlue.png",
                type: AssetType.IMAGE
            },
        ];
        this._loadQueue = new createjs.LoadQueue();
        this._loadQueue.installPlugin(createjs.Sound);
        this._isLoaded = false;
        this._loadQueue.on("complete", () => {
            this._isLoaded = true;
        });
    }
    get isLoaded() {
        return this._isLoaded;
    }
    load() {
        this._loadQueue.loadManifest(this._assetManifest);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onComplete(callback, scope) {
        this._loadQueue.on("complete", callback, scope);
    }
    // eslint-disable-next-line @typescript-eslint/ban-types
    getResult(asset) {
        return this._loadQueue.getResult(asset);
    }
}
//# sourceMappingURL=AssetManager.js.map