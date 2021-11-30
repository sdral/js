class gameOver extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameOver' });
    }

    preload() {

       


        



    } // end of preload //

    create () {

       

        console.log("gameOver")
        this.add.text(185,280, 'GAME OVER', 
            { font: '44px Rakkas', fill: '#ffffff' });

          this.add.text(220,550, 'press spacebar to restart', 
            { font: '20px Rakkas', fill: '#ffffff' });

        var spaceDown = this.input.keyboard.addKey('SPACE');

        spaceDown.on('down', function(){
            let playerPos = {};
        playerPos.x = 30
        playerPos.y = 260
        playerPos.dir = "right"
            this.scene.start("gameScene",{playerPos: playerPos});
            }, this );
            window.key = 0
    }

    
}
