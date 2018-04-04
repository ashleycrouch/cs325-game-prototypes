var game;
var gameOptions = {
    tileSize: 200,
    tweenSpeed: 50,
    tileSpacing: 20,
    localStorageName: "top4096score"
}
var ROW = 0;
var COL = 1;
window.onload = function() {
    var gameConfig = {
       type: Phaser.CANVAS,
       width: gameOptions.tileSize * 4 + gameOptions.tileSpacing * 5,
       height: (gameOptions.tileSize * 4 + gameOptions.tileSpacing * 5) * 16 / 9,
       backgroundColor: 0xecf0f1,
       scene: [preloadAssets, playGame]
   };
    game = new Phaser.Game(gameConfig);
    window.focus()
    resize();
    window.addEventListener("resize", resize, false);
}

var preloadAssets = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function preloadAssets(){
        Phaser.Scene.call(this, {key: "PreloadAssets"});
    },
    preload: function(){
        this.load.image("spot", "assets/sprites/spot.png");
        this.load.image("gametitle", "assets/sprites/gametitle.png");
        this.load.image("restart", "assets/sprites/restart.png");
        this.load.image("scorepanel", "assets/sprites/scorepanel.png");
        this.load.image("scorelabels", "assets/sprites/scorelabels.png");
        this.load.image("logo", "assets/sprites/logo.png");
        this.load.image("howtoplay", "assets/sprites/howtoplay.png");
        this.load.spritesheet("tiles", "assets/sprites/tiles.png", {
            frameWidth: gameOptions.tileSize,
            frameHeight: gameOptions.tileSize
        });
        this.load.bitmapFont("font", "assets/fonts/font.png", "assets/fonts/font.fnt");
        this.load.audio("move", ["assets/sounds/move.ogg", "assets/sounds/move.mp3"]);
        this.load.audio("grow", ["assets/sounds/grow.ogg", "assets/sounds/grow.mp3"]);
    },
    create: function(){
        this.scene.start("PlayGame");
    }
})

var playGame = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize:
    function playGame(){
        Phaser.Scene.call(this, {key: "PlayGame"});
    },
    create: function(){
        this.fieldArray = [];
        this.fieldGroup = this.add.group();
        this.score = 0;
        this.bestScore = localStorage.getItem(gameOptions.localStorageName) == null ? 0 : localStorage.getItem(gameOptions.localStorageName);
        for(var i = 0; i < 4; i++){
            this.fieldArray[i] = [];
            for(var j = 0; j < 4; j++){
                var spot = this.add.sprite(this.tileDestination(j, COL), this.tileDestination(i, ROW), "spot")
                var tile = this.add.sprite(this.tileDestination(j, COL), this.tileDestination(i, ROW), "tiles");
                tile.alpha = 0;
                tile.visible = 0;
                this.fieldGroup.add(tile);
                this.fieldArray[i][j] = {
                    tileValue: 0,
                    tileSprite: tile,
                    canUpgrade: true
                }
            }
        }
        var restartButton = this.add.sprite(this.tileDestination(3, COL), this.tileDestination(0, ROW) - 200, "restart");
        restartButton.setInteractive();
        restartButton.on("pointerdown", function(){
            this.scene.start("PlayGame");
        }, this)
        this.add.sprite(this.tileDestination(1, COL), this.tileDestination(0, ROW) - 200, "scorepanel");
        this.add.sprite(this.tileDestination(1, COL), this.tileDestination(0, ROW) - 270, "scorelabels");
        this.add.sprite(10, 5, "gametitle").setOrigin(0, 0);
        var howTo = this.add.sprite(game.config.width, 5, "howtoplay");
        howTo.setOrigin(1, 0);
        var logo = this.add.sprite(game.config.width / 2, game.config.height, "logo");
        logo.setOrigin(0.5, 1);
        logo.setInteractive();
        logo.on("pointerdown", function(){
            window.location.href = "http://www.emanueleferonato.com/"
        });
        this.scoreText = this.add.bitmapText(this.tileDestination(0, COL) - 80, this.tileDestination(0, ROW) - 225, "font", "0");
        this.bestScoreText = this.add.bitmapText(this.tileDestination(2, COL) - 190, this.tileDestination(0, ROW) - 225, "font", this.bestScore.toString());
        this.input.keyboard.on("keydown", this.handleKey, this);
        this.canMove = false;
        this.addTile();
        this.addTile();
        this.input.on("pointerup", this.endSwipe, this);
        this.moveSound = this.sound.add("move");
        this.growSound = this.sound.add("grow");
    },
    endSwipe: function(e){
        var swipeTime = e.upTime - e.downTime;
        var swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);
        var swipeMagnitude = Phaser.Geom.Point.GetMagnitude(swipe);
        var swipeNormal = new Phaser.Geom.Point(swipe.x / swipeMagnitude, swipe.y / swipeMagnitude);
        if(swipeMagnitude > 20 && swipeTime < 1000 && (Math.abs(swipeNormal.y) > 0.8 || Math.abs(swipeNormal.x) > 0.8)){
            var children = this.fieldGroup.getChildren();
            if(swipeNormal.x > 0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = game.config.width - children[i].x;
                }
                this.handleMove(0, 1);
            }
            if(swipeNormal.x < -0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = children[i].x;
                }
                this.handleMove(0, -1);
            }
            if(swipeNormal.y > 0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = game.config.height - children[i].y;
                }
                this.handleMove(1, 0);
            }
            if(swipeNormal.y < -0.8) {
                for (var i = 0; i < children.length; i++){
                    children[i].depth = children[i].y;
                }
                this.handleMove(-1, 0);
            }
        }
    },
    addTile: function(){
        var emptyTiles = [];
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                if(this.fieldArray[i][j].tileValue == 0){
                    emptyTiles.push({
                        row: i,
                        col: j
                    })
                }
            }
        }
        if(emptyTiles.length > 0){
            var chosenTile = Phaser.Utils.Array.GetRandomElement(emptyTiles);
            this.fieldArray[chosenTile.row][chosenTile.col].tileValue = 1;
            this.fieldArray[chosenTile.row][chosenTile.col].tileSprite.visible = true;
            this.fieldArray[chosenTile.row][chosenTile.col].tileSprite.setFrame(0);
            this.tweens.add({
                targets: [this.fieldArray[chosenTile.row][chosenTile.col].tileSprite],
                alpha: 1,
                duration: gameOptions.tweenSpeed,
                onComplete: function(tween){
                    tween.parent.scene.canMove = true;
                },
            });
        }
	},
    handleKey: function(e){
        if(this.canMove){
            var children = this.fieldGroup.getChildren();
            switch(e.code){
                case "KeyA":
                case "ArrowLeft":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = children[i].x;
                    }
                    this.handleMove(0, -1);
                    break;
                case "KeyD":
                case "ArrowRight":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = game.config.width - children[i].x;
                    }
                    this.handleMove(0, 1);
                    break;
                case "KeyW":
                case "ArrowUp":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = children[i].y;
                    }
                    this.handleMove(-1, 0);
                    break;
                case "KeyS":
                case "ArrowDown":
                    for (var i = 0; i < children.length; i++){
                        children[i].depth = game.config.height - children[i].y;
                    }
                    this.handleMove(1, 0);
                    break;
            }
        }
    },
    handleMove: function(deltaRow, deltaCol){
        this.canMove = false;
        var somethingMoved = false;
        this.movingTiles = 0;
        var moveScore = 0;
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                var colToWatch = deltaCol == 1 ? (4 - 1) - j : j;
                var rowToWatch = deltaRow == 1 ? (4 - 1) - i : i;
                var tileValue = this.fieldArray[rowToWatch][colToWatch].tileValue;
                if(tileValue != 0){
                    var colSteps = deltaCol;
                    var rowSteps = deltaRow;
                    while(this.isInsideBoard(rowToWatch + rowSteps, colToWatch + colSteps) && this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].tileValue == 0){
                        colSteps += deltaCol;
                        rowSteps += deltaRow;
                    }
                    if(this.isInsideBoard(rowToWatch + rowSteps, colToWatch + colSteps) && (this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].tileValue == tileValue) && this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].canUpgrade && this.fieldArray[rowToWatch][colToWatch].canUpgrade && tileValue < 12){
                        this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].tileValue ++;
                        moveScore += Math.pow(2, this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].tileValue);
                        this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].canUpgrade = false;
                        this.fieldArray[rowToWatch][colToWatch].tileValue = 0;
                        this.moveTile(this.fieldArray[rowToWatch][colToWatch], rowToWatch + rowSteps, colToWatch + colSteps, Math.abs(rowSteps + colSteps), true);
                        somethingMoved = true;
                    }
                    else{
                        colSteps = colSteps - deltaCol;
                        rowSteps = rowSteps - deltaRow;
                        if(colSteps != 0 || rowSteps != 0){
                            this.fieldArray[rowToWatch + rowSteps][colToWatch + colSteps].tileValue = tileValue;
                            this.fieldArray[rowToWatch][colToWatch].tileValue = 0;
                            this.moveTile(this.fieldArray[rowToWatch][colToWatch], rowToWatch + rowSteps, colToWatch + colSteps, Math.abs(rowSteps + colSteps), false);
                            somethingMoved = true;
                        }
                    }
                }
            }
        }
        if(!somethingMoved){
            this.canMove = true;
        }
        else{
            this.moveSound.play();
            this.score += moveScore;
            if(this.score > this.bestScore){
                this.bestScore = this.score;
                localStorage.setItem(gameOptions.localStorageName, this.bestScore);
            }
        }
    },
    moveTile: function(tile, row, col, distance, changeNumber){
        this.movingTiles ++;
        this.tweens.add({
            targets: [tile.tileSprite],
            x: this.tileDestination(col, COL),
            y: this.tileDestination(row, ROW),
            duration: gameOptions.tweenSpeed * distance,
            onComplete: function(tween){
                tween.parent.scene.movingTiles --;
                if(changeNumber){
                    tween.parent.scene.transformTile(tile, row, col);
                }
                if(tween.parent.scene.movingTiles == 0){
                    tween.parent.scene.scoreText.text = tween.parent.scene.score.toString();
                    tween.parent.scene.bestScoreText.text = tween.parent.scene.bestScore.toString();
                    tween.parent.scene.resetTiles();
                    tween.parent.scene.addTile();
                }
            }
        })
    },
    transformTile: function(tile, row, col){
        this.growSound.play();
        this.movingTiles ++;
        tile.tileSprite.setFrame(this.fieldArray[row][col].tileValue - 1);
        this.tweens.add({
            targets: [tile.tileSprite],
            scaleX: 1.1,
            scaleY: 1.1,
            duration: gameOptions.tweenSpeed,
            yoyo: true,
            repeat: 1,
            onComplete: function(tween){
                tween.parent.scene.movingTiles --;
                if(tween.parent.scene.movingTiles == 0){
                    tween.parent.scene.scoreText.text = tween.parent.scene.score.toString();
                    tween.parent.scene.bestScoreText.text = tween.parent.scene.bestScore.toString();
                    tween.parent.scene.resetTiles();
                    tween.parent.scene.addTile();
                }
            }
        })
    },
    resetTiles: function(){
        for(var i = 0; i < 4; i++){
            for(var j = 0; j < 4; j++){
                this.fieldArray[i][j].canUpgrade = true;
                this.fieldArray[i][j].tileSprite.x = this.tileDestination(j, COL);
                this.fieldArray[i][j].tileSprite.y = this.tileDestination(i, ROW);
                if(this.fieldArray[i][j].tileValue > 0){
                    this.fieldArray[i][j].tileSprite.alpha = 1;
                    this.fieldArray[i][j].tileSprite.visible = true;
                    this.fieldArray[i][j].tileSprite.setFrame(this.fieldArray[i][j].tileValue - 1);
                }
                else{
                    this.fieldArray[i][j].tileSprite.alpha = 0;
                    this.fieldArray[i][j].tileSprite.visible = false;
                }
            }
        }
    },
    isInsideBoard: function(row, col){
        return (row >= 0) && (col >= 0) && (row < 4) && (col < 4);
    },
    tileDestination: function(pos, axis){
        var offset = (axis == ROW) ? (game.config.height - game.config.width) / 2 : 0;
        return pos * (gameOptions.tileSize + gameOptions.tileSpacing) + gameOptions.tileSize / 2 + gameOptions.tileSpacing + offset;
    }
});
function resize() {
    var canvas = document.querySelector("canvas");
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowRatio = windowWidth / windowHeight;
    var gameRatio = game.config.width / game.config.height;
    if(windowRatio < gameRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / gameRatio) + "px";
    }
    else{
        canvas.style.width = (windowHeight * gameRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }
}
