"use strict";
var ROW = 0;
var COL = 1;

var pieces = [];
var pieceGroup;
//var tiles = [];

var tileGroup;
let tileSize = 100;

var possibleMoves = []; //array of possible moves
var tileHighlights = []; //array of highlights that go on tiles
var highlightGroup;

var currChecker; //the selected checker piece
//var currCheckerX; //the selected checker x board value
//var currCheckerY; //the selected checker y board value
var currCheckerHighlight;
var selectedPos; //tile that the player piece will move to

var comboVal = 1;

//The initial setup
var gameBoard = [ 
    [ -1,  0, -1,  0, -1,  0, -1, 0 ],
    [  0, -1,  0, -1,  0, -1,  0,-1 ],
    [ -1,  0, -1,  1, -1,  1, -1, 0 ],
    [  0, -1,  1, -1,  1, -1,  0,-1 ],
    [ -1,  0, -1,  1, -1,  1, -1, 0 ],
    [  0, -1,  1, -1,  1, -1,  0,-1 ],
    [ -1,  0, -1,  0, -1,  0, -1, 0 ],
    [  0, -1,  0, -1,  0, -1,  0,-1 ]
  ];

GameStates.makeGame = function(game, shared) 
{
    currChecker = null;
    selectedPos = null;
    var allowTileInput;
    var allowPieceInput;

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

    var medianChecker = function(x1, y1, x2, y2)
    {
        let coords = [(x2 - x1)/2, (y2 - y1)/2];
        console.log(coords);

        return  [coords[0] + x1, coords[1] + y1];
        //gameBoard[((x1 + x2)/2),((y1 + y2)/2)];
    }

    function jumpChecker(tile)
    {
        //adds the point value to the jumping checker
        console.log("moving");
        if(currChecker == null)
        {
            console.log("Select a piece!");
        }
        else
        {
            console.log(currChecker);
            gameBoard[currChecker.xBoard][currChecker.yBoard] = 0;
            //game.physics.arcade.moveToObject(currChecker, tile);
            currChecker.world.x = tile.world.x;
            currChecker.world.y = tile.world.y;
        }
    }

    function selectChecker(piece)
    {
        deselectChecker(currCheckerHighlight);
        //console.log(piece + "coords: " + piece.world.x + ", " + piece.world.y);
        currChecker = piece;
        //currCheckerX = convertCoordinatesToBoard(piece.world.x, piece.world.y)[0];
        //currCheckerY = convertCoordinatesToBoard(piece.world.x, piece.world.y)[1];
        currCheckerHighlight = highlightGroup.create(piece.world.x, piece.world.y, 'highlight', 0);
        findPossibleMoves(piece);
        possibleMoves.forEach(tile => {
            let newHL = highlightGroup.create(tile.world.x, tile.world.y, 'highlight', 0);
            newHL.events.onInputDown.add(moveChecker, this)
            tileHighlights.push(newHL);
        });
    }

    function deselectChecker(piece)
    {
        if(currCheckerHighlight)
        {
            piece.destroy();
            //console.log(currCheckerHighlight);
            //currCheckerHighlight.body = null;
            currCheckerHighlight.destroy();
            currCheckerHighlight = null;
            currChecker = null;
        }
        if(tileHighlights)
        {
            tileHighlights.forEach(hl => {
                hl.destroy();
            })
            tileHighlights = [];
        }
    }

    function checkPerimeter(piece)
    {
        //console.log(piece);
        let perimeterMoves = [];

        if(getPieceOnBoard(piece.xBoard-1, piece.yBoard-1) != null)
        {
            perimeterMoves[0] = getPieceOnBoard(piece.xBoard-1, piece.yBoard-1);
        }
        else if(getTileOnBoard(piece.xBoard-1, piece.yBoard-1) != null)
        {
            perimeterMoves[0] = getTileOnBoard(piece.xBoard-1, piece.yBoard-1);
        }

        if(getPieceOnBoard(piece.xBoard+1, piece.yBoard-1) != null)
        {
            perimeterMoves[1] = getPieceOnBoard(piece.xBoard+1, piece.yBoard-1);
        }
        else if(getTileOnBoard(piece.xBoard+1, piece.yBoard-1) != null)
        {
            perimeterMoves[1] = getTileOnBoard(piece.xBoard+1, piece.yBoard-1);
        }

        
        if(getPieceOnBoard(piece.xBoard-1, piece.yBoard+1) != null)
        {
            perimeterMoves[2] = getPieceOnBoard(piece.xBoard-1, piece.yBoard+1);
        }
        else if(getTileOnBoard(piece.xBoard-1, piece.yBoard+1) != null)
        {
            perimeterMoves[2] = getTileOnBoard(piece.xBoard-1, piece.yBoard+1);
        }

        
        if(getPieceOnBoard(piece.xBoard+1, piece.yBoard+1) != null)
        {
            perimeterMoves[3] = getPieceOnBoard(piece.xBoard+1, piece.yBoard+1);
        }
        else if(getTileOnBoard(piece.xBoard+1, piece.yBoard+1) != null)
        {
            perimeterMoves[3] = getTileOnBoard(piece.xBoard+1, piece.yBoard+1);
        }

        console.log(perimeterMoves);
        return perimeterMoves;

        // if(/*gameBoard[piece.xBoard-1][piece.yBoard-1]*/ getPieceOnBoard(piece.xBoard-1, piece.yBoard-1) != null)
        // {
        //     perimeterMoves[0] = gameBoard[piece.xBoard-1][piece.yBoard-1];
        // }

        // if(gameBoard[piece.xBoard+1][piece.yBoard-1] != null)
        // {
        //     perimeterMoves[1] = gameBoard[piece.xBoard+1][piece.yBoard-1];
        // }
        
        // if(gameBoard[piece.xBoard-1][piece.yBoard+1] != null)
        // {
        //     perimeterMoves[2] = gameBoard[piece.xBoard-1][piece.yBoard+1];
        // }
        
        // if(gameBoard[piece.xBoard+1][piece.yBoard+1] != null)
        // {
        //     perimeterMoves[3] = gameBoard[piece.xBoard+1][piece.yBoard+1];
        // }
        // return perimeterMoves;
    }

    //returns the tile in i direction that can be jumped to
    function checkJump(piece, i)
    {
        //console.log(piece.xBoard + " : " + piece. yBoard);
        //console.log(i)
        switch(i)
        {
            case 0:
            if(getTileOnBoard(piece.xBoard-1, piece.yBoard-1) != null &&
              (getTileOnBoard(piece.xBoard-1, piece.yBoard-1)).key == "tile")
            {
                //console.log("case 0")
                return getTileOnBoard(piece.xBoard-1, piece.yBoard-1);
            }

            case 1:
            if(getTileOnBoard(piece.xBoard+1, piece.yBoard-1) != null &&
              (getTileOnBoard(piece.xBoard+1, piece.yBoard-1)).key == "tile")
            {
                //console.log("case 1")
                return getTileOnBoard(piece.xBoard+1, piece.yBoard-1);
            }
            
            case 2:
            if(getTileOnBoard(piece.xBoard-1, piece.yBoard+1) != null &&
              (getTileOnBoard(piece.xBoard-1, piece.yBoard+1)).key == "tile")
            {
                //console.log("case 2")
                return getTileOnBoard(piece.xBoard-1, piece.yBoard+1);
            }
            
            case 3:
            if(getTileOnBoard(piece.xBoard+1, piece.yBoard+1) != null &&
              (getTileOnBoard(piece.xBoard+1, piece.yBoard+1)).key == "tile")
            {
                //console.log("case 3")
                return getTileOnBoard(piece.xBoard+1, piece.yBoard+1);
            }
        }
        return null;
    }

    //return array of tiles
    function findPossibleMoves(piece)
    {
        possibleMoves = [];
        let perimeter = checkPerimeter(piece);
        //console.log(perimeter);
        let currPerimeter;
            for(let i = 0; i < 4; i++)
            {
                if(perimeter[i] != null &&
                    perimeter[i].key == "piece")
                {                     
                    //newPerimeter.push(checkJump(perimeter[i], i));
                    console.log(checkJump(perimeter[i], i));
                    if(checkJump(perimeter[i], i) != null)
                    {
                        console.log(checkJump(perimeter[i], i));
                        currPerimeter = checkJump(perimeter[i], i);
                        possibleMoves.push(currPerimeter);
                    }
                }
            }
        //console.log(possibleMoves);
        return possibleMoves;
        
    }

    //moves selected checker to a tile
    function moveChecker(tile)
    {
        console.log("moving");
        if(currChecker == null)
        {
            console.log("Select a piece!");
        }
        else
        {
            console.log(currChecker.xBoard, currChecker.yBoard);
            console.log(medianChecker(currChecker.xBoard, currChecker.yBoard, 
                tile.xBoard, tile.yBoard));
            //gameBoard[currChecker.xBoard][currChecker.yBoard] = 0;
            //game.physics.arcade.moveToObject(currChecker, tile);
            let middleCheckers = medianChecker(currChecker.xBoard, currChecker.yBoard, 
                tile.xBoard, tile.yBoard)

            console.log(middleCheckers[0] , middleCheckers[1]);
            let middleChecker = getPieceOnBoard(middleCheckers[0], middleCheckers[1])


            console.log(middleChecker);
            console.log(middleChecker.pieceVal);


            let sumChecker = (currChecker.pieceVal + middleChecker.pieceVal) * comboVal;

            console.log(sumChecker);
            
            addPiece(tile.xBoard, tile.yBoard, sumChecker);
            currChecker.destroy();
            currChecker.pieceVal = 0;
            middleChecker.destroy();
            middleChecker.pieceVal = 0;
            deselectChecker(currChecker);

            addRandomPiece();
        }
    }

    function canPieceJump(piece)
    {
        let x = piece.xBoard;
        let y = piece.yBoard;
        let val = piece.pieceVal;

        if((gameBoard[x+1][y+1] <= val && gameBoard[x+2][y+2] == 0)
            || (gameBoard[x+1][y-1] <= val && gameBoard[x+2][y-2] == 0) 
            || (gameBoard[x-1][y+1] <= val && gameBoard[x-2][y+2] == 0)
            || (gameBoard[x-1][y-1] <= val && gameBoard[x-2][x-2] == 0))
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
                    piece.pieceVal = 1;
                    piece.xBoard = x;
                    piece.yBoard = y;
                    let label_score = game.add.text(20, 20, String(piece.pieceVal), style);
                    piece.addChild(label_score);

                    piece.inputEnabled = true;
                    //piece.input.enableDrag();
                    piece.events.onInputDown.add(selectChecker, this)
                    gameBoard[x][y] = piece;
                }

                if(gameBoard[x][y] == 0)
                {
                    let realCoords = convertCoordinatesToReal(x, y);
                    let tile = tileGroup.create(realCoords[0], realCoords[1], 'tile', 0);
                    tile.xBoard = x;
                    tile.yBoard = y;

                    tile.inputEnabled = true;
                    tile.events.onInputDown.add(moveChecker, this)
                    gameBoard[x][y] = tile;
                    // piece.inputEnabled = true;
                    // piece.input.enableDrag();
                    // piece.input.onDown.add(selectChecker, this, piece);
                    //the snap is set to every 100x100 pixels
                    // piece.input.enableSnap(100, 100, true, true);
                }
            }
        }
    }

    //sees if space is available based on board coordinates
    function spaceAvailable(x, y)
    {
        if(getTileOnBoard(x, y, tileGroup) != null &&
            getTileOnBoard(x, y, tileGroup).key == "tile")
        {
            return true;
        }
        return false;
    }

    function getPieceOnBoard(x, y)
    {
        let pieceOnBoard;
        pieceGroup.children.forEach(piece =>{
            if(piece.xBoard == x && piece.yBoard == y)
            {
                pieceOnBoard = piece;
                console.log(pieceOnBoard); 
            }
        })
        if(pieceOnBoard != null)
        {
            return pieceOnBoard;
        }
        else
        {
            console.log("No piece here!");
        }
    }

    function getTileOnBoard(x, y)
    {
        let tileOnBoard;
        tileGroup.children.forEach(tile =>{
            if(tile.xBoard == x && tile.yBoard == y)
            {
                tileOnBoard = tile;
                console.log(tileOnBoard); 
            }
        })
        if(tileOnBoard != null)
        {
            return tileOnBoard;
        }
        else
        {
            console.log("No tile here!");
        }
    }

    function addRandomPiece()
    {
        console.log("adding a random piece");
        let x = game.rnd.between(1, 6);
        let y = game.rnd.between(1, 6);
        if(!spaceAvailable(x, y))
        {
            addRandomPiece();
        }
        addPiece(x, y, 1);
    }

    function addPiece(x, y, val)
    {
        //gameBoard[x][y] = 1;
        if(spaceAvailable(x, y))
        {
            console.log("new piece");
            let realCoords = convertCoordinatesToReal(x, y);
            let piece = pieceGroup.create(realCoords[0], realCoords[1], 'piece', 0); 
            piece.pieceVal = val;
            piece.xBoard = x;
            piece.yBoard = y;
            let style = { font: "30px Arial", fill: "#ffffff", align: "center" };  
            let label_score = game.add.text(20, 20, String(piece.pieceVal), style);
            piece.addChild(label_score);
            gameBoard[x][y] = piece;
            piece.inputEnabled = true;
            piece.events.onInputDown.add(selectChecker, this);
            return piece;
        }       
        else
        {
            return null;
        }
    }

    function addRandomPieces(numOfPieces)
    {
        //randomly adds a piece to the board
        //figure out the spawning points for more pieces
        var i;
        for(i = 0; i < numOfPieces; i++)
        {
            addRandomPiece();
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
        return [xBoard*tileSize, yBoard*tileSize];
    }

    return {

        create: function () {
            game.physics.startSystem(Phaser.Physics.ARCADE);
            let board = game.add.sprite(0, 0, 'board');
            tileGroup = game.add.group();
            pieceGroup = game.add.group();
            highlightGroup = game.add.group();
            //piece = game.add.sprite(0, 0, 'piece');
            //tile = game.add.sprite(0, 0, 'tile');
            addStartingPieces();
        },

        update: function () {
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            // piece.x = game.input.mousePointer.x;
            // piece.y = game.input.mousePointer.y;
    
        }
    }
};
