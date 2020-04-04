import { Game } from "../Game.js";
import { Global } from "./managers/Global.js";
import { SceneName } from "./managers/SceneManager.js";

/**
 * Author: Abby Shah
 * Creation Date: 2020, March
 * Description: 2D Scrolling Game
 * 
 * Revision History:
 * (See GitHub for detailed commit history)
 * 
 * v0.1:
 * 
 * 
 * @export
 * @class As2
 * @extends {Game}
 */
export class As2 extends Game {
	//#region private vars

	//#endregion

	constructor() {
		super();
		
		Global.init(this._stage);
		Global.assetManager.onComplete(this.OnAssetLoad, this);
		Global.assetManager.load();
	}

	public Start(): void {
		super.Start();
	}

	public OnAssetLoad(): void {
		Global.sceneManager.setScene(SceneName.Menu);
	}

	public Update(): void {
		Global.sceneManager.update();
		super.Update();
	}
}

new As2();

/**
 * Asset Sources
 *
 * https://opengameart.org/content/lpc-flames
 * 
 * 
 * 
 */

