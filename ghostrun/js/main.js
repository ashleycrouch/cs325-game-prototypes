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
        // Load an image and call it 'logo'.
        //game.load.image( 'logo', 'assets/phaser.png' );
        //game.load.image( 'ghost', 'assets/tempghost.jpg' );


        var wall = [
            '33333333',
            '33333333',
            '33333333',
            '33333333',
            '33333333',
            '33333333',
            '33333333',
            '33333333',
            '33333333',
            '33333333',
            '33333333',
            '33333333',
            '33333333',
            '33333333'
        ]
    }
    
    var bouncy;
    
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
    
        // var chick = [
        //     '...55.......',
        //     '.....5......',
        //     '...7888887..',
        //     '..788888887.',
        //     '..888088808.',
        //     '..888886666.',
        //     '..8888644444',
        //     '..8888645555',
        //     '888888644444',
        //     '88788776555.',
        //     '78788788876.',
        //     '56655677776.',
        //     '456777777654',
        //     '.4........4.'
        // ];
    
        game.create.texture('ghost', ghost, pixelWidth, pixelHeight);
        bouncy = game.add.sprite(game.world.centerX, game.world.centerY, 'ghost');

        game.create.texture('wall', wall, pixelWidth, pixelHeight);
        bouncy = game.add.sprite(game.world.centerX, 0, 'wall');



        // Create a sprite at the center of the screen using the 'logo' image.
        //bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'ghost' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        bouncy.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, game.input.activePointer, 500, 500, 500 );
    }
};
