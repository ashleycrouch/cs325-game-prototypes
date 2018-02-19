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

    //not sure if I need this
    function checkBounds(star) {

        if (star.y > 600)
        {
            star.kill();
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
    
    return {


        create: function () {
            game.physics.startSystem(Phaser.Physics.ARCADE);

            game.stage.backgroundColor = '#2d2d2d';

            stars = game.add.group();
            game.physics.arcade.enable(game.world, true);

            atari.body.allowGravity = 0;
            atari.body.immovable = true;

            cursors = game.input.keyboard.createCursorKeys();
            game.add.text(16, 16, 'Left / Right to move', { font: '18px Arial', fill: '#ffffff' });






            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            
            // Create a sprite at the center of the screen using the 'logo' image.
            bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
            bouncy.anchor.setTo( 0.5, 0.5 );
            
            // Turn on the arcade physics engine for this sprite.
            game.physics.enable( bouncy, Phaser.Physics.ARCADE );
            // Make it bounce off of the world bounds.
            bouncy.body.collideWorldBounds = true;
            
            // When you click on the sprite, you go back to the MainMenu.
            bouncy.inputEnabled = true;
            bouncy.events.onInputDown.add( function() { quitGame(); }, this );
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
        
            balls.forEachAlive(checkBounds, this);
        
        }
    };
};
