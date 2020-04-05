import { AssetManager } from "./AssetManager.js";
import { Collider } from "../../engine/components/Collider.js";
import { SceneManager } from "./SceneManager.js";
import { Label } from "../../objects/ui/Label.js";
export class Global {
    //#region props
    static get assetManager() {
        return this._assetManager;
    }
    static get sceneManager() {
        return this._sceneManager;
    }
    static get score() {
        return this._score;
    }
    static set score(v) {
        this._score = v;
        this._scoreLabel.text = "Score: " + this._score.toString();
    }
    static get scoreLabel() {
        return this._scoreLabel;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // public static get tileMapStrings(): Map<string, TileType<any>> {
    // 	return this._tileMapStrings;
    // }
    //#endregion
    static init(stage) {
        if (this._assetManager) {
            throw new Error("Asset manager already exist");
        }
        this._assetManager = new AssetManager();
        this._sceneManager = new SceneManager(stage);
        this._score = 0;
        this._scoreLabel = new Label("Score: 0", false, "white");
        Collider.init();
        Collider.toggleDebugView(true);
    }
}
//# sourceMappingURL=Global.js.map