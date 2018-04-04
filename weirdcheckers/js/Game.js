"use strict";


var ROW = 0;
var COL = 1;

GameStates.makeGame = function( game, shared ) {

    //	Create your Phaser game and inject it into the 'game' div.
	//	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
	//game = new Phaser.Game(800, 800, Phaser.AUTO, 'game'/*, {preload:preload, create:create}*/);
    
	// var gameConfig = {
    //     type: Phaser.CANVAS,
    //     width: gameOptions.tileSize * 8,
    //     height: gameOptions.tileSize * 8,
	// 	backgroundColor: 0xecf0f1
	// 	//scene: [preloadAssets, playGame]
	// };
	// game = new Phaser.Game(gameConfig);
    window.focus()
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }

    return {

        create: function () {
            let background = game.add.sprite(0, 0, 'board');
        },

        update: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
    
    
    
        }
    }
    //         backgroundSprite = game.add.tileSprite(0,0,game.width,game.height,'bg');

    //         //game = new Phaser.Game(480,800,Phaser.AUTO,'blocks-game',{preload:preload, create:create});
    
    //     },

    //     addChecker: function(){
    //         var emptyTiles = [];
    //         for(var i = 0; i < 4; i++){
    //             for(var j = 0; j < 4; j++){
    //                 if(this.fieldArray[i][j].tileValue == 0){
    //                     emptyTiles.push({
    //                         row: i,
    //                         col: j
    //                     })
    //                 }
    //             }
    //         }
    //         if(emptyTiles.length > 0){
    //             var chosenTile = Phaser.Utils.Array.GetRandomElement(emptyTiles);
    //             this.fieldArray[chosenTile.row][chosenTile.col].tileValue = 1;
    //             this.fieldArray[chosenTile.row][chosenTile.col].tileSprite.visible = true;
    //             this.fieldArray[chosenTile.row][chosenTile.col].tileSprite.setFrame(0);
    //             this.tweens.add({
    //                 targets: [this.fieldArray[chosenTile.row][chosenTile.col].tileSprite],
    //                 alpha: 1,
    //                 duration: gameOptions.tweenSpeed,
    //                 onComplete: function(tween){
    //                     tween.parent.scene.canMove = true;
    //                 },
    //             });
    //         }
    //     },
    };

