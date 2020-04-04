import { Old_Label } from "./Label.js";

export class Old_LabelNumber extends Old_Label {
	private _value: number;

	public get value(): number {
		return this._value;
	}
	public set value(v: number) {
		this._value = v;
		this.text = v.toString();
	}

	constructor(value: number, fontSize = "1", fontFamily = "Consolas", fontColor = "#000000",
		x = 0, y = 0, isCentered = false) {
		super(value.toString(), fontSize, fontFamily, fontColor, x, y, isCentered);

		this._value = value;
	}
}