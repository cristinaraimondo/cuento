import Firstscene from './scenes/Firstscene.js';
import Video from './scenes/Video.js';
import Presentación from './scenes/Presentación.js';
import VersionCaperucita from './scenes/VersionCaperucita.js';
const config ={
    title:'Capericita roja ',
  

    type:Phaser.AUTO,
    
    scale: {
        parent: 'phaser_container',
        width:900,
        height: 600,
        antialias: true, // Habilitar antialiasing
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
    scene:[Presentación,Firstscene,Video, VersionCaperucita ],
    video: {
        key: 'video',
        type: 'video',
        sources: ['video.mp4', 'video.ogg'],
        audio: true
      }
};
const game = new Phaser.Game(config);