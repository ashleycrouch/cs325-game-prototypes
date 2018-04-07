"use strict";
var ROW = 0;
var COL = 1;

var pieces = [];
var pieceGroup;
//var tiles = [];

let tileSize = 100;

//The initial setup
var gameBoard = [ 
    [ -1,  0,  -1,  0,  -1,  0,  -1, 0 ],
    [ 0,  -1,  0,  -1,  0,  -1,  0, -1 ],
    [ -1,  0, -1,  1,  -1,  1,  -1,  0 ],
    [ 0,  -1,  1,  -1,  1,  -1,  0, -1 ],
    [ -1,  0,  -1,  1,  -1,  1,  -1, 0 ],
    [ 0,  -1,  1,  -1,  1,  -1,  0, -1 ],
    [ -1,  0,  -1,  0,  -1,  0,  -1, 0 ],
    [ 0,  -1,  0,  -1,  0,  -1,  0, -1 ]
  ];

GameStates.makeGame = function( game, shared ) 
{
    var currChecker = null;
    var selectedCheckerStartPos;
    var tempShiftedChecker = null;
    var allowInput;

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

    function jumpChecker()
    {
        //adds the point value to the
    }

    function selectChecker(piece, temp)
    {
        console.log(temp);
        if(allowInput)
        {
            currChecker = piece;
            selectedCheckerStartPos.x = piece.posX;
            selectedCheckerStartPos.y = piece.posY;
        }
    }

    function moveChecker(piece, posX, posY)
    {
        piece.posX = posX;
        piece.posY = posY;
    }

    function canPieceJump(piece)
    {
        let pieceX = convertCoordinatesToBoard(piece.posX, piece.posY)[0];
        let pieceY = convertCoordinatesToBoard(piece.posX, piece.posY)[1];

        let pieceVal = gameBoard[pieceX][pieceY];
        if((gameBoard[pieceX+1][pieceY+1] <= pieceVal && gameBoard[pieceX+2][pieceY+2] == 0)
            || (gameBoard[pieceX+1][pieceY-1] <= pieceVal && gameBoard[pieceX+2][pieceY-2] == 0) 
            || (gameBoard[pieceX-1][pieceY+1] <= pieceVal && gameBoard[pieceX-2][pieceY+2] == 0)
            || (gameBoard[pieceX-1][pieceY-1] <= pieceVal && gameBoard[pieceX-2][pieceY-2] == 0))
        {
            return true;
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
                    let style = { font: "30px Arial", fill: "#ffffff", align: "center" };  
                    let label_score = game.add.text(20, 20, "1", style);
                    piece.addChild(label_score);

                    piece.inputEnabled = true;
                    piece.input.enableDrag();
                    piece.input.onDown.add(selectChecker, this, piece);
                    //the snap is set to every 100x100 pixels
                    piece.input.enableSnap(100, 100, true, true);
                }
            }
        }
    }

    function spaceAvailable(x, y)
    {
        if(gameBoard[x][y] == 0)
        {
            return true;
        }
        return false;
    }

    function addPiece()
    {
        let x = game.rnd.between(0, 7);
        let y = game.rnd.between(0, 7);
        if(spaceAvailable(x, y))
        {
            gameBoard[x][y] = 1;
            let realCoords = convertCoordinatesToReal(x, y);
            let piece = pieceGroup.create(realCoords[0], realCoords[1], 'piece', 0); 

            let style = { font: "30px Arial", fill: "#ffffff", align: "center" };  
            let label_score = game.add.text(20, 20, "1", style);
            piece.addChild(label_score);

        }
    }

    function addPieces(numOfPieces)
    {
        //randomly adds a piece to the board
        //figure out the spawning points for more pieces
        var i;
        for(i = 0; i < numOfPieces; i++)
        {
            addPiece();
        }
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

    function releaseChecker()
    {
        if (tempShiftedChecker === null)
        {
            currChecker = null;
        }

        //when the mouse is released with a checker selected
        //1) check for other checker
        //2) remove checker
        //3) update point value
        //4) add new checker piece

        var canKill = checkAndKillJumpedPiece(currChecker);
        canKill = checkAndKillJumpedPiece(tempShiftedChecker) || canKill;

        if(!canKill)
        {
            var gem = currChecker;
            if(gem.posX !== selectedCheckerStartPos.x || gem.posY !== selectedCheckerStartPos.y)
            {
                
            }
        }
    }

    function checkAndKillJumpedPiece(piece)
    {
        if(piece === null)
        {
            return;
        }
        var canKill = false;

    }

    return {

        create: function () {
            let board = game.add.sprite(0, 0, 'board');
            pieceGroup = game.add.group();
            //piece = game.add.sprite(0, 0, 'piece');
            game.input.mouse.capture = true;
            //game.input.mousePointer.x/.y
            addStartingPieces();
            
            
            //new code
            selectedCheckerStartPos = {x: 0, y: 0};
            //used to disable input while gems are dropping down and respawning
            allowInput = false;
            game.input.addMoveCallback(moveChecker, this);
        },

        update: function () {
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            // piece.x = game.input.mousePointer.x;
            // piece.y = game.input.mousePointer.y;
    
        }
    }
};

