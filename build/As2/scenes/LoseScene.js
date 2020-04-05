import { Scene } from "./Scene.js";
import { Button } from "../../objects/ui/Button.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { SceneName } from "../managers/SceneManager.js";
import { ScrollingBackground } from "../objects/ScrollingBackground.js";
import { Label } from "../../objects/ui/Label.js";
import { UIBackground } from "../../objects/ui/UIBackground.js";
/**
 * Lose Scene
 *
 * @export
 * @class MenuScene
 * @extends {Scene}
 */
export class LoseScene extends Scene {
    constructor(stage) {
        super(stage);
        // const background = new createjs.Bitmap(Global.assetManager.getResult(AssetName.Image_Background));
        // background.scaleX = 4.48;
        // background.scaleY = 4.48;
        // this.stage.addChild(background);
        // this._objects.push(background);
        // Scrolling image in background
        const backgroundImg = Global.assetManager.getResult(AssetName.Image_Background);
        this._background = new ScrollingBackground(backgroundImg, 4);
        this.stage.addChild(this._background.container);
        // Translucent color to make text more readable
        const uibackground = new UIBackground({ width: 400, height: 400 }, "#ff8888");
        uibackground.transform.position = { x: 200, y: 100 };
        uibackground.init(this.stage);
        const title = new Label("You died", true);
        title.transform.position = { x: 400, y: 180 };
        title.init(this.stage);
        // Retry button
        const buttonRetry = new Button("Try again?", (event) => {
            Global.sceneManager.setScene(SceneName.Game);
        }, { width: 230, height: 50 });
        buttonRetry.transform.position = { x: 285, y: 280 };
        buttonRetry.init(stage);
        this._objects.push(buttonRetry);
        // Menu button
        const buttonMenu = new Button("Menu", (event) => {
            Global.sceneManager.setScene(SceneName.Menu);
        }, { width: 230, height: 50 });
        buttonMenu.transform.position = { x: 285, y: 340 };
        buttonMenu.init(stage);
        this._objects.push(buttonMenu);
    }
    init() {
        // Disabled by parent on destroy
        this.stage.enableMouseOver(20);
    }
    update() {
        // console.log("menu update");
        this._background.scroll(1);
    }
    destroy() {
        super.destroy();
        this.stage.removeChild(this._background.container);
    }
}
// https://createjs.com/tutorials/Mouse%20Interaction/
//# sourceMappingURL=LoseScene.js.map