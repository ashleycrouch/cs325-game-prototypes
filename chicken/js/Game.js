"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var chicken = null;
    var score = 0;
    var difficulty;
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }
    
    return {
    
        //boot.js loads in:
        //  roadpiece
        //  redcar
        create: function () {
            

            //random number stuff for determining the speed of the cars on a street
            //game.rnd.integerInRange(0, 10);

            var streets = game.add.group();
            var cars = game.add.group(); 


           //makes the streets that the chicken will walk across
            streets.createMultiple(4, 'roadpiece', 0, true);
            streets.align(4, -1, 0, 500);
            streets.height = game.world.height;



            chicken = game.add.sprite( game.world.centerX, game.world.height, 'logo' );
            // Anchor the sprite at its center, as opposed to its top-left corner.
            // so it will be truly centered.
           // bouncy.anchor.setTo( 0.5, 0.5 );
            
            // Turn on the arcade physics engine for this sprite.
            game.physics.enable(chicken, Phaser.Physics.ARCADE);
            // Make it bounce off of the world bounds.
            chicken.body.collideWorldBounds = true;
            chicken.checkWorldBounds = true;

            //all.events.onOutOfBounds.add(nextLevel(), this);
            
            // When you click on the sprite, you go back to the MainMenu.
            chicken.inputEnabled = true;
            chicken.events.onInputDown.add( function() { quitGame(); }, this );
        },
    
        update: function () {

        },

        moveChicken: function(){

        },

        spawnCar: function(){

        },
        nextLevel: function(){
            create();
            //set score so score keeps going
            difficulty++;
        }
    };
};
