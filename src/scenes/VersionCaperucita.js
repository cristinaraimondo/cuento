class VersionCaperucita extends Phaser.Scene{
    constructor() {
        super({ key: 'Cape' });

        
      }
     
      preload(){
        this.load.path = './assets/';

       this.load.audio("cape", 'sounds/loboComeAbuela.MP3')
         
                 
        

      }
      create(){
        this.versionCape = this.sound.add('cape', {
            loop: false,
             volume: 0.8
         });
         this.sound.resumeAll();
          // Reproduce el sonido
          this.versionCape.play();
         
                 
       
       
     
      
      }
      

}
export default  VersionCaperucita;