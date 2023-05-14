class Presentacion extends Phaser.Scene{
    constructor() {
        super({ key: 'Presentacion' });

        
      }
     
      preload(){
        this.load.path = './assets/';

        // LOAD IMAGES AND SPRITES
        this.load.image('intro', 'fondos/tapa6.png')
                 
        

      }
      create(){
        this.tapa = this.add.image(450, 300, 'intro')
        //var text = this.add.text(100, 100, '¡Hola, mundo!', { fontSize: '32px', fill: '#000' });
        this.time.delayedCall(3000, () => {
            this.scene.start('Video');
       });
       
     
      
      }
      

}
export default Presentacion;