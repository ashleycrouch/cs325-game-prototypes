"use strict";

window.onload = function() {
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    function preload() {
        game.load.image( 'golfball', 'assets/golfball.png' );
        game.load.audio('ballnoise', 'assets/golf-hitting-ball.wav');
    }
    
    let bouncy;
    let ballNoise;
    function create() {

        game.stage.backgroundColor = '#24c927';
        ballNoise = game.sound.add('ballnoise');

        bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'golfball' );
        bouncy.scale.setTo(0.5, 0.5);
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.25, 0.25 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
       
        bouncy.body.velocity.y = 200;
        bouncy.body.velocity.x = 200;
        bouncy.body.bounce.y = 1;
        bouncy.body.bounce.x = 1;

        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
        //sets up the collision signal for listening for
        //colliding with the world bounds
        bouncy.body.onWorldBounds = new Phaser.Signal();
        bouncy.body.onWorldBounds.add(playBounce, this);
    }
    
    function start(){
        
    }

    function playBounce(){
        //play the bounce sound
        ballNoise.play();
    }
    
    function update() {
    }
};
