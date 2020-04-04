import { Global } from "../managers/Global.js";

/**
 * Scrolling background loops a bitmap image to scroll across the screen by a specified amount.
 * Can be used for paralax.
 *
 * @export
 * @class ScrollingBackground
 */
export class ScrollingBackground {
	private _scrollScale : number;
	private _image : Object;

	private _container : createjs.Container;
	private _bitmap1: createjs.Bitmap;
	private _bitmap2: createjs.Bitmap;

	private _width: number;

	//#region props

	public get scrollScale() : number {
		return this._scrollScale;
	}
	public set scrollScale(v : number) {
		this._scrollScale = v;
	}

	public get image() : Object {
		return this._image;
	}
	public set image(v : Object) {
		this._image = v;
	}

	public get container() : createjs.Container {
		return this._container;
	}
	public set container(v : createjs.Container) {
		this._container = v;
	}
	
	//#endregion

	constructor(image: Object, scrollScale: number = 1) {
		this._scrollScale = scrollScale;
		this._image = image;
		
		this._container = new createjs.Container();

		this._bitmap1 = new createjs.Bitmap(this._image);
		this._container.addChild(this._bitmap1);

		this._bitmap2 = new createjs.Bitmap(this._image);
		this._container.addChild(this._bitmap2);

		this._width = this._bitmap1.getBounds().width;
	}

	/**
	 * Swaps the duplicate sprite to start the loop again.
	 *
	 * @private
	 * @memberof ScrollingBackground
	 */
	private _scrollWarp() {
		const bitmapTemp = this._bitmap1;
		this._bitmap1 = this._bitmap2;
		this._bitmap2 = bitmapTemp;
	}

	/**
	 * Scrolls the background by specified amount
	 *
	 * @param {number} amount
	 * @memberof ScrollingBackground
	 */
	public scroll(amount: number) {
		this._bitmap1.x -= amount * this._scrollScale;

		if (this._bitmap1.x <= -this._width) {
			this._scrollWarp();
		}

		this._bitmap2.x = this._bitmap1.x + this._width;
	}
}
