import { Global } from "./Global.js";
import { AssetName } from "./AssetManager.js";
import { Scene } from "../scenes/Scene.js";
import { MenuScene } from "../scenes/MenuScene.js";
import { WinScene } from "../scenes/WinScene.js";
import { LoseScene } from "../scenes/LoseScene.js";

export enum SceneName {
	Menu,
	Win,
	Lose
}

export class SceneManager {
	private _stage: createjs.Stage;

	private _currentScene?: Scene;

	constructor(stage: createjs.Stage) {
		this._stage = stage;
	}

	public update(): void {
		this._currentScene?.update();
	}

	public setScene(sceneName: SceneName): Scene {
		this._currentScene?.destroy();

		// Ideally the scene should have removed everything, but just in case
		this._stage.removeAllChildren();
		this._stage.removeAllEventListeners();

		this._currentScene = this._newScene(sceneName);
		this._currentScene.init();
		return this._currentScene;
	}

	public goToWinScene(): void {
		this.setScene(SceneName.Win);
	}

	private _newScene(sceneName: SceneName): Scene {
		switch (sceneName) {
			case SceneName.Menu:
				return new MenuScene(this._stage);
			case SceneName.Win:
				return new WinScene(this._stage);
			case SceneName.Lose:
				return new LoseScene(this._stage);
		}
	}
}
