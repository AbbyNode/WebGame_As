import { KeyboardInput } from "./KeyboardInput.js";
/**
 * Player Controller translates keyboard input into player movement and actions.
 *
 * @export
 * @class PlayerController
 */
export class PlayerController {
    constructor(player, scrollingLevel) {
        this._player = player;
        this._scrollingLevel = scrollingLevel;
        this._keyboardInput = new KeyboardInput();
    }
    initWASD() {
        // this._keyboardInput.addKey("a", {
        // 	down: (): void => {
        // 	},
        // 	up: (): void => {
        // 	}
        // });
        this._keyboardInput.addKey("d" /* D */, {
            down: () => {
                this._scrollingLevel.isScrolling = true;
                this._player.isMoving = true;
            },
            up: () => {
                this._scrollingLevel.isScrolling = false;
                this._player.isMoving = false;
            }
        });
        this._keyboardInput.addKey("w" /* W */, {
            down: () => {
                this._player.jump();
            },
            up: () => {
                this._player.stopJump();
            }
        });
        this._keyboardInput.addKey(" " /* Space */, {
            down: () => {
                this._player.shoot();
            },
            up: () => {
                // this._player.stopShoot();
            }
        });
        // this._keyboardInput.addKey(Keys.S, {
        // 	down: (): void => {
        // 	},
        // 	up: (): void => {
        // 	}
        // });
    }
    destroy() {
        this._keyboardInput.destroy();
    }
}
//# sourceMappingURL=PlayerController.js.map