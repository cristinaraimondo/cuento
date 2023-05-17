class VersionLobo extends Phaser.Scene{
    constructor() {
        super({ key: 'VersionLobo' });

        
      }
     
      preload(){
        this.load.path = './assets/';

       this.load.audio("lobo", 'sounds/vozLobo.MP3')
         
                 
        

      }
      create(){
        this.versionLobo = this.sound.add("lobo", {
            loop: false,
             volume: 0.8
         });
         this.sound.resumeAll();
          // Reproduce el sonido
          this.versionLobo.play();
         
                 
       
       
     
      
      }
      

}
export default  VersionLobo;