export enum SlotItem {
	Bunny, Cat, Pig, Snake, Weasel
}

export interface Slot {
	bitmap: createjs.Bitmap;
	item: SlotItem;
}

export class Reel extends createjs.Container {
	public static scrollSpeed = 16;
	public static minUselessSpins = 1;
	public static potentialUselessSpinsIncrease = 3;

	//#region Private vars

	private _slots: Slot[];
	private _shownSlots: number[];
	private _selectedSlot: number;
	private _targetSlot: number;

	private _middleIsInPosition: boolean;

	private _uselessSpinsRemaining: number;
	private _startedUselessSpinOnIndex: number;

	private _needsSpin: boolean;
	// private _startedOnTarget: boolean;
	private _spinCompleteCallback: (() => void) | undefined;

	private _reelClipped: createjs.Container;

	private _yStart: number;
	private _reelHeight: number;
	private _slotSize: number;
	private _slotSpacing: number;

	//#endregion

	//#region Properties

	public get selectedSlot(): Slot {
		return this._slots[this._selectedSlot];
	}

	public get selectedSlotIndex(): number {
		return this._selectedSlot;
	}

	public get canRoll(): boolean {
		return (this._selectedSlot == this._targetSlot);
	}

	public set spinCompleteCallback(v: () => void) {
		this._spinCompleteCallback = v;
	}

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

	private _initReel(): void {
		const mask = new createjs.Shape();
		mask.graphics.beginFill("#f00").drawRect(0, this._yStart, this._slotSize, this._reelHeight);
		this._reelClipped.mask = mask;

		this.addChild(this._reelClipped);
	}

	private _initSlots(): void {
		// Create all possible slots
		this._slots[0] = this._createSlot("./Assets/As1/images/Bunny_white.png", SlotItem.Bunny);
		this._slots[1] = this._createSlot("./Assets/As1/images/Cat_grey3.png", SlotItem.Cat);
		this._slots[2] = this._createSlot("./Assets/As1/images/Piglett_fullpink.png", SlotItem.Pig);
		this._slots[3] = this._createSlot("./Assets/As1/images/Snake_green.png", SlotItem.Snake);
		this._slots[4] = this._createSlot("./Assets/As1/images/Weasel_brown.png", SlotItem.Weasel);

		this._resetSlots();
	}

	private _createSlot(path: string, item: SlotItem): Slot {
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

	private _resetSlots(): void {
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

	private _resetSlotPos(slot: Slot): void {
		slot.bitmap.y = this._yStart - this._slotSize;
	}

	//#endregion

	//#region Switching

	private _slotIndexWrapped(offset: number, index: number = this._selectedSlot): number {
		// https://stackoverflow.com/questions/16964225/keep-an-index-within-bounds-and-wrap-around
		const newIndex = index + offset;
		const bound = this._slots.length;
		return (newIndex % bound + bound) % bound;
	}

	//#endregion

	//#region Private update

	private _updateSpin(speed: number = Reel.scrollSpeed): void {
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
			const middleSlot = this._slots[this._shownSlots[1]]
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
	private _onSlotChange(): void {
		// Update useless spins if needed
		if (this._uselessSpinsRemaining >= 1) {
			if (this._selectedSlot == this._startedUselessSpinOnIndex) {
				this._uselessSpinsRemaining--;

				// When useless spins are done,
				if (this._uselessSpinsRemaining <= 0) {
					this._needsSpin = true;
				}
			}
		} else {
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

	public rollToRandom(): void {
		this.rollTo(Math.round(Math.random() * (this._slots.length - 1)));
	}

	public rollTo(index: number): void {
		// Set random amount of useless spins
		this._uselessSpinsRemaining = Math.round(Math.random() * Reel.potentialUselessSpinsIncrease) + Reel.minUselessSpins;
		// and remember where the slots started
		this._startedUselessSpinOnIndex = this._selectedSlot;

		// Set target
		this._targetSlot = index;

		// this._startedOnTarget = (this._targetSlot == this._selectedSlot);
	}

	public update(): void {
		if (this._uselessSpinsRemaining >= 1) {
			// First do some useless spins
			this._updateSpin(Reel.scrollSpeed);
		} else if (this._needsSpin) {
			// then do the actual spins at half speed
			this._updateSpin(Reel.scrollSpeed / 2);
		}
	}

	public reset(): void {
		this._resetSlots();
	}

	//#endregion
}