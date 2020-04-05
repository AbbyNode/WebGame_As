import { AssetManager } from "./AssetManager.js";
import { TileType } from "../../engine/tiles/Tile.js";
import { Collider } from "../../engine/components/Collider.js";
import { SceneManager, SceneName } from "./SceneManager.js";
import { Label } from "../../objects/ui/Label.js";

export class Global {
	private static _assetManager: AssetManager;
	private static _sceneManager: SceneManager;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// private static _tileMapStrings: Map<string, TileType<any>>;

	private static _score : number;
	private static _scoreLabel: Label;

	//#region props

	public static get assetManager(): AssetManager {
		return this._assetManager;
	}

	public static get sceneManager(): SceneManager {
		return this._sceneManager;
	}

	public static get score() : number {
		return this._score;
	}
	public static set score(v : number) {
		this._score = v;
		this._scoreLabel.text = "Score: " + this._score.toString();
	}
	
	public static get scoreLabel() : Label {
		return this._scoreLabel;
	}
	
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	// public static get tileMapStrings(): Map<string, TileType<any>> {
	// 	return this._tileMapStrings;
	// }

	//#endregion

	public static init(stage: createjs.Stage): void {
		if (this._assetManager) {
			throw new Error("Asset manager already exist");
		}
		this._assetManager = new AssetManager();

		this._sceneManager = new SceneManager(stage);

		this._score = 0;
		this._scoreLabel = new Label("Score: 0", false, "white");

		Collider.init();
		// Collider.toggleDebugView(true);
	}
}
