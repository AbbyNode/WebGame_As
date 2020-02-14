export enum SlotItem {
	Bunny, Cat, Pig, Snake, Weasel
}

export interface Slot {
	bitmap: createjs.Bitmap;
	item: SlotItem;
}

export class Reel extends createjs.Container {
	public static scrollSpeed = 8;
	public static minUselessSpins = 1;
	public static potentialUselessSpinsIncrease = 3;

	//#region Private vars

	private _slots: Slot[];
	private _shownSlots: number[];
	private _selectedSlot: number;
	private _targetSlot: number;
	private _hitTarget: boolean;
	private _hasShifted: boolean;

	private _uselessSpinsRemaining: number;
	private _startedUselessSpinOnIndex: number;

	private _reelClipped: createjs.Container;

	private _yStart: number;
	private _reelHeight: number;
	private _slotSize: number;
	private _slotSpacing: number;

	//#endregion

	//#region Properties

	public get targetSlot(): Slot {
		return this._slots[this._targetSlot];
	}

	public get canRoll(): boolean {
		return (this._selectedSlot == this._targetSlot);
	}

	//#endregion

	//#region Initialization

	constructor() {
		super();

		this._slots = [];
		this._shownSlots = [];
		this._selectedSlot = -1;
		this._targetSlot = -1;
		this._hitTarget = false;
		this._hasShifted = false;

		this._uselessSpinsRemaining = 0;
		this._startedUselessSpinOnIndex = -1;

		this._reelClipped = new createjs.Container();

		this._yStart = 55;
		this._reelHeight = 238;
		this._slotSize = 128;
		this._slotSpacing = Math.round((this._reelHeight - this._slotSize) / 2);

		this._initReel();
		this._initSlots();
	}

	private _initReel() {
		let mask = new createjs.Shape();
		mask.graphics.beginFill("#f00").drawRect(0, this._yStart, this._slotSize, this._reelHeight);
		this._reelClipped.mask = mask;

		this.addChild(this._reelClipped);
	}

	private _initSlots() {
		// Create all possible slots
		this._slots[0] = this._createSlot("../../Assets/As1/Bunny_white.png", SlotItem.Bunny);
		this._slots[1] = this._createSlot("../../Assets/As1/Cat_grey3.png", SlotItem.Cat);
		this._slots[2] = this._createSlot("../../Assets/As1/Piglett_fullpink.png", SlotItem.Pig);
		this._slots[3] = this._createSlot("../../Assets/As1/Snake_green.png", SlotItem.Snake);
		this._slots[4] = this._createSlot("../../Assets/As1/Weasel_brown.png", SlotItem.Weasel);

		this._resetSlots();
	}

	private _createSlot(path: string, item: SlotItem): Slot {
		let slot = {
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

	private _resetSlots() {
		// Reset all slots
		this._slots.forEach(slot => {
			this._resetSlotPos(slot);
		});

		// Get random index for slots to show
		this._selectedSlot = Math.round(Math.random() * (this._slots.length - 1));
		let prevIndex = this._slotIndexWrapped(-1);
		let nextIndex = this._slotIndexWrapped(1);

		// Scroll 2 ahead
		this._targetSlot = this._slotIndexWrapped(2);
		this._hitTarget = false;

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

	private _resetSlotPos(slot: Slot) {
		slot.bitmap.y = this._yStart - this._slotSize;
	}

	//#endregion

	//#region Switching

	private _slotIndexWrapped(offset: number, index: number = this._selectedSlot) {
		// https://stackoverflow.com/questions/16964225/keep-an-index-within-bounds-and-wrap-around
		let newIndex = index + offset;
		let bound = this._slots.length;
		return (newIndex % bound + bound) % bound;
	}

	//#endregion

	//#region Private update

	private _updateSpin() {
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
			this._hasShifted = true;
		}

		// If array was shifted, target is considered not hit
		if (this._hasShifted) {
			this._hitTarget = false;
			this._hasShifted = false;
		}

		// If target is not hit, check middle slot position
		if (!this._hitTarget) {
			let middleTriggerPos = this._yStart + this._slotSpacing;
			let middleSlot = this._slots[this._shownSlots[1]]
			if (middleSlot.bitmap.y >= middleTriggerPos) {
				this._selectedSlot = this._slotIndexWrapped(1);
				this._hitTarget = true;
			}
		}
	}

	private _updateUselessSpins() {
		this._updateSpin();

		if (this._hasShifted) {
			if (this._selectedSlot == this._startedUselessSpinOnIndex) {
				console.log("WOW");
				this._uselessSpinsRemaining--;
			}
		}

		if (this._uselessSpinsRemaining <= 0) {
			while (this._targetSlot == this._selectedSlot) {
				this._targetSlot = Math.round(Math.random() * (this._slots.length - 1));
			}
		}
	}

	private _updateSpinUntilTarget() {
		this._updateSpin();
	}

	//#endregion

	//#region Public methods

	public rollToRandom() {
		this._uselessSpinsRemaining = Math.round(Math.random() * Reel.potentialUselessSpinsIncrease) + Reel.minUselessSpins;
		this._startedUselessSpinOnIndex = this._selectedSlot;
	}

	public rollTo(index: number) {
		this._targetSlot = index;
	}

	public Update() {
		if (this._uselessSpinsRemaining >= 1) {
			this._updateUselessSpins();
		} else if (this._targetSlot != this._selectedSlot) {
			this._updateSpinUntilTarget();
		}
	}

	public reset() {
		this._resetSlots();
	}

	//#endregion
}