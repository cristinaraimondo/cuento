class Video extends Phaser.Scene {
    constructor() {
        super({ key: 'Video' });
        
      }
    preload() {
      this.load.image('rep','assets/audio.png')
      this.load.image('pausa','assets/pausar.png')
      this.load.video('video', 'assets/videos/cepe1.mp4','loadeddata', false, true);
      this.load.audio('voz', 'assets/sounds/voz1.MP3');
      
    }
  
    create() {
     
      this.miSonido = this.sound.add('voz', {
        loop: false,
         volume: 0.8
     });
     this.sound.resumeAll();
      // Reproduce el sonido
      this.miSonido.play();
     
     
      // Añade el video a la escena
      this.video = this.add.video(450, 300, 'video').setScale(0.48);
       // Reproduce el video
       this.video.play();
    
      var boton=this.add.image(100, 100,'rep').setScale(0.2)
      boton.setInteractive()
      boton.on('pointerdown', function() {
        // Hace el botón invisible
        boton.setVisible(false);
      });

     
  
     
      
     }
     update(){
      

     }
  }
  export default Video;