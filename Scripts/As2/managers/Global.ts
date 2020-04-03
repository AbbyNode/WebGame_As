import { AssetManager } from "./AssetManager.js";
import { TileType } from "../../engine/tiles/Tile.js";
import { Collider } from "../../engine/components/Collider.js";
import { SceneManager, SceneName } from "./SceneManager.js";

export class Global {
	private static _assetManager: AssetManager;
	private static _sceneManager: SceneManager;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	private static _tileMapStrings: Map<string, TileType<any>>;

	//#region props

	public static get assetManager(): AssetManager {
		return this._assetManager;
	}

	public static get sceneManager(): SceneManager {
		return this._sceneManager;
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public static get tileMapStrings(): Map<string, TileType<any>> {
		return this._tileMapStrings;
	}

	//#endregion

	public static init(stage: createjs.Stage): void {
		if (this._assetManager) {
			throw new Error("Asset manager already exist");
		}
		this._assetManager = new AssetManager();

		this._sceneManager = new SceneManager(stage);

		Collider.init();
		// Collider.toggleDebugView(true);
	}
}
