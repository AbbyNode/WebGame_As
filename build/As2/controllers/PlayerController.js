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
        this._keyboardInput.addKey("d", {
            down: () => {
                this._scrollingLevel.isScrolling = true;
                this._player.isMoving = true;
            },
            up: () => {
                this._scrollingLevel.isScrolling = false;
                this._player.isMoving = false;
            }
        });
        this._keyboardInput.addKey("w", {
            down: () => {
                this._player.jump();
            },
            up: () => {
                this._player.stopJump();
            }
        });
        this._keyboardInput.addKey("s", {
            down: () => {
            },
            up: () => {
            }
        });
    }
    destroy() {
        this._keyboardInput.destroy();
    }
}
//# sourceMappingURL=PlayerController.js.map