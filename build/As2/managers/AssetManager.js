/* eslint-disable @typescript-eslint/camelcase */
export var AssetName;
(function (AssetName) {
    // Images
    // Image_SpriteSheet = "Image_SpriteSheet",
    AssetName["Image_Background"] = "Image_Background";
})(AssetName || (AssetName = {}));
/* eslint-enable @typescript-eslint/camelcase */
export var AssetType;
(function (AssetType) {
    AssetType["IMAGE"] = "image";
    AssetType["TEXT"] = "text";
    AssetType["CSV"] = "text";
    AssetType["SOUND"] = "sound";
})(AssetType || (AssetType = {}));
export class AssetManager {
    constructor() {
        this._assetManifest = [
            // Images
            {
                id: AssetName.Image_Background,
                src: "./Assets/As2/images/background.png",
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