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

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

Smath.Game.prototype = {
    create: function () {
        //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
        this.add.sprite(0, 0, 'green');
        this.map = this.game.add.tilemap();
        this.map.addTilesetImage('tiles');
        this.layer = this.map.create('layer', 20, 20, 32, 32);
        this.fill();
        this.createTileSelector();
        this.game.input.addMoveCallback(this.updateMarker, this);
    },

    createTileSelector: function () {
        //  Our tile selection window
        //var tileSelector = this.game.add.group();

        var tileSelectorBackground = this.game.make.graphics();
        tileSelectorBackground.beginFill(0x000000, 0.5);
        tileSelectorBackground.drawRect(0, 0, 800, 34);
        tileSelectorBackground.endFill();

        //tileSelector.add(tileSelectorBackground);

        // var tileStrip = tileSelector.create(1, 1, 'ground_1x1');
        // tileStrip.inputEnabled = true;
        //tileStrip.events.onInputDown.add(pickTile, this);

        //tileSelector.fixedToCamera = true;

        //  Our painting marker
        this.marker = this.game.add.graphics();
        this.marker.lineStyle(2, 0x000000, 1);
        this.marker.drawRect(0, 0, 32, 32);

    },

    updateMarker: function () {
        var x = this.layer.getTileX(this.game.input.activePointer.worldX);
        var y = this.layer.getTileY(this.game.input.activePointer.worldY);

        this.marker.x = x* 32;
        this.marker.y = y * 32;

        if (this.game.input.mousePointer.isDown) {
            var type = this.rnd.between(0,9);
            this.map.putTile(type, x, y, this.layer);
        }
    },

    fill: function () {
        this.map.putTile(0, 5, 5);
        this.map.putTile(1, 7, 5);
        this.map.putTile(2, 1, 5);
        this.map.putTile(3, 2, 5);
        this.map.putTile(4, 3, 5);
        this.map.putTile(5, 4, 5);
        this.map.putTile(6, 6, 5);
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
