"use strict";



GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var blob, game;
    var bgData = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABHNCSVQICAgIfAhkiAAAAFFJREFUWIXtzjERACAQBDFgMPOKzr8ScADFFlBsFKRX1WqfStLG68SNQcogZZAySBmkDFIGKYOUQcogZZAySBmkDFIGKYOUQcog9X1wJnl9ONrTcwPWLGFOywAAAABJRU5ErkJggg==";
  
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }

    var dist = function (x1, y1, x2, y2) 
    {
        return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
    }

    var backgroundSprite;
    return {

        create: function () {

            backgroundSprite = game.add.tileSprite(0,0,game.width,game.height,'bg');

            //game = new Phaser.Game(480,800,Phaser.AUTO,'blocks-game',{preload:preload, create:create});
    
        },
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!



        }
    };
};
