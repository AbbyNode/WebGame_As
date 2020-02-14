import { Game } from "./Game.js";
import { Reel } from "./As1/Reel.js";
import { Button } from "./objects/Button.js";
import { LabelNumber } from "./objects/LabelNumber.js";
/**
 * Author: Abby Shah
 * Creation Date: 2020, Feb 11
 * Description: A slot machine game
 *
 * Revision History:
 *
 * v0.2:
 * Created function to make multiple reels
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
        this._moneyLabel = new LabelNumber(100, "12pt", "Consolas", "#ffd800", 185, 413, false);
        this._jackpotLabel = new LabelNumber(666, "12pt", "Consolas", "#ffd800", 659, 413, false);
        this._betInput = document.getElementById("playerBet");
        this._spinButton = new Button("../Assets/As1/Spin1.png", 452, 401, false);
        this._restartButton = new Button("../Assets/As1/Reset1.png", 10, 366, false);
        this._quitButton = new Button("../Assets/As1/Quit1.png", 10, 403, false);
        this._initStage();
        this._initButtons();
        // this._reels = this._createReels(1);
        this._reels = this._createReels(5);
        this._betInput.value = "10";
    }
    _initStage() {
        let background = new createjs.Bitmap("../Assets/As1/SlotMachine1_5.png");
        this._stage.addChild(background);
        this._stage.addChild(this._moneyLabel);
        this._stage.addChild(this._jackpotLabel);
        this._stage.addChild(this._spinButton);
        this._stage.addChild(this._restartButton);
        this._stage.addChild(this._quitButton);
        this._stage.enableMouseOver(20);
    }
    _initButtons() {
        this._spinButton.addEventListener("click", e => {
            this._trySpin();
        });
        this._restartButton.addEventListener("click", e => {
            this._restart();
        });
        this._quitButton.addEventListener("click", e => {
            if (confirm("Are you sure you want to quit the game?")) {
                document.location.href = "../index.html";
            }
        });
    }
    /**
     * Handle spin button click.
     *
     * @private
     * @returns
     * @memberof As1
     */
    _trySpin() {
        let money = this._moneyLabel.value;
        let bet = Number(this._betInput.value);
        // Check if reels are still rolling
        let canRoll = true;
        this._reels.forEach(reel => {
            if (!reel.canRoll) {
                canRoll = false;
            }
        });
        if (!canRoll) {
            return;
        }
        // Check if out of money
        if (money <= 0) {
            this._restart("You have no money left. Restart?");
            return;
        }
        // Check if bet is valid
        if (bet == Number.NaN) {
            alert("Bet is invalid");
            return;
        }
        // Check if bet is <= 0
        if (bet <= 0) {
            alert("You must bet more than $0");
            return;
        }
        // Check if bet is too high
        if (bet > money) {
            alert(`Not enough money to bet $${bet}`);
            return;
        }
        // All conditions passed - spin the reels
        this._spin(bet);
    }
    /**
     * Spin the reels
     *
     * @private
     * @param {number} bet
     * @memberof As1
     */
    _spin(bet) {
        this._moneyLabel.value -= bet;
        this._reels.forEach(reel => {
            reel.rollToRandom();
        });
        // win
        // Add bet to money
        // this._winJackpot();
        // lose
        // Add 50% to jackpot
        if (this._moneyLabel.value == 0) {
            this._restart("You've lost all your money. Restart?");
        }
    }
    _winJackpot() {
        alert(`You won the jackpot of $${this._jackpotLabel.value}!`);
        this._moneyLabel.value += this._jackpotLabel.value;
        this._jackpotLabel.value = 0;
    }
    _createReels(numReels) {
        let xOffset = 104;
        let spacing = 128 + 20;
        let reels = [];
        for (let i = 0; i <= numReels - 1; i++) {
            let reel = new Reel();
            reel.x = xOffset + (spacing * i);
            this._stage.addChild(reel);
            reels.push(reel);
        }
        return reels;
    }
    /**
     * Reset game with initial values
     *
     * @private
     * @memberof As1
     */
    _restart(msg = "Are you sure you want to restart?") {
        if (confirm(msg)) {
            this._moneyLabel.value = 100;
            this._betInput.value = "10";
            this._reels.forEach(reel => {
                reel.reset();
            });
        }
    }
    Update() {
        super.Update();
        this._reels.forEach(reel => { reel.Update(); });
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
//# sourceMappingURL=As1.js.map