"use strict";


var ROW = 0;
var COL = 1;

var pieces = [];
var pieceGroup;
var tiles = [];

let tileSize = 100;

//The initial setup
var gameBoard = [ 
    [  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  1,  0,  1,  0,  0 ],
    [  0,  0,  1,  0,  1,  0,  0,  0 ],
    [  0,  0,  0,  1,  0,  1,  0,  0 ],
    [  0,  0,  1,  0,  1,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0 ],
    [  0,  0,  0,  0,  0,  0,  0,  0 ]
  ];

GameStates.makeGame = function( game, shared ) {

    //	Create your Phaser game and inject it into the 'game' div.
	//	We did it in a window.onload event, but you can do it anywhere (requireJS load, anonymous function, jQuery dom ready, - whatever floats your boat)
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }

    //distance formula
    var dist = function (x1, y1, x2, y2) 
    {
        return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
    }

    function Piece (value, position)
    {
        //point value of the piece
        this.value = value;
        //positions on gameBoard array in format row, column
        this.position = position;
    
        this.move = function (tile)
        {
            //move the piece to an appropriate spot
        }

        //tests if piece can jump anywhere
        this.canJumpAny = function () 
        {
            if(this.canOpponentJump([this.position[0]+2, this.position[1]+2]) ||
            this.canOpponentJump([this.position[0]+2, this.position[1]-2]) ||
            this.canOpponentJump([this.position[0]-2, this.position[1]+2]) ||
            this.canOpponentJump([this.position[0]-2, this.position[1]-2])) 
            {
                return true;
            } 
            return false;
        }
    }

    function addStartingPieces()
    {
        //adds the pieces for the start of the game and starts the player's turn
        let x;
        let y;
        for(x = 0; x < 8; x++)
        {
            for(y = 0; y < 8; y++)
            {
                if(gameBoard[x][y] == 1)
                {
                    let realCoords = convertCoordinatesToReal(x, y);
                    let piece = pieceGroup.create(realCoords[0], realCoords[1], 'piece', 0); 
                   // piece.input.useHandCursor = true;
                }
            }
        }
    }

    function spaceAvailable(x, y)
    {
        if(gameBoard[x][y] > 0)
        {
            if(x != 0 && x != 7)
            {
                if(y != 0 && y != 7)
                {
                    return false;
                }
            }
        }
        return true;
    }

    // function spaceAvailable(position)
    // {
    //     if(gameBoard[position[0]][position[1]] > 0)
    //     {
    //         return false;
    //     }
    //     return true;
    // }

    function addPieces(numOfPieces)
    {
        var i;
        for(i = 0; i < numOfPieces; i++)
        {
            let x = game.rnd.between(0, 7);
            let y = game.rnd.between(0, 7);
            while(!spaceAvailable(x, y))
            {
                x = game.rnd.between(0, 7);
                y = game.rnd.between(0, 7);
            }
            let realCoords = convertCoordinatesToReal(x, y);
            let piece = pieceGroup.create(realCoords[0], realCoords[1], 'piece', 0); 
            //piece.input.useHandCursor = true;
            //piece.events.onInputDown.add(pickUpChecker, this);
        }
        //randomly adds a piece to the board
        //figure out the spawning points for more pieces
        //let piece = pieceGroup.create(game.world.centerX, 75, 'piece', starNum);
    }

    function convertCoordinatesToBoard(xReal, yReal)
    {
        //converts real coordinates to board coordinates
        //returns an array with the new coordinates
        return [xReal/tileSize, yReal/tileSize];
    }

    function convertCoordinatesToReal(xBoard, yBoard)
    {
        //converts board coordinates to real coordinates
        //returns an array with the new coordinates
        return[xBoard*tileSize, yBoard*tileSize];
    }

    return {

        create: function () {
            let board = game.add.sprite(0, 0, 'board');
            pieceGroup = game.add.group();
            //piece = game.add.sprite(0, 0, 'piece');
            game.input.mouse.capture = true;
            //game.input.mousePointer.x/.y

            addStartingPieces();
        },

        update: function () {
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            // piece.x = game.input.mousePointer.x;
            // piece.y = game.input.mousePointer.y;
            
    
        }
    }

    //     },

    //     addChecker: function(){
    //         var emptyTiles = [];
    //         for(var i = 0; i < 4; i++){
    //             for(var j = 0; j < 4; j++){
    //                 if(this.fieldArray[i][j].tileValue == 0){
    //                     emptyTiles.push({
    //                         row: i,
    //                         col: j
    //                     })
    //                 }
    //             }
    //         }
    //         if(emptyTiles.length > 0){
    //             var chosenTile = Phaser.Utils.Array.GetRandomElement(emptyTiles);
    //             this.fieldArray[chosenTile.row][chosenTile.col].tileValue = 1;
    //             this.fieldArray[chosenTile.row][chosenTile.col].tileSprite.visible = true;
    //             this.fieldArray[chosenTile.row][chosenTile.col].tileSprite.setFrame(0);
    //             this.tweens.add({
    //                 targets: [this.fieldArray[chosenTile.row][chosenTile.col].tileSprite],
    //                 alpha: 1,
    //                 duration: gameOptions.tweenSpeed,
    //                 onComplete: function(tween){
    //                     tween.parent.scene.canMove = true;
    //                 },
    //             });
    //         }
    //     },
    };

