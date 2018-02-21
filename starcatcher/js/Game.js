"use strict";

GameStates.makeGame = function( game, shared ) {

    var basket;
    var stars;
    var cursors;

    var score = 0;
    var scoreText;

    var lives = 10;
    var lifeText;

    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }

    function loseLife(star){
        star.kill();
        lives--;
        lifeText.setText("Lives: " + lives);
    }

function fire() {

    //stars.createMultiple(50, 'stars', 0, false);
    var star = stars.getFirstExists(false);

        if (star)
        {
            star.frame = game.rnd.integerInRange(0,4);
            star.exists = true;
            star.reset(game.world.randomX, 0);
       }

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

            game.stage.backgroundColor = '#2d2d2d';

            //creates the stars
            stars = game.add.group();
            stars.createMultiple(50, 'stars', 0, false);
           
            //creates the basket
            basket = game.add.sprite(game.world.centerX, game.world.height-150, 'basket');

            game.physics.arcade.gravity.y = 300;

            game.physics.arcade.enable(game.world, true);

            //creates cursor input objects
            cursors = game.input.keyboard.createCursorKeys();

            game.time.events.loop(150, fire, this);

            //game.add.text(16, 16, 'Left / Right to move', { font: '18px Arial', fill: '#ffffff' });
           scoreText = game.add.text(16, 16, 'Score: 0', { font: '18px Arial', fill: '#ffffff' , align: "right"});
            lifeText = game.add.text(16, 16, 'Lives: 10', { font: '18px Arial', fill: '#ffffff' , align: "right"});
           //basket can collide with world bounds, and when it collides with a star, update the score
           basket.body.collideWorldBounds = true;
           basket.body.onCollide = new Phaser.Signal();
           basket.body.onCollide.add(updateScore, this);

        //    stars.forEach.onWorldBounds = new Phaser.Signal();
        //    stars.forEachAlive(loseLife, this);
           // bouncy.inputEnabled = true;
           // bouncy.events.onInputDown.add( function() { quitGame(); }, this );
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
        }
    };
};
