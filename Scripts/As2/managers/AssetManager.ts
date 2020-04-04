import { FunctionEmpty } from "../../engine/interfaces/CommonTypes.js";

/* eslint-disable @typescript-eslint/camelcase */
export enum AssetName {
	// Images
	// Image_SpriteSheet = "Image_SpriteSheet",
	Image_Background = "Image_Background",
	Image_PlayerSpriteSheet = "Image_PlayerSpriteSheet",
	Image_EnemySpriteSheet = "Image_EnemySpriteSheet",
	Image_Platform = "Image_Platform",
	Image_SlimeSpriteSheet = "Image_SlimeSpriteSheet"
}
/* eslint-enable @typescript-eslint/camelcase */

export enum AssetType {
	IMAGE = "image",
	TEXT = "text",
	CSV = "text",
	SOUND = "sound",
}

/**
 * Asset manager initializes and tracks assets for the game.
 *
 * @export
 * @class AssetManager
 */
export class AssetManager {
	private _assetManifest = [
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

	private _loadQueue: createjs.LoadQueue;
	private _isLoaded: boolean;

	public get isLoaded(): boolean {
		return this._isLoaded;
	}

	constructor() {
		this._loadQueue = new createjs.LoadQueue();
		this._loadQueue.installPlugin(createjs.Sound);

		this._isLoaded = false;
		this._loadQueue.on("complete", () => {
			this._isLoaded = true;
		});
	}

	load(): void {
		this._loadQueue.loadManifest(this._assetManifest);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onComplete(callback: FunctionEmpty, scope: any): void {
		this._loadQueue.on("complete", callback, scope);
	}

	// eslint-disable-next-line @typescript-eslint/ban-types
	getResult(asset: AssetName): Object {
		return this._loadQueue.getResult(asset);
	}
}
