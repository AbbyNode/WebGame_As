export enum SlotItem {
	Bunny, Cat, Pig, Snake, Weasel
}

export interface Slot {
	bitmap: createjs.Bitmap;
	item: SlotItem;
}

export class Reel extends createjs.Container {
	private _slots: Slot[];

	private _yStart: number;
	private _reelHeight: number;
	private _slotSize: number;
	private _slotSpacing: number;

	constructor() {
		super();

		this._slots = [];
		
		let reelClipped = new createjs.Container();

		this._yStart = 55;
		this._reelHeight = 238;
		this._slotSize = 128;
		this._slotSpacing = Math.round((this._reelHeight - this._slotSize) / 2);

		let slot2Bitmap = new createjs.Bitmap("../../Assets/As1/Cat_grey3.png");
		slot2Bitmap.y = this._yStart + this._slotSpacing;
		reelClipped.addChild(slot2Bitmap);
		
		let slot1Bitmap = new createjs.Bitmap("../../Assets/As1/Bunny_white.png");
		slot1Bitmap.y = slot2Bitmap.y - this._slotSize;
		reelClipped.addChild(slot1Bitmap);

		let slot3Bitmap = new createjs.Bitmap("../../Assets/As1/Snake_green.png");
		slot3Bitmap.y = slot2Bitmap.y + this._slotSize;
		reelClipped.addChild(slot3Bitmap);

		this._slots.push({bitmap: slot1Bitmap, item: SlotItem.Bunny});
		this._slots.push({bitmap: slot2Bitmap, item: SlotItem.Cat});
		this._slots.push({bitmap: slot3Bitmap, item: SlotItem.Snake});

		let mask = new createjs.Shape();
		mask.graphics.beginFill("#f00").drawRect(0, this._yStart, this._slotSize, this._reelHeight);
		reelClipped.mask = mask;

		this.addChild(reelClipped);
	}

	public Update() {
		this._slots.forEach(slot => {
			// slot.y += 1;
		});
	}
}