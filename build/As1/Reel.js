export var SlotItem;
(function (SlotItem) {
    SlotItem[SlotItem["Bunny"] = 0] = "Bunny";
    SlotItem[SlotItem["Cat"] = 1] = "Cat";
    SlotItem[SlotItem["Pig"] = 2] = "Pig";
    SlotItem[SlotItem["Snake"] = 3] = "Snake";
    SlotItem[SlotItem["Weasel"] = 4] = "Weasel";
})(SlotItem || (SlotItem = {}));
export class Reel extends createjs.Container {
    //#endregion
    //#region Initialization
    constructor() {
        super();
        this._slots = [];
        this._shownSlots = [];
        this._selectedSlot = -1;
        this._targetSlot = -1;
        this._reelClipped = new createjs.Container();
        this._yStart = 55;
        this._reelHeight = 238;
        this._slotSize = 128;
        this._slotSpacing = Math.round((this._reelHeight - this._slotSize) / 2);
        this._initReel();
        this._initSlots();
    }
    //#endregion
    //#region Properties
    get selectedSlot() {
        return this._slots[this._selectedSlot];
    }
    get canRoll() {
        return (this._selectedSlot == this._targetSlot);
    }
    _initReel() {
        let mask = new createjs.Shape();
        mask.graphics.beginFill("#f00").drawRect(0, this._yStart, this._slotSize, this._reelHeight);
        this._reelClipped.mask = mask;
        this.addChild(this._reelClipped);
    }
    _initSlots() {
        // Create all possible slots
        this._slots[0] = this._createSlot("../../Assets/As1/Bunny_white.png", SlotItem.Bunny);
        this._slots[1] = this._createSlot("../../Assets/As1/Cat_grey3.png", SlotItem.Cat);
        this._slots[2] = this._createSlot("../../Assets/As1/Piglett_fullpink.png", SlotItem.Pig);
        this._slots[3] = this._createSlot("../../Assets/As1/Snake_green.png", SlotItem.Snake);
        this._slots[4] = this._createSlot("../../Assets/As1/Weasel_brown.png", SlotItem.Weasel);
        this._resetSlots();
    }
    _createSlot(path, item) {
        let slot = {
            bitmap: new createjs.Bitmap(path),
            item: item
        };
        // Start hidden at top
        this._resetSlotPos(slot);
        this._reelClipped.addChild(slot.bitmap);
        return slot;
    }
    _resetSlots() {
        // Reset all slots
        this._slots.forEach(slot => {
            this._resetSlotPos(slot);
        });
        // Get random index for slots to show
        this._selectedSlot = Math.round(Math.random() * (this._slots.length - 1));
        let prevIndex = this._slotIndexWrapped(-1);
        let nextIndex = this._slotIndexWrapped(1);
        this._targetSlot = this._slotIndexWrapped(2);
        // Set slots to initial position
        this._slots[prevIndex].bitmap.y = this._yStart - this._slotSize;
        this._slots[this._selectedSlot].bitmap.y = this._yStart;
        this._slots[nextIndex].bitmap.y = this._yStart + this._slotSize;
        // Save index of shown slots
        this._shownSlots = [];
        this._shownSlots[0] = prevIndex;
        this._shownSlots[1] = this._selectedSlot;
        this._shownSlots[2] = nextIndex;
    }
    _resetSlotPos(slot) {
        slot.bitmap.y = this._yStart - this._slotSize;
    }
    _slotIndexWrapped(offset, index = this._selectedSlot) {
        // https://stackoverflow.com/questions/16964225/keep-an-index-within-bounds-and-wrap-around
        let newIndex = index + offset;
        let bound = this._slots.length;
        return (newIndex % bound + bound) % bound;
    }
    //#endregion
    //#region Private update
    _updateUntilTarget() {
        // Move slot bitmaps down
        this._shownSlots.forEach(slotIndex => {
            this._slots[slotIndex].bitmap.y += Reel.scrollSpeed;
        });
        // Hide bottom slot when it gets past the end
        let bottomSlotTriggerPos = this._yStart + this._reelHeight;
        let bottomSlot = this._slots[this._shownSlots[2]];
        if (bottomSlot != undefined) {
            if (bottomSlot.bitmap.y >= bottomSlotTriggerPos) {
                this._resetSlotPos(bottomSlot);
                this._shownSlots.pop(); // Remove last slot
            }
        }
        // Show next slot at top
        let topSlotTriggerPos = this._yStart;
        let topSlot = this._slots[this._shownSlots[0]];
        if (topSlot.bitmap.y >= topSlotTriggerPos) {
            let prevIndex = this._slotIndexWrapped(-1, this._shownSlots[0]);
            this._shownSlots.unshift(prevIndex);
        }
        // Update selected slot if at correct pos
        let middleTriggerPos = this._yStart + this._slotSpacing;
        let middleSlot = this._slots[this._shownSlots[1]];
        if (middleSlot.bitmap.y >= middleTriggerPos) {
            this._selectedSlot = this._slotIndexWrapped(1);
            console.log(this._selectedSlot, this._targetSlot);
        }
    }
    //#endregion
    //#region Public methods
    rollToRandom() {
        this._targetSlot = Math.round(Math.random() * (this._slots.length - 1));
    }
    rollTo(index) {
        this._targetSlot = index;
    }
    Update() {
        if (this._targetSlot != this._selectedSlot) {
            this._updateUntilTarget();
        }
    }
    reset() {
        this._resetSlots();
    }
}
Reel.scrollSpeed = 4;
//# sourceMappingURL=Reel.js.map