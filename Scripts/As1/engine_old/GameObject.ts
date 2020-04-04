import { Old_Vector2 } from "./Vector2.js";

export abstract class Old_GameObject extends createjs.Bitmap {
	// MEMBER VARIABLES

	private _width = 0;
	private _height = 0;
	private _halfWidth = 0;
	private _halfHeight = 0;
	private _isColliding = false;
	private _position: Old_Vector2 = new Old_Vector2(0, 0);
	private _isCentered = false;

	// PROPERTIES

	get width(): number {
		return this._width;
	}
	set width(width: number) {
		this._width = width;
		this._halfWidth = width / 2;
	}

	get height(): number {
		return this._height;
	}
	set height(height: number) {
		this._height = height;
		this._halfHeight = height / 2;
	}

	get halfWidth(): number {
		return this._halfWidth;
	}

	get halfHeight(): number {
		return this._halfHeight;
	}

	get isColliding(): boolean {
		return this._isColliding;
	}

	set isColliding(isColliding: boolean) {
		this._isColliding = isColliding;
	}

	get position(): Old_Vector2 {
		return this._position;
	}

	set position(position: Old_Vector2) {
		this._position = position;
		this.x = position.x;
		this.y = position.y;
	}

	get isCentered(): boolean {
		return this._isCentered;
	}

	set isCentered(isCentered: boolean) {
		this._isCentered = isCentered;
		if (isCentered) {
			this.regX = this._halfWidth;
			this.regY = this._halfHeight;
		} else {
			this.regX = 0;
			this.regY = 0;
		}
	}

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

		this.image.addEventListener("load", () => {
			this.position = new Old_Vector2(x, y);

			this.width = this.getBounds().width;
			this.height = this.getBounds().height;

			this.isCentered = isCentered;
		});
	}

	// PRIVATE METHODS

	protected abstract _checkBounds(): void;

	// PUBLIC METHODS

	public abstract start(): void;

	public abstract update(): void;

	public abstract reset(): void;
}