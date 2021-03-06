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
        this._middleIsInPosition = false;
        this._uselessSpinsRemaining = 0;
        this._startedUselessSpinOnIndex = -1;
        this._needsSpin = false;
        // this._startedOnTarget = false;
        this._spinCompleteCallback = undefined;
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
    get selectedSlotIndex() {
        return this._selectedSlot;
    }
    get canRoll() {
        return (this._selectedSlot == this._targetSlot);
    }
    set spinCompleteCallback(v) {
        this._spinCompleteCallback = v;
    }
    _initReel() {
        const mask = new createjs.Shape();
        mask.graphics.beginFill("#f00").drawRect(0, this._yStart, this._slotSize, this._reelHeight);
        this._reelClipped.mask = mask;
        this.addChild(this._reelClipped);
    }
    _initSlots() {
        // Create all possible slots
        this._slots[0] = this._createSlot("./Assets/As1/images/Bunny_white.png", SlotItem.Bunny);
        this._slots[1] = this._createSlot("./Assets/As1/images/Cat_grey3.png", SlotItem.Cat);
        this._slots[2] = this._createSlot("./Assets/As1/images/Piglett_fullpink.png", SlotItem.Pig);
        this._slots[3] = this._createSlot("./Assets/As1/images/Snake_green.png", SlotItem.Snake);
        this._slots[4] = this._createSlot("./Assets/As1/images/Weasel_brown.png", SlotItem.Weasel);
        this._resetSlots();
    }
    _createSlot(path, item) {
        const slot = {
            bitmap: new createjs.Bitmap(path),
            item: item
        };
        // Start hidden at top
        this._resetSlotPos(slot);
        this._reelClipped.addChild(slot.bitmap);
        return slot;
    }
    //#endregion
    //#region Resets
    _resetSlots() {
        // Reset all slots
        this._slots.forEach(slot => {
            this._resetSlotPos(slot);
        });
        // Get random index for slots to show
        this._selectedSlot = Math.round(Math.random() * (this._slots.length - 1));
        const prevIndex = this._slotIndexWrapped(-1);
        const nextIndex = this._slotIndexWrapped(1);
        // Reset target
        this._targetSlot = this._selectedSlot;
        this._middleIsInPosition = false;
        // Reset useless spinning
        this._uselessSpinsRemaining = 0;
        this._startedUselessSpinOnIndex = -1;
        // Reset spin flags
        this._needsSpin = false;
        // this._startedOnTarget = false;
        // Set slots to initial position
        this._slots[prevIndex].bitmap.y = this._yStart - this._slotSize;
        this._slots[this._selectedSlot].bitmap.y = this._yStart;
        this._slots[nextIndex].bitmap.y = this._yStart + this._slotSize;
        // Save index of shown slots
        this._shownSlots = [];
        this._shownSlots[0] = prevIndex;
        this._shownSlots[1] = this._selectedSlot;
        this._shownSlots[2] = nextIndex;
        // Roll 2 ahead
        this.rollTo(this._slotIndexWrapped(2));
    }
    _resetSlotPos(slot) {
        slot.bitmap.y = this._yStart - this._slotSize;
    }
    //#endregion
    //#region Switching
    _slotIndexWrapped(offset, index = this._selectedSlot) {
        // https://stackoverflow.com/questions/16964225/keep-an-index-within-bounds-and-wrap-around
        const newIndex = index + offset;
        const bound = this._slots.length;
        return (newIndex % bound + bound) % bound;
    }
    //#endregion
    //#region Private update
    _updateSpin(speed = Reel.scrollSpeed) {
        // Move slot bitmaps down
        this._shownSlots.forEach(slotIndex => {
            this._slots[slotIndex].bitmap.y += speed;
        });
        // Hide bottom slot when it gets past the end
        const bottomSlotTriggerPos = this._yStart + this._reelHeight;
        const bottomSlot = this._slots[this._shownSlots[2]];
        if (bottomSlot != undefined) {
            if (bottomSlot.bitmap.y >= bottomSlotTriggerPos) {
                this._resetSlotPos(bottomSlot); // Reset pos to hidden top area
                this._shownSlots.pop(); // Remove last slot from array
            }
        }
        // Show next slot at top
        const topSlotTriggerPos = this._yStart;
        const topSlot = this._slots[this._shownSlots[0]];
        if (topSlot.bitmap.y >= topSlotTriggerPos) {
            const prevIndex = this._slotIndexWrapped(-1, this._shownSlots[0]);
            this._shownSlots.unshift(prevIndex); // Put new slot at beginning of array
            this._middleIsInPosition = false; // Middle slot is out of position
        }
        // If middle slot is out of position
        if (!this._middleIsInPosition) {
            const middleTriggerPos = this._yStart + this._slotSpacing;
            const middleSlot = this._slots[this._shownSlots[1]];
            if (middleSlot.bitmap.y >= middleTriggerPos) {
                // Middle slot has reached the actual middle of reel
                // Update selected slot
                this._selectedSlot = this._shownSlots[1];
                this._onSlotChange();
                // Middle slot is now in position
                this._middleIsInPosition = true;
            }
        }
    }
    // When slot changes from spinning
    _onSlotChange() {
        // Update useless spins if needed
        if (this._uselessSpinsRemaining >= 1) {
            if (this._selectedSlot == this._startedUselessSpinOnIndex) {
                this._uselessSpinsRemaining--;
                // When useless spins are done,
                if (this._uselessSpinsRemaining <= 0) {
                    this._needsSpin = true;
                }
            }
        }
        else {
            // End spin when reached target
            if (this._selectedSlot == this._targetSlot) {
                if (this._spinCompleteCallback != undefined) {
                    this._spinCompleteCallback();
                }
                this._needsSpin = false;
            }
        }
    }
    //#endregion
    //#region Public methods
    rollToRandom() {
        this.rollTo(Math.round(Math.random() * (this._slots.length - 1)));
    }
    rollTo(index) {
        // Set random amount of useless spins
        this._uselessSpinsRemaining = Math.round(Math.random() * Reel.potentialUselessSpinsIncrease) + Reel.minUselessSpins;
        // and remember where the slots started
        this._startedUselessSpinOnIndex = this._selectedSlot;
        // Set target
        this._targetSlot = index;
        // this._startedOnTarget = (this._targetSlot == this._selectedSlot);
    }
    update() {
        if (this._uselessSpinsRemaining >= 1) {
            // First do some useless spins
            this._updateSpin(Reel.scrollSpeed);
        }
        else if (this._needsSpin) {
            // then do the actual spins at half speed
            this._updateSpin(Reel.scrollSpeed / 2);
        }
    }
    reset() {
        this._resetSlots();
    }
}
Reel.scrollSpeed = 16;
Reel.minUselessSpins = 1;
Reel.potentialUselessSpinsIncrease = 3;
//# sourceMappingURL=Reel.js.map