import { BotonReproducir } from "../clases/boton_reprocucir.js";

class VersionCaperucitaFinal extends Phaser.Scene {
  constructor() {
    super({ key: "VersionCapeFinal" });
  }

  preload() {
    this.load.path = "./assets/";

    this.load.audio("capeFinal", "sounds/audiofinalVersionCape.MP3");
    this.load.image("iconoReproducir", "audio.png");
    this.load.image("iconoPausa", "pausar.png");
    this.load.image("btnLobo", "sprites/btnlobo.png");
    
    this.load.video(
      "videoCapeFinal",
      "videos/capeFinal.mp4",
      "loadeddata",
      false,
      true
    );
  }

  create() {
    this.crearVersionCape();
    this.crearBotones();
    this.crearListeners();
    this.botonRepr.reproducir();
    
  }

  crearVersionCape() {
    this.versionCape = this.sound.add("capeFinal", {
      loop: false,
      volume: 0.8,
    });
// Añade el video a la escena
    this.video = this.add.video(450, 300, "videoCapeFinal").setScale(0.70)
    this.audios = [this.versionCape];
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
    this.botonLobo = this.add.image(800, 200, "btnLobo").setScale(0.2);
    this.botonLobo.setVisible(false);
    this.botonLobo.setInteractive()

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
    
    this.versionCape.on(
      "complete",
      () => {
        this.botonRepr.setIconoReproducir();
        this.botonRepr.setVisible(false)
        this.botonLobo.setVisible(true);
        
      },
      this
    );
    this.botonLobo.once(
        "pointerdown",
        () => {
          this.sound.stopAll();
          this.scene.start("VersionLobo");
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
export default VersionCaperucitaFinal;
