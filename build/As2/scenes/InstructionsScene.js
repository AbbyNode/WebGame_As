import { Scene } from "./Scene.js";
import { Button } from "../../objects/ui/Button.js";
import { Global } from "../managers/Global.js";
import { AssetName } from "../managers/AssetManager.js";
import { SceneName } from "../managers/SceneManager.js";
import { ScrollingBackground } from "../objects/ScrollingBackground.js";
import { Label } from "../../objects/ui/Label.js";
import { UIBackground } from "../../objects/ui/UIBackground.js";
/**
 * Instructions Scene
 *
 * @export
 * @class MenuScene
 * @extends {Scene}
 */
export class InstructionsScene extends Scene {
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
        const uibackground = new UIBackground({ width: 700, height: 500 }, "#88aaff");
        uibackground.transform.position = { x: 50, y: 50 };
        uibackground.init(this.stage);
        //
        const intro = new Label("You are a slime");
        intro.transform.position = { x: 340, y: 120 };
        intro.init(this.stage);
        const controlsMove = new Label("W and D to move");
        controlsMove.transform.position = { x: 340, y: 160 };
        controlsMove.init(this.stage);
        const controlsShoot = new Label("Space to shoot");
        controlsShoot.transform.position = { x: 340, y: 200 };
        controlsShoot.init(this.stage);
        //
        // Visual of player
        const slimeSpriteData = {
            images: [Global.assetManager.getResult(AssetName.Image_SlimeSpriteSheet)],
            frames: { width: 128, height: 128, regX: 64, regY: 64 },
            animations: {
                shoot: [30, 39, undefined, 0.4],
            },
        };
        const slimeSpriteSheet = new createjs.SpriteSheet(slimeSpriteData);
        const slimeSprite = new createjs.Sprite(slimeSpriteSheet);
        slimeSprite.x = 200;
        slimeSprite.y = 150;
        slimeSprite.scaleX = -1;
        slimeSprite.gotoAndPlay("shoot");
        this.stage.addChild(slimeSprite);
        //
        const objective1 = new Label("Clense fire enemies");
        objective1.transform.position = { x: 100, y: 280 };
        objective1.init(this.stage);
        //
        // Enemy visual
        const enemySpriteData = {
            images: [Global.assetManager.getResult(AssetName.Image_EnemySpriteSheet)],
            frames: { width: 64, height: 96, regX: 32, regY: 48 },
            animations: {
                idle: [0, 3, undefined, 0.1],
            }
        };
        const enemySpriteSheet = new createjs.SpriteSheet(enemySpriteData);
        const enemySprite = new createjs.Sprite(enemySpriteSheet);
        enemySprite.x = 600;
        enemySprite.y = 300;
        enemySprite.gotoAndPlay("idle");
        this.stage.addChild(enemySprite);
        //
        const objective2 = new Label("Reach the portal");
        objective2.transform.position = { x: 340, y: 360 };
        objective2.init(this.stage);
        //
        // Portal visual
        const portalSpriteData = {
            images: [Global.assetManager.getResult(AssetName.Image_PortalSpriteSheet)],
            frames: { width: 256, height: 256, regX: 128, regY: 128 },
            animations: {
                idle: [0, 7, undefined, 0.1],
            }
        };
        const portalSpriteSheet = new createjs.SpriteSheet(portalSpriteData);
        const portalSprite = new createjs.Sprite(portalSpriteSheet);
        portalSprite.scaleX = 0.5;
        portalSprite.scaleY = 0.5;
        portalSprite.x = 200;
        portalSprite.y = 360;
        portalSprite.gotoAndPlay("idle");
        this.stage.addChild(portalSprite);
        //
        // Menu button
        const buttonMenu = new Button("Menu", (event) => {
            Global.sceneManager.setScene(SceneName.Menu);
        }, { width: 230, height: 50 });
        buttonMenu.transform.position = { x: 285 - 200, y: 450 };
        buttonMenu.init(stage);
        this._objects.push(buttonMenu);
        // Start button
        const buttonStart = new Button("Play", (event) => {
            Global.sceneManager.setScene(SceneName.Game);
        }, { width: 230, height: 50 });
        buttonStart.transform.position = { x: 285 + 200, y: 450 };
        buttonStart.init(stage);
        this._objects.push(buttonStart);
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
//# sourceMappingURL=InstructionsScene.js.map