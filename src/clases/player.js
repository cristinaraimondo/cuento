export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "dude");
    scene.physics.systems.displayList.add(this);
    scene.physics.systems.updateList.add(this);
    scene.physics.world.enableBody(this, 0);
    //this.scene.physics.world.enable(this)
    // scene.physics.add.collider(this, scene.collisionLayer);
    scene.add.existing(this);

    this.init();
    this.saltar();
    this.caminarALaIzquierda();
    this.caminarALaDerecha();
    this.reposo();
  }


  init() {
    this.setBounce(0.2)
      //.setCollideWorldBounds(true)
      .setGravityY(300)
      .setDepth(2);
    // .body.setSize(120,200,140,120); // custom mask => setSize(width, height, XinSprite, YinSprite)
    this.body.setSize(80, 210);
    this.body.setOffset(50, 10);
  }
  saltar() {
    if (this.enElSuelo) {
      this.body.setVelocityY(-250);
     
      this.play("estaSaltando", true);
    }
  }

  caminarALaIzquierda() {
   
    if (this.enElSuelo) this.play("walk2", true);
  
  }

  caminarALaDerecha() {
    
    if (this.enElSuelo) this.play("walk", true);
  }

  reposo() {
    if (this.enElSuelo) this.play("reposo", true);
  }
  update() {
    this.enElSuelo = this.body.onFloor();
  }
}
