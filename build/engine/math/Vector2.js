export class Vector2 {
    //#endregion
    constructor(x, y) {
        this._x = x;
        this._y = y;
        this._magnitude = 0;
        this._sqrMagnitude = 0;
        this._recalculateMagnitude();
    }
    //#region props
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    get magnitude() {
        return this._magnitude;
    }
    get sqrMagnitude() {
        return this._sqrMagnitude;
    }
    setPos(x, y) {
        this._x = x;
        this._y = y;
        this._recalculateMagnitude();
    }
    scale(scalar) {
        const newX = this.x * scalar;
        const newY = this.y * scalar;
        this.setPos(newX, newY);
    }
    normalize() {
        const newX = this.x / this.magnitude;
        const newY = this.y / this.magnitude;
        this.setPos(newX, newY);
    }
    _recalculateMagnitude() {
        this._sqrMagnitude = (this._x * this._x) + (this._y * this._y);
        this._magnitude = Math.sqrt(this.sqrMagnitude);
    }
}
//# sourceMappingURL=Vector2.js.map