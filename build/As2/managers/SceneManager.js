import { MenuScene } from "../scenes/MenuScene.js";
import { WinScene } from "../scenes/WinScene.js";
import { LoseScene } from "../scenes/LoseScene.js";
import { GameScene } from "../scenes/GameScene.js";
import { InstructionsScene } from "../scenes/InstructionsScene.js";
import { Collider } from "../../engine/components/Collider.js";
export var SceneName;
(function (SceneName) {
    SceneName[SceneName["Menu"] = 0] = "Menu";
    SceneName[SceneName["Game"] = 1] = "Game";
    SceneName[SceneName["Instructions"] = 2] = "Instructions";
    SceneName[SceneName["Win"] = 3] = "Win";
    SceneName[SceneName["Lose"] = 4] = "Lose";
})(SceneName || (SceneName = {}));
export class SceneManager {
    constructor(stage) {
        this._stage = stage;
    }
    update() {
        var _a;
        (_a = this._currentScene) === null || _a === void 0 ? void 0 : _a.update();
    }
    setScene(sceneName) {
        var _a;
        (_a = this._currentScene) === null || _a === void 0 ? void 0 : _a.destroy();
        // Ideally the scene should have removed everything, but just in case
        this._stage.removeAllChildren();
        this._stage.removeAllEventListeners();
        Collider.destroyAll();
        this._currentScene = this._newScene(sceneName);
        this._currentScene.init();
        return this._currentScene;
    }
    _newScene(sceneName) {
        switch (sceneName) {
            case SceneName.Menu:
                return new MenuScene(this._stage);
            case SceneName.Game:
                return new GameScene(this._stage);
            case SceneName.Instructions:
                return new InstructionsScene(this._stage);
            case SceneName.Win:
                return new WinScene(this._stage);
            case SceneName.Lose:
                return new LoseScene(this._stage);
        }
    }
}
//# sourceMappingURL=SceneManager.js.map