"use strict";

//The initial setup
var playerCards;
var enemyCards;

var baseDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

var player;// = {hearts:[], diamonds:[], clubs:[], spades:[], heartStash:[]};
var enemy;// = {hearts:[], diamonds:[], clubs:[], spades:[]};

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
        let hearts = shuffle(baseDeck);
        let diamonds = shuffle(baseDeck);
        let clubs = shuffle(baseDeck);
        let spades = shuffle(baseDeck);

        let heartsUsed = [];
        let diamondsUsed = [];
        let clubsUsed = [];
        let spadesUsed = []; //fill these using array.pop() method

        let heartStash = 20;
        let diamondStash = 0;

        //handles the hearts deck
    this.useHearts = function()
    {
        let heartVal = hearts.pop();
        heartsUsed.push(heartVal);
        if(heartVal == 'K')
        {
            heartVal = hearts.pop();
            heartsUsed.push(heartVal);
            if(heartVal == 'J')
            {
                heartVal = hearts.pop();
                heartsUsed.push(heartVal);
                this.gainHearts(heartVal*4);
            }
            else
            {
                this.gainHearts(heartVal*2);
            }
        }
        else if(heartVal == 'Q')
        {
            if(heartsUsed.indexOf('J') == -1 && heartsUsed.indexOf('K') == -1)
            {
                heartsUsed = [];
                hearts = shuffle(baseDeck);
            }
            else
            {
                //player wins the game
            }
        }
        else if(heartVal == 'J')
        {
            heartVal = heartsUsed[heartsUsed.length-1];
            if(heartVal != null)
            {
                this.gainHearts(heartVal);
            }
        }
        else
        {
            this.gainHearts(heartVal);
        }
    }

    
    

    //handles the diamond deck
    this.useDiamonds = function()
    {
        let diamondVal = diamonds.pop();
        diamondsUsed.push(diamondVal);
        if(diamondVal == 'K')
        {
            diamondVal = diamonds.pop();
            diamondsUsed.push(diamondVal);
            if(diamondVal == 'J')
            {
                diamondVal = diamonds.pop();
                diamondsUsed.push(diamondVal);
                this.gainDiamonds(diamondVal*4);
            }
            else
            {
                this.gainDiamonds(diamondVal*2);
            }
        }
        else if(diamondVal == 'Q')
        {
            if(diamondsUsed.indexOf('J') == -1 && diamondsUsed.indexOf('K') == -1)
            {
                diamondsUsed = [];
                diamonds = shuffle(baseDeck);
            }
            else
            {
                //player wins the game
            }
        }
        else if(diamondVal == 'J')
        {
            diamondVal = diamondsUsed[diamondsUsed.length-1];
            if(diamondVal != null)
            {
                this.gainDiamonds(diamondVal);
            }
        }
        else
        {
            this.gainDiamonds(diamondVal);
        }
    }
    //handles spades deck
    //enemy is a Player
    this.useSpades = function(enemy)
    {
        let spadeVal = spades.pop();
        spadesUsed.push(spadeVal);
        if(spadeVal == 'K')
        {
            spadeVal = spades.pop();
            spadesUsed.push(spadeVal);
            if(spadeVal == 'J')
            {
                spadeVal = spades.pop();
                spadesUsed.push(spadeVal);
                enemy.loseHearts(spadeVal*4);
            }
            else
            {
                enemy.loseHearts(spadeVal*2);
            }
        }
        else if(spadeVal == 'Q')
        {
            if(spadesUsed.indexOf('J') == -1 && spadesUsed.indexOf('K') == -1)
            {
                spadesUsed = [];
                spades = shuffle(baseDeck);
            }
            else
            {
                //player wins the game
            }
        }
        else if(spadeVal == 'J')
        {
            spadeVal = spadesUsed[spadesUsed.length-1];
            if(spadeVal != null)
            {
                enemy.loseHearts(spadeVal);
            }
        }
        else
        {
            enemy.loseHearts(spadeVal);
        }
    }

    


    //handles clubs deck
    //enemy is a Player
    this.useClubs = function(enemy)
    {
        let clubVal = clubs.pop();
        clubsUsed.push(clubVal);
        if(clubVal == 'K')
        {
            clubVal = clubs.pop();
            clubsUsed.push(clubVal);
            if(clubVal == 'J')
            {
                clubVal = clubs.pop();
                clubsUsed.push(clubVal);
                enemy.loseDiamonds(clubVal*4);
                this.gainDiamonds(clubVal*4);
            }
            else
            {
                enemy.loseDiamonds(clubVal*2);
                this.gainDiamonds(clubVal*2);
            }
        }
        else if(clubVal == 'Q')
        {
            if(clubsUsed.indexOf('J') == -1 && clubsUsed.indexOf('K') == -1)
            {
                clubsUsed = [];
                clubs = shuffle(baseDeck);
            }
            else
            {
                //player wins the game
            }
        }
        else if(clubVal == 'J')
        {
            clubVal = clubsUsed[clubsUsed.length-1];
            if(clubVal != null)
            {
                enemy.loseDiamonds(clubVal);
                this.gainDiamonds(clubVal)
            }
        }
        else
        {
            enemy.loseDiamonds(clubVal);
            this.gainDiamonds(clubVal);
        }
    }

       //basic functions for gaining/losing hearts/diamonds
       this.gainHearts = function(val)
       {
           heartStash += val;
       }
   
       this.loseHearts = function(val)
       {
           heartStash -= val;
           if(heartStash < 0)
           {
               heartStash = 0;
               //player loses the game
           }
       }
   
       this.gainDiamonds = function(val)
       {
           diamondStash += val;
           if(diamondStash >= 20)
           {
               //player wins the game
           }
       }
   
       this.loseDiamonds = function(val)
       {
           diamondStash -= val;
           if(diamondStash < 0)
           {
               diamondStash = 0;
           }
       }
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
            player = new Player();
            enemy = new Player();
            allowInput = true;

            playerCards = game.add.group();
            playerCards.inputEnableChildren = true;
            playerCards.onChildInputOut.add(function out(sprite)
            {
                game.add.tween(sprite.scale).to( { x: 1, y: 1 }, 1, Phaser.Easing.Linear.None, true); /*try to add text to say what the button does*/
            }, this);
            playerCards.onChildInputOver.add(function over(sprite)
            {
                game.add.tween(sprite.scale).to( { x: 1.1, y: 1.1 }, 1, Phaser.Easing.Linear.None, true);
            }, this);
            let heartButton = playerCards.create(100, 700, 'heart');
            heartButton.anchor.setTo(0.5, 0.5);
            //text = game.add.text(250, 16, '', { fill: '#ffffff' });
            heartButton.events.onInputDown.add(player.useHearts, player);
            heartButton.input.useHandCursor = true;

            let diamondButton = playerCards.create(300, 700, 'diamond');
            diamondButton.anchor.setTo(0.5, 0.5);
            diamondButton.input.useHandCursor = true;

            let spadeButton = playerCards.create(500, 700, 'spade');
            spadeButton.anchor.setTo(0.5, 0.5);
            spadeButton.input.useHandCursor = true;

            let clubButton = playerCards.create(700, 700, 'club');
            clubButton.anchor.setTo(0.5, 0.5);
            clubButton.input.useHandCursor = true;

            enemyCards = game.add.group();

            let enemyClub = enemyCards.create(100, 100, 'club');
            enemyClub.anchor.setTo(0.5, 0.5);
            enemyClub.angle = 180;

            let enemySpade = enemyCards.create(300, 100, 'spade');
            enemySpade.anchor.setTo(0.5, 0.5);
            enemySpade.angle = 180;

            let enemyDiamond = enemyCards.create(500, 100, 'diamond');
            enemyDiamond.anchor.setTo(0.5, 0.5);
            enemyDiamond.angle = 180;

            let enemyHeart = enemyCards.create(700, 100, 'heart');
            enemyHeart.anchor.setTo(0.5, 0.5);
            enemyHeart.angle = 180;
            //game.input.mouse.capture = true;
            //game.input.mousePointer.x/.y
        },

        update: function () {
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            // piece.x = game.input.mousePointer.x;
            // piece.y = game.input.mousePointer.y;
    
        }
    }
};

