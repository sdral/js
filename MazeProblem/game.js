var game;
window.onload=function()
{
var config = {
    type: Phaser.AUTO,
    ////// pixel size * tile map size * zoom 
    width: 64 * 37,
    height: 42 * 25.8,
    /////////////////////////////////////////
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    scale: {        
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#000000', 
    pixelArt: true,
    //// Add all scenes below in the array
    scene: [preloadScene,scene1,scene2,instructions,instructions2,instructions3,instructions4,instructions5,instructions6,gameScene,room1,room2,room3,room4,gameOver,showInventory]
};

var game = new Phaser.Game(config);

window.key= 0
window.thankyou= 0
window.clock= 0
window.ear= 0

window.heart = 3

}