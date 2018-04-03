"use strict";

GameStates.makeGame = function( game, shared ) {

    var basket;
    var stars;
    var cursors;

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

    let star = stars.create(game.world.randomX, 100, 'stars', game.rnd.between(0, 4));
    star.body.collideWorldBounds = true;
    star.body.onWorldBounds = new Phaser.Signal();
    star.body.onWorldBounds.add(loseLife, this);
    console.log("star spawn");

    } 
    
    //this will turn into a catching thing for the basket
    function updateScore(a, star) {
        score++;
        scoreText.setText("Score: " + score);
        star.kill();
    }

    return {

        create: function () {

            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.stage.backgroundColor = '#003ea3';

            //creates the stars group
            stars = game.add.group();
            stars.enableBody = true;
            stars.physicsBodyType = Phaser.Physics.ARCADE;
            
           
            //creates the basket
            basket = game.add.sprite(game.world.centerX, game.world.height-150, 'basket');

            game.physics.arcade.gravity.y = 300;

            game.physics.arcade.enable(game.world, true);

            //creates cursor input objects
            cursors = game.input.keyboard.createCursorKeys();

            //loop calls the method that spawns the stars
            game.time.events.loop(Phaser.Timer.SECOND, fire, this);

            //text UI
            game.add.text(600, 16, 'Left / Right to move', { font: '18px Arial', fill: '#ffffff' });
            scoreText = game.add.text(16, 16, 'Score: ' + score, { font: '18px Arial', fill: '#ffffff'});
            lifeText = game.add.text(game.world.centerX, 16, 'Lives: ' + lives, { font: '18px Arial', fill: '#ffffff'});
           
            //basket can collide with world bounds, and when it collides with a star, update the score
           basket.body.collideWorldBounds = true;
           basket.body.onCollide = new Phaser.Signal();
           basket.body.onCollide.add(updateScore, this);
        },
    
        update: function () {
            game.physics.arcade.collide(basket, stars);
            
            let basketSpeed = 200;
            basket.body.velocity.x = 0;
        
            if (cursors.left.isDown)
            {
                basket.body.velocity.x = -basketSpeed;
            }
            else if (cursors.right.isDown)
            {
                basket.body.velocity.x = basketSpeed;
            }
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
