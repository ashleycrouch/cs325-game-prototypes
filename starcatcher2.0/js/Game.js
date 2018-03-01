"use strict";

GameStates.makeGame = function( game, shared ) {

    var basketBot;
    var basketRight;
    var basketLeft;
    var basketTop;
    
    var stars;
    var cursors;

    let startingEnemies = 3;
    let incrementEnemies = 1;
    let maxEnemies = 20;
    let initialDelay = Phaser.Timer.SECOND*4;
    let secondsBetweenEnemyMod = 1;
    let timer;

    var score = 0;
    var scoreText;

    var lives = 5;
    var lifeText;

    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');
        lives = 5;
        score = 0;
    }

    function loseLife(star){
        star.kill();
        lives--;
        lifeText.setText("Lives: " + lives);
    }

    //spawns the stars
function fire() {

    // let minVelocity = 100;
    // let maxVelocity = 250;

    let minVelocity = {};
    minVelocity.y = 100;
    minVelocity.x = 50;

    let maxVelocity = {};
    maxVelocity.y = 250;
    maxVelocity.x = 100;

    let starNum = game.rnd.between(0, 4);
    let star = stars.create(game.world.centerX, 75, 'stars', starNum);
    star.body.collideWorldBounds = true;

    star.body.onWorldBounds = new Phaser.Signal();
    star.body.onWorldBounds.add(loseLife, this);
    let posNum = game.rnd.between(0, 1);
    if(posNum == 1)
    {
        star.body.velocity.x = game.rnd.between(minVelocity.x, maxVelocity.x);
    }
    else
    {
        star.body.velocity.x = -game.rnd.between(minVelocity.x, maxVelocity.x);
    }
    //star.body.velocity.x = game.rnd.between(minVelocity, maxVelocity);
    star.body.velocity.y = (starNum + 2)*50;

    console.log("star spawn");

    } 
    
    //this will turn into a catching thing for the basket
    function updateScore(a, star) {
        let starScore = (star.body.velocity.y);
        score += starScore;
        scoreText.setText("Score: " + score/1);
        star.kill();
    }

    return {

        create: function () {

            game.physics.startSystem(Phaser.Physics.ARCADE);
            let background = game.add.sprite(0, 0, 'background');
            //game.stage.backgroundColor = '#003ea3';

            //creates the stars group
            stars = game.add.group();
            stars.enableBody = true;
            stars.physicsBodyType = Phaser.Physics.ARCADE;
            
           
            //creates the baskets
            basketBot = game.add.sprite(game.world.centerX, game.world.height-150, 'basket');
            
            // basketRight = game.add.sprite(game.world.width - 150, game.world.centerY, 'basket');
            // basketRight.angle = 270;

            // basketLeft = game.add.sprite(150, game.world.centerY, 'basket');
            // basketLeft.angle = 90;

            // basketTop = game.add.sprite(game.world.centerX, 150, 'basket');
            // basketTop.angle = 180;
            //game.physics.arcade.gravity.y = 300;

            game.physics.arcade.enable(game.world, true);

            //creates cursor input objects
            cursors = game.input.keyboard.createCursorKeys();


            // timer = game.time.create(false);
            // timer.loop(initialDelay, function(){
            //     for(var i=0;i<incrementEnemies;i++){
            //         fire();
            //     }
            //     this.delay = initialDelay*secondsBetweenEnemyMod;
            //     secondsBetweenEnemyMod = Math.max(secondsBetweenEnemyMod-0.1, 0.1);
            //     //console.log(this.delay);
            //     scalemod = Math.max(scalemod-0.01, 0.05);
            //     maxVelocity+=10;
            //     incrementEnemies = Math.min(8, incrementEnemies+0.2);
            //     //console.log(incrementEnemies);
            // }, this);
            // timer.start();

            //loop calls the method that spawns the stars
           game.time.events.loop(Phaser.Timer.SECOND, fire, this);


            game.add.text(600, 16, 'Left / Right to move', { font: '18px Arial', fill: '#ffffff' });
            
            scoreText = game.add.text(16, 16, 'Score: ' + score, { font: '18px Arial', fill: '#ffffff'});
            lifeText = game.add.text(game.world.centerX, 16, 'Lives: ' + lives, { font: '18px Arial', fill: '#ffffff'});
           
            //basket can collide with world bounds, and when it collides with a star, update the score
            basketBot.body.collideWorldBounds = true;
            basketBot.body.onCollide = new Phaser.Signal();
            basketBot.body.onCollide.add(updateScore, this);

            // basketRight.body.collideWorldBounds = true;
            // basketRight.body.onCollide = new Phaser.Signal();
            // basketRight.body.onCollide.add(updateScore, this);

            // basketLeft.body.collideWorldBounds = true;
            // basketLeft.body.onCollide = new Phaser.Signal();
            // basketLeft.body.onCollide.add(updateScore, this);

            // basketTop.body.collideWorldBounds = true;
            // basketTop.body.onCollide = new Phaser.Signal();
            // basketTop.body.onCollide.add(updateScore, this);
        },
    
        update: function () {
            game.physics.arcade.collide(basketBot, stars);
            
            let basketSpeed = 400;
            basketBot.body.velocity.x = 0;
        
            if (cursors.left.isDown)
            {
                basketBot.body.velocity.x = -basketSpeed;
                // basketTop.body.velocity.x = -basketSpeed;
            }
            else if (cursors.right.isDown)
            {
                basketBot.body.velocity.x = basketSpeed;
                // basketTop.body.velocity.x = basketSpeed;
            }
            // else if(cursors.up.isDown)
            // {
            //     basketLeft.body.velocity.y = -basketSpeed;
            //     basketRight.body.velocity.y = -basketSpeed;
            // }
            // else if(cursors.down.isDown)
            // {
            //     basketLeft.body.velocity.y = basketSpeed;
            //     basketRight.body.velocity.y = basketSpeed;
            // }

            //rotates the star objects as they fall
            stars.children.forEach(function(star){
                star.anchor.setTo(0.5, 0.5);
                star.angle += 1;
            });

            if(lives <= 0)
            {
                quitGame();
            }
        }
    };
};
