
class room1 extends Phaser.Scene {
  constructor() {
    super({ key: 'room1' });
    this.holdKey = false,
      this.holdThankyou = false;
    this.holdEar = false;
    this.holdClock = false;

    this.completeThankyou = false;
    this.completeEar = false;
    this.completeClock = false;


  }

  init(data) {
    this.playerPos = data.playerPos;

  }

  preload() {
    // var map = this.load.tilemapTiledJSON('world','assets/world.json')
    var map = this.load.tilemapTiledJSON('level2', 'assets/maze_level2.json')

    this.load.spritesheet("boy", "assets/boy_64x83.png", {
      frameWidth: 64,
      frameHeight: 83,
    });



    this.load.image('mazewallpng', 'assets/wall.png')
    this.load.image("npc2", "assets/thankyou_npc.png")
    this.load.image("npc3", "assets/clock_npc.png")
    this.load.image("npc4", "assets/ear_npc.png")


    this.load.image("keypng", "assets/key.png")
    this.load.image("thankyou", "assets/thankyou.png")
    this.load.image("clock", "assets/clock.png")
    this.load.image("ear", "assets/ear.png")







    this.load.audio("ding", "assets/ding.mp3");
    this.load.audio("bgmusic", "assets/bg_music.mp3");
    this.load.audio("hit", "assets/hit.wav");
    this.load.audio("smallhit", "assets/smallhit.wav");
    this.load.audio("dooropen", "assets/doorOpen.wav");
    this.load.audio("win", "assets/win.wav");
    this.load.audio("lose", "assets/lose.mp3");

  } // end of preload //

  create() {


    console.log("maze")

    // Call to update inventory
    this.time.addEvent({
      delay: 500,
      callback: updateInventory,
      callbackScope: this,
      loop: false,
    });

    // this.music = this.sound.add("bgmusic",{loop: true}).setVolume(0.06);
    this.dingSnd = this.sound.add("ding").setVolume(3);
    this.hitSnd = this.sound.add("hit").setVolume(3);
    this.smallhitSnd = this.sound.add("smallhit").setVolume(2);
    this.dooropenSnd = this.sound.add("dooropen").setVolume(0.5);
    this.winSnd = this.sound.add("win").setVolume(0.2);
    this.loseSnd = this.sound.add("lose").setVolume(1);

    // this.bgmusicSnd = this.sound.add("bgmusic")

    //  var map = this.make.tilemap({key:'world'});
    var map = this.make.tilemap({ key: 'level2' });



    var tileset1 = map.addTilesetImage('wall', 'mazewallpng');



    let tilesArray = [tileset1]

    this.background = map.createLayer('background', tilesArray, 0, 0).setScale(2)
    this.wall2 = map.createLayer('wall2', tilesArray, 0, 0).setScale(2)
    this.wall1 = map.createLayer('wall1', tilesArray, 0, 0).setScale(2)
    this.door = map.createLayer('door', tilesArray, 0, 0).setScale(2)

    //this.decoLayer = map.createLayer('deco',tilesArray,0,0).setScale(2)
    //this.deco2Layer = map.createLayer('deco 2',tilesArray,0,0).setScale(2)
    // this.doorLayer = map.createLayer('door',tilesArray,0,0).setScale(2)



    this.physics.world.bounds.width = this.background.width * 2;
    this.physics.world.bounds.height = this.background.height * 2;



    // load player into phytsics
    this.player = this.physics.add.sprite(
      this.playerPos.x,
      this.playerPos.y,
      "boy"
    ).setScale(1.5).play("up-boy");

    // this.player.body.setSize(this.player.width * 0.9, this.player.height * 0.9)
    this.player.body.setSize(50, 40).setOffset(5, 5)

    window.player = this.player;

    this.player.setCollideWorldBounds(true); // don't go out of the this.map


    this.Mrthankyou = this.physics.add.sprite(104, 1105, "npc2").setScale(1.6);
    this.Mrclock = this.physics.add.sprite(1050, 1005, "npc3").setScale(1.6);
    this.Mrear = this.physics.add.sprite(2200, 1905, "npc4").setScale(1.6);

    this.key1 = this.physics.add.sprite(-1000, -1000, "key1").setScale(0.5);
    this.thankyou = this.physics.add.sprite(800, 1100, "thankyou").setScale(2);
    this.clock = this.physics.add.sprite(500, 500, "clock").setScale(2);
    this.ear = this.physics.add.sprite(2200, 1150, "ear").setScale(2);






    // this.add.sprite(140,188,"guard");

    // Disable tween during testing 
    // this.time.addEvent({
    //     delay: 1000,
    //     callback: this.moveGuard1,
    //     callbackScope: this,
    //     loop: false,
    //   });

    //   this.time.addEvent({
    //     delay: 1000,
    //     callback: this.moveGuard2,
    //     callbackScope: this,
    //     loop: false,
    //   });

    //   this.time.addEvent({
    //     delay: 1000,
    //     callback: this.moveGuard3,
    //     callbackScope: this,
    //     loop: false,
    //   });

    //   this.guard = this.physics.add.sprite(757, 460, "guardleft").play("guardleftAnim").setScale(0.85);
    // this.guard = this.physics.add.sprite(707, 150, "guarddown").play("guarddownAnim").setScale(0.9);
    // this.guard2 = this.physics.add.sprite(337, 747, "guarddown").play("guarddownAnim").setScale(0.9);
    // this.guard3 = this.physics.add.sprite(747, 435, "guarddown").play("guarddownAnim").setScale(0.9);


    // this.guard.setPipeline('Light2D').setAlpha(0.2);
    // this.guard2.setPipeline('Light2D').setAlpha(0.2);
    // this.guard3.setPipeline('Light2D').setAlpha(0.2);



    this.wall2.setCollisionByExclusion(-1, true);
    this.wall1.setCollisionByExclusion(-1, true);
    this.door.setCollisionByExclusion(-1, true);

    // Show colliding tiles as different colours 
    //  const debugGraphics = this.add.graphics().setAlpha(0.75);
    //  this.wall1.renderDebug(debugGraphics, {
    //  tileColor: null, // Color of non-colliding tiles
    //  collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //  faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    //  });
    //  this.wall2.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(255,0, 0, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    //   });



    this.physics.add.collider(this.player, this.wall2);

    this.physics.add.collider(this.player, this.wall1);
    this.physics.add.collider(this.player, this.door);



    // this.physics.add.collider(this.guard,this.wall2);

    // this.physics.add.overlap(
    //   this.player,
    //   [this.guard,this.guard2,this.guard3],
    //   // call global function guardCaught at 
    //   guardCaught,
    //   null,
    //   this
    // );

    this.physics.add.overlap(
      this.player,
      this.thankyou,
      this.getThankyou,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.Mrthankyou,
      this.giveThankyou,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.clock,
      this.getClock,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.Mrclock,
      this.giveClock,
      null,
      this
    );


    this.physics.add.overlap(
      this.player,
      this.ear,
      this.getEar,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.Mrear,
      this.giveEar,
      null,
      this
    );

    // this.physics.add.overlap(
    //   this.player,
    //   this.npc2,
    //   this.getKey,
    //   null,
    //   this
    // );



    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // Needed for fog of war
    this.cameras.main.setBackgroundColor("#000000");




    // start another scene in parallel
    this.scene.launch("showInventory");

  } // end of create //

  update() {

    // spotlight follows player movement
    // this.spotlight.x=this.player.x+5;
    // this.spotlight.y=this.player.y-5;

    if (this.holdKey) {
      this.key1.x = this.player.x + 20
      this.key1.y = this.player.y
    }

    // if( this.holdThankyou){
    //   this.thankyou.x=this.player.x+20
    // this.thankyou.y=this.player.y
    // }

    if (this.holdThankyou) {

      this.thankyou.x = this.player.x + 20
      this.thankyou.y = this.player.y


    }

    if (this.holdClock) {

      this.clock.x = this.player.x + 20
      this.clock.y = this.player.y


    }
    if (this.holdEar) {

      this.ear.x = this.player.x + 20
      this.ear.y = this.player.y


    }


    if (
      this.player.x > 2600 &&
      this.player.x < 2680 &&
      this.player.y < 183
      && this.completeClock &&
      this.completeEar && this.completeThankyou
    ) {
      console.log("get in to room 1")
      this.room2();
      // this.door.setCollisionByExclusion(-1, false);

      this.dooropenSnd.play();
    }





    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-500);
      this.player.anims.play('left-boy', true);
    }
    else if (this.cursors.right.isDown) {
      this.player.setVelocityX(500);
      this.player.anims.play('right-boy', true);
    }
    else if (this.cursors.up.isDown) {
      this.player.setVelocityY(-500);
      this.player.anims.play('up-boy', true);
    }
    else if (this.cursors.down.isDown) {
      this.player.setVelocityY(500);
      this.player.anims.play('down-boy', true);
    } else {
      this.player.setVelocity(0);
      this.player.anims.stop()
    }


  } // end of update // 

  //     getThankyou (player,thankyoupng) {
  //         console.log("getThankyou")
  //         this.thankyou.x=this.player.x+20
  // this.thankyou.y=this.player.y
  // this.holdThankyou=true;

  //         this.dingSnd.play();
  //         // window.key++
  //         thankyou.disableBody(true, true);
  //         this.updateInventory()
  //         updateInventory.call(this)
  //     }

  getThankyou(player, thankyou) {
    console.log("hold getThankyou")

    this.holdThankyou = this.player.x + 20
    this.thankyou.y = this.player.y
    this.holdThankyou = true;

    this.dingSnd.play();

  }

  getEar(player, ear) {
    console.log("getEar")

    this.holdEar = this.player.x + 20
    this.ear.y = this.player.y
    this.holdEar = true;

    this.dingSnd.play();

  }

  getClock(player, clock) {
    console.log("getClock")

    this.holdClock = this.player.x + 20
    this.clock.y = this.player.y
    this.holdClock = true;

    this.dingSnd.play();

  }

  getKey(player, npc2) {
    this.key1.x = this.player.x + 20
    this.key1.y = this.player.y
    this.holdKey = true;
    this.door.setCollisionByExclusion(-1, false);

  }

  giveClock(player, npc2) {
    console.log("GIVECLOCK")

    if (this.holdClock) {
      this.clock.disableBody(true, true);
      this.holdClock = false;
      this.completeClock = true;
    }


  }

  giveEar(player, npc2) {
    console.log("GIVEEAR")
    if (this.holdEar) {
      this.ear.disableBody(true, true);
      this.holdEar = false;
      this.completeEar = true;
    }


  }

  giveThankyou(player, npc2) {
    console.log("GIVETHANKYOU")
    if (this.holdThankyou) {
      this.thankyou.disableBody(true, true);
      this.holdThankyou = false;
      this.completeThankyou = true;
    }


  }




  room1(player, title) {
    console.log("entering room1");
    this.scene.start("instructions");
  }

  room2(player, title) {
    console.log("entering room2");
    this.scene.start("instructions5");
  }

  room3(player, title) {
    console.log("entering room3");
    this.scene.start("room3");
  }

  room4(player, title) {
    this.scene.start("room4");
  }

  //   updateInventory() {
  //     // Emit events showInventory
  //     this.inventory = {}
  //     this.inventory.heart = window.heart
  //     this.inventory.key = window.key

  //     console.log('Emit event', this.inventory)
  //     this.invEvent = (event, data) => this.scene.get('showInventory').events.emit(event, data);
  //     this.invEvent("inventory", this.inventory);
  // }


}