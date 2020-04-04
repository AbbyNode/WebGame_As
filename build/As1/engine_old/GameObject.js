import { Old_Vector2 } from "./Vector2.js";
export class Old_GameObject extends createjs.Bitmap {
    // CONSTRUCTOR
    /**
     * Creates an instance of GameObject.
     * @param {string} [imagePath="./Assets/images/default.png"]
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @param {boolean} [isCentered=false]
     * @memberof GameObject
     */
    constructor(imagePath = "./Assets/images/default.png", x = 0, y = 0, isCentered = false) {
        super(imagePath);
        // MEMBER VARIABLES
        this._width = 0;
        this._height = 0;
        this._halfWidth = 0;
        this._halfHeight = 0;
        this._isColliding = false;
        this._position = new Old_Vector2(0, 0);
        this._isCentered = false;
        this.image.addEventListener("load", () => {
            this.position = new Old_Vector2(x, y);
            this.width = this.getBounds().width;
            this.height = this.getBounds().height;
            this.isCentered = isCentered;
        });
    }
    // PROPERTIES
    get width() {
        return this._width;
    }
    set width(width) {
        this._width = width;
        this._halfWidth = width / 2;
    }
    get height() {
        return this._height;
    }
    set height(height) {
        this._height = height;
        this._halfHeight = height / 2;
    }
    get halfWidth() {
        return this._halfWidth;
    }
    get halfHeight() {
        return this._halfHeight;
    }
    get isColliding() {
        return this._isColliding;
    }
    set isColliding(isColliding) {
        this._isColliding = isColliding;
    }
    get position() {
        return this._position;
    }
    set position(position) {
        this._position = position;
        this.x = position.x;
        this.y = position.y;
    }
    get isCentered() {
        return this._isCentered;
    }
    set isCentered(isCentered) {
        this._isCentered = isCentered;
        if (isCentered) {
            this.regX = this._halfWidth;
            this.regY = this._halfHeight;
        }
        else {
            this.regX = 0;
            this.regY = 0;
        }
    }
}
//# sourceMappingURL=GameObject.js.map