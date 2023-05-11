class Video extends Phaser.Scene {
    constructor() {
        super({ key: 'Video' });
        
      }
    preload() {
      this.load.video('video', 'assets/videos/cepe1.mp4','loadeddata', false, true);
      this.load.audio('voz', 'assets/sounds/voz1.MP3');
    }
  
    create() {
      this.sound.resumeAll();
      // Añade el video a la escena
      this.video = this.add.video(450, 300, 'video').setScale(0.45);
      this.miSonido = this.sound.add('voz', {
       // loop: false,
        volume: 0.8
    });
    
      // Reproduce el sonido
      this.miSonido.play();

  
      // Reproduce el video
      this.video.play();
      
     }
     update(){
      

     }
  }
  export default Video;