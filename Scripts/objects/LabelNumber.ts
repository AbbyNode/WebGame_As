import { Label } from "./Label.js";

export class LabelNumber extends Label {
	private _value: number;

	public get value(): number {
		return this._value;
	}
	public set value(v: number) {
		this._value = v;
		this.text = v.toString();
	}

	constructor(value: number, fontSize: string = "1", fontFamily: string = "Consolas", fontColor: string = "#000000",
		x: number = 0, y: number = 0, isCentered: boolean = false) {
		super(value.toString(), fontSize, fontFamily, fontColor, x, y, isCentered);

		this._value = value;
	}
}