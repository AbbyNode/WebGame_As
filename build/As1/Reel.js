export var SlotItem;
(function (SlotItem) {
    SlotItem[SlotItem["Bunny"] = 0] = "Bunny";
    SlotItem[SlotItem["Cat"] = 1] = "Cat";
    SlotItem[SlotItem["Pig"] = 2] = "Pig";
    SlotItem[SlotItem["Snake"] = 3] = "Snake";
    SlotItem[SlotItem["Weasel"] = 4] = "Weasel";
})(SlotItem || (SlotItem = {}));
export class Reel extends createjs.Container {
    constructor() {
        super();
        this._slots = [];
        this._selectedSlot = -1;
        this._reelClipped = new createjs.Container();
        this._yStart = 55;
        this._reelHeight = 238;
        this._slotSize = 128;
        this._slotSpacing = Math.round((this._reelHeight - this._slotSize) / 2);
        this.initReel();
        this.initSlots();
    }
    get selectedSlot() {
        return this._slots[this._selectedSlot];
    }
    initReel() {
        let mask = new createjs.Shape();
        mask.graphics.beginFill("#f00").drawRect(0, this._yStart, this._slotSize, this._reelHeight);
        this._reelClipped.mask = mask;
        this.addChild(this._reelClipped);
    }
    initSlots() {
        let slot2Bitmap = new createjs.Bitmap("../../Assets/As1/Cat_grey3.png");
        slot2Bitmap.y = this._yStart + this._slotSpacing;
        this._reelClipped.addChild(slot2Bitmap);
        let slot1Bitmap = new createjs.Bitmap("../../Assets/As1/Bunny_white.png");
        slot1Bitmap.y = slot2Bitmap.y - this._slotSize;
        this._reelClipped.addChild(slot1Bitmap);
        let slot3Bitmap = new createjs.Bitmap("../../Assets/As1/Snake_green.png");
        slot3Bitmap.y = slot2Bitmap.y + this._slotSize;
        this._reelClipped.addChild(slot3Bitmap);
        this._slots.push({ bitmap: slot1Bitmap, item: SlotItem.Bunny });
        this._slots.push({ bitmap: slot2Bitmap, item: SlotItem.Cat });
        this._slots.push({ bitmap: slot3Bitmap, item: SlotItem.Snake });
    }
    renderSlot(slotNum, yOffset) {
    }
    Update() {
        this._slots.forEach(slot => {
            // slot.bitmap.y += 1;
        });
    }
}
//# sourceMappingURL=Reel.js.map