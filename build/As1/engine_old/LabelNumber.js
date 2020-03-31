import { Label } from "./Label.js";
export class LabelNumber extends Label {
    constructor(value, fontSize = "1", fontFamily = "Consolas", fontColor = "#000000", x = 0, y = 0, isCentered = false) {
        super(value.toString(), fontSize, fontFamily, fontColor, x, y, isCentered);
        this._value = value;
    }
    get value() {
        return this._value;
    }
    set value(v) {
        this._value = v;
        this.text = v.toString();
    }
}
//# sourceMappingURL=LabelNumber.js.map