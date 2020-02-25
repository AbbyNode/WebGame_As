export class Game {
    constructor() {
        this._canvas = document.getElementsByTagName('canvas')[0];
        this._stage = new createjs.Stage(this._canvas);
        window.addEventListener("load", () => {
            this.Start();
        });
    }
    Start() {
        createjs.Ticker.framerate = 60; // 60 fps
        createjs.Ticker.on('tick', () => {
            this.Update();
        });
        // this._stage.enableMouseOver(20);
    }
    Update() {
        this._stage.update();
    }
}
//# sourceMappingURL=Game.js.map