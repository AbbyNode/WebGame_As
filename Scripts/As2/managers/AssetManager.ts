import { FunctionEmpty } from "../../engine/interfaces/CommonTypes.js";

export enum AssetName {
	// Images
	// Image_SpriteSheet = "Image_SpriteSheet",
	Image_Background = "Image_Background",
	Image_Platform = "Image_Platform",
	Image_SlimeSpriteSheet = "Image_SlimeSpriteSheet",
	Image_EnemySpriteSheet = "Image_EnemySpriteSheet",
	Image_PortalSpriteSheet = "Image_PortalSpriteSheet",
	Image_Pickup = "Image_Pickup",
	// Sounds
	Sound_BackgroundMusic = "Sound_BackgroundMusic",
	Sound_Shoot = "Sound_Shoot",
	Sound_Pickup = "Sound_Pickup",
	Sound_EnemyDie = "Sound_EnemyDie",
	Sound_SlimeDie = "Sound_SlimeDie",
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
			id: AssetName.Image_Platform,
			src: "./Assets/As2/images/Platform.png",
			type: AssetType.IMAGE
		},
		{
			id: AssetName.Image_SlimeSpriteSheet,
			src: "./Assets/As2/images/SlimeBlue.png",
			// src: "./Assets/As2/images/SlimePink.png",
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
		{
			id: AssetName.Image_Pickup,
			src: "./Assets/As2/images/strawberry.png",
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
			id: AssetName.Sound_Pickup,
			src: "./Assets/As2/sounds/Blop-Mark_DiAngelo-79054334.mp3",
			type: AssetType.SOUND
		},
		{
			id: AssetName.Sound_EnemyDie,
			src: "./Assets/As2/sounds/Flame Arrow-SoundBible.com-618067908.mp3",
			type: AssetType.SOUND
		},
		{
			id: AssetName.Sound_SlimeDie,
			src: "./Assets/As2/sounds/Splat And Squirt-SoundBible.com-2136633229.mp3",
			type: AssetType.SOUND
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
