import Player from "../clases/player.js";


class Firstscene extends Phaser.Scene{

    constructor(){
        super('Firstscene');
    }

    init(){
        this.camara = this.cameras.main;
      

    }
    preload(){
        this.load.path = './assets/';

        // LOAD IMAGES AND SPRITES
        this.load.image('background', 'fondos/fondo.png')
                 
             .spritesheet('dude', 'sprites/dude4.png',
                { frameWidth: 174.88, frameHeight: 219 }
            )
           
            .image('flecha', 'sprites/flecha.png')
            .image('piso', 'piso.png' )
            .image('tronco','sprites/tronco.png')
            .atlas('ing', 'sprites/ingredi/ingredi.png', 'sprites/ingredi/ingredi_atlas.json');

            
    }
    create(){
       
        this.background = this.add.tileSprite(480, 320, 960, 640, 'background').setScrollFactor(0)
        this.tronco = this.physics.add.staticGroup();
        this.tronco.create(2880, 500, "tronco").setScale(0.5).setSize(120,120).setOffset(220, 60)
        
        this.player = new Player(this, 100, 200, 'dude').setScale(0.8)
      // this.tronco= this.physics.add.sprite(2880,500,'tronco').setScale(0.5)
       // this.tronco.body.setSize(180, 210);
        //this.tronco.body.setOffset(200, 10);
        this.cebolla=this.physics.add.sprite(900, 300, 'ing', '1').setScale(0.2)
        this.ajo=this.physics.add.sprite(20, 305, 'ing', '7').setScale(0.2)
      this.peperoni=this.physics.add.sprite(-350, 410, 'ing', '8').setScale(0.2)
      this.masa=this.physics.add.sprite(-500, 400, 'ing', '5').setScale(0.2)
      this.queso=this.physics.add.sprite(1700, 450, 'ing', '4').setScale(0.2)
     this.oregano=this.physics.add.sprite(1100, 280, 'ing', '6').setScale(0.2)
     this.campinone= this.physics.add.sprite(150,289, 'ing', '2').setScale(0.2)
     this.tomate=this.physics.add.sprite(3020, 390, 'ing', '3').setScale(0.2)
     this.aji=this.physics.add.sprite(2880,170,'ing','9').setScale(0.2)
    
       
        this.wall_floor = this.physics.add.staticGroup()
        this.wall_floor.create(0, 650, 'piso').setOrigin(0)
        this.wall_floor.create(6000, 650, 'piso').setOrigin(0)
        this.controlesVisuales();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.animacionesDeLaEscena();
        this.cameras.main.setSize(1057, 694);
        //if (typeof world !== 'undefined') {
         //   this.scene.world.setBounds(0, 0, 300, 600, true)
        //}
        this.physics.add.collider([this.player], this.wall_floor);
        this.physics.add.collider([this.player], this.tronco);
       
        
        this.physics.add.overlap(this. cebolla, this.player, () => {
           // this.registry.events.emit('update_points');
            this.cebolla.destroy();
             });
             this.physics.add.overlap(this.ajo, this.player, () => {
                // this.registry.events.emit('update_points');
                 this.ajo.destroy();
                  });
                  this.physics.add.overlap(this.queso, this.player, () => {
                    // this.registry.events.emit('update_points');
                     this.queso.destroy();
                      });
                      this.physics.add.overlap(this.aji, this.player, () => {
                        // this.registry.events.emit('update_points');
                         this.aji.destroy();
                          });
                          this.physics.add.overlap(this.peperoni, this.player, () => {
                            // this.registry.events.emit('update_points');
                             this.peperoni.destroy();
                              });
                              this.physics.add.overlap(this.masa, this.player, () => {
                                // this.registry.events.emit('update_points');
                                 this.masa.destroy();
                                  });
                                  this.physics.add.overlap(this.oregano, this.player, () => {
                                    // this.registry.events.emit('update_points');
                                     this.oregano.destroy();
                                      });
                                      this.physics.add.overlap(this.tomate, this.player, () => {
                                        // this.registry.events.emit('update_points');
                                         this.tomate.destroy();
                                          });
                                          this.physics.add.overlap(this.campinone, this.player, () => {
                                            // this.registry.events.emit('update_points');
                                             this.campinone.destroy();
                                              });
      
    }
    animacionesDeLaEscena() {
		this.anims.create({
			key: 'walk',
			frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
			frameRate: 10,
			repeat: -1,
		});
        this.anims.create({
			key: 'walk2',
			frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
			frameRate: 10,
			repeat: -1,
		});
		this.anims.create({
			key: 'reposo',
			frames: this.anims.generateFrameNumbers('dude', {start: 4, end: 4}),
			frameRate: 4,
			repeat: -1,
		});
	}
    
    controlesVisuales() {
        this.player.setData('direccionHorizontal', 0);
        this.player.setData('estaSaltando', false);
        this.leftbtn = this.add.image(50, 560, 'flecha').setInteractive().setScrollFactor(0);
        this.rightbtn = this.add.image(140, 560, 'flecha').setInteractive().setScrollFactor(0);
        this.rightbtn.flipX = true;
        this.upbtn = this.add.image(700, 560,'flecha').setInteractive().setScrollFactor(0);
        this.upbtn.rotation = Math.PI/2;
    
        
        this.leftbtn.on('pointerdown', function() {
            this.scene.player.setData('direccionHorizontal', Phaser.LEFT);
        });
    
        this.rightbtn.on('pointerdown', function() {
            this.scene.player.setData('direccionHorizontal', Phaser.RIGHT);
        });
    
        this.upbtn.on('pointerdown', function() {
            this.scene.player.setData('estaSaltando', Phaser.UP);
        });
    
        this.leftbtn.on('pointerup', function() {
            this.scene.player.setData('direccionHorizontal', Phaser.NONE);
        });
    
        this.rightbtn.on('pointerup', function() {
            this.scene.player.setData('direccionHorizontal', Phaser.NONE);
        });
    
        this.upbtn.on('pointerup', function() {
            this.scene.player.setData('estaSaltando', Phaser.NONE);
        });
        
    }
    
    
    update(time, delta){
        if (this.cursors.left.isDown || this.player.getData('direccionHorizontal') === Phaser.LEFT) {
            this.player.caminarALaIzquierda(); 
            this.player.setVelocityX(-200)
        } else if (this.cursors.right.isDown || this.player.getData('direccionHorizontal') === Phaser.RIGHT) {
            this.player.setVelocityX(250); 
            this.player.caminarALaDerecha();
        } else {
            this.player.setVelocityX(0);
             this.player.reposo();
        }
        if (this.cursors.up.isDown || this.player.getData('estaSaltando') === Phaser.UP) {
            this.player.saltar();
        }
        this.player.update();
        this.cameras.main.scrollX = this.player.x - 400;
		this.cameras.main.scrollY = 0;
        this.background.tilePositionX= this.player.x;
      

    }
}
export default Firstscene;