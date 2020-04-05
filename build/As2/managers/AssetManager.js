/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable @typescript-eslint/camelcase */
export var AssetName;
(function (AssetName) {
    // Images
    // Image_SpriteSheet = "Image_SpriteSheet",
    AssetName["Image_Background"] = "Image_Background";
    AssetName["Image_Platform"] = "Image_Platform";
    AssetName["Image_SlimeSpriteSheet"] = "Image_SlimeSpriteSheet";
    AssetName["Image_EnemySpriteSheet"] = "Image_EnemySpriteSheet";
    AssetName["Image_PortalSpriteSheet"] = "Image_PortalSpriteSheet";
    AssetName["Sound_BackgroundMusic"] = "Sound_BackgroundMusic";
    AssetName["Sound_Shoot"] = "Sound_Shoot";
    AssetName["Sound_EnemyDie"] = "Sound_EnemyDie";
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
                id: AssetName.Image_Platform,
                src: "./Assets/As2/images/Platform.png",
                type: AssetType.IMAGE
            },
            {
                id: AssetName.Image_SlimeSpriteSheet,
                // src: "./Assets/As2/images/SlimeBlue.png",
                src: "./Assets/As2/images/SlimePink.png",
                type: AssetType.IMAGE
            },
            {
                id: AssetName.Image_EnemySpriteSheet,
                src: "./Assets/As2/images/FlameSpriteSheet.png",
                type: AssetType.IMAGE
            },
            {
                id: AssetName.Image_PortalSpriteSheet,
                src: "./Assets/As2/images/PortalSpriteSheet_Purple.png",
                type: AssetType.IMAGE
            },
            // Sounds
            {
                id: AssetName.Sound_BackgroundMusic,
                src: "./Assets/As2/sounds/SLOWER-TEMPO2019-12-09_-_Retro_Forest_-_David_Fesliyan.mp3",
                type: AssetType.SOUND
            },
            {
                id: AssetName.Sound_Shoot,
                src: "./Assets/As2/sounds/Spit_Splat_2-Mike_Koenig-1283100514.mp3",
                type: AssetType.SOUND
            },
            {
                id: AssetName.Sound_EnemyDie,
                src: "./Assets/As2/sounds/Flame Arrow-SoundBible.com-618067908.mp3",
                type: AssetType.SOUND
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