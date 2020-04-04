import { Player } from "../objects/Player.js";
import { KeyboardInput, KeyMap } from "./KeyboardInput.js";
import { ScrollingLevel } from "../objects/ScrollingLevel.js";
import { SpriteRenderer } from "../../engine/components/SpriteRenderer.js";
import { EventName } from "../../engine/components/EventName.js";

export class PlayerController {
	private _player: Player;
	private _scrollingLevel: ScrollingLevel;

	private _keyboardInput: KeyboardInput;

	constructor(player: Player, scrollingLevel: ScrollingLevel) {
		this._player = player;
		this._scrollingLevel = scrollingLevel;

		this._keyboardInput = new KeyboardInput();
	}

	public initWASD(): void {
		// this._keyboardInput.addKey("a", {
		// 	down: (): void => {
		// 	},
		// 	up: (): void => {
		// 	}
		// });
		this._keyboardInput.addKey("d", {
			down: (): void => {
				this._scrollingLevel.isScrolling = true;
				this._player.isMoving = true;
			},
			up: (): void => {
				this._scrollingLevel.isScrolling = false;
				this._player.isMoving = false;
			}
		});
		
		this._keyboardInput.addKey("w", {
			down: (): void => {
				this._player.jump();
			},
			up: (): void => {
				this._player.stopJump();
			}
		});
		
		this._keyboardInput.addKey("s", {
			down: (): void => {
			},
			up: (): void => {

			}
		});
	}

	public destroy(): void {
		this._keyboardInput.destroy();
	}
}