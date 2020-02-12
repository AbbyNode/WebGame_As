export abstract class Game {
	protected _canvas: HTMLCanvasElement;
	protected _stage: createjs.Stage;

	constructor() {
		this._canvas = document.getElementsByTagName('canvas')[0];
		this._stage = new createjs.Stage(this._canvas);

		let game = this;
		window.addEventListener("load", function() {
			game.Start();
		});
	}

	public Start(): void {
		let game = this;
		createjs.Ticker.framerate = 60; // 60 fps
		createjs.Ticker.on('tick', function() {
			game.Update();
		});
		// this._stage.enableMouseOver(20);
	}

	public Update(): void {
		this._stage.update();
	}
}
