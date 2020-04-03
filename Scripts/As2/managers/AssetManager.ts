import { FunctionEmpty } from "../../engine/interfaces/CommonTypes.js";

/* eslint-disable @typescript-eslint/camelcase */
export enum AssetName {
	// Images
	// Image_SpriteSheet = "Image_SpriteSheet",
}
/* eslint-enable @typescript-eslint/camelcase */

export enum AssetType {
	IMAGE = "image",
	TEXT = "text",
	CSV = "text",
	SOUND = "sound",
}

export class AssetManager {
	private _assetManifest = [
		// Images
		// {
		// 	id: AssetName.Image_SpriteSheet,
		// 	src: "./assets/images/AgentMorris_SpriteSheet.png",
		// 	type: AssetType.IMAGE
		// },
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
