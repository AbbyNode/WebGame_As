export class Old_Label extends createjs.Text {
	/**
	 *Creates an instance of Label.
	 * @param {string} text
	 * @param {string} fontSize
	 * @param {string} fontFamily
	 * @param {string} fontColor
	 * @param {number} x
	 * @param {number} y
	 * @param {boolean} isCentered
	 * @memberof Label
	 */
	constructor(text = "label",
		fontSize = "1", fontFamily = "Consolas", fontColor = "#000000",
		x = 0, y = 0, isCentered = false) {
		super(text, `${fontSize} ${fontFamily}`, fontColor);
		if (isCentered) {
			this.regX = this.getBounds().width * 0.5;
			this.regY = this.getMeasuredLineHeight() * 0.5;
		}
		this.x = x;
		this.y = y;
	}
}