"use strict";
var ROW = 0;
var COL = 1;

var pieces = [];
var pieceGroup;
//var tiles = [];

var tileGroup;
let tileSize = 100;

var possibleMoves = []; //array of possible moves
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

    function jumpChecker()
    {
        //adds the point value to the jumping checker
    }

    function selectChecker(piece)
    {
        deselectChecker(currCheckerHighlight);
        //console.log(piece + "coords: " + piece.world.x + ", " + piece.world.y);
        currChecker = piece;
        //currCheckerX = convertCoordinatesToBoard(piece.world.x, piece.world.y)[0];
        //currCheckerY = convertCoordinatesToBoard(piece.world.x, piece.world.y)[1];
        currCheckerHighlight = highlightGroup.create(piece.world.x, piece.world.y, 'highlight', 0);
        let moves = findPossibleMoves(piece);
        //possibleMoves = findPossibleMoves(piece);
        console.log(moves);
    }

    function deselectChecker(piece)
    {
        if(currCheckerHighlight)
        {
            piece.destroy();
            //console.log(currCheckerHighlight);
            //currCheckerHighlight.body = null;
            currCheckerHighlight = null;
            currChecker = null;
           // currCheckerX = null;
           // currCheckerY = null;
        }
    }

    function checkPerimeter(piece)
    {
        console.log(piece);
        let perimeterMoves = [];

        if(gameBoard[piece.xBoard-1][piece.yBoard-1] != null)
        {
            perimeterMoves[0] = gameBoard[piece.xBoard-1][piece.yBoard-1];
        }

        if(gameBoard[piece.xBoard+1][piece.yBoard-1] != null)
        {
            perimeterMoves[1] = gameBoard[piece.xBoard+1][piece.yBoard-1];
        }
        
        if(gameBoard[piece.xBoard-1][piece.yBoard+1] != null)
        {
            perimeterMoves[2] = gameBoard[piece.xBoard-1][piece.yBoard+1];
        }
        
        if(gameBoard[piece.xBoard+1][piece.yBoard+1] != null)
        {
            perimeterMoves[3] = gameBoard[piece.xBoard+1][piece.yBoard+1];
        }

        return perimeterMoves;
    }

    function checkJump(piece, i)
    {
        console.log(piece.xBoard + " : " + piece. yBoard);
        console.log(i)
        switch(i)
        {
            case 0:
            if((gameBoard[piece.xBoard-1][piece.yBoard-1]).key == "tile")
            //if(tileGroup.children.indexOf(gameBoard[piece.xBoard-1][piece.yBoard-1]) > -1)
            {
                console.log("case 0")
                return gameBoard[piece.xBoard-1][piece.yBoard-1];
            }

            case 1:
            if((gameBoard[piece.xBoard+1][piece.yBoard-1]).key == "tile")
            {
                console.log("case 1")
                return gameBoard[piece.xBoard+1][piece.yBoard-1];
            }
            
            case 2:
            if((gameBoard[piece.xBoard-1][piece.yBoard+1]).key == "tile")
            {
                console.log("case 2")
                return gameBoard[piece.xBoard-1][piece.yBoard+1];
            }
            
            case 3:
            if((gameBoard[piece.xBoard+1][piece.yBoard+1]).key == "tile")
            {
                console.log("case 3")
                return gameBoard[piece.xBoard+1][piece.yBoard+1];
            }
        }
        return null;
    }

    //return array of tiles
    function findPossibleMoves(piece)
    {
        possibleMoves = [];
        let perimeter = checkPerimeter(piece);
        console.log(perimeter);
        if(perimeter)
        {
            let currPerimeter;
            for(let i = 0; i < 4; i++)
            {
                if(perimeter[i].pieceVal > 0)
                {                     
                    //newPerimeter.push(checkJump(perimeter[i], i));
                    console.log(checkJump(perimeter[i], i));
                    if(checkJump(perimeter[i], i) != null)
                    {
                        console.log(checkJump(perimeter[i], i));
                        currPerimeter = checkJump(perimeter[i], i);
                    }
                    possibleMoves.push(currPerimeter);
            }

        }
        console.log(possibleMoves);
        return possibleMoves;
    }

    //moves selected checker to a tile
    function moveChecker(tile)
    {
        if(currChecker == null)
        {
            console.log("Select a piece!");
        }
        else
        {
            //console.log(currChecker);
            gameBoard[currChecker.xBoard][currChecker.yBoard] = 0;
            //gameBoard[tile.xBoard][tile.yBoard] = currChecker.pieceVal;
            //game.physics.arcade.moveToObject(currChecker, tile);
            currChecker.world.x = tile.world.x;
            currChecker.world.y = tile.world.y;
    
            //gameBoard[posX][posY] = piece.pieceVal;
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
                    //piece.events.onInputDown.add(selectChecker, this);
                    piece.events.onInputDown.add(selectChecker, this)
                    gameBoard[x][y] = piece;
                    //image.events.onInputDown.add(clickListener, {param1: value1, param2: value2});
                    //image.events.onInputDown.add(function(image){clickListener(image, array)}, this);
                    //the snap is set to every 100x100 pixels
                    // piece.input.enableSnap(100, 100, true, true);
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
            piece.pieceVal = 1;
            piece.xBoard = x;
            piece.yBoard = y;
            let style = { font: "30px Arial", fill: "#ffffff", align: "center" };  
            let label_score = game.add.text(20, 20, String(piece.pieceVal), style);
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

/*function over(sprite){
        if(currentPhase == "choose"){
            game.canvas.style.cursor = "pointer";
            //console.log(currentPhase);
            var left = sprite.left;
            var right = sprite.right;
            rooms.forEach(function(member) {
                if(member.row == sprite.row) {
                    if(member.alive){
                        member.tint = 0xffffff;
                    }
                    if(member.left < left){
                        left = member.left;
                    }
                    if(member.right > right){
                        right = member.right;
                    }
                    hoverRow.push(member);
                }
            }, this, true);
            graphics.lineStyle(2, 0xFF0000, 0.8);
            graphics.drawRect(left, sprite.top, right-left, sprite.height);
            //sprite.tint = 0xaaffaa;
        }else if(currentPhase == "repair"){
            game.canvas.style.cursor = "pointer";
            sprite.tint = 0xaaffaa;
            graphics.lineStyle(2, 0x00ff00, 0.8);
            graphics.drawRect(sprite.left, sprite.top, sprite.width, sprite.height);
        }
        else{
            sprite.tint = 0xbbbbbb;
        }
    }

    function out(sprite){
        game.canvas.style.cursor = "default";
        rooms.forEach(function(member) {
            if(member.row != undefined){
                member.tint = 0xbbbbbb;
            }
        }, this, true);
        hoverRow = [];
        graphics.clear();
    }

    function click(sprite){
        graphics.clear();
        if(currentPhase == "choose"){
            if(activeRow.includes(sprite)){
                //console.log("active row clicked");
                activeRow = [];
                rooms.forEach(function(member) {
                    if(member.row != undefined){
                        if(member.row == sprite.row) {
                            member.tint = 0xffffff;
                        }else{
                            member.tint = 0xbbbbbb;
                        }
                    }
                }, this, true);
                sprite.tint = 0xaaffaa;
                text.setText("Player Phase:\nChoose the ship deck you'll use!");
            }else{
                attacksRemaining = 0;
                activeRow = hoverRow;
                activeTop = sprite.top;
                activeLeft = sprite.left;
                activeRight = sprite.right;
                rooms.forEach(function(member) {
                    if(member.row == sprite.row) {
                        if(member.left < activeLeft){
                            activeLeft = member.left;
                        }
                        if(member.right > activeRight){
                            activeRight = member.right;
                        }
                        if(member.cannon == 1 && member.alive){
                            attacksRemaining++;
                        }
                    }else{
                        if(member.row != undefined){
                            member.tint = 0xbbbbbb;
                        }
                    }
                }, this, true);
                text.setText("Player Phase:\nClick to attack the enemy!\nAttacks you'll get: "+attacksRemaining);
            }
        }
        else if(currentPhase == "repair" && !sprite.alive){
            sprite.alive = true;
            sprite.removeChildAt(sprite.children.length-1).destroy();
            sprite.tint = 0xbbbbbb;
            currentPhase = "enemyrepair";
            text.setStyle({ font: "25px Verdana", fill: "#440000", align: "center" });
            text.setText("Enemy Phase:\nRepair damage");
            var numberOfInjuries = 0;
            enemyrooms.forEach(function(member) {
                if(!member.alive){
                    numberOfInjuries++;
                }
            }, this, true);
            if(numberOfInjuries>0){
                game.time.events.add(Phaser.Timer.SECOND, function()
                {
                    var repaired = false;
                    while(!repaired){
                        var current = enemyrooms.getRandom();
                        if(!current.alive){
                            repaired = true;
                            current.alive = true;
                            current.removeChildAt(0);
                            current.tint = 0xffffff;
                        }
                    }
                    currentPhase = "choose";
                    text.setStyle({ font: "25px Verdana", fill: "#004400", align: "center" });
                    text.setText("Player Phase:\nChoose the ship deck you'll use!");
                }, this);
            }else{
                currentPhase = "choose";
                    text.setStyle({ font: "25px Verdana", fill: "#004400", align: "center" });
                    text.setText("Player Phase:\nChoose the ship deck you'll use!");
            }
        }
    }

    function enemyover(sprite){
        if((activeRow !== undefined && activeRow.length != 0)){
            game.canvas.style.cursor = "pointer";
        }
    }

    function enemyout(sprite){
            game.canvas.style.cursor = "default";
    }

    function enemyclick(sprite){
        if(currentPhase == "attack" || (activeRow !== undefined && activeRow.length != 0)){
            currentPhase = "attack";
            if(sprite.alive && attacksRemaining > 0){
                sprite.alive = false;
                var disabledrooms = [0,0,0];
                enemyrooms.forEach(function(member){
                    if(!member.alive && member.row != undefined){
                        disabledrooms[member.row]++;
                    }
                }, this, true);
                if(disabledrooms.indexOf(3)!=disabledrooms.lastIndexOf(3)){
                    shared.winner = "player";
                    game.state.start('GameOver');
                }
                var img = game.add.image(12,15,'dead');
                img.scale.setTo(0.03,0.03);
                sprite.addChild(img);
                attacksRemaining--;
                text.setText("Player Phase:\nClick to attack the enemy!\nAttacks remaining: "+attacksRemaining);
            }
            if(attacksRemaining == 0){
                activeRow = [];
                graphics.clear();
                rooms.forEach(function(member) {
                    if(member.row != undefined){
                        member.tint = 0xbbbbbb;
                    }
                }, this, true);
                currentPhase == "enemyattack";
                game.canvas.style.cursor = "default";
                text.setStyle({ font: "25px Verdana", fill: "#440000", align: "center" });
                text.setText("Enemy Phase:\nChoosing Floor");
                game.time.events.add(Phaser.Timer.SECOND, enemyFloor, this);
            }
        }
    }

    function enemyFloor(){
        let rowtotals = [0,0,0];
        enemyrooms.forEach(function(member) {
            let cannonCount = 0;
            if(member.row != undefined && member.alive)
                rowtotals[member.row] += member.cannon;
        }, this, true);
        let max = rowtotals[0];
        let maxindex = 0;
        for(var i = 1; i<rowtotals.length; i++){
            if(rowtotals[i]>max){
                maxindex = i;
                max = rowtotals[i];
            }
        }
        var Left = Number.MAX_SAFE_INTEGER;
        var Right = Number.MIN_SAFE_INTEGER;
        var Top
        enemyrooms.forEach(function(member) {
            if(member.row == maxindex){
                Top = member.top;
                if(member.left < Left){
                    Left = member.left;
                }
                if(member.right > Right){
                    Right = member.right;
                }
            }
        }, this, true);
        enemygraphics.lineStyle(5, 0xFFFFFF, 0.8);
        enemygraphics.drawRect(Left, Top, Right-Left, 96);
        text.setText("Enemy Phase:\nAttacking");
        attackPlayer(max);
    }

    function attackPlayer(attacksLeft){
        console.log("attacking");
        var targets = [];
        while(attacksLeft > 0){
            let target = rooms.getRandom();
            if(!targets.includes(target) && target.alive && target.row != undefined){
                targets.push(target);
                attacksLeft--;
            }
            console.log(attacksLeft);
        }
        target = game.add.image(enemyrooms.x+238,enemyrooms.y-50,'target');
        target.scale.setTo(0.08,0.08);
        target.tint = 0xff0000;
        target.alpha = 0;
        var anim = game.add.tween(target).to({alpha:1}, 300, Phaser.Easing.Quadratic.InOut, true);
        var tweens = [];
        for(var i=0;i<targets.length;i++){
            var tempTween = game.add.tween(target).to({x:targets[i].x+rooms.x, y:targets[i].y+rooms.y}, 500, Phaser.Easing.Quadratic.InOut);
            tweens.push(tempTween);
            tempTween.attacking = targets[i];
            tempTween.onComplete.add(function(tweenTarg, etc)
            {
                var img = game.add.image(12,15,'dead');
                img.scale.setTo(0.03,0.03);
                etc.attacking.addChild(img);
                //console.log(etc);
                etc.attacking.alive = false;
                var disabledrooms = [0,0,0];
                rooms.forEach(function(member){
                    if(!member.alive && member.row != undefined){
                        disabledrooms[member.row]++;
                    }
                }, this, true);
                if(disabledrooms.indexOf(3)!=disabledrooms.lastIndexOf(3)){
                    shared.winner = "computer";
                    game.state.start('GameOver');
                }
            },this);
            if(tweens[i-1] != undefined){
                tweens[i-1].chain(tempTween);
            }
            console.log(tweens);
        }
        if(tweens.length>0){
            tweens[0].start();
        }
        game.time.events.add(Phaser.Timer.SECOND, repairStage);
    }

    function repairStage(){
        enemygraphics.clear();
        var anim = game.add.tween(target).to({alpha:0}, 300, Phaser.Easing.Quadratic.InOut, true);
        anim.onComplete.add(function(){
            target.destroy();
        })
        console.log("repair");
        currentPhase = "repair";
        text.setStyle({ font: "25px Verdana", fill: "#004400", align: "center" });
        text.setText("Player Phase:\nRepair damage");
    }

    function placeCannons(ship){
        let numberOfCannons = 4;
        let cannonsPlaced = 0;
        while(cannonsPlaced < numberOfCannons){
            let current = ship.getRandom();
            if(current.cannon == 0){
                current.cannon = 1;
                cannonsPlaced++;
                var img = game.add.image(10,32,'cannon');
                img.scale.setTo(0.08,0.08);
                current.addChild(img);
            }
        }
    }

    function placeEnemyCannons(ship){
        let numberOfCannons = 4;
        let cannonsPlaced = 0;
        while(cannonsPlaced < numberOfCannons){
            let current = ship.getRandom();
            if(current.cannon == 0){
                current.cannon = 1;
                cannonsPlaced++;
                console.log("cannon placed at "+ current.col, current.row);
            }
        }
    }

    var target;
    var hoverRow = [];
    var activeRow = [];

    var rooms;
    var enemyrooms;

    var graphics;
    var enemygraphics;

    var currentPhase = "choose";
    var attacksRemaining = 0;

    let activeLeft;
    let activeRight;
    let activeTop;
    var text;
    return {
        
        create: function () {
            //set world background
            let bg = game.add.sprite(0,0,'gameBG');
            bg.anchor.setTo(0.5, 0.64);
            bg.x = game.world.centerX;
            bg.y = game.world.centerY;
            //player = game.add.sprite(0,0);
            

            var backocean = game.add.sprite(game.world.centerX,game.height-220,'ocean');
            backocean.anchor.setTo(0.5,0);
            rooms = game.add.group();
            enemyrooms = game.add.group();
            var room;
            var x = 3;
            var y = 3;
            var spritewidth = 64, spriteheight = 64;
            var ship = game.add.sprite(-49,-68, 'ship');
            var badship = game.add.sprite(-46,-68, 'badship');
            badship.anchor.setTo(1,0);
            badship.scale.x*=-1;
            for(var i = 0; i < x; i++){
                for(var j = 0; j < y; j++){
                    room = rooms.create(0, 0, 'room');
                    room.row = i;
                    room.col = j;
                    room.tint = 0xbbbbbb;
                    room.inputEnabled = true;
                    room.events.onInputOver.add(over, this);
                    room.events.onInputOut.add(out, this);
                    room.events.onInputUp.add(click, this);
                    room.alive = true;
                    room.cannon = 0;
                }
            }
            placeCannons(rooms);
            var enemyroom;
            for(var i = 0; i < x; i++){
                for(var j = 0; j < y; j++){
                    enemyroom = enemyrooms.create(0, 0, 'hiddenroom');
                    enemyroom.row = i;
                    enemyroom.col = j;
                    enemyroom.tint = 0xffffff;
                    enemyroom.inputEnabled = true;
                    enemyroom.events.onInputOver.add(enemyover, this);
                    enemyroom.events.onInputOut.add(enemyout, this);
                    enemyroom.events.onInputUp.add(enemyclick, this);
                    enemyroom.alive = true;
                    enemyroom.cannon = 0;
                }
            }
            placeEnemyCannons(enemyrooms);
            rooms.align(3, -1, room.width, room.height);
            rooms.addChildAt(ship,0);
            ship.name == "ship";
            rooms.x = 100;
            rooms.y = 150;

            enemyrooms.align(3, -1, room.width, room.height);
            enemyrooms.addChildAt(badship,0);
            enemyrooms.x = 515;
            enemyrooms.y = 150;

            graphics = game.add.graphics(rooms.x,rooms.y);
            enemygraphics = game.add.graphics(enemyrooms.x,enemyrooms.y);
            var ocean = game.add.sprite(game.world.centerX,game.height-140,'ocean');
            ocean.anchor.setTo(0.5,0);
            let scale = game.width/ocean.width;
            ocean.scale.setTo(scale,scale);
            backocean.scale.setTo(scale,scale);
            backocean.scale.x*=-1;

            var shiptween = game.add.tween(rooms).to({y:'-24'}, 4000, Phaser.Easing.Quadratic.InOut, true, 500, -1, true);
            var enemyshiptween = game.add.tween(enemyrooms).to({y:'-24'}, 4000, Phaser.Easing.Quadratic.InOut, true, 500, -1, true);

            var highlighttween = game.add.tween(graphics).to({y:'-24'}, 4000, Phaser.Easing.Quadratic.InOut, true, 500, -1, true);
            var enemyhighlighttween = game.add.tween(enemygraphics).to({y:'-24'}, 4000, Phaser.Easing.Quadratic.InOut, true, 500, -1, true);

            var oceantween = game.add.tween(backocean).to({y:'-48'}, 4000, Phaser.Easing.Quadratic.InOut, true, 0, -1, true);
            var oceantween = game.add.tween(ocean).to({y:'-38'}, 4000, Phaser.Easing.Quadratic.InOut, true, 100, -1, true);
        
            var style = { font: "25px Verdana", fill: "#004400", align: "center" };
            text = game.add.text( game.world.centerX, 10,
                "Player Phase:\nChoose the ship deck you'll use!", style );
            text.anchor.setTo( 0.5, 0.0 );
            text.lineSpacing = -10;
        },

        update: function () {
            rooms.forEach(function(member) {
                if(!member.alive){
                    member.tint = 0x111111;
                }
            }, this, true);
            enemyrooms.forEach(function(member) {
                if(!member.alive){
                    member.tint = 0xaaaaaa;
                }else{
                    member.tint = 0xffffff;
                }
            }, this, true);
            if(activeRow !== undefined && activeRow.length != 0){
                //graphics.clear();
                graphics.lineStyle(5, 0xFFFFFF, 0.8);
                var sprite = activeRow[0];
                graphics.drawRect(activeLeft, activeTop, activeRight-activeLeft, 96);
            }
            //console.log(activeRow);
        },

        render: function () {
            //game.debug.spriteBounds( player, 'rgba(255,255,0,0.4)' ) ;
            //game.debug.body(player);
            //game.debug.physicsGroup(hittableObjects);
        }
        
    };
};

GameStates.makeGameOver = function( game, shared ) {
    
    return {
    
        create: function () {
    
            let bg = game.add.sprite(0,0,'gameBG');
            bg.anchor.setTo(0.5, 0.64);
            bg.x = game.world.centerX;
            bg.y = game.world.centerY;
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
    
            //music = game.add.audio('titleMusic');
            //music.play();

            game.input.onDown.add( function() {
                //game.state.add( 'Game', GameStates.makeGame( game, shared ) );
                game.state.start('MainMenu');
            }, this );
    
            // Add some text using a CSS style.
            // Center it in X, and position its top 15 pixels from the top of the world.
            if(shared.lastscore>shared.highscore){
                shared.highscore = shared.lastscore;
            }
            var style = { font: "72px Verdana", fill: "#000000", align: "center" };
            var text = game.add.text( game.world.centerX, game.world.centerY,
                "",
                style );
                if(shared.winner == "player"){
                    text.setText("Congratulations!\nYou sunk the enemy!");
                }else{
                    text.setText("Oh No!\nYou're sunk!");
                }
            text.anchor.setTo( 0.5, 0.5 );
        },
    
        update: function () {
    
            //	Do some nice funky main menu effect here
            
        }
        
    };
};*/