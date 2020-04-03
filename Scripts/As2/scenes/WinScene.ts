import { Scene } from "./Scene.js";
import { Label } from "../../objects/ui/Label.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { UIBackground } from "../../objects/ui/UIBackground.js";
import { Button } from "../../objects/ui/Button.js";
import { SceneName } from "../managers/SceneManager.js";

export class WinScene extends Scene {
	constructor(stage: createjs.Stage) {
		super(stage);

		// const background = new createjs.Bitmap(Global.assetManager.getResult(AssetName.Image_Background));
		// background.scaleX = 4.48;
		// background.scaleY = 4.48;
		// this.stage.addChild(background);
		// this._objects.push(background);

		const xOffset = 645;

		const uiBackground = new UIBackground({ width: 572, height: 796 }, "#55ff77");
		uiBackground.transform.position = { x: xOffset, y: 50 };
		uiBackground.init(this.stage);
		this._objects.push(uiBackground);

		const label = new Label("You won!", true);
		label.transform.position = { x: xOffset + 286, y: 300 };
		label.init(this.stage);
		this._objects.push(label);

		const button = new Button("Back to Menu", event => {
			Global.sceneManager.setScene(SceneName.Menu);
		}, { width: 240, height: 60 });
		button.transform.position = { x: xOffset + 170, y: 500 };
		button.init(stage);
		this._objects.push(button);
	}

	public init(): void {
		// Disabled by parent on destroy
		this.stage.enableMouseOver(20);
	}

	public update(): void {
		// console.log("menu update");
	}
}
