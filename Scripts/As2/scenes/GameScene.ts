import { Scene } from "./Scene.js";
import { Global } from "../managers/Global.js";
import { ScrollingBackground } from "../objects/ScrollingBackground.js";
import { AssetName } from "../managers/AssetManager.js";
import { Player } from "../objects/Player.js";
import { PlayerController } from "../controllers/PlayerController.js";
import { Enemy } from "../objects/Enemy.js";
import { EventName } from "../../engine/components/EventName.js";
import { Point2D } from "../../engine/interfaces/Point2D.js";
import { ScrollingLevel } from "../objects/ScrollingLevel.js";
import { GameObject } from "../../engine/gameobject/GameObject.js";
import { Platform } from "../objects/Platform.js";
import { Portal } from "../objects/Portal.js";
import { LevelGenerator } from "../managers/LevelGenerator.js";
import { GoopManager } from "../managers/GoopManager.js";

/**
 * The main game scene where all the game logic takes place.
 *
 * @export
 * @class GameScene
 * @extends {Scene}
 */
export class GameScene extends Scene {
	private _background: ScrollingBackground;
	private _scrollingLevel: ScrollingLevel;
	
	private _player: Player;
	private _playerController: PlayerController;
	private _playerScreenPos: Point2D;
	
	// private _goopManager: GoopManager;

	constructor(stage: createjs.Stage) {
		super(stage);
		
		const backgroundImg = Global.assetManager.getResult(AssetName.Image_Background);
		this._background = new ScrollingBackground(backgroundImg, 0.5);
		this.stage.addChild(this._background.container);

		const levelObjects = LevelGenerator.GenerateLevel(this.stage);

		this._scrollingLevel = new ScrollingLevel(levelObjects, this._background, 5);

		this._playerScreenPos = {x: 200, y: 100};

		this._player = new Player();
		this._player.transform.position = this._playerScreenPos;
		this._player.init(this.stage);

		this._playerController = new PlayerController(this._player, this._scrollingLevel);

		
	}

	public init(): void {
		this._scrollingLevel.init();
		this._playerController.initWASD();

		this._player.eventManager.addListener(EventName.Collider_CollidedTick, (collider) => {
			console.log("ow", collider);
		});
	}

	public update(): void {
		// this.background.scroll(1);
		this._player.update();
		this._scrollingLevel.update();
	}

	public destroy(): void {
		super.destroy();
		
		this.stage.removeChild(this._background.container);

		this._player.destroy();
		this._playerController.destroy();
		this._scrollingLevel.destroy();
	}
}