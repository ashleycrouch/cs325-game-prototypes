"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    let chicken;
    var score = 0;
    var difficulty;
    var cursors;
    
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

            // game.stage.backgroundColor = '#24c927';
            // ballNoise = game.sound.add('ballnoise');
    
            // bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'golfball' );
            // bouncy.scale.setTo(0.5, 0.5);
            // // Anchor the sprite at its center, as opposed to its top-left corner.
            // // so it will be truly centered.
            // bouncy.anchor.setTo( 0.25, 0.25 );
            
            // // Turn on the arcade physics engine for this sprite.
            // game.physics.enable( bouncy, Phaser.Physics.ARCADE );
           
            // bouncy.body.velocity.y = 200;
            // bouncy.body.velocity.x = 200;
            // bouncy.body.bounce.y = 1;
            // bouncy.body.bounce.x = 1;
    
            // // Make it bounce off of the world bounds.
            // bouncy.body.collideWorldBounds = true;
            // //sets up the collision signal for listening for
            // //colliding with the world bounds
            // bouncy.body.onWorldBounds = new Phaser.Signal();
            // bouncy.body.onWorldBounds.add(playBounce, this);



            //change background color
            game.stage.backgroundColor = '#24c927';

            var streets = game.add.group();
            var cars = game.add.group(); 

            // var carCollisionGroup = game.physics.ARCADE.createCollisionGroup();
            // var streetCollisionGroup = game.physics.ARCADE.createCollisionGroup();


            //makes the streets that the chicken will walk across
            streets.createMultiple(4, 'roadpiece', 0, true);
            streets.align(1, 3, 0, 700);
            streets.y = 50;
            streets.height = game.world.height - 100;


            //keyboard inputs
            cursors = game.input.keyboard.createCursorKeys();

            //create chicken
            chicken = game.add.sprite(game.world.centerX, game.world.height, 'chicken');
            chicken.scale.setTo(0.25, 0.25);
            chicken.anchor.setTo(0.5, 0.5);
             
            // Turn on the arcade physics engine for this sprite.
            game.physics.enable(chicken, Phaser.Physics.ARCADE);
    
            // Make it bounce off of the world bounds
            //chicken.body.enable = true;
            chicken.body.collideWorldBounds = true;
            chicken.checkWorldBounds = true;

            //random number stuff for determining the speed of the cars on a street
            //game.rnd.integerInRange(0, 10);

          
            game.physics.arcade.checkCollision.up = false;  // Enable collision for all world bounds except right
            chicken.body.onOutOfBounds = new Phaser.Signal();
            chicken.body.onOutOfBounds.add(function() {quitGame();}, this);
            //all.events.onOutOfBounds.add(nextLevel(), this);
        
        },
    
        update: function () {

            let chickSpeed = 150;
            if(cursors.left.isDown)
            {
                chicken.body.velocity.x = -chickSpeed;
                chicken.scale.x = -0.25;
            }
            else if(cursors.right.isDown)
            {
                chicken.body.velocity.x = chickSpeed;
                chicken.scale.x = 0.25;
            }
            else if(cursors.up.isDown)
            {
                chicken.body.velocity.y = -chickSpeed;
            }
            else
            {
                chicken.body.velocity.x = 0;
                chicken.body.velocity.y = 0;
            }

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
