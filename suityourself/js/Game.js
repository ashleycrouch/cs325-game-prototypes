"use strict";

//The initial setup
var playerCards;
var enemyCards;

var playerHealth;
var enemyHealth;

var playerDiamonds;
var enemyDiamonds;

var allowInput = true;

GameStates.makeGame = function(game, shared) 
{
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }

    function playerGainHearts(val)
    {
        playerHealth += val;
    }

    function playerLoseHearts(val)
    {
        playerHealth -= val;
    }

    function enemyGainHearts(val)
    {
        enemyHealth += val;
    }

    function enemyLoseHearts(val)
    {
        enemyHealth -= val;
    }

    function playerGainDiamonds(val)
    {
        playerDiamonds += val;
    }

    function playerLoseDiamonds(val)
    {
        playerDiamonds -= val;
    }

    function enemyGainDiamonds(val)
    {
        enemyDiamonds += val;
    }

    function enemyLoseDiamonds(val)
    {
        enemyDiamonds -= val;
    }

    //array shuffling method
    function shuffle(array) 
    {
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

    return {

        create: function () {
            let board = game.add.sprite(0, 0, 'board');
            //pieceGroup = game.add.group();
            playerCards = game.add.group();
            enemyCards = game.add.group();
            //piece = game.add.sprite(0, 0, 'piece');
            game.input.mouse.capture = true;
            //game.input.mousePointer.x/.y
            allowInput = false;
        },

        update: function () {
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            // piece.x = game.input.mousePointer.x;
            // piece.y = game.input.mousePointer.y;
    
        }
    }
};

