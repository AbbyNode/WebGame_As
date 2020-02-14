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
        this._shownSlots = [];
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
        let slot1 = this._addSlot("../../Assets/As1/Bunny_white.png", SlotItem.Bunny);
        let slot2 = this._addSlot("../../Assets/As1/Cat_grey3.png", SlotItem.Cat);
        let slot3 = this._addSlot("../../Assets/As1/Snake_green.png", SlotItem.Snake);
        this._selectedSlot = Math.round(Math.random() * this._slots.length);
        // console.log(this._selectedSlot);
        this._renderNextSlots();
        this._renderNextSlots();
        this._renderNextSlots();
        // slot2.bitmap.y = this._yStart + this._slotSpacing;
        // this._reelClipped.addChild(slot2.bitmap);
        // this._resetFirstSlot();
        // // slot1.bitmap.y = slot2.bitmap.y - this._slotSize;
        // // this._reelClipped.addChild(slot1.bitmap);
        // slot3.bitmap.y = slot2.bitmap.y + this._slotSize;
        // this._reelClipped.addChild(slot3.bitmap);
    }
    _addSlot(path, item) {
        let slot = {
            bitmap: new createjs.Bitmap(path),
            item: item
        };
        this._slots.push(slot);
        return slot;
    }
    _renderNextSlots() {
        this._selectedSlot++;
        if (this._selectedSlot >= this._slots.length) {
            this._selectedSlot = 0;
        }
        this._resetFirstSlot();
    }
    _resetFirstSlot() {
        let index = (this._selectedSlot > 0 ? (this._selectedSlot - 1) : this._slots.length - 1);
        let slot = this._slots[index];
        slot.bitmap.y = (this._yStart + this._slotSpacing) - this._slotSize;
        this._shownSlots.push(slot);
        this._reelClipped.addChild(slot.bitmap);
    }
    rollRandom() {
    }
    rollTo(index) {
    }
    jumpTo(index) {
    }
    Update() {
        for (let i = 0; i <= this._shownSlots.length - 1; i++) {
            let slot = this._shownSlots[i];
            slot.bitmap.y += 1;
            if (slot.bitmap.y >= 294) {
                this._shownSlots.splice(i, 1);
                this._reelClipped.removeChild(slot.bitmap);
                this._renderNextSlots();
            }
        }
    }
}
//# sourceMappingURL=Reel.js.map