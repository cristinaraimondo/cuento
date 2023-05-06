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
        this.load.image('background', 'fondos/fondoArboles.png')
                 
                 .spritesheet('dude', 'sprites/dude.png',
                { frameWidth: 174.88, frameHeight: 219 }
            )
            .image('flecha', 'sprites/flecha.png')
            .image('piso', 'piso.png' )

    }
    create(){
       
        this.background = this.add.tileSprite(480, 320, 960, 640, 'background').setScrollFactor(0);
        
        
        this.player = new Player(this, 100, 200, 'dude').setScale(0.8)

        this.wall_floor = this.physics.add.staticGroup();
        this.wall_floor.create(0, 600, 'piso').setOrigin(0)
        this.controlesVisuales();
        this.cursors = this.input.keyboard.createCursorKeys();
        this.animacionesDeLaEscena();
        this.cameras.main.setSize(1057, 694);
        //if (typeof world !== 'undefined') {
         //   this.scene.world.setBounds(0, 0, 300, 600, true)
        //}
        this.physics.add.collider([this.player], this.wall_floor);
    
      
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
       // this.background.tilePositionY= this.player.y;

    }
}
export default Firstscene;