import { Scene } from "./Scene.js";
import { Button } from "../../objects/ui/Button.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { SceneName } from "../managers/SceneManager.js";
import { ScrollingBackground } from "../objects/ScrollingBackground.js";
import { Label } from "../../objects/ui/Label.js";
import { UIBackground } from "../../objects/ui/UIBackground.js";
/**
 * The main menu and landing page for the game.
 *
 * @export
 * @class MenuScene
 * @extends {Scene}
 */
export class MenuScene extends Scene {
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
        const uibackground = new UIBackground({ width: 400, height: 400 }, "#88aaff");
        uibackground.transform.position = { x: 200, y: 100 };
        uibackground.init(this.stage);
        // Game Title
        const title = new Label("Squishy Slime", true);
        title.transform.position = { x: 400, y: 180 };
        title.init(this.stage);
        // Author
        const subtitle = new Label("By Abby Shah", true);
        subtitle.transform.position = { x: 400, y: 230 };
        subtitle.init(this.stage);
        // Start button
        const buttonStart = new Button("Play", (event) => {
            Global.sceneManager.setScene(SceneName.Game);
        }, { width: 230, height: 50 });
        buttonStart.transform.position = { x: 285, y: 280 };
        buttonStart.init(stage);
        this._objects.push(buttonStart);
        // Instructions button
        const buttonInstructions = new Button("Instructions", (event) => {
            Global.sceneManager.setScene(SceneName.Instructions);
        }, { width: 230, height: 50 });
        buttonInstructions.transform.position = { x: 285, y: 340 };
        buttonInstructions.init(stage);
        this._objects.push(buttonInstructions);
        // Exit button
        const buttonExit = new Button("Exit", (event) => {
            if (window.history.length >= 1) {
                window.history.back();
            }
            else {
                window.close();
            }
        }, { width: 230, height: 50 });
        buttonExit.transform.position = { x: 285, y: 400 };
        buttonExit.init(stage);
        this._objects.push(buttonExit);
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
//# sourceMappingURL=MenuScene.js.map