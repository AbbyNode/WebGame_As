import { Scene } from "./Scene.js";
import { Global } from "../managers/Global.js";
import { ScrollingBackground } from "../objects/ScrollingBackground.js";
import { AssetName } from "../managers/AssetManager.js";
import { Player } from "../objects/Player.js";
import { PlayerController } from "../controllers/PlayerController.js";
import { Enemy } from "../objects/Enemy.js";

export class GameScene extends Scene {
	private background: ScrollingBackground;
	protected _player: Player;
	private _playerController: PlayerController;

	constructor(stage: createjs.Stage) {
		super(stage);
		
		const backgroundImg = Global.assetManager.getResult(AssetName.Image_Background);
		this.background = new ScrollingBackground(backgroundImg, 4);
		this.stage.addChild(this.background.container);

		this._player = new Player();
		this._player.transform.position = {x: 200, y: 400};
		this._player.init(this.stage);

		this._playerController = new PlayerController(this._player);

		const enemy = new Enemy();
		enemy.transform.position = {x: 400, y: 400};
		enemy.init(this.stage);
	}

	public init(): void {
		this._playerController.initWASD();
	}

	public update(): void {
		// this.background.scroll(1);
		this._player.update();
	}

	public destroy(): void {
		super.destroy();
		
		this._playerController.destroy();
	}
}