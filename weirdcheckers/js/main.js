"use strict";
var game;
var gameOptions = {
    tileSize: 200,
    tweenSpeed: 50,
    localStorageName: "highscore"
}

var ROW = 0;
var COL = 1;
window.onload = function() {

	//	Create your Phaser game and inject it into the 'game' div.
	//	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
	var game = new Phaser.Game(480,800,Phaser.AUTO,'blocks-game',{preload:preload, create:create});
    
	var gameConfig = {
        type: Phaser.CANVAS,
        width: gameOptions.tileSize * 4,
        height: gameOptions.tileSize * 4,
		backgroundColor: 0xecf0f1
		scene: [preloadAssets, playGame]
	};
	game = new Phaser.Game(gameConfig);
    window.focus()
    resize();
    window.addEventListener("resize", resize, false);
}

var preloadAssets = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function preloadAssets(){
        Phaser.Scene.call(this, {key: "PreloadAssets"});
    },
    preload: function(){
        this.load.image("spot", "assets/sprites/spot.png");
        this.load.image("gametitle", "assets/sprites/gametitle.png");
        this.load.image("restart", "assets/sprites/restart.png");
        this.load.image("scorepanel", "assets/sprites/scorepanel.png");
        this.load.image("scorelabels", "assets/sprites/scorelabels.png");
        this.load.image("logo", "assets/sprites/logo.png");
        this.load.image("howtoplay", "assets/sprites/howtoplay.png");
        this.load.spritesheet("tiles", "assets/sprites/tiles.png", {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
        this.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");
        this.load.audio("move", ["assets/sounds/move.ogg", "assets/sounds/move.mp3"]);
        this.load.audio("grow", ["assets/sounds/grow.ogg", "assets/sounds/grow.mp3"]);
    },
    create: function(){
        this.scene.start("PlayGame");
    }
})



















var shared = {};
	
	game.state.add( 'Boot', GameStates.makeBoot( game ) );
	game.state.add( 'Preloader', GameStates.makePreloader( game ) );
	game.state.add( 'MainMenu', GameStates.makeMainMenu( game, shared ) );
	game.state.add( 'Game', GameStates.makeGame( game, shared ) );

	//	Now start the Boot state.
	game.state.start('Boot');

}

