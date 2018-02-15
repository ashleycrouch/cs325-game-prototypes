"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    let chicken;
    var cars;
    var streets;
    var score = 0;
    var difficulty;
    var cursors;

    var timer;
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }

    function spawnCar(streetCoord, onLeft){

        if(onLeft == true)
        {
            let newCar = cars.create(0, streetCoord, 'car');
            game.physics.enable(newCar, Phaser.Physics.ARCADE);
            newCar.body.velocity.x = game.rnd.integerInRange(50, 100);
            newCar.scale.setTo(0.05, 0.05);
            newCar.anchor.setTo(0.5, 0.5);
            newCar.angle = 270;
        }
        else{
            let newCar = cars.create(game.world.width, streetCoord, 'car');
            game.physics.enable(newCar, Phaser.Physics.ARCADE);
            newCar.body.velocity.x = -game.rnd.integerInRange(50, 100);
            newCar.scale.setTo(0.05, 0.05);
            newCar.anchor.setTo(0.5, 0.5);
            newCar.angle = 90;
        }
     }
    
    return {
    
        //boot.js loads in:
        //  roadpiece
        //  redcar
        create: function () {

            game.physics.startSystem(Phaser.Physics.P2JS);
            //change background color
            game.stage.backgroundColor = '#24c927';

            streets = game.add.group();
            cars = game.add.group(); 

            var carCollisionGroup = game.physics.p2.createCollisionGroup();
            // var streetCollisionGroup = game.physics.ARCADE.createCollisionGroup();


            //makes the streets that the chicken will walk across
            streets.createMultiple(4, 'roadpiece', 0, true);
            streets.align(1, 3, 0, 700);
            streets.y = 50;
            streets.height = game.world.height - 100;

            //keyboard inputs
            cursors = game.input.keyboard.createCursorKeys();

            //  Create our Timer
            timer = game.time.create(false);
            //  Set a TimerEvent to occur after 4 seconds
            timer.loop(4000, [spawnCar(100, true), spawnCar(300, false), spawnCar(500, true)], this);
            //  Start the timer running - this is important!
            //  It won't start automatically, allowing you to hook it to button events and the like.
            timer.start();


            //create chicken
            chicken = game.add.sprite(game.world.centerX, game.world.height, 'chicken');
            chicken.scale.setTo(0.25, 0.25);
            chicken.anchor.setTo(0.5, 0.5);

            // Turn on the arcade physics engine for this sprite.
            game.physics.enable(chicken, Phaser.Physics.p2);

            //chicken.body.setCollisionGroup(carCollisionGroup);
            //chicken.body.collides(carCollisionGroup, quitGame, this);
             
            
    
            // Make it bounce off of the world bounds
            //chicken.body.enable = true;
            chicken.body.collideWorldBounds = true;
            chicken.checkWorldBounds = true;

           
          
            game.physics.arcade.checkCollision.up = false;  // Enable collision for all world bounds except right
            chicken.body.onOutOfBounds = new Phaser.Signal();
            chicken.body.onOutOfBounds.add(function() {quitGame();}, this);
            //all.events.onOutOfBounds.add(nextLevel(), this);
        
        },
       
        nextLevel: function(){
            create();
            //set score so score keeps going
            difficulty++;
        },
        update: function () {

            let chickSpeed = 50;
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
        }
    };
};
