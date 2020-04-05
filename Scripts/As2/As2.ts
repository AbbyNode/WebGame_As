import { Game } from "../Game.js";
import { Global } from "./managers/Global.js";
import { SceneName } from "./managers/SceneManager.js";

/**
 * Author: Abby Shah
 * Creation Date: 2020, March
 * Description: 2D Scrolling Game
 * 
 * Last Modified Date: 2020, April
 * Last Modified By: Abby Shah
 * 
 * 
 * Revision History:
 * (See GitHub for detailed commit history)
 * 
 * v0.7:
 * Added health
 * 
 * v0.6:
 * Added win/lose conditions
 * 
 * v0.5:
 * Added pickups
 * 
 * v0.4:
 * Added enemies
 * 
 * v0.3:
 * Added scrolling background
 * Added scrolling levels
 * 
 * v0.2:
 * Added player
 * 
 * v0.1:
 * Added menus
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
		// Global.sceneManager.setScene(SceneName.Win);
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
 * Art
 * 
 * https://opengameart.org/content/lpc-flames
 * 
 * https://cdnb.artstation.com/p/assets/images/images/012/725/235/large/kailum-charter-smith-lava.jpg?1536193055
 * 
 * https://opengameart.org/content/2d-platformer-volcano-pack-11
 * 
 * https://opengameart.org/content/animated-slime
 * 
 * https://elthen.itch.io/2d-pixel-art-portal-sprites
 * 
 * https://opengameart.org/content/platform-game-sprites
 * 
 * 
 * Sound
 * 
 * https://www.fesliyanstudios.com/royalty-free-music/download/retro-forest/451
 * 
 * http://soundbible.com/1356-Flame-Arrow.html
 * 
 * http://soundbible.com/1081-Splat-And-Squirt.html
 * 
 * http://soundbible.com/1728-Spit-Splat-2.html
 * 
 * http://soundbible.com/2067-Blop.html
 * 
 */

