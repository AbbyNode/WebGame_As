import { KeyboardInput } from "./KeyboardInput.js";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
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
                var _a;
                this._scrollingLevel.isScrolling = true;
                (_a = this._player.getComponent(SpriteRenderer)) === null || _a === void 0 ? void 0 : _a.sprite.gotoAndPlay("walk");
            },
            up: () => {
                var _a;
                this._scrollingLevel.isScrolling = false;
                (_a = this._player.getComponent(SpriteRenderer)) === null || _a === void 0 ? void 0 : _a.sprite.gotoAndPlay("idle");
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