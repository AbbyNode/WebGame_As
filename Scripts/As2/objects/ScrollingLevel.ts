import { Enemy } from "./Enemy.js";
import { GameObject } from "../../engine/gameobject/GameObject.js";
import { EventName } from "../../engine/components/EventName.js";
import { Point2D } from "../../engine/interfaces/Point2D.js";
import { ScrollingBackground } from "./ScrollingBackground.js";

export class ScrollingLevel {
	private _objects: GameObject[];
	private _background: ScrollingBackground;

	private _scrollSpeed: number;
	private _isScrolling: boolean;

	private _objectCount: number;
	private _requestedMove: boolean;
	private _allowedMovements: number;

	//#region props

	public get isScrolling() : boolean {
		return this._isScrolling;
	}
	public set isScrolling(v : boolean) {
		this._isScrolling = v;
	}
	
	//#endregion

	constructor(objects: GameObject[], background: ScrollingBackground, scrollSpeed: number = 1) {
		this._objects = objects;
		this._background = background;

		this._scrollSpeed = scrollSpeed;
		this._isScrolling = false;

		this._objectCount = 0;
		this._requestedMove = false;
		this._allowedMovements = 0;
	}

	public init(): void {
		this._objectCount = this._objects.length;
		this._objects.forEach(object => {
			object.eventManager.addListener(EventName.Collider_MoveRequestAccepted, () => {
				this._oneMoveRequestAccepted();
			});
			object.eventManager.addListener(EventName.Collider_MoveRequestDenied, () => {
				this._oneMoveRequestDenied();
			});
		});
	}

	public update(): void {
		if (this._isScrolling) {
			this._attemptScrollRight();
		}
		
		this._objects.forEach(enemy => {
			enemy.update();
		});
	}

	private _attemptScrollRight(): void {
		this._requestedMove = true;
		this._allowedMovements = 0;

		this._objects.forEach(object => {
			const newPos = object.transform.position;
			newPos.x -= this._scrollSpeed;
			object.eventManager.invoke(EventName.Collider_RequestMove, newPos);
		});
	}

	private _oneMoveRequestDenied(): void {
		this._requestedMove = false;
	}

	private _oneMoveRequestAccepted(): void {
		if (this._requestedMove) {
			this._allowedMovements++;

			if (this._allowedMovements >= this._objectCount) {
				this._allMoveRequestsAccepted();
			}
		}
	}

	private _allMoveRequestsAccepted(): void {
		this._objects.forEach(object => {
			const newPos = object.transform.position;
			newPos.x -= this._scrollSpeed;
			object.transform.position = newPos;
		});

		this._background.scroll(this._scrollSpeed);
	}
}