import { Game } from "./Game.js";
import { Reel } from "./As1/Reel.js";
import { Button } from "./engine_old/Button.js";
import { LabelNumber } from "./engine_old/LabelNumber.js";

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
export class As1 extends Game {
	//#region private vars

	private _reels: Reel[];
	private _moneyLabel: LabelNumber;
	private _jackpotLabel: LabelNumber;

	private _betInput: HTMLInputElement;
	private _spinButton: Button;

	private _restartButton: Button;
	private _quitButton: Button;

	private _spinningReelCount: number;

	private _usedBetAmt: number;

	//#endregion

	//#region initialization

	constructor() {
		super();

		this._reels = this._createReels(5);

		this._moneyLabel = new LabelNumber(100, "12pt", "Consolas",
			"#ffd800", 185, 413, false);
		this._jackpotLabel = new LabelNumber(666, "12pt", "Consolas",
			"#ffd800", 659, 413, false);

		this._betInput = document.getElementById("playerBet") as HTMLInputElement;

		this._spinButton = new Button("./Assets/As1/images/Spin1.png", 452, 401, false);
		this._restartButton = new Button("./Assets/As1/images/Reset1.png", 10, 366, false);
		this._quitButton = new Button("./Assets/As1/images/Quit1.png", 10, 403, false);

		this._spinningReelCount = 0;
		this._usedBetAmt = 0;

		this._initStage();
		this._initButtons();
		this._initSounds();

		this._betInput.value = "10";
	}

	private _initStage(): void {
		const background = new createjs.Bitmap("./Assets/As1/images/SlotMachine1_5.png");
		this._stage.addChild(background);

		this._stage.addChild(this._moneyLabel);
		this._stage.addChild(this._jackpotLabel);

		this._stage.addChild(this._spinButton);

		this._stage.addChild(this._restartButton);
		this._stage.addChild(this._quitButton);

		this._stage.enableMouseOver(20);
	}

	private _initButtons(): void {
		this._spinButton.addEventListener("click", () => {
			this._trySpin();
		});

		this._restartButton.addEventListener("click", () => {
			this._restart();
		});

		this._quitButton.addEventListener("click", () => {
			if (confirm("Are you sure you want to quit the game?")) {
				document.location.href = "../index.html";
			}
		});
	}

	private _initSounds(): void {
		createjs.Sound.registerSound("./Assets/As1/sounds/spin.ogg", "spin");
		createjs.Sound.registerSound("./Assets/As1/sounds/win.ogg", "win");
		createjs.Sound.registerSound("./Assets/As1/sounds/lose.ogg", "lose");
	}

	private _createReels(numReels: number): Reel[] {
		const xOffset = 104;
		const spacing = 128 + 20;

		const reels = [];

		for (let i = 0; i <= numReels - 1; i++) {
			const reel = new Reel();

			reel.x = xOffset + (spacing * i);

			reel.spinCompleteCallback = (): void => {
				// Track when reels stop spinning, then check for win
				if (this._spinningReelCount >= 1) {
					this._spinningReelCount--;
					if (this._spinningReelCount <= 0) {
						this._checkWinConditions();
					}
				}
			};

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
	private _restart(msg = "Are you sure you want to restart?"): void {
		if (confirm(msg)) {
			this._moneyLabel.value = 100;
			this._betInput.value = "10";

			this._spinningReelCount = 0;
			this._usedBetAmt = 0;

			this._reels.forEach(reel => {
				reel.reset();
			});
		}
	}

	//#endregion

	/**
	 * Handle spin button click.
	 *
	 * @private
	 * @returns
	 * @memberof As1
	 */
	private _trySpin(): void {
		const money = this._moneyLabel.value;
		this._usedBetAmt = Number(this._betInput.value);

		// Check if reels are still rolling
		let canRoll = true;
		this._reels.forEach(reel => {
			if (!reel.canRoll) {
				canRoll = false;
			}
		});
		if (!canRoll) {
			console.log("Still rolling");
			return;
		}

		// Check if out of money
		if (money <= 0) {
			this._restart("You have no money left. Restart?");
			return;
		}

		// Check if bet is valid
		if (this._usedBetAmt == Number.NaN) {
			alert("Bet is invalid");
			return;
		}

		// Check if bet is <= 0
		if (this._usedBetAmt <= 0) {
			alert("You must bet more than $0");
			return;
		}

		// Check if bet is too high
		if (this._usedBetAmt > money) {
			alert(`Not enough money to bet $${this._usedBetAmt}`);
			return;
		}

		// All conditions passed - spin the reels
		this._spin();
	}

	/**
	 * Spin the reels
	 *
	 * @private
	 * @memberof As1
	 */
	private _spin(): void {
		this._moneyLabel.value -= this._usedBetAmt;

		// Play spin sound
		createjs.Sound.play("spin");

		this._reels.forEach(reel => {
			reel.rollToRandom();
			this._spinningReelCount++;
		});
	}

	private _checkWinConditions(): void {
		// Count how many of each item

		const symbolCount: number[] = [];

		this._reels.forEach(reel => {
			if (symbolCount[reel.selectedSlotIndex] == undefined) {
				symbolCount[reel.selectedSlotIndex] = 0;
			}
			symbolCount[reel.selectedSlotIndex]++;
		});

		// console.log(symbolCount);

		// Calculate winnings

		let winnings = 0;

		symbolCount.some(amt => {
			switch (amt) {
				case 5:
					alert(`You won the jackpot of $${this._jackpotLabel.value}!`);
					winnings = this._jackpotLabel.value;
					this._jackpotLabel.value = 0;
					return;
				case 4:
					winnings = this._usedBetAmt * 2;
					return;
				case 3:
					winnings = this._usedBetAmt * 1.5;
					return;
			}
		});

		// Play sounds based on winnings
		if (winnings > this._usedBetAmt) {
			createjs.Sound.play("win");
		} else {
			createjs.Sound.play("lose");
		}

		if (winnings == 0) {
			// also add to jackpot
			this._jackpotLabel.value += this._usedBetAmt / 2;
		}

		// Add winnings to money
		this._moneyLabel.value += winnings;

		// If money is at 0
		if (this._moneyLabel.value <= 0) {
			this._restart("You've lost all your money. Restart?");
		}
	}

	public Update(): void {
		super.Update();
		this._reels.forEach(reel => { reel.update(); });
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
 *
 * Sounds:
 * https://freesound.org/people/pierrecartoons1979/sounds/118237/
 * https://freesound.org/people/Mativve/sounds/391539/
 * https://freesound.org/people/cabled_mess/sounds/350988/
 */

