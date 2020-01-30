let game = (function() {
    let canvas:HTMLCanvasElement;
    let stage:createjs.Stage;

    function Start():void {
        canvas = document.getElementsByTagName('canvas')[0];
        stage = new createjs.Stage(canvas);
        createjs.Ticker.framerate = 60; // 60 fps

        createjs.Ticker.on('tick', Update);

        stage.enableMouseOver(20);

        Main();
    }

    function Update():void {
        stage.update();
    }

    function Main():void {

    }

    window.addEventListener("load", Start);
})();