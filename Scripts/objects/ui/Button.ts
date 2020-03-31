import { GameObject } from "../../engine/gameobject/GameObject.js";
import { EventName } from "../../engine/components/EventName.js";
import { TextRenderer } from "../../engine/components/TextRenderer.js";
import { ShapeRenderer } from "../../engine/components/ShapeRenderer.js";
import { Size2D } from "../../engine/interfaces/Size2D.js";
import { EventHandler } from "../../engine/interfaces/CommonTypes.js";

export class Button extends GameObject {
	public static readonly fillColor = "#33ccff";
	public static readonly fillColorHover = "#3399ff";
	public static readonly strokeSize = 2;
	public static readonly strokeColor = "#000000";
	public static readonly fontColor = "#000000";

	private _shapeRenderer: ShapeRenderer;
	private _textRenderer: TextRenderer;

	private _hoverFilter: createjs.ColorFilter;

	private _size: Size2D;
	private _sizeWithStroke: Size2D;
	private _onClick: EventHandler;

	//#region props

	public get text(): string {
		return this._textRenderer.text;
	}

	public set text(text: string) {
		this._textRenderer.text = text;
	}

	public get size(): Size2D {
		return this._size;
	}
	public set size(v: Size2D) {
		this._size = v;
		this._sizeWithStroke = {
			width: this._size.width + Button.strokeSize * 2,
			height: this._size.height + Button.strokeSize * 2
		};
	}

	public get sizeWithStroke(): Size2D {
		return this._sizeWithStroke;
	}

	public get onClick(): EventHandler {
		return this._onClick;
	}
	public set onClick(v: EventHandler) {
		this._onClick = v;
	}

	//#endregion

	constructor(text: string, onClick: EventHandler, size: Size2D = { width: 180, height: 60 }) {
		super();

		this._size = size;
		this._sizeWithStroke = {
			width: this._size.width + Button.strokeSize * 2,
			height: this._size.height + Button.strokeSize * 2
		};
		this._onClick = onClick;

		const buttonGraphic = new createjs.Graphics()
			.setStrokeStyle(Button.strokeSize)
			.beginStroke(Button.strokeColor)
			.beginFill(Button.fillColor)
			.drawRect(0, 0, this._size.width, this._size.height);
		this._shapeRenderer = new ShapeRenderer(this, buttonGraphic);
		this.addComponent(ShapeRenderer, this._shapeRenderer);

		this._textRenderer = new TextRenderer(this, text, Button.fontColor, {
			x: this._size.width / 2,
			y: this._size.height / 2
		});
		this._textRenderer.centered = true;
		this.addComponent(TextRenderer, this._textRenderer);

		//

		this._hoverFilter = new createjs.ColorFilter(0.9, 0.9, 1, 1);

		//

		this.eventManager.addListener(EventName.GameObject_Init, () => {
			this._initEvents();
		});

		this.eventManager.addListener(EventName.GameObject_Destroy, () => {
			this._destroyEvents();
		});
	}

	private _initEvents(): void {
		this.container.on("click", this._onClick);

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		this.container.on("mouseover", event => {
			this._shapeRenderer.shape.filters = [this._hoverFilter];
			this._shapeRenderer.shape.cache(
				-Button.strokeSize,
				-Button.strokeSize,
				this._size.width + Button.strokeSize * 2,
				this._size.height + Button.strokeSize * 2
			);
		});

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		this.container.on("mouseout", event => {
			this._shapeRenderer.shape.filters = [];
			this._shapeRenderer.shape.cache(
				-Button.strokeSize,
				-Button.strokeSize,
				this._sizeWithStroke.width,
				this._sizeWithStroke.height
			);
		});
	}

	private _destroyEvents(): void {
		const shape = this._shapeRenderer.shape;
		if (shape) {
			shape.removeAllEventListeners();
		}
	}
}
