export class Reel extends createjs.Container {
    constructor() {
        super();
        this._slots = [];
        let reelClipped = new createjs.Container();
        let cat = new createjs.Bitmap("../../Assets/As1/Cat_grey3.png");
        cat.scaleX = 1.5;
        cat.scaleY = 1.5;
        reelClipped.addChild(cat);
        cat = new createjs.Bitmap("../../Assets/As1/Cat_grey3.png");
        cat.scaleX = 1.5;
        cat.scaleY = 1.5;
        cat.y += 100;
        reelClipped.addChild(cat);
        cat = new createjs.Bitmap("../../Assets/As1/Cat_grey3.png");
        cat.scaleX = 1.5;
        cat.scaleY = 1.5;
        cat.y += 200;
        reelClipped.addChild(cat);
        let mask = new createjs.Shape();
        mask.graphics.beginFill("#f00").drawRect(0, 45, 100, 187);
        reelClipped.mask = mask;
        this.addChild(reelClipped);
    }
}
//# sourceMappingURL=Reel.js.map