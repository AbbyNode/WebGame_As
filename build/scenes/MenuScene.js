import { Scene } from "./Scene.js";
import { Button } from "../objects/ui/Button.js";
export class MenuScene extends Scene {
    constructor(stage) {
        super(stage);
        // const background = new createjs.Bitmap(Global.assetManager.getResult(AssetName.Image_Background));
        // background.scaleX = 4.48;
        // background.scaleY = 4.48;
        // this.stage.addChild(background);
        // this._objects.push(background);
        const buttonStart = new Button("Start", (event) => {
            // Global.levelManager.start();
        });
        buttonStart.transform.position = { x: 1500, y: 750 };
        buttonStart.init(stage);
        this._objects.push(buttonStart);
    }
    init() {
        // Disabled by parent on destroy
        this.stage.enableMouseOver(20);
    }
    update() {
        // console.log("menu update");
    }
    destroy() {
        super.destroy();
    }
}
// https://createjs.com/tutorials/Mouse%20Interaction/
//# sourceMappingURL=MenuScene.js.map