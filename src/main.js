import Firstscene from './scenes/Firstscene.js';
const config ={
    title:'Capericita roja ',
    pixelArt:true,

    type:Phaser.AUTO,
    
    scale: {
        parent: 'phaser_container',
        width: 900,
        height: 600,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#34495e',
    
    physics: {
        default: 'arcade',
        arcade: {
            // gravity: { y: 300 },
            debug: true
        }
    },
    scene:[Firstscene]
};
const game = new Phaser.Game(config);