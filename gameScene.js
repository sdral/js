
class gameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'gameScene' });
    this.holdKey = false;
  }

  init(data) {
    this.playerPos = data.playerPos;

  }

  preload() {
    // var map = this.load.tilemapTiledJSON('world','assets/world.json')
    var map = this.load.tilemapTiledJSON('level1', 'assets/maze_level1.json')

    this.load.spritesheet("boy", "assets/boy_64x83.png", {
      frameWidth: 64,
      frameHeight: 83,
    });


    //this.load.image("cloud", "assets/Street32x32.png");

    this.load.image('mazewallpng', 'assets/wall.png')
    this.load.image("npc1", "assets/npc.png")

    //  this.load.image('doorpng', 'assets/door.png')

    //  this.load.image('wallpng', 'assets/wall.png')
    this.load.image("keypng", "assets/key.png")
    //  this.load.image("heartpng","assets/heart.png")





    this.load.audio("ding", "assets/ding.mp3");
    // this.load.audio("bgmusic", "assets/bg_music.mp3");
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
    var map = this.make.tilemap({ key: 'level1' });


    var tileset1 = map.addTilesetImage('wall', 'mazewallpng');
 


    let tilesArray = [tileset1]

    this.background = map.createLayer('background', tilesArray, 0, 0).setScale(2)
    this.wall2 = map.createLayer('wall2', tilesArray, 0, 0).setScale(2)
    this.wall1 = map.createLayer('wall1', tilesArray, 0, 0).setScale(2)
    this.door = map.createLayer('door', tilesArray, 0, 0).setScale(2)





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


    this.npc = this.physics.add.sprite(297, 570, "npc1").setImmovable().setScale(1.6);
    this.key1 = this.physics.add.sprite(-100, -100, "keypng").setScale(0.7);




    // this.add.sprite(140,188,"guard");

    // Disable tween during testing 
    // this.time.addEvent({
    //   delay: 1000,
    //   callback: this.moveGuard1,
    //   callbackScope: this,
    //   loop: false,
    // });

    // this.time.addEvent({
    //   delay: 1000,
    //   callback: this.moveGuard2,
    //   callbackScope: this,
    //   loop: false,
    // });

    // this.time.addEvent({
    //   delay: 1000,
    //   callback: this.moveGuard3,
    //   callbackScope: this,
    //   loop: false,
    // });

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
    // this.physics.add.collider(this.player, this.npc);


    // this.physics.add.collider(this.guard,this.wall2);

    this.physics.add.overlap(
      this.player,
      [this.guard, this.guard2, this.guard3],
      // call global function guardCaught at 
      guardCaught,
      null,
      this
    );

    this.physics.add.overlap(
      this.player,
      this.npc,
      this.getKey,
      null,
      this
    );

    //  Input Events
    this.cursors = this.input.keyboard.createCursorKeys();

    // make the camera follow the player
    this.cameras.main.startFollow(this.player);

    // Needed for fog of war
    this.cameras.main.setBackgroundColor("#000000");

    // Add fog of war lights
    //  this.background.setPipeline('Light2D');
    //  this.wall1.setPipeline('Light2D');
    //  this.wall2.setPipeline('Light2D');


    //  this.door.setPipeline('Light2D');

    //this.decoLayer.setPipeline('Light2D').setAlpha(0.1);
    //this.deco2Layer.setPipeline('Light2D').setAlpha(0.1);

    //  this.lights.enable();
    //  this.lights.setAmbientColor("#fffff0");
    //  this.spotlight=this.lights
    //        .addLight(this.player.x, this.player.y)
    //        .setRadius(500,500)
    //        .setIntensity(1.5);     


    // start another scene in parallel
    this.scene.launch("showInventory");

  } // end of create //

  update() {

    // spotlight follows player movement
    // this.spotlight.x=this.player.x+5;
    // this.spotlight.y=this.player.y-5;

    if (this.holdKey) {
      this.key1.x = this.player.x + 50
      this.key1.y = this.player.y
    }


    if (
      this.player.x > 350 &&
      this.player.x < 410 &&
      this.player.y < 182 &&
      this.holdKey
    ) {
      console.log("get in to room 1")
      this.room1();
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

  collectKey(player, key1) {
    console.log("collectKey")

    this.dingSnd.play();
    window.key++
    key1.disableBody(true, true);
    //this.updateInventory()
    updateInventory.call(this)
  }

  getKey(player, npc) {
    this.player.y= this.player.y +10
    this.key1.x = this.player.x + 70
    this.key1.y = this.player.y
    this.holdKey = true;
    this.dingSnd.play();
    this.door.setCollisionByExclusion(-1, false);
    



  }

  // guardCaught(player,guard) {
  //     console.log("attack by guard");

  //     this.hitSnd.play();

  //     // Shake screen
  //    this.cameras.main.shake(150);

  //     window.heart--
  //     guard.disableBody(false, true);
  //     //this.updateInventory()
  //     updateInventory.call(this)

  //   if (window.heart == 0){
  //     this.scene.start("gameOver");
  //     this.loseSnd.play();
  //   }
  // }

  moveGuard1() {
    //console.log("guard moveDownUp");
    this.tweens.timeline({
      targets: this.guard,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 2000,
      tweens: [
        {
          y: 265,
        },
        {
          y: 150,
        },
      ],
    });
  }

  moveGuard2() {
    //console.log("guard moveDownUp");
    this.tweens.timeline({
      targets: this.guard2,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 2000,
      tweens: [
        {
          y: 872,
        },
        {
          y: 747,
        },
      ],
    });
  }

  moveGuard3() {
    //console.log("guard moveUpDown");
    this.tweens.timeline({
      targets: this.guard3,
      ease: "Linear",
      loop: -1, // loop forever
      duration: 2000,
      tweens: [
        {
          y: 532,
        },
        {
          y: 435,
        },
      ],
    });
  }

  room1(player, title) {
    console.log("entering room1");
    this.scene.start("instructions3");
  }

  room2(player, title) {
    console.log("entering room2");
    this.scene.start("room2");
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