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
import { LivesManager } from "../managers/LivesManager.js";
import { ColliderTag } from "../managers/ColliderTag.js";
import { SceneName } from "../managers/SceneManager.js";
import { UIBackground } from "../../objects/ui/UIBackground.js";
import { HurtOverlay } from "../../objects/ui/HurtOverlay.js";

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

	private _musicInstance?: createjs.AbstractSoundInstance;
	
	private _player: Player;
	private _playerController: PlayerController;
	private _playerScreenPos: Point2D;

	private _livesManager: LivesManager;

	private _hurtOverlay: HurtOverlay;
	
	// private _goopManager: GoopManager;

	constructor(stage: createjs.Stage) {
		super(stage);
		
		const backgroundImg = Global.assetManager.getResult(AssetName.Image_Background);
		this._background = new ScrollingBackground(backgroundImg, 0.5);
		this.stage.addChild(this._background.container);

		const levelObjects = LevelGenerator.GenerateLevel(this.stage, 20);
		this._scrollingLevel = new ScrollingLevel(levelObjects, this._background, 5);

		this._playerScreenPos = {x: 200, y: 100};

		this._player = new Player();
		this._player.transform.position = this._playerScreenPos;
		this._player.init(this.stage);

		this._playerController = new PlayerController(this._player, this._scrollingLevel);

		this._livesManager = new LivesManager(3, () => {
			// this._playerController.destroy();
			this._player.die();
			this._playerController.destroy();
			setTimeout(() => {
				Global.sceneManager.setScene(SceneName.Lose);
			}, 1000);
		});
		this._livesManager.container.x = 40;
		this.stage.addChild(this._livesManager.container);

		this._hurtOverlay = new HurtOverlay();
		this.stage.addChild(this._hurtOverlay.shape);

		Global.score = 0;
		Global.scoreLabel.transform.position = {x: 640, y: 20};
		this.stage.addChild(Global.scoreLabel.container);
	}

	public init(): void {
		this._scrollingLevel.init();
		this._playerController.initWASD();

		this._player.eventManager.addListener(EventName.Collider_TriggerEnter, (collider) => {
			// Player collide with enemy
			if (collider.tag == ColliderTag.Enemy) {
				this._loseLife();
				this._hurtOverlay.show();
				createjs.Sound.play(AssetName.Sound_SlimeDie);
				if (collider.gameObject instanceof GameObject) {
					collider.gameObject.destroy();
				}
			}
			
			// Player collide with pickup
			if (collider.tag == ColliderTag.Pickup) {
				Global.score += 5;
				createjs.Sound.play(AssetName.Sound_Pickup);
				if (collider.gameObject instanceof GameObject) {
					collider.gameObject.destroy();
				}
			}
		});
		
		this._musicInstance = createjs.Sound.play(AssetName.Sound_BackgroundMusic, {
			loop: -1
		});
		this._musicInstance.volume = 0.2;
	}

	public update(): void {
		// this.background.scroll(1);
		this._player.update();
		this._scrollingLevel.update();
	}

	public destroy(): void {
		super.destroy();

		this._musicInstance?.stop();
		
		this.stage.removeChild(this._background.container);

		this._player.destroy();
		this._playerController.destroy();
		this._scrollingLevel.destroy();

		this.stage.removeChild(this._livesManager.container);

		this.stage.removeChild(this._hurtOverlay.shape);
	}

	private _loseLife(): void {
		this._livesManager.loseLife();
	}
}