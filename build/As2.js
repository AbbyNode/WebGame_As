import { Game } from "./Game.js";
/**
 * Author: Abby Shah
 * Creation Date: 2020, Feb 11
 * Description: A slot machine game
 *
 * Revision History:
 * (See GitHub for detailed commit history)
 *
 * v0.5:
 * Added sounds
 *
 * v0.4:
 * Created win conditions
 *
 * v0.3:
 * Created buttons
 *
 * v0.2:
 * Made reels spin
 *
 * v0.1:
 * Created Reels and art
 *
 *
 * @export
 * @class As1
 * @extends {Game}
 */
export class As2 extends Game {
    //#region private vars
    //#endregion
    //#region initialization
    constructor() {
        super();
        this._initStage();
        this._initButtons();
        this._initSounds();
    }
    _initStage() {
        const background = new createjs.Bitmap("./Assets/As1/images/SlotMachine1_5.png");
        this._stage.addChild(background);
        this._stage.enableMouseOver(20);
    }
    _initButtons() {
    }
    _initSounds() {
        createjs.Sound.registerSound("./Assets/As1/sounds/spin.ogg", "spin");
        createjs.Sound.registerSound("./Assets/As1/sounds/win.ogg", "win");
        createjs.Sound.registerSound("./Assets/As1/sounds/lose.ogg", "lose");
    }
    /**
     * Reset game with initial values
     *
     * @private
     * @memberof As1
     */
    _restart(msg = "Are you sure you want to restart?") {
    }
    //#endregion
    Update() {
        super.Update();
    }
}
new As2();
/**
 * Asset Sources
 *
 *
 */
//# sourceMappingURL=As2.js.map