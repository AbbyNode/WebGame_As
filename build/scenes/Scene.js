import { GameObject } from "../engine/gameobject/GameObject.js";
export class Scene {
    constructor(stage) {
        this.stage = stage;
        this._objects = [];
    }
    destroy() {
        this._objects.forEach(object => {
            if (object instanceof GameObject) {
                object.destroy();
            }
            else if (object instanceof createjs.DisplayObject) {
                this.stage.removeChild(object);
            }
        });
        this.stage.enableMouseOver(0);
    }
}
//# sourceMappingURL=Scene.js.map