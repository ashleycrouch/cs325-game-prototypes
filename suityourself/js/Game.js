"use strict";

//The initial setup
var playerArray = [];
var enemyArray = [];

GameStates.makeGame = function( game, shared ) 
{
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }

    //array shuffling method
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;
      
          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }
        return array;
      }
    
    function selectChecker(piece, temp)
    {
        console.log(temp);
        if(allowInput)
        {
            currChecker = piece;
            selectedCheckerStartPos.x = piece.posX;
            selectedCheckerStartPos.y = piece.posY;
        }
    }

    return {

        create: function () {
            let board = game.add.sprite(0, 0, 'board');
            pieceGroup = game.add.group();
            //piece = game.add.sprite(0, 0, 'piece');
            game.input.mouse.capture = true;
            //game.input.mousePointer.x/.y
            addStartingPieces();
            
            
            //new code
            selectedCheckerStartPos = {x: 0, y: 0};
            //used to disable input while gems are dropping down and respawning
            allowInput = false;
            game.input.addMoveCallback(moveChecker, this);
        },

        update: function () {
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            // piece.x = game.input.mousePointer.x;
            // piece.y = game.input.mousePointer.y;
    
        }
    }
};

