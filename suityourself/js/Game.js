"use strict";

//The initial setup
var playerCards;
var enemyCards;

var baseDeck = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K'];

var player;// = {hearts:[], diamonds:[], clubs:[], spades:[], heartStash:[]};
var enemy;// = {hearts:[], diamonds:[], clubs:[], spades:[]};

var allowInput = true;

GameStates.makeGame = function(game, shared) 
{//this.hearts = baseDeck;
    this.hearts = shuffle(baseDeck);
    console.log(this.hearts);
    this.diamonds = shuffle(baseDeck);
    this.clubs = shuffle(baseDeck);
    this.spades = shuffle(baseDeck);

    this.heartsUsed = [];
    this.diamondsUsed = [];
    this.clubsUsed = [];
    this.spadesUsed = []; //fill these using array.pop() method

    this.heartStash = 20;
    this.diamondStash = 0;

    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
    }

    //array shuffling method
    function shuffle(a) {
        var j, x, i;
        for (i = a.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = a[i];
            a[i] = a[j];
            a[j] = x;
        }
        return a;
    }

    class Player
    {
        constructor()
        {
            { //Variables and Initialization
            //this.hearts = baseDeck;
            this.hearts = shuffle(baseDeck);
            console.log(this.hearts);
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

            { //Functions
                /*
                this.useHearts = function()
                    {
                        //console.log(Player.hearts);
                        let heartVal = this.hearts.pop();
                        this.heartsUsed.push(heartVal);
                        if(heartVal == 'K')
                        {
                            heartVal = this.hearts.pop();
                            this.heartsUsed.push(heartVal);
                            if(heartVal == 'J')
                            {
                                heartVal = this.hearts.pop();
                                this.heartsUsed.push(heartVal);
                                this.gainHearts(heartVal*4);
                            }
                            else
                            {
                                this.gainHearts(heartVal*2);
                            }
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
                */

            }
        }
        
        
    }

    {
    
    function Player()
    {
        //this.hearts = baseDeck;
        this.hearts = shuffle(baseDeck);
        console.log(this.hearts);
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
            //handles the hearts deck
        Player.prototype.useHearts = function()
        {
            //console.log(Player.hearts);
            let heartVal = this.hearts.pop();
            this.heartsUsed.push(heartVal);
            if(heartVal == 'K')
            {
                heartVal = this.hearts.pop();
                this.heartsUsed.push(heartVal);
                if(heartVal == 'J')
                {
                    heartVal = this.hearts.pop();
                    this.heartsUsed.push(heartVal);
                    this.gainHearts(heartVal*4);
                }
                else
                {
                    this.gainHearts(heartVal*2);
                }
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
        Player.prototype.useDiamonds = function()
        {
            let diamondVal = this.diamonds.pop();
            this.diamondsUsed.push(diamondVal);
            if(diamondVal == 'K')
            {
                diamondVal = this.diamonds.pop();
                this.diamondsUsed.push(diamondVal);
                if(diamondVal == 'J')
                {
                    diamondVal = this.diamonds.pop();
                    this.diamondsUsed.push(diamondVal);
                    this.gainDiamonds(diamondVal*4);
                }
                else
                {
                    this.gainDiamonds(diamondVal*2);
                }
            }
            else if(diamondVal == 'Q')
            {
                if(this.diamondsUsed.indexOf('J') == -1 && this.diamondsUsed.indexOf('K') == -1)
                {
                    this.diamondsUsed = [];
                    this.diamonds = shuffle(baseDeck);
                }
                else
                {
                    //player wins the game
                }
            }
            else if(diamondVal == 'J')
            {
                diamondVal = this.diamondsUsed[this.diamondsUsed.length-1];
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
        Player.prototype.useSpades = function(enemy)
        {
            let spadeVal = this.spades.pop();
            this.spadesUsed.push(spadeVal);
            if(spadeVal == 'K')
            {
                spadeVal = this.spades.pop();
                this.spadesUsed.push(spadeVal);
                if(spadeVal == 'J')
                {
                    spadeVal = this.spades.pop();
                    this.spadesUsed.push(spadeVal);
                    enemy.loseHearts(spadeVal*4);
                }
                else
                {
                    enemy.loseHearts(spadeVal*2);
                }
            }
            else if(spadeVal == 'Q')
            {
                if(this.spadesUsed.indexOf('J') == -1 && this.spadesUsed.indexOf('K') == -1)
                {
                    this.spadesUsed = [];
                    this.spades = shuffle(baseDeck);
                }
                else
                {
                    //player wins the game
                }
            }
            else if(spadeVal == 'J')
            {
                spadeVal = this.spadesUsed[this.spadesUsed.length-1];
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
        Player.prototype.useClubs = function(enemy)
        {
            let clubVal = this.clubs.pop();
            this.clubsUsed.push(clubVal);
            if(clubVal == 'K')
            {
                clubVal = this.clubs.pop();
                this.clubsUsed.push(clubVal);
                if(clubVal == 'J')
                {
                    clubVal = this.clubs.pop();
                    this.clubsUsed.push(clubVal);
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
                if(this.clubsUsed.indexOf('J') == -1 && this.clubsUsed.indexOf('K') == -1)
                {
                    this.clubsUsed = [];
                    this.clubs = shuffle(baseDeck);
                }
                else
                {
                    //player wins the game
                }
            }
            else if(clubVal == 'J')
            {
                clubVal = this.clubsUsed[this.clubsUsed.length-1];
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
        Player.prototype.gainHearts = function(val)
        {
            this.heartStash += val;
        }

        Player.prototype.loseHearts = function(val)
        {
            this.heartStash -= val;
            if(this.heartStash < 0)
            {
                this.heartStash = 0;
                //player loses the game
            }
        }

        Player.prototype.gainDiamonds = function(val)
        {
            this.diamondStash += val;
            if(this.diamondStash >= 20)
            {
                //player wins the game
            }
        }

        Player.prototype.loseDiamonds = function(val)
        {
            this.diamondStash -= val;
            if(this.diamondStash < 0)
            {
                this.diamondStash = 0;
            }
        }
    
    }


<<<<<<< HEAD
=======

    

>>>>>>> parent of f5e39eb... simplified mouse over code
    return {

        create: function () {
            let board = game.add.sprite(0, 0, 'board');
            player = new Player();
            enemy = new Player();
            allowInput = true;

            playerCards = game.add.group();

            let heartButton = playerCards.create(100, 700, 'heart');
            heartButton.anchor.setTo(0.5, 0.5);
            heartButton.inputEnabled = true;
            heartButton.events.onInputOver.add(function over() 
                {
                    game.add.tween(heartButton.scale).to( { x: 1.1, y: 1.1 }, 2000, Phaser.Easing.Linear.None, true);
                });
            heartButton.events.onInputOut.add(function out()
                {game.add.tween(heartButton.scale).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Linear.None, true); /*try to add text to say what the button does*/
                });
            //text = game.add.text(250, 16, '', { fill: '#ffffff' });
<<<<<<< HEAD
            heartButton.events.onInputDown.add(player.useHearts, player);
=======

            heartButton.events.onInputDown.add(player.useHearts, this);
>>>>>>> parent of f5e39eb... simplified mouse over code
            heartButton.input.useHandCursor = true;

            let diamondButton = playerCards.create(300, 700, 'diamond');
            diamondButton.anchor.setTo(0.5, 0.5);
            diamondButton.inputEnabled = true;
            diamondButton.events.onInputOver.add(function over() 
                {
                    game.add.tween(diamondButton.scale).to( { x: 1.1, y: 1.1 }, 2000, Phaser.Easing.Linear.None, true);
                });
            diamondButton.events.onInputOut.add(function out()
                {game.add.tween(diamondButton.scale).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Linear.None, true); /*try to add text to say what the button does*/
                });
            diamondButton.input.useHandCursor = true;

            let spadeButton = playerCards.create(500, 700, 'spade');
            spadeButton.anchor.setTo(0.5, 0.5);
            spadeButton.inputEnabled = true;
            spadeButton.events.onInputOver.add(function over() 
                {
                    game.add.tween(spadeButton.scale).to( { x: 1.1, y: 1.1 }, 2000, Phaser.Easing.Linear.None, true);
                });
            spadeButton.events.onInputOut.add(function out()
                {game.add.tween(spadeButton.scale).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Linear.None, true); /*try to add text to say what the button does*/
                });
            spadeButton.input.useHandCursor = true;

            let clubButton = playerCards.create(700, 700, 'club');
            clubButton.anchor.setTo(0.5, 0.5);
            clubButton.inputEnabled = true;
            clubButton.events.onInputOver.add(function over() 
                {
                    game.add.tween(clubButton.scale).to( { x: 1.1, y: 1.1 }, 2000, Phaser.Easing.Linear.None, true);
                });
                clubButton.events.onInputOut.add(function out()
                {game.add.tween(clubButton.scale).to( { x: 1, y: 1 }, 2000, Phaser.Easing.Linear.None, true); /*try to add text to say what the button does*/
                });
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

