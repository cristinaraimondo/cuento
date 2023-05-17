class Video extends Phaser.Scene {
    constructor() {
        super({ key: 'Video' });
        
      }
    preload() {
      this.load.image('rep','assets/audio.png')
      this.load.image('btnCap','assets/sprites/botonCap.png')
      this.load.image('btnLobo','assets/sprites/btnlobo.png')
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
      this.time.delayedCall(40000, () => {

       var botonCap=this.add.image(800, 400,'btnCap').setScale(0.2)
      botonCap.setInteractive()
      botonCap.on('pointerdown', () => {
       this.scene.start('Firstscene');
       this.sound.pauseAll();
      });
      var botonLobo=this.add.image(800, 200,'btnLobo').setScale(0.2)
      botonLobo.setInteractive()
      botonLobo.on('pointerdown', () => {
        this.sound.pauseAll();
        this.scene.start('VersionLobo' );
       
       });
        
   });
      

 
     
      
     }
     update(){
      

     }
  }
  export default Video;