export class Game {
    constructor() {
        this._canvas = document.getElementsByTagName('canvas')[0];
        this._stage = new createjs.Stage(this._canvas);
        let game = this;
        window.addEventListener("load", function () {
            game.Start();
        });
    }
    Start() {
        let game = this;
        createjs.Ticker.framerate = 60; // 60 fps
        createjs.Ticker.on('tick', function () {
            game.Update();
        });
        // this._stage.enableMouseOver(20);
    }
    Update() {
        this._stage.update();
    }
}
//# sourceMappingURL=Game.js.map