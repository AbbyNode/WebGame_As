export class Old_Vector2 {
	// PRIVATE INSTANCE
	private _x = 0;
	private _y = 0;
	private _magnitude = 0;
	private _sqrMagnitude = 0;

	// PUBLIC PROP

	get x(): number {
		return this._x;
	}

	set x(x: number) {
		this._x = x;
	}

	get y(): number {
		return this._y;
	}

	set y(y: number) {
		this._y = y;
	}

	get magnitude(): number {
		return this._magnitude;
	}

	set magnitude(magnitude: number) {
		this._magnitude = magnitude;
	}

	get sqrMagnitude(): number {
		return this._sqrMagnitude;
	}

	set sqrMagnitude(sqrMagnitude: number) {
		this._sqrMagnitude = sqrMagnitude;
	}

	get normalized(): Old_Vector2 {
		const vector2 = new Old_Vector2(this.x, this.y);
		vector2.normalize();
		return vector2;
	}

	// CONSTRUCTOR

	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
		this.sqrMagnitude = this.x * this.x + this.y * this.y;
		this.magnitude = Math.sqrt(this.sqrMagnitude);
	}

	// PRIVATE METHODS

	// PUBLIC METHODS

	public add(addVector: Old_Vector2): void {
		this.x += addVector.x;
		this.y += addVector.y;
	}

	public subtract(subtractVector: Old_Vector2): void {
		this.x -= subtractVector.x;
		this.y -= subtractVector.y;
	}

	public scale(scalar: number): void {
		this.x *= scalar;
		this.y *= scalar;
	}

	public static zero(): Old_Vector2 {
		return new Old_Vector2(0, 0);
	}

	public static one(): Old_Vector2 {
		return new Old_Vector2(1, 1);
	}

	public static up(): Old_Vector2 {
		return new Old_Vector2(0, 1);
	}

	public static down(): Old_Vector2 {
		return new Old_Vector2(0, -1);
	}

	public static right(): Old_Vector2 {
		return new Old_Vector2(1, 0);
	}

	public static left(): Old_Vector2 {
		return new Old_Vector2(-1, 0);
	}

	public normalize(): Old_Vector2 {
		const magnitude = this.magnitude;
		if (magnitude > 9.99999974737875E-06) {
			this.x = this.x / magnitude;
			this.y = this.y / magnitude;
			return this;
		} else {
			return Old_Vector2.zero();
		}
	}

	public static dot(lhs: Old_Vector2, rhs: Old_Vector2): number {
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
	public static distance(p1: Old_Vector2, p2: Old_Vector2): number {
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
	public static sqrDistance(p1: Old_Vector2, p2: Old_Vector2): number {
		const xDiff = (p2.x - p1.x);
		const yDiff = (p2.y - p1.y);
		return xDiff * xDiff + yDiff * yDiff;
	}

	public static subtract(lhs: Old_Vector2, rhs: Old_Vector2): Old_Vector2 {
		return new Old_Vector2(
			lhs.x - rhs.x,
			lhs.y - rhs.y
		);
	}
}