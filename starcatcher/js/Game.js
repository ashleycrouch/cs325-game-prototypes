"use strict";

GameStates.makeGame = function( game, shared ) {

    var basket;
    var stars;
    var cursors;

    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }

function fire() {

    var star = stars.getFirstExists(false);

        if (star)
        {
            star.frame = game.rnd.integerInRange(0,6);
            star.exists = true;
            star.reset(game.world.randomX, 0);

            star.body.bounce.y = 0.8;
       }

    } 
    
    //this will turn into a catching thing for the basket
    function reflect(a, star) {

        if (star.y > (basket.y + 5))
        {
            return true;
        }
        else
        {
            star.body.velocity.x = basket.body.velocity.x;
            star.body.velocity.y *= -(star.body.bounce.y);
    
            return false;
        }
    }
    
    //not sure if I need this
    function checkBounds(star) {

        if (star.y > 600)
        {
            star.kill();
        }
    
    }

    return {


        create: function () {
            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.stage.backgroundColor = '#2d2d2d';

            

            stars = game.add.group();
            stars.createMultiple(250, 'stars', 0, false);

            basket = game.add.sprite(game.world.centerX, game.world.height-150, 'basket');

            game.physics.arcade.gravity.y = 400;

            game.physics.arcade.enable(game.world, true);

            basket.body.allowGravity = 0;
            basket.body.immovable = true;

            cursors = game.input.keyboard.createCursorKeys();

            game.time.events.loop(150, fire, this);

            game.add.text(16, 16, 'Left / Right to move', { font: '18px Arial', fill: '#ffffff' });


           // bouncy.inputEnabled = true;
           // bouncy.events.onInputDown.add( function() { quitGame(); }, this );
        },
    
        update: function () {
            game.physics.arcade.collide(basket, stars, null, reflect, this);

            basket.body.velocity.x = 0;
        
            if (cursors.left.isDown)
            {
                basket.body.velocity.x = -200;
            }
            else if (cursors.right.isDown)
            {
                basket.body.velocity.x = 200;
            }
        
            stars.forEachAlive(checkBounds, this);
        
        }
    };
};
