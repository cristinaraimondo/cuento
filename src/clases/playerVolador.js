export default class PlayerVolador extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, "dude1");
      scene.physics.systems.displayList.add(this);
      scene.physics.systems.updateList.add(this);
      scene.physics.world.enableBody(this, 0);
      //this.scene.physics.world.enable(this)
      // scene.physics.add.collider(this, scene.collisionLayer);
      scene.add.existing(this);
      this.playerSpeed = 200;
      this.cursors = scene.input.keyboard.createCursorKeys();
  
      this.init();
      this.volar();
      this.volarALaIzquierda();
      this.volarALaDerecha();
      this.reposar();
      this.vidas=3;
      this.setSize(70,70)
     
      
    }
  
  
    init() {
      this.setBounce(0.2)
        //.setCollideWorldBounds(true)
       
        .setDepth(2);
      // .body.setSize(120,200,140,120); // custom mask => setSize(width, height, XinSprite, YinSprite)
      this.body.setSize(80, 210);
      this.body.setOffset(50, 10);
    }
    volar() {
     this.play("estaVolando", true);
      
    }
    caer(){
      
    this.play("estaBajando", true);
    }
  
  volarALaIzquierda(){
	
	this.flipX = false;
	this.play('volar', true)
}

volarALaDerecha(){
	
	this.flipX = true;
	this.play('volar', true);
}


reposar() {
	
	this.play('reposar', true);
}

    update() {
    
    }
    }
  
  