import { Scene } from "./Scene.js";
import { Global } from "../managers/Global.js";
import { ScrollingBackground } from "../objects/ScrollingBackground.js";
import { AssetName } from "../managers/AssetManager.js";
export class GameScene extends Scene {
    constructor(stage) {
        super(stage);
        const backgroundImg = Global.assetManager.getResult(AssetName.Image_Background);
        this.background = new ScrollingBackground(backgroundImg, 4);
        this.stage.addChild(this.background.container);
    }
    init() {
    }
    update() {
        // this.background.scroll(1);
    }
}
//# sourceMappingURL=GameScene.js.map