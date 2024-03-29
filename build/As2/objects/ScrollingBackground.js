/**
 * Scrolling background loops a bitmap image to scroll across the screen by a specified amount.
 * Can be used for paralax.
 *
 * @export
 * @class ScrollingBackground
 */
export class ScrollingBackground {
    //#endregion
    constructor(image, scrollScale = 1) {
        this._scrollScale = scrollScale;
        this._image = image;
        this._container = new createjs.Container();
        this._bitmap1 = new createjs.Bitmap(this._image);
        this._container.addChild(this._bitmap1);
        this._bitmap2 = new createjs.Bitmap(this._image);
        this._container.addChild(this._bitmap2);
        this._width = this._bitmap1.getBounds().width;
    }
    //#region props
    get scrollScale() {
        return this._scrollScale;
    }
    set scrollScale(v) {
        this._scrollScale = v;
    }
    get image() {
        return this._image;
    }
    set image(v) {
        this._image = v;
    }
    get container() {
        return this._container;
    }
    set container(v) {
        this._container = v;
    }
    /**
     * Swaps the duplicate sprite to start the loop again.
     *
     * @private
     * @memberof ScrollingBackground
     */
    _scrollWarp() {
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
    scroll(amount) {
        this._bitmap1.x -= amount * this._scrollScale;
        if (this._bitmap1.x <= -this._width) {
            this._scrollWarp();
        }
        this._bitmap2.x = this._bitmap1.x + this._width;
    }
}
//# sourceMappingURL=ScrollingBackground.js.map