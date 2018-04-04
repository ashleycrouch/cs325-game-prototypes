"use strict";

window.onload = function() {

	//	Create your Phaser game and inject it into the 'game' div.
	//	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
	var game = new Phaser.Game(480,800,Phaser.AUTO,'blocks-game',{preload:preload, create:create});
    
	var ROW = 0;
	var COL = 1;
	var gameConfig = {
        type: Phaser.CANVAS,
        width: gameOptions.tileSize * 4,
        height: (gameOptions.tileSize * 4),
        backgroundColor: 0xecf0f1
    }
	var shared = {};
	
	game.state.add( 'Boot', GameStates.makeBoot( game ) );
	game.state.add( 'Preloader', GameStates.makePreloader( game ) );
	game.state.add( 'MainMenu', GameStates.makeMainMenu( game, shared ) );
	game.state.add( 'Game', GameStates.makeGame( game, shared ) );

	//	Now start the Boot state.
	game.state.start('Boot');

}

var gameOptions = {
    tileSize: 200,
    tweenSpeed: 50,
    localStorageName: "highscore"
}

