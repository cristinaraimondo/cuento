import Player from "../clases/player.js";

class CaperucitaBuscaIngredientes extends Phaser.Scene {
  constructor() {
    super("CaperucitaBuscaIngredientes");
  }

  init() {
    this.camara = this.cameras.main;
  }
  preload() {
    this.load.path = "./assets/";

    // LOAD IMAGES AND SPRITES
    this.load
      .image("background", "fondos/fondo.png")

      .spritesheet("dude", "sprites/dude4.png", {
        frameWidth: 174.88,
        frameHeight: 219,
      })

      .image("flecha", "sprites/flecha.png")
      .image("piso", "piso.png")
      .image("tronco", "sprites/tronco.png")
      .image("pizza", "sprites/pizza.png")
      .atlas(
        "ing",
        "sprites/ingredi/ingredi.png",
        "sprites/ingredi/ingredi_atlas.json"
      );
    this.load.audio("plop", "/sounds/plop1.MP3");
    this.load.audio('pasos', 'sounds/misc141.mp3');
    this.load.audio('bosque', 'sounds/bosque.mp3');
  }
  create() {
    this.itemsRecolectados = 0;

    this.plop = this.sound.add("plop", {
      loop: false,
      volume: 0.8,
    });
    this.plop.pause();

    this.background = this.add
      .tileSprite(480, 320, 960, 640, "background")
      .setScrollFactor(0);
    this.tronco = this.physics.add.staticGroup();
    this.tronco
      .create(2880, 500, "tronco")
      .setScale(0.5)
      .setSize(120, 120)
      .setOffset(220, 60);
    this.textoItemsRecolectados = this.add
      .text(10, 10, "Ingredientes de la pizza recolectados: 0", {
        font: "16px Arial",
        fill: "#000000",
      })
      .setScrollFactor(0);
    this.textoConsigna = this.add
      .text(
        10,
        100,
        [
          "Caperucita va a llevarle a la abuelita, una pizza",
          " pero primero debe recoger todos los ingredientes",
          "para luego hacer la pizza.",
          "¿Le podés ayudar a juntarlos?",
        ],
        { font: "16px Arial", fill: "#000000" }
      )
      .setScrollFactor(0);
    this.player = new Player(this, 100, 200, "dude").setScale(0.8);
    this.pizza = this.add
      .image(0, 0, "pizza")
      .setOrigin(0, 0)
      .setScale(0.25)
      .setScrollFactor(0);
    this.pizza.setVisible(false);
    this.cebolla = this.physics.add.sprite(900, 300, "ing", "1").setScale(0.2);
    this.ajo = this.physics.add.sprite(-200, 305, "ing", "7").setScale(0.2);
    this.peperoni = this.physics.add
      .sprite(-350, 410, "ing", "8")
      .setScale(0.2);
    this.masa = this.physics.add.sprite(-500, 400, "ing", "5").setScale(0.2);
    this.queso = this.physics.add.sprite(1700, 450, "ing", "4").setScale(0.2);
    this.oregano = this.physics.add.sprite(1100, 280, "ing", "6").setScale(0.2);
    this.campinone = this.physics.add
      .sprite(250, 289, "ing", "2")
      .setScale(0.2);
    this.tomate = this.physics.add.sprite(3020, 390, "ing", "3").setScale(0.2);
    this.aji = this.physics.add.sprite(2880, 170, "ing", "9").setScale(0.2);
    this.pasosSound = this.sound.add('pasos');
      this.pasosSound.volume = 0.5; 
      this.sonidoBosque=this.sound.add('bosque')
      this.sonidoBosque.volume = 0.9; 
      this.sonidoBosque.play()

    this.wall_floor = this.physics.add.staticGroup();
    this.wall_floor.create(0, 650, "piso").setOrigin(0);
    this.wall_floor.create(6000, 650, "piso").setOrigin(0);
    this.controlesVisuales();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.animacionesDeLaEscena();
    this.cameras.main.setSize(1057, 694);
    //if (typeof world !== 'undefined') {
    //   this.scene.world.setBounds(0, 0, 300, 600, true)
    //}
    this.physics.add.collider([this.player], this.wall_floor);
    this.physics.add.collider([this.player], this.tronco);

    this.physics.add.overlap(this.cebolla, this.player, () => {
      // this.registry.events.emit('update_points');
      this.cebolla.destroy();
      this.itemsRecolectados++;
      this.plop.play();
    });
    this.physics.add.overlap(this.ajo, this.player, () => {
      // this.registry.events.emit('update_points');
      this.ajo.destroy();
      this.itemsRecolectados++;
      this.plop.play();
    });
    this.physics.add.overlap(this.queso, this.player, () => {
      // this.registry.events.emit('update_points');
      this.queso.destroy();
      this.itemsRecolectados++;
      this.plop.play();
    });
    this.physics.add.overlap(this.aji, this.player, () => {
      // this.registry.events.emit('update_points');
      this.aji.destroy();
      this.itemsRecolectados++;
      this.plop.play();
    });
    this.physics.add.overlap(this.peperoni, this.player, () => {
      // this.registry.events.emit('update_points');
      this.peperoni.destroy();
      this.itemsRecolectados++;
      this.plop.play();
    });
    this.physics.add.overlap(this.masa, this.player, () => {
      // this.registry.events.emit('update_points');
      this.masa.destroy();
      this.itemsRecolectados++;
      this.plop.play();
    });
    this.physics.add.overlap(this.oregano, this.player, () => {
      // this.registry.events.emit('update_points');
      this.oregano.destroy();
      this.itemsRecolectados++;
      this.plop.play();
    });
    this.physics.add.overlap(this.tomate, this.player, () => {
      // this.registry.events.emit('update_points');
      this.tomate.destroy();
      this.itemsRecolectados++;
      this.plop.play();
    });
    this.physics.add.overlap(this.campinone, this.player, () => {
      // this.registry.events.emit('update_points');
      this.campinone.destroy();
      this.itemsRecolectados++;
      this.plop.play();
    });
  }
  animacionesDeLaEscena() {
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "walk2",
      frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: 'reposo',
      frames: [ { key: 'dude', frame: 4 } ],
      frameRate: 20
  });
    
  }

  controlesVisuales() {
    this.player.setData("direccionHorizontal", 0);
    this.player.setData("estaSaltando", false);
    this.leftbtn = this.add
      .image(50, 560, "flecha")
      .setInteractive()
      .setScrollFactor(0);
    this.rightbtn = this.add
      .image(140, 560, "flecha")
      .setInteractive()
      .setScrollFactor(0);
    this.rightbtn.flipX = true;
    this.upbtn = this.add
      .image(700, 560, "flecha")
      .setInteractive()
      .setScrollFactor(0);
    this.upbtn.rotation = Math.PI / 2;

    this.leftbtn.on("pointerdown", function () {
      this.scene.player.setData("direccionHorizontal", Phaser.LEFT);
    });

    this.rightbtn.on("pointerdown", function () {
      this.scene.player.setData("direccionHorizontal", Phaser.RIGHT);
    });

    this.upbtn.on("pointerdown", function () {
      this.scene.player.setData("estaSaltando", Phaser.UP);
    });

    this.leftbtn.on("pointerup", function () {
      this.scene.player.setData("direccionHorizontal", Phaser.NONE);
    });

    this.rightbtn.on("pointerup", function () {
      this.scene.player.setData("direccionHorizontal", Phaser.NONE);
    });

    this.upbtn.on("pointerup", function () {
      this.scene.player.setData("estaSaltando", Phaser.NONE);
    });
  }

  update(time, delta) {
    if (
      this.cursors.left.isDown ||
      this.player.getData("direccionHorizontal") === Phaser.LEFT
    ) {
      this.player.caminarALaIzquierda();
      this.player.setVelocityX(-250);
      
    } else if (
      this.cursors.right.isDown ||
      this.player.getData("direccionHorizontal") === Phaser.RIGHT
    ) {
      this.player.setVelocityX(250);
      this.player.caminarALaDerecha();
    } else {
      this.player.setVelocityX(0);
      this.player.reposo();
    }
    if (
      this.cursors.up.isDown ||
      this.player.getData("estaSaltando") === Phaser.UP
    ) {
      this.player.saltar();
    }
    this.player.update();
    this.cameras.main.scrollX = this.player.x - 400;
    this.cameras.main.scrollY = 0;
    this.background.tilePositionX = this.player.x;
    this.textoItemsRecolectados.setText(
      "Ingredientes de la pizza recolectados: " + this.itemsRecolectados
    );
    if (this.itemsRecolectados === 9) {
      // Cambiar de pantalla
      this.pizza.setVisible(true);
      this.player.setVisible(false);

      this.time.delayedCall(2000, () => {
        this.sound.stopAll();
        this.scene.start("cruzaBosque");
        
      });
    }
    if (this.cursors.left.isDown || this.cursors.right.isDown || 
      this.player.getData("direccionHorizontal") === Phaser.LEFT ||  
      this.player.getData("direccionHorizontal") === Phaser.RIGHT ){
      
      if (!this.pasosSound.isPlaying) {
        this.pasosSound.play();
      }
    } else {
      
      this.pasosSound.stop();
    }
   
  
  }
}
export default CaperucitaBuscaIngredientes;
