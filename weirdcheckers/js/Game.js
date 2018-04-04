"use strict";



GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var blob, game;
    var bgData = "data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAABHNCSVQICAgIfAhkiAAAAFFJREFUWIXtzjERACAQBDFgMPOKzr8ScADFFlBsFKRX1WqfStLG68SNQcogZZAySBmkDFIGKYOUQcogZZAySBmkDFIGKYOUQcog9X1wJnl9ONrTcwPWLGFOywAAAABJRU5ErkJggg==";
  
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }

    var dist = function (x1, y1, x2, y2) 
    {
        return Math.sqrt(Math.pow((x1-x2),2)+Math.pow((y1-y2),2));
    }

    var backgroundSprite;
    return {

        create: function () {
            this.fieldArray = [];
            this.fieldGroup = this.add.group();
            this.score = 0;
            this.bestScore = localStorage.getItem(gameOptions.localStorageName == null ? 0 : localStorage.getItem(gameOptions.localStorageName));
            for(var i = 0; i < 4; i++)
            {
                this.fieldArray[i] = [];
                for(var j = 0; j < 4; j++)
                {
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



            backgroundSprite = game.add.tileSprite(0,0,game.width,game.height,'bg');

            //game = new Phaser.Game(480,800,Phaser.AUTO,'blocks-game',{preload:preload, create:create});
    
        },

        addChecker: function(){
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
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!



        }
    };
};
