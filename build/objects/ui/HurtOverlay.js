export class HurtOverlay {
    constructor(size = { width: 800, height: 600 }) {
        const graphic = new createjs.Graphics()
            // .setStrokeStyle(HurtOverlay.strokeSize)
            // .beginStroke(HurtOverlay.strokeColor)
            .beginFill(HurtOverlay.overlayColor)
            .drawRect(0, 0, size.width, size.height);
        this._shape = new createjs.Shape(graphic);
        this._shape.alpha = 0;
    }
    get shape() {
        return this._shape;
    }
    set shape(v) {
        this._shape = v;
    }
    show(duration = 600) {
        createjs.Tween.get(this._shape)
            .to({ alpha: 0.6 }, duration / 2)
            .to({ alpha: 0 }, duration / 2);
    }
}
// public static readonly strokeSize = 2;
// public static readonly strokeColor = "#000000";
HurtOverlay.overlayColor = "#ff0000";
//# sourceMappingURL=HurtOverlay.js.map