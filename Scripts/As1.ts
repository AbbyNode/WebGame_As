import { Game } from "./Game.js";
import { Reel } from "./As1/Reel.js";

/**
 * Author: Abby Shah
 * Creation Date: 2020, Feb 11
 * Description: A slot machine game
 * 
 * Revision History:
 * 
 * v0.2:
 * 
 * 
 * v0.1:
 * Created Reels
 * 
 * 
 * @export
 * @class As1
 * @extends {Game}
 */
export class As1 extends Game {
	constructor() {
		super();


	}

	public Update() {
		super.Update();

		let background = new createjs.Bitmap("../Assets/As1/SlotMachine1_5.png");
		this._stage.addChild(background);

		let reel1 = new Reel();
		reel1.x = 100;
		this._stage.addChild(reel1);
	}
}

new As1();

/**
 * Asset Sources
 * 
 * Layout/Background:
 * http://img2.wikia.nocookie.net/__cb20130430031220/capx/images/thumb/5/5c/Slot_machine_with_key.png/500px-Slot_machine_with_key.png
 * https://assetstorev1-prd-cdn.unity3d.com/package-screenshot/e76a84bf-73fc-497c-9c93-89e7018ac063_scaled.jpg
 * 
 * Slot Images:
 * https://starbounder.org/Pets
 */