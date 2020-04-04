export class Old_Vector2 {
    // CONSTRUCTOR
    constructor(x = 0, y = 0) {
        // PRIVATE INSTANCE
        this._x = 0;
        this._y = 0;
        this._magnitude = 0;
        this._sqrMagnitude = 0;
        this.x = x;
        this.y = y;
        this.sqrMagnitude = this.x * this.x + this.y * this.y;
        this.magnitude = Math.sqrt(this.sqrMagnitude);
    }
    // PUBLIC PROP
    get x() {
        return this._x;
    }
    set x(x) {
        this._x = x;
    }
    get y() {
        return this._y;
    }
    set y(y) {
        this._y = y;
    }
    get magnitude() {
        return this._magnitude;
    }
    set magnitude(magnitude) {
        this._magnitude = magnitude;
    }
    get sqrMagnitude() {
        return this._sqrMagnitude;
    }
    set sqrMagnitude(sqrMagnitude) {
        this._sqrMagnitude = sqrMagnitude;
    }
    get normalized() {
        const vector2 = new Old_Vector2(this.x, this.y);
        vector2.normalize();
        return vector2;
    }
    // PRIVATE METHODS
    // PUBLIC METHODS
    add(addVector) {
        this.x += addVector.x;
        this.y += addVector.y;
    }
    subtract(subtractVector) {
        this.x -= subtractVector.x;
        this.y -= subtractVector.y;
    }
    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }
    static zero() {
        return new Old_Vector2(0, 0);
    }
    static one() {
        return new Old_Vector2(1, 1);
    }
    static up() {
        return new Old_Vector2(0, 1);
    }
    static down() {
        return new Old_Vector2(0, -1);
    }
    static right() {
        return new Old_Vector2(1, 0);
    }
    static left() {
        return new Old_Vector2(-1, 0);
    }
    normalize() {
        const magnitude = this.magnitude;
        if (magnitude > 9.99999974737875E-06) {
            this.x = this.x / magnitude;
            this.y = this.y / magnitude;
            return this;
        }
        else {
            return Old_Vector2.zero();
        }
    }
    static dot(lhs, rhs) {
        return lhs.x * rhs.x + lhs.y * rhs.y;
    }
    /**
     * Returns distance between p1 and p2
     *
     * @static
     * @param {Old_Vector2} p1
     * @param {Old_Vector2} p2
     * @returns {number}
     * @memberof Vector2
     */
    static distance(p1, p2) {
        return Math.sqrt(this.sqrDistance(p1, p2));
        // let xDiff = (p2.x - p1.x);
        // let yDiff = (p2.y - p1.y);
        // return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
    }
    /**
     * Return square distance between p1 and p2
     *
     * @static
     * @param {Old_Vector2} p1
     * @param {Old_Vector2} p2
     * @returns {number}
     * @memberof Vector2
     */
    static sqrDistance(p1, p2) {
        const xDiff = (p2.x - p1.x);
        const yDiff = (p2.y - p1.y);
        return xDiff * xDiff + yDiff * yDiff;
    }
    static subtract(lhs, rhs) {
        return new Old_Vector2(lhs.x - rhs.x, lhs.y - rhs.y);
    }
}
//# sourceMappingURL=Vector2.js.map