import { Global } from "./Global.js";
import { AssetName } from "./AssetManager.js";
import { FunctionEmpty } from "../../engine/interfaces/CommonTypes.js";

export class LivesManager {
	private _numLives: number = 0;
	private _sprites: createjs.Sprite[];
	private _container: createjs.Container;

	private _spacing: number = 64;

	private _deadCallback: FunctionEmpty;

	//#region props

	public get container(): createjs.Container {
		return this._container;
	}
	public set container(v: createjs.Container) {
		this._container = v;
	}

	//#endregion

	constructor(lives: number, deadCallback: FunctionEmpty) {
		this._numLives = lives;
		this._sprites = [];
		this._container = new createjs.Container();
		this._deadCallback = deadCallback;

		// Generate sprite for lives
		const lifeSpriteData = {
			images: [Global.assetManager.getResult(AssetName.Image_SlimeSpriteSheet)],
			frames: { width: 128, height: 128, regX: 64, regY: 64 },
			animations: {
				idle: 40,
				die: [40, 48, "dead", 0.2],
				dead: 49,
			},
		};
		const lifeSpriteSheet = new createjs.SpriteSheet(lifeSpriteData);

		// Add sprites to array
		for (let index = 0; index < lives; index++) {
			const sprite = new createjs.Sprite(lifeSpriteSheet);

			sprite.scaleX = -0.8;
			sprite.scaleY = 0.8;

			sprite.x = index * this._spacing;

			sprite.gotoAndPlay("idle");

			this._sprites.push(sprite);
			this._container.addChild(sprite);
		}
	}

	public loseLife(): void {
		const sprite = this._sprites.pop();
		sprite?.gotoAndPlay("die");
		
		this._numLives--;
		if (this._numLives <= 0) {
			this._deadCallback();
		}
	}
}
