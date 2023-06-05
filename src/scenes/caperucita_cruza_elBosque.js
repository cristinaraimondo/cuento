import { BotonReproducir } from "../clases/boton_reprocucir.js";


class CaperucitaCruzaBosque extends Phaser.Scene {
  constructor() {
    super({ key: "cruzaBosque" });
  }

  preload() {
    this.load.path = "./assets/";

    this.load.audio("cruza", "sounds/lobocApe.MP3");
    this.load.image("iconoReproducir", "audio.png");
    this.load.image("iconoPausa", "pausar.png");
    this.load.image("mano", "sprites/mano.png")
    
    this.load.video(
      "videoCapeLobo",
      "videos/capeVuelaLobo.mp4",
      "loadeddata",
      false,
      true
    );
  }

  create() {
    this.crearCruzaBosque();
    this.crearBotones();
    this.crearListeners();
    this.botonRepr.reproducir();
    
  }

  crearCruzaBosque() {
    this.cruzaBosque = this.sound.add("cruza", {
      loop: false,
      volume: 0.8,
    });
// Añade el video a la escena
    this.video = this.add.video(450, 300, "videoCapeLobo",).setScale(0.70);
    this.audios = [this.cruzaBosque];
    this.videos = [this.video];
    this.btnMmano= this.add.image(830,300, "mano")
   
  }

  crearBotones() {
    this.botonRepr = new BotonReproducir(
      this,
      this.sys.game.canvas.width - 10,
      this.sys.game.canvas.height - 10,
      this.videos,
      this.audios
    );
    this.botonRepr.setScale(0.2).setOrigin(1, 1);
    this.botonRepr.setInteractive();
    this.btnMmano.setInteractive()
    this.btnMmano.setVisible(false).setScale(0.5)
    
  }

  crearListeners() {
    this.botonRepr.on(
      "pointerdown",
      function () {
        if (
          !this.botonRepr.estaReproduciendo() &&
          !this.botonRepr.estaPausado()
        ) {
          this.botonRepr.reproducir();
        } else if (this.botonRepr.estaReproduciendo()) {
          this.botonRepr.pausar();
        } else {
          this.botonRepr.reanudar();
        }
      },
      this
    );
    this.btnMmano.once(
        "pointerdown",
        () => {
          this.scene.start("CaperucitaVuela");
        },
        this
      );
    
    this.video.on(
      "complete",
      () => {
        this.botonRepr.setIconoReproducir();
        this.botonRepr.setVisible(false)
        this.btnMmano.setVisible(true)
    
      },
      this
    );
    this.game.events.on(
      Phaser.Core.Events.BLUR,
      () => {
        if (this.botonRepr.estaReproduciendo()) {
          this.botonRepr.pausar();
        }
      },
      this
    );
  }
}
export default CaperucitaCruzaBosque;
