export abstract class Game {
	protected _canvas: HTMLCanvasElement;
	protected _stage: createjs.Stage;

	constructor() {
		this._canvas = document.getElementsByTagName('canvas')[0];
		this._stage = new createjs.Stage(this._canvas);

		window.addEventListener("load", () => {
			this.Start();
		});
	}

	public Start(): void {
		createjs.Ticker.framerate = 60; // 60 fps
		createjs.Ticker.on('tick', () => {
			this.Update();
		});
		// this._stage.enableMouseOver(20);
	}

	public Update(): void {
		this._stage.update();
	}
}
