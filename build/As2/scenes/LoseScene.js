import { Scene } from "./Scene.js";
import { Label } from "../../objects/ui/Label.js";
import { UIBackground } from "../../objects/ui/UIBackground.js";
import { Button } from "../../objects/ui/Button.js";
export class LoseScene extends Scene {
    constructor(stage) {
        super(stage);
        // const background = new createjs.Bitmap(Global.assetManager.getResult(AssetName.Image_Background));
        // background.scaleX = 4.48;
        // background.scaleY = 4.48;
        // this.stage.addChild(background);
        // this._objects.push(background);
        const xOffset = 645;
        const uiBackground = new UIBackground({ width: 572, height: 796 }, "#ff5555");
        uiBackground.transform.position = { x: xOffset, y: 50 };
        uiBackground.init(this.stage);
        this._objects.push(uiBackground);
        const label = new Label("You died!", true);
        label.transform.position = { x: xOffset + 286, y: 300 };
        label.init(this.stage);
        this._objects.push(label);
        // // eslint-disable-next-line @typescript-eslint/no-unused-vars
        // const buttonTryAgain = new Button("Restart Level", event => {
        // 	// Global.levelManager.restartLevel();
        // }, { width: 240, height: 60 });
        // buttonTryAgain.transform.position = { x: xOffset + 160, y: 400 };
        // buttonTryAgain.init(stage);
        // this._objects.push(buttonTryAgain);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const buttonRestart = new Button("Start Over", event => {
            // Global.levelManager.start();
        }, { width: 240, height: 60 });
        buttonRestart.transform.position = { x: xOffset + 160, y: 500 };
        buttonRestart.init(stage);
        this._objects.push(buttonRestart);
    }
    init() {
        // Disabled by parent on destroy
        this.stage.enableMouseOver(20);
    }
    update() {
        // console.log("menu update");
    }
}
//# sourceMappingURL=LoseScene.js.map