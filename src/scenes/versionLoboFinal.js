import { BotonReproducir } from "../clases/boton_reprocucir.js";

class VersionLoboFinal extends Phaser.Scene {
  constructor() {
    super({ key: "VersionLoboFinal" });
  }

  preload() {
    this.load.path = "./assets/";

    this.load.audio("lobo1", "sounds/versionLoboFinal.MP3");
    this.load.image("iconoReproducir", "audio.png");
    this.load.image("iconoPausa", "pausar.png");
    
    this.load.video(
      "videoLobo1",
      "videos/versionLoboFinal.mp4",
      "loadeddata",
      false,
      true
    );
  }

  create() {
    this.crearVersionLobo();
    this.crearBotones();
    this.crearListeners();
    this.botonRepr.reproducir();
    
  }

  crearVersionLobo() {
    this.versionLobo = this.sound.add("lobo1", {
      loop: false,
      volume: 0.8,
    });
// Añade el video a la escena
    this.video = this.add.video(450, 300, "videoLobo1").setScale(0.70)
    this.audios = [this.versionLobo];
    this.videos = [this.video];
    
    
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
    
    this.versionLobo.on(
      "complete",
      () => {
        this.botonRepr.setIconoReproducir();
        this.botonRepr.setVisible(false)
        
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
export default VersionLoboFinal;
