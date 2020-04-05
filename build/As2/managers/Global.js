import { AssetManager } from "./AssetManager.js";
import { Collider } from "../../engine/components/Collider.js";
import { SceneManager } from "./SceneManager.js";
export class Global {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // private static _tileMapStrings: Map<string, TileType<any>>;
    //#region props
    static get assetManager() {
        return this._assetManager;
    }
    static get sceneManager() {
        return this._sceneManager;
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
        Collider.init();
        Collider.toggleDebugView(true);
    }
}
//# sourceMappingURL=Global.js.map