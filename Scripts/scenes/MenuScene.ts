import { Scene } from "./Scene.js";
import { Button } from "../objects/ui/Button.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";

export class MenuScene extends Scene {
	constructor(stage: createjs.Stage) {
		super(stage);

		const background = new createjs.Bitmap(Global.assetManager.getResult(AssetName.Image_Background));
		background.scaleX = 4.48;
		background.scaleY = 4.48;
		this.stage.addChild(background);
		this._objects.push(background);

		const buttonStart = new Button("Start", (event) => {
			Global.levelManager.start();
		});
		buttonStart.transform.position = {x: 1500, y: 750};
		buttonStart.init(stage);
		this._objects.push(buttonStart);
		
		const buttonMusic = new Button("Music", (event) => {
			Global.musicManager.togglePause();
		});
		buttonMusic.transform.position = {x: 1500, y: 200};
		buttonMusic.init(stage);
		this._objects.push(buttonMusic);
	}

	public init(): void {
		// Disabled by parent on destroy
		this.stage.enableMouseOver(20);

		Global.musicManager.setMusic(AssetName.Sound_MusicMenu);
		Global.musicManager.play();
	}

	public update(): void {
		// console.log("menu update");
	}

	public destroy(): void {
		super.destroy();
	}
}

// https://createjs.com/tutorials/Mouse%20Interaction/
