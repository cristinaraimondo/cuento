import Player from '../clases/player.js';
class CaperucitaJuntaResiduos extends Phaser.Scene  {

    constructor(){
        super('recolecta');
        this.totalAlimentos = 20; //  total de alimentos a recolectar
    this.alimentosDepositados = 0; // Contador de alimentos depositados
    }
  
  
  
    preload() {
      this.load.path = './assets/';
       this.load.image('background', 'fondos/fondo.png')
                 
             .spritesheet('dude', 'sprites/dude4.png',
                { frameWidth: 174.88, frameHeight: 219 }
            )
           
            .image('flecha', 'sprites/flecha.png')
            .image('piso', 'piso.png' )
            .image('tronco','sprites/tronco.png')
      
      this.load.image('alimento1', 'sprites/residuos/banana.png');
      this.load.image('alimento2', 'sprites/residuos/bolsa.png');
      this.load.image('alimento3', 'sprites/residuos/papel.png');
      this.load.image('alimento4', 'sprites/residuos/plast.png');
      this.load.image('alimento5', 'sprites/residuos/pollo.png');
      this.load.image('alimento6', 'sprites/residuos/lechga.png');
      this.load.image('alimento7', 'sprites/residuos/vidrio.png');
      this.load.image('boteOrganico', 'sprites/residuos/borganico.png');
      this.load.image('boteNoOrganico', 'sprites/residuos/bplastco.png');
      this.load.audio('pasos', 'sounds/misc141.mp3');
      this.load.audio('bosque', 'sounds/bosque.mp3');
    
      this.load.spritesheet('dude', 'sprites/dude4.png',
      { frameWidth: 174.88, frameHeight: 219 }
  )
    }
  
    create() {
      
      this.background = this.add.tileSprite(480, 320, 960, 640, 'background').setScrollFactor(0)
      this.tronco = this.physics.add.staticGroup();
      this.tronco.create(2880, 500, "tronco").setScale(0.5).setSize(120,120).setOffset(220, 60)
      this.player = new Player(this, 100, 100);
      this.pasosSound = this.sound.add('pasos');
      this.pasosSound.volume = 0.5; 
      this.sonidoBosque=this.sound.add('bosque')
      this.sonidoBosque.volume = 0.9; 
      this.sonidoBosque.play()
      this.wall_floor = this.physics.add.staticGroup()
      this.wall_floor.create(0, 650, 'piso').setOrigin(0)
      this.wall_floor.create(6000, 650, 'piso').setOrigin(0)
      this.controlesVisuales();
      this.cursors = this.input.keyboard.createCursorKeys();
      this.animacionesDeLaEscena();
      this.cameras.main.setSize(1057, 694);
      
      this.physics.add.collider([this.player], this.wall_floor);
      this.physics.add.collider([this.player], this.tronco);
      this.alimentos = this.physics.add.group();

var totalAlimentos = 20; // total de alimentos a crear
var minX = 600; 
var maxX = 3000; 
var minY = 250; 
var maxY = 500; 

for (var i = 0; i < totalAlimentos; i++) {
  var randomX = Phaser.Math.Between(minX, maxX);
  var randomY = Phaser.Math.Between(minY, maxY);
  var alimento = this.alimentos.create(randomX, randomY, 'alimento' + (i % 7 + 1));
 
  alimento.setScale(0.35);
  alimento.setDepth(2);
}

      this.physics.add.overlap(this.player, this.alimentos, this.recolectarAlimento, null, this);
  
      this.boteOrganico = this.physics.add.sprite(400, 400, 'boteOrganico').setScale(0.2);
      this.boteNoOrganico = this.physics.add.sprite(600, 400, 'boteNoOrganico').setScale(0.2);
      
      
     
  
      this.physics.add.overlap(this.player, this.boteOrganico, this.depositarAlimentosOrganicos, null, this);
      this.physics.add.overlap(this.player, this.boteNoOrganico, this.depositarAlimentosNoOrganicos, null, this);
  
      this.puntajeOrganico = 0;
      this.puntajeNoOrganico = 0;
      this.puntajeText = this.add.text(16, 16, 'Puntaje Orgánico: 0\nPuntaje No Orgánico: 0', { fontSize: '32px', fill: '#000' }).setScrollFactor(0);
     
     
      
    }
    recolectarAlimento(player, alimento) {
      alimento.disableBody(true, true);
  
      // Verifico si el alimento es orgánico o no orgánico
      if (alimento.texture.key === 'alimento1') {
        this.puntajeOrganico += 1;
      } else if (alimento.texture.key === 'alimento2') {
        this.puntajeNoOrganico += 1;
      } else if (alimento.texture.key === 'alimento3') {
        this.puntajeOrganico += 1;
      } else if (alimento.texture.key === 'alimento4') {
        this.puntajeNoOrganico += 1;
      } else if (alimento.texture.key === 'alimento5') {
        this.puntajeOrganico += 1;
      } else if (alimento.texture.key === 'alimento6') {
        this.puntajeNoOrganico += 1;
      } else if (alimento.texture.key === 'alimento7') {
        this.puntajeOrganico += 1;
      }
  
      this.puntajeText.setText('Puntaje Orgánico: ' + this.puntajeOrganico + '\nPuntaje No Orgánico: ' + this.puntajeNoOrganico);
    }
  
    depositarAlimentosOrganicos(player, bote) {
      if (this.puntajeOrganico > 0) {
        this.puntajeOrganico -= 1;
        this.puntajeText.setText('Puntaje Orgánico: ' + this.puntajeOrganico + '\nPuntaje No Orgánico: ' + this.puntajeNoOrganico);
        
        // Crea un nuevo sprite de alimento en la posición del bote orgánico
        var alimentoDepositado = this.add.sprite(bote.x, bote.y, 'alimento1').setScale(0.2)
        var alimentoDepositado1 = this.add.sprite(bote.x, bote.y, 'alimento3').setScale(0.2)
        var alimentoDepositado2 = this.add.sprite(bote.x, bote.y, 'alimento6').setScale(0.2)
        var alimentoDepositado3 = this.add.sprite(bote.x, bote.y, 'alimento5').setScale(0.2)
        
       
       // Anima el alimento para que se mueva hacia el bote orgánico
    this.tweens.add({
      targets: [alimentoDepositado,alimentoDepositado1,alimentoDepositado2,alimentoDepositado3],
      x: bote.x,
      y: bote.y,
      duration: 500,
      onComplete:  ()=> {
       
        alimentoDepositado.destroy(); 
        alimentoDepositado2.destroy()
        alimentoDepositado1.destroy()
        alimentoDepositado3.destroy()
       
        this.alimentosDepositados += 1; // Incrementa el contador de alimentos depositados

       /* if (this.alimentosDepositados === this.totalAlimentos) {
          // Si se han depositado todos los alimentos, cambia a la siguiente escena
          this.sound.stopAll();
          this.scene.start("VersionLoboFinal" );
        }*/
      }
    });
  }
}

depositarAlimentosNoOrganicos(player, bote) {
  if (this.puntajeNoOrganico > 0) {
    this.puntajeNoOrganico -= 1;
    this.puntajeText.setText('Puntaje Orgánico: ' + this.puntajeOrganico + '\nPuntaje No Orgánico: ' + this.puntajeNoOrganico);
    
    // Crea un nuevo sprite de alimento en la posición del bote no orgánico
    var alimentoDepositado = this.add.sprite(bote.x, bote.y, 'alimento2').setScale(0.2);
    var alimentoDepositado1= this.add.sprite(bote.x, bote.y, 'alimento4').setScale(0.2);
    var alimentoDepositado2= this.add.sprite(bote.x, bote.y, 'alimento7').setScale(0.2);
    
    
 
    this.tweens.add({
      targets: [alimentoDepositado,alimentoDepositado1,alimentoDepositado2],
      x: bote.x,
      y: bote.y,
      duration: 500,
      onComplete: ()=> {
     
        alimentoDepositado.destroy(); 
        alimentoDepositado1.destroy();
        alimentoDepositado2.destroy() // Elimina el sprite del alimento depositado
        this.alimentosDepositados += 1; 

       /* if (this.alimentosDepositados === this.totalAlimentos) {
         
          this.sound.stopAll();
          this.scene.start("VersionLoboFinal");
        }*/
       
      }
    });
  }
}
  
    update() {
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
    
        
       // Actualización del jugador
       
     
      if (this.cursors.left.isDown || this.cursors.right.isDown || 
        this.player.getData("direccionHorizontal") === Phaser.LEFT ||  
        this.player.getData("direccionHorizontal") === Phaser.RIGHT ){
        
        if (!this.pasosSound.isPlaying) {
          this.pasosSound.play();
        }
      } else {
        
        this.pasosSound.stop();
      }
      if (this.alimentosDepositados === this.totalAlimentos) {
        
        this.sound.stopAll();
        
      
        this.scene.start("VersionLoboFinal" );
      }
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
  
   
  }
  export default CaperucitaJuntaResiduos