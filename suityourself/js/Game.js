"use strict";

//The initial setup
var playerCards;
var enemyCards;

var baseDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

var allowInput = true;

GameStates.makeGame = function(game, shared) 
{
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }

    function Player()
    {
        this.hearts = shuffle(baseDeck);
        this.diamonds = shuffle(baseDeck);
        this.clubs = shuffle(baseDeck);
        this.spades = shuffle(baseDeck);

        this.heartsUsed = [];
        this.diamondsUsed = [];
        this.clubsUsed = [];
        this.spadesUsed = []; //fill these using array.pop() method

        this.heartStash = 20;
        this.diamondStash = 0;
    }

    //make one function that works for all decks?
    Player.useHearts = function()
    {
        let heartVal = this.hearts.pop();
        this.heartsUsed.push(heartVal);
        if(heartVal == 'K')
        {
            heartVal = this.hearts.pop();
            this.heartsUsed.push(heartVal);
            this.gainHearts(heartVal*2);
        }
        else if(heartVal == 'Q')
        {
            if(this.heartsUsed.indexOf('J') == -1 && this.heartsUsed.indexOf('K') == -1)
            {
                this.heartsUsed = [];
                this.hearts = shuffle(baseDeck);
            }
            else
            {
                //player wins the game
            }
        }
        else if(heartVal == 'J')
        {
            heartVal = this.heartsUsed[this.heartsUsed.length-1];
            if(heartVal == null)
            {
                //don't do anything? 
            }
        }
        else
        {
            this.gainHearts(heartVal);
        }
    }

    Player.gainHearts = function(val)
    {
        this.heartStash += val;
    }

    Player.loseHearts = function(val)
    {
        this.heartStash -= val;
    }

    Player.gainDiamonds = function(val)
    {
        this.diamondStash += val;
    }

    Player.loseDiamonds = function(val)
    {
        this.diamondStash -= val;
    }

    function enemyGainDiamonds(val)
    {
        enemyDiamonds += val;
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

