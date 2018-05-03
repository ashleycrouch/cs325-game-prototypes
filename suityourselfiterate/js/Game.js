"use strict";

//The initial setup
var playerCards;
var heartButton;
var diamondButton;
var spadeButton;
var clubButton;

var enemyCards;
var enemyClub;
var enemyDiamond;
var enemyHeart;
var enemySpade;

var playerHealthText;
var enemyHealthText;

var playerDiamondText;
var enemyDiamondText;

var playerTurnText;

var baseDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

var player;
var enemy;

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
        let hearts = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']);
        let diamonds = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']);
        let clubs = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']);
        let spades = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']);

        let heartsUsed = [];
        let diamondsUsed = [];
        let clubsUsed = [];
        let spadesUsed = [];

        let heartStash = 20;
        let diamondStash = 0;

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
                    playerTurnText.text = 'Game over';
                    //player loses the game
                }
            }
        
            this.gainDiamonds = function(val)
            {
                diamondStash += val;
                if(diamondStash >= 20)
                {
                    playerTurnText.text = 'Game over';
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

        this.getHStash = function()
        {
            return heartStash;
        }

        this.getDStash = function()
        {
            return diamondStash;
        }

            //handles the hearts deck
        this.useHearts = function()
        {
            //console.log(sprite);
            let heartVal = hearts.pop();
            if(allowInput)
            {
                //let heartVal = hearts.pop();
                var newText = game.add.text(game.world.centerX, game.world.centerY, 'You drew a ' + heartVal, { fill: '#ef0500ff' });
                game.time.events.add(1, function() {
                    game.add.tween(newText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
                    game.add.tween(newText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
                }, this);
            newText.destroy();
            }
            else
            {
                //let heartVal = hearts.pop();
                game.add.tween(enemyHeart.scale).to( { x: 1, y: 1 }, 1, Phaser.Easing.Linear.None, true);
                var newText = game.add.text(enemyHeart.x, enemyHeart.y, 'They drew a ' + heartVal, { fill: '#ef0500ff' });
                game.time.events.add(1, function() {
                    game.add.tween(newText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
                    game.add.tween(newText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
                }, this);
            newText.destroy();
            }
            
            console.log(heartVal);
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
                    hearts = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']);
                }
                else
                {
                    playerTurnText.text = 'Game over';
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
                //TODO: try to add some flexibility with having this work for enemy sprites OR player sprites
                game.add.tween(heartButton.scale).to( { x: 1, y: 1 }, 1, Phaser.Easing.Linear.None, true); 
                var newText = game.add.text(heartButton.x, heartButton.y, '+' + heartVal, { fill: '#ef0500ff' });
                game.time.events.add(2000, function() {
                    game.add.tween(newText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
                    game.add.tween(newText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
                }, this);
                this.gainHearts(heartVal);
            }
            allowInput = !allowInput;
        }

        //handles the diamond deck
        this.useDiamonds = function()
        {
            let diamondVal = diamonds.pop();
            if(allowInput)
            {
                var newText = game.add.text(game.world.centerX, game.world.centerY, 'You drew a ' + diamondVal, { fill: '#ef0500ff' });
                game.time.events.add(1, function() {
                    game.add.tween(newText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
                    game.add.tween(newText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
                }, this);
            newText.destroy();
            }
            else
            {
                var newText = game.add.text(enemyDiamond.x, enemyDiamond.y, 'They drew a ' + diamondVal, { fill: '#ef0500ff' });
                game.time.events.add(1, function() {
                    game.add.tween(newText).to({y: 0}, 1500, Phaser.Easing.Linear.None, true);
                    game.add.tween(newText).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
                }, this);
            newText.destroy();
            }

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
                    diamonds = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']);
                }
                else
                {
                    playerTurnText.text = 'Game over';
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
            allowInput = !allowInput;
        }

        //handles spades deck
        //enemy is a Player
        this.useSpades = function(enemy)
        {
            if(enemy)
            {
                let enemyObj = enemy;
            }
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
                    this.enemyObj.loseHearts(spadeVal*4);
                }
                else
                {
                    this.enemyObj.loseHearts(spadeVal*2);
                }
            }
            else if(spadeVal == 'Q')
            {
                if(spadesUsed.indexOf('J') == -1 && spadesUsed.indexOf('K') == -1)
                {
                    spadesUsed = [];
                    spades = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']);
                }
                else
                {
                    playerTurnText.text = 'Game over';
                    //player wins the game
                }
            }
            else if(spadeVal == 'J')
            {
                spadeVal = spadesUsed[spadesUsed.length-1];
                if(spadeVal != null)
                {
                    this.enemyObj.loseHearts(spadeVal);
                }
            }
            else
            {
                this.enemyObj.loseHearts(spadeVal);
            }
            allowInput = !allowInput;
        }

        //handles clubs deck
        //enemy is a Player
        this.useClubs = function(enemy)
        {
            if(enemy)
            {
                let enemyObj = enemy;
            }
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
                    this.enemyObj.loseDiamonds(clubVal*4);
                    this.gainDiamonds(clubVal*4);
                }
                else
                {
                    this.enemyObj.loseDiamonds(clubVal*2);
                    this.gainDiamonds(clubVal*2);
                }
            }
            else if(clubVal == 'Q')
            {
                if(clubsUsed.indexOf('J') == -1 && clubsUsed.indexOf('K') == -1)
                {
                    clubsUsed = [];
                    clubs = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K']);
                }
                else
                {
                    playerTurnText.text = 'Game over';
                    //player wins the game
                }
            }
            else if(clubVal == 'J')
            {
                clubVal = clubsUsed[clubsUsed.length-1];
                if(clubVal != null)
                {
                    this.enemyObj.loseDiamonds(clubVal);
                    this.gainDiamonds(clubVal)
                }
            }
            else
            {
                this.enemyObj.loseDiamonds(clubVal);
                this.gainDiamonds(clubVal);
            }
            allowInput = !allowInput;
        }
}
    //array shuffling method
    function shuffle(array) 
    {
        // if(playerTurnText)
        // {
        //     playerTurnText.text = "shuffle!";
        // }
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
            playerHealthText = game.add.text(50, 550, 'Health = ' + player.getHStash(), { fill: '#ef0500ff' });
            playerDiamondText = game.add.text(250, 550, 'Diamond = ' + player.getDStash(), { fill: '#7444acff' });
            playerTurnText = game.add.text(game.world.centerX, game.world.centerY, '', { fill: '#7444acff' });
            
            enemy = new Player();
            enemyHealthText = game.add.text(650, 200, 'Health = ' + enemy.getHStash(), { fill: '#ef0500ff' });
            enemyDiamondText = game.add.text(400, 200, 'Diamond = ' + enemy.getDStash(), { fill: '#7444acff' });

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
            heartButton = playerCards.create(100, 700, 'heart');
            heartButton.anchor.setTo(0.5, 0.5);

            heartButton.events.onInputDown.add(player.useHearts, player);
            heartButton.input.useHandCursor = true;

            diamondButton = playerCards.create(300, 700, 'diamond');
            diamondButton.anchor.setTo(0.5, 0.5);
            diamondButton.events.onInputDown.add(player.useDiamonds, player);
            diamondButton.input.useHandCursor = true;

            spadeButton = playerCards.create(500, 700, 'spade');
            spadeButton.anchor.setTo(0.5, 0.5);
            spadeButton.events.onInputDown.add(player.useSpades, {enemyObj: enemy}, player);
            spadeButton.input.useHandCursor = true;

            clubButton = playerCards.create(700, 700, 'club');
            clubButton.anchor.setTo(0.5, 0.5);
            clubButton.events.onInputDown.add(player.useClubs, {enemyObj: enemy}, player);
            clubButton.input.useHandCursor = true;

            enemyCards = game.add.group();

            enemyClub = enemyCards.create(100, 100, 'club');
            enemyClub.anchor.setTo(0.5, 0.5);
            enemyClub.angle = 180;

            enemySpade = enemyCards.create(300, 100, 'spade');
            enemySpade.anchor.setTo(0.5, 0.5);
            enemySpade.angle = 180;

            enemyDiamond = enemyCards.create(500, 100, 'diamond');
            enemyDiamond.anchor.setTo(0.5, 0.5);
            enemyDiamond.angle = 180;

            enemyHeart = enemyCards.create(700, 100, 'heart');
            enemyHeart.anchor.setTo(0.5, 0.5);
            enemyHeart.angle = 180;
        },

        update: function () {
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            // piece.x = game.input.mousePointer.x;
            // piece.y = game.input.mousePointer.y;

            if(allowInput == false)
            {
                let enemyMove = game.rnd.integerInRange(1, 4);
                if(enemyMove == 1)
                {
                    enemy.useHearts();
                }
                if(enemyMove == 2)
                {
                    enemy.useDiamonds();
                }
                if(enemyMove == 3)
                {
                    enemy.useClubs(player);
                }
                if(enemyMove == 4)
                {
                    enemy.useSpades(player);
                }
            }

            if(allowInput)
            {
                playerTurnText.text = 'Your turn!';
            }
            else
            {
                playerTurnText.text = 'Their turn!';
            }
            
            playerDiamondText.text = 'Diamond = ' + player.getDStash();
            playerHealthText.text = 'Health = ' + player.getHStash();
            enemyDiamondText.text = 'Diamond = ' + enemy.getDStash();
            enemyHealthText.text = 'Health = ' + enemy.getHStash();
        }
    }
};

