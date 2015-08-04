Smath.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:
    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)
    //Own
    this.marker;
    this.map;
    this.layer;
    this.mask;
    this.selectedTiles = [];

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Smath.Game.prototype = {
    create: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.add.sprite(0, 0, 'green');
        this.map = this.game.add.tilemap();
        this.map.addTilesetImage('tiles', 'tiles', 64, 64);

        this.layer = this.map.create('layer', 10, 10, 64, 64);
        this.mask = this.map.createBlankLayer('mask', 10, 10, 64, 64);

        this.fill();
        this.marker = this.createTileSelector(this.game);
        this.game.input.addMoveCallback(this.updateMarker, this);
        this.game.input.onUp.add(this.changeTiles, this);
    },

    createTileSelector: function (game) {
        //  Our tile selection window
        var tileSelectorBackground = game.make.graphics();
        tileSelectorBackground.beginFill(0x000000, 0.5);
        tileSelectorBackground.drawRect(0, 0, 800, 68);
        tileSelectorBackground.endFill();

        //  Our painting marker
        var marker = game.add.graphics();
        marker.lineStyle(2, 0x000000, 1);
        marker.drawRect(0, 0, 64, 64);

        return marker;
    },

    updateMarker: function () {
        var x = this.layer.getTileX(this.game.input.activePointer.worldX);
        var y = this.layer.getTileY(this.game.input.activePointer.worldY);
        this.marker.x = x * 64;
        this.marker.y = y * 64;
        if (this.game.input.mousePointer.isDown) {
            this.saveTiles(x, y);
        }
    },

    saveTiles: function (x, y) {
        var el = [x, y];
        if (!this.contains(this.selectedTiles, el)) {
            this.selectedTiles.push(el);
            this.map.putTile(13, el[0], el[1], this.mask);
        }
    },

    contains: function (selectedTiles, tile) {
        var contains = false;
        selectedTiles.forEach(function (element) {
            if (element[0] == tile[0] && element[1] == tile[1]) {
                contains = true;
            }
        });
        return contains;
    },

    changeTiles: function () {
        var evaluation = "";
        for (var i = 0; i < this.selectedTiles.length; i++) {
            var coordinates = this.selectedTiles[i];
            this.map.removeTile(coordinates[0], coordinates[1], this.mask);
            var tile = this.map.getTile(coordinates[0], coordinates[1], this.layer);
            var index = tile.index;
            if (index == 10) {
                index = "+";
            } else if (index == 11) {
                index = "-";
            } else if (index == 12) {
                index = "";
            } else if (index == 13) {
                index = "";
            }
            evaluation += (index);
            //this.map.putTile(++index, coordinates[0], coordinates[1], this.layer);
        }
        evaluation = eval(evaluation);
        evaluation = evaluation.toString();
        var type;
        for (var i = 0; i < this.selectedTiles.length; i++) {
            var coordinates = this.selectedTiles[this.selectedTiles.length - i - 1];
            if (evaluation.length > i) {
                this.map.putTile(evaluation[evaluation.length - 1 - i],coordinates[0],coordinates[1],this.layer);
            }else{
                this.map.removeTile(coordinates[0], coordinates[1], this.layer);
            }
        }
        console.log(evaluation);
        this.selectedTiles = [];
    },

    fill: function () {
        var type;
        var width = 10;
        for (var i = 0; i < 100; i++) {
            type = this.rnd.between(0, 12);
            var x = Math.floor(i / width);
            var y = i % width;
            this.map.putTile(type, x, y, this.layer);
        }
    },

    update: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
    },

    quitGame: function (pointer) {
        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.
        //  Then let's go back to the main menu.
        this.state.start('MainMenu');
    }

};
