import { Scene } from "./Scene.js";
import { Global } from "../managers/Global.js";
import { ScrollingBackground } from "../objects/ScrollingBackground.js";
import { AssetName } from "../managers/AssetManager.js";

export class GameScene extends Scene {
	private background: ScrollingBackground;

	constructor(stage: createjs.Stage) {
		super(stage);
		
		const backgroundImg = Global.assetManager.getResult(AssetName.Image_Background);
		this.background = new ScrollingBackground(backgroundImg, 4);
		this.stage.addChild(this.background.container);
	}

	public init(): void {

	}

	public update(): void {
		// this.background.scroll(1);
	}
}