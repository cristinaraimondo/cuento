
import LoboVolador from "../clases/loboVolador.js";
import PlayerVolador from "../clases/playerVolador.js";

class CaperucitaVuelaACasaAbuelita extends Phaser.Scene {
  constructor() {
    super("CaperucitaVuela");
  }

  init() {
    this.camara = this.cameras.main;
  }
  preload() {
    this.load.path = "./assets/";

    // LOAD IMAGES AND SPRITES
    this.load
      .image("background", "fondos/fondo.png")
      .image("flecha", "sprites/flecha.png")
      .image("piso", "piso.png")
      .image("refresco","sprites/cola.png")
      .image("helado", "sprites/helado.png")
      .image("jugo","sprites/jugo.png")
      .image("copa", "sprites/postre.png")
      .image("casa", "sprites/cas.png")
    

      .spritesheet("dude1", "sprites/capePiza.png", {
        frameWidth: 295,
        frameHeight:244 ,
      })
   this.load.spritesheet('loboVolador', 'sprites/loboVolador.png', {
        frameWidth: 477,
        frameHeight: 272
      });

      
   
    
  }
  create() {
    

    this.background = this.add
      .tileSprite(480, 320, 960, 640, "background")
      .setScrollFactor(0)
      
   
    
    this.player= new PlayerVolador(this, 100, 300, "dude1").setScale(0.5);
    this.lobo = new LoboVolador(this, 700, 500, " loboVolador").setScale(0.3)
    this.player.setData('vidas', 10);  // Inicializar el número de vidas del jugador
    this.player.setData('items', 0);  // Inicializar el número de vidas del jugador
     // Inicializar el número de vidas del jugador
    this. itemsRecolectados = 0;//inicializo contador de items
    this.totalItems = 4;
     this.llegoACasa = false;
    this.textoVidas = this.add.text(20, 20, 'Vidas: ' + this.player.getData('vidas'), 
    { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' }).setScrollFactor(0);
    this.textoItems = this.add.text(720, 20, 'items: ' + this.player.getData('items'), 
    { fontFamily: 'Arial', fontSize: '24px', fill: '#ffffff' }).setScrollFactor(0);
    this.wall_floor = this.physics.add.staticGroup();
    this.wall_floor.create(0, 650, "piso").setOrigin(0);
    this.wall_floor.create(6000, 650, "piso").setOrigin(0);

    

    this.coca= this.physics.add.sprite(-100, 170, "refresco",).setScale(0.1);
    this.helado= this.physics.add.sprite(-400, 300, "helado",).setScale(0.1);
    this.jugo= this.physics.add.sprite(750, 500, "jugo",).setScale(0.1);
    this.copa= this.physics.add.sprite(1600, 400, "copa",).setScale(0.1);
    this.casa= this.physics.add.sprite(4000, 100, "casa",).setScale(1.2).setSize(120,120);
    this.controlesVisuales();
    this.cursors = this.input.keyboard.createCursorKeys();
    this.animacionesDeLaEscena();
    this.cameras.main.setSize(1057, 694);
    
    this.physics.add.collider(this.player, this.lobo, this.playerGolpeadoPorLobo, null, this);
    this.physics.add.overlap(this.player, this.casa, this.colisionaJugadorCasa, null, this);

    this.physics.add.overlap(this.copa, this.player, () => {
      this.colisionaJugadorItem()
      this.copa.destroy();
      this.player.itemsRecolectados++;
      
    });
    this.physics.add.overlap(this.jugo, this.player, () => {
     this.colisionaJugadorItem()
      this.jugo.destroy();
      this.player.itemsRecolectados++;
      
    });
    this.physics.add.overlap(this.coca, this.player, () => {
      this.colisionaJugadorItem()
      this.coca.destroy();
      this.player.itemsRecolectados++;
      
    });
    this.physics.add.overlap(this.helado, this.player, () => {
      this.colisionaJugadorItem()
      this.helado.destroy();
      this.player.itemsRecolectados++;
      
    });
  
    
  }
  colisionaJugadorCasa(jugador, casa) {
    this.llegoACasa = true;
    if (this.itemsRecolectados === this.totalItems && this.llegoACasa) {
      this.scene.start("VersionLobo" ); // Cambia a la nueva escena cuando se hayan recogido todos los items y el jugador haya llegado a su casa
    }
  }
  colisionaJugadorItem(jugador, item) {
    if (this.itemsRecolectados < this.totalItems) {
      this.itemsRecolectados++;
     
      this.textoItems.setText('items: ' + this.itemsRecolectados);
   
    // Aquí puedes agregar lógica adicional relacionada con la colisión con el item
  
    if (this.itemsRecolectados === this.totalItems && this.llegoACasa) {
      this.scene.start("VersionLobo" ); // Cambia a la nueva escena cuando se hayan recogido todos los items y el jugador haya llegado a su casa
    }
  }}
  colisionJugadorItem(jugador, item) {
    if (this.vidas < this.vidasMaximas) {
      this.vidas++;
      this.textoVidas.setText('Vidas: ' + vidas);
      // Aquí puedes agregar lógica adicional relacionada con la colisión con el item
    }
  }
  playerGolpeadoPorLobo(){
    
    if (!this.player.estaAturdido && this.player.vidas > 0) {
      this.player.estaAturdido = true; // Establecer al jugador en estado aturdido
      this.player.vidas--;
      this.player.setData('vidas', this.player.vidas);
      this.textoVidas.setText('Vidas: ' + this.player.getData('vidas'));
      this.time.addEvent({ delay: 1000, callback: this.terminoElAturdimiento, callbackScope: this });
      console.log("Colisión entre el jugador y el lobo");
    }
    }
    terminoElAturdimiento() {
      this.player.estaAturdido = false; // Restablecer el estado del jugador a no aturdido
    }
    
  animacionesDeLaEscena() {
    this.anims.create({
      key: "volar",
      frames: this.anims.generateFrameNumbers("dude1", { start: 0, end: 1 }),
      frameRate: 10,
      repeat: -1
    });
   
    this.anims.create({
      key: 'reposar',
      frames: this.anims.generateFrameNumbers("dude1", { start: 2, end: 3}),
      frameRate: 10,
      repeat: -1
  });
 
  this.anims.create({
    key: 'loboFly',
          frames: this.anims.generateFrameNumbers('loboVolador', {start: 0, end: 1}),
          frameRate: 10,
          repeat: -1,
  });
  this.anims.create({
    key: 'loboAttack',
    frames: this.anims.generateFrameNumbers('loboVolador', { frames: [ 0, 1 ] }),
    frameRate: 10
  });
    
  }

  controlesVisuales() {
    this.player.setData("direccionHorizontal", 0);
    this.player.setData("estaVolando", false);
    this.player.setData("estaBajando", false);
    this.player.setData("reposar", false);
    
   
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
      .image(800, 460, "flecha")
      .setInteractive()
      .setScrollFactor(0);
    this.upbtn.rotation = Math.PI / 2;

    this.downbtn = this.add
      .image(800, 540, "flecha")
      .setInteractive()
      .setScrollFactor(0);
    this.downbtn.rotation = Math.PI / -2;

    this.leftbtn.on("pointerdown", function () {
      this.scene.player.setData("direccionHorizontal", Phaser.LEFT);
    });

    this.rightbtn.on("pointerdown", function () {
      this.scene.player.setData("direccionHorizontal", Phaser.RIGHT);
    });

    this.upbtn.on("pointerdown", function () {
      this.scene.player.setData("estaVolando", Phaser.UP);
     
      
    });
    this.downbtn.on("pointerdown", function () {
      this.scene.player.setData("estaBajando", Phaser.DOWN);
     
    });

    this.leftbtn.on("pointerup", function () {
      this.scene.player.setData("direccionHorizontal", Phaser.NONE);
    });

    this.rightbtn.on("pointerup", function () {
      this.scene.player.setData("direccionHorizontal", Phaser.NONE);
    });

    this.upbtn.on("pointerup", function () {
      this.scene.player.setData("estaVolando", Phaser.NONE);
    });
    this.downbtn.on("pointerup", function () {
        this.scene.player.setData("estaBajando", Phaser.NONE);
       
      });
  }
  

  update(time, delta) {
    
    if (this.cursors.left.isDown ||
        this.player.getData("direccionHorizontal") === Phaser.LEFT
      ) {
        this.player.volarALaIzquierda();
        this.player.setVelocityX(-250);
      } else if (
        this.cursors.right.isDown ||
        this.player.getData("direccionHorizontal") === Phaser.RIGHT
      ) {
        this.player.setVelocityX(250);
        this.player.volarALaDerecha();
      } else {
        this.player.setVelocityX(0);
        this.player.reposar();
      }
      if (
        this.cursors.up.isDown || 
        this.player.getData("estaVolando") === Phaser.UP
       
         ) {
        this.player.volar();
        this.player.setVelocityY(-250);
      
  } else if (
    this.cursors.down.isDown || 
    this.player.getData("estaBajando") === Phaser.DOWN
   
     ) {
    this.player.caer();
    this.player.setVelocityY(250);
  } else {
    this.player.setVelocityY(0);
    
     } 
     
    this.player.update();
    this.lobo.update();
    if (this.player.getData('vidas') === 0) {
      this.scene.restart(); // Reiniciar la escena actual
    }
    if (this.player.getData('items') === 4 &&this.llegoACasa===true) {
      this.scene.start("VersionLoboFinal" ); // Reiniciar la escena actual
    }
    // Verificar si el jugador ha llegado a su casa
  if (this.player.x > 4000 && this.player.y < 200) {
    this.llegoACasa = true;
  }
    this.cameras.main.scrollX = this.player.x - 400;
    this.cameras.main.scrollY = 0;
    this.background.tilePositionX = this.player.x;
    const playerBounds = this.player.getBounds();
    const gameBounds = this.physics.world.bounds;

    const playerBounds1 = this.lobo.getBounds();
    const gameBounds1 = this.physics.world.bounds;
 

  if (playerBounds.top < gameBounds.top) {
    this.player.y = gameBounds.top + playerBounds.height / 2;
  } else if (playerBounds.bottom > gameBounds.bottom) {
    this.player.y = gameBounds.bottom - playerBounds.height / 2;
  }
  if (playerBounds1.top < gameBounds1.top) {
    this.lobo.y = gameBounds1.top + playerBounds1.height / 2;
    
  } else if (playerBounds1.bottom > gameBounds1.bottom) {
    this.lobo.y = gameBounds1.bottom - playerBounds1.height / 2;
    
  }
  
    
  }
}
export default CaperucitaVuelaACasaAbuelita;
