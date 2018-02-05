"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    function preload() {
        
        //load the images in here
        //game.load.image('sky', 'assets/sky.png');
        //game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    }
    function create() {

        var pixelWidth = 6;
        var pixelHeight = 6;

        var ghost = [
            '...111111...',
            '..12222221..',
            '.1222222221.',
            '122222222221',
            '122222222221',
            '122222222221',
            '122222222221',
            '122222222221',
            '122222222221',
            '122222222221',
            '122222222221',
            '122222222221',
            '112121212121',
            '1.1.1.1.1.1.'
        ];

        // var ground = [
        //     '44444444444444444444444444443',
        //     '44444444444444444444444444443',
        //     '44444444444444444444444444443'
        // ]


        game.create.texture('ghost', ghost, pixelWidth, pixelHeight);
        //game.create.texture('ground', ground, pixelWidth, pixelHeight);
        game.add.sprite(game.world.centerX, game.world.centerY, 'ghost');

        //uses the Arcade physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //add a background
        //game.add.sprite(0, 0, 'sky');

        //the platforms group contains the ground and the two ledges we can jump on
        platforms = game.add.group();

        //we will enable physics for any object that is created in this group
        platforms.enableBody = true;
        //enableBody = add rigidbody?

        //here we create the ground
        var ground = platforms.create(0, game.world.height - 64, 'ground');

        //scale it to fit the width of the game
        ground.scale.setTo(2, 2);

        //this stops it from falling away when you jump on it
        ground.body.immovable = true;

        //now let's create two ledges
        var ledge = platforms.create(400, 400, 'ground');

        ledge.body.immovable = true;
        ledge = platforms.create(-150, 250, 'ground');
        ledge.body.immovable = true;

        //the player and its settings
        player = game.add.sprite(32, game.world.height - 150, 'ghost');

        //enable physics on the player
        game.physics.arcade.enable(player);
        
        //player physics has properties
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 300;
        player.body.collideWorldBounds = true;

        //add animations
        //player.animations.add('left', [0, 1, 2, 3], 10, true);
        //player.animations.add('right', [5, 6, 7, 8], 10, true);
    }

      
    
    // var bouncy;
    
    // function create() {

    //     var pixelWidth = 6;
    //     var pixelHeight = 6;

    //     var ghost = [
    //         '...111111...',
    //         '..12222221..',
    //         '.1222222221.',
    //         '122222222221',
    //         '122222222221',
    //         '122222222221',
    //         '122222222221',
    //         '122222222221',
    //         '122222222221',
    //         '122222222221',
    //         '122222222221',
    //         '122222222221',
    //         '112121212121',
    //         '1.1.1.1.1.1.'
    //     ];
    
    //     // var chick = [
    //     //     '...55.......',
    //     //     '.....5......',
    //     //     '...7888887..',
    //     //     '..788888887.',
    //     //     '..888088808.',
    //     //     '..888886666.',
    //     //     '..8888644444',
    //     //     '..8888645555',
    //     //     '888888644444',
    //     //     '88788776555.',
    //     //     '78788788876.',
    //     //     '56655677776.',
    //     //     '456777777654',
    //     //     '.4........4.'
    //     // ];
    
    //     game.create.texture('ghost', ghost, pixelWidth, pixelHeight);
    //     bouncy = game.add.sprite(game.world.centerX, game.world.centerY, 'ghost');

    //     // game.create.texture('wall', wall, pixelWidth, pixelHeight);
    //     // game.add.sprite(game.world.centerX, 0, 'wall');



    //     // Create a sprite at the center of the screen using the 'logo' image.
    //     //bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
    //     // Anchor the sprite at its center, as opposed to its top-left corner.
    //     // so it will be truly centered.
    //     bouncy.anchor.setTo( 0.5, 0.5 );
        
    //     // Turn on the arcade physics engine for this sprite.
    //     game.physics.enable( bouncy, Phaser.Physics.ARCADE );
    //     // Make it bounce off of the world bounds.
    //     bouncy.body.collideWorldBounds = true;
        
    //     // Add some text using a CSS style.
    //     // Center it in X, and position its top 15 pixels from the top of the world.
    //     var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
    //     var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
    //     text.anchor.setTo( 0.5, 0.0 );
    // }
    
    function update() {
        //collide the player and the stars with the platforms
        var hitPlatform = game.physics.arcade.collide(player, platforms);




        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
       // bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
    }
};
