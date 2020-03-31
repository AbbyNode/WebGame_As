import { Point2D } from "../interfaces/Point2D";

export class Vector2 implements Point2D {
	private _x: number;
	private _y: number;
	private _magnitude: number;
	private _sqrMagnitude: number;
	

	//#region props

	public get x(): number {
		return this._x;
	}
	public get y(): number {
		return this._y;
	}

	public get magnitude(): number {
		return this._magnitude;
	}

	public get sqrMagnitude(): number {
		return this._sqrMagnitude;
	}
	
	//#endregion

	constructor(x: number, y: number) {
		this._x = x;
		this._y = y;

		this._magnitude = 0;
		this._sqrMagnitude = 0;
		this._recalculateMagnitude();
	}

	public setPos(x: number, y: number): void {
		this._x = x;
		this._y = y;
		this._recalculateMagnitude();
	}

	public scale(scalar: number): void {
		const newX = this.x * scalar;
		const newY = this.y * scalar;
		this.setPos(newX, newY);
	}

	public normalize(): void {
		const newX = this.x / this.magnitude;
		const newY = this.y / this.magnitude;
		this.setPos(newX, newY);
	}
	
	private _recalculateMagnitude(): void {
		this._sqrMagnitude = (this._x * this._x) + (this._y * this._y);
		this._magnitude = Math.sqrt(this.sqrMagnitude);
	}
}