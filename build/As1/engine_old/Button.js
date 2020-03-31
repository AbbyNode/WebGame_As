import { GameObject } from "./GameObject.js";
export class Button extends GameObject {
    constructor(imgPath = "./Assets/images/default.png", x = 0, y = 0, isCentered = false) {
        super(imgPath, x, y, isCentered);
        this.on("mouseover", this.mouseover);
        this.on("mouseout", this.mouseout);
    }
    // method
    mouseover() {
        this.alpha = 0.1;
    }
    mouseout() {
        this.alpha = 1;
    }
    // PROTECTED METHODS
    _checkBounds() {
        // throw new Error("Method not implemented.");
    }
    // PUBLIC METHODS
    start() {
        // throw new Error("Method not implemented.");
    }
    update() {
        // throw new Error("Method not implemented.");
    }
    reset() {
        // throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=Button.js.map