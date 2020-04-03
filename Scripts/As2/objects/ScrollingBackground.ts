import { GameObject } from "../../engine/gameobject/GameObject";

export class ScrollingBackground {
	private _scrollScale : number;

	public get scrollScale() : number {
		return this._scrollScale;
	}
	public set scrollScale(v : number) {
		this._scrollScale = v;
	}

	constructor() {
		this._scrollScale = 1;
	}


}
