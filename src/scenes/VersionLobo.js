import { BotonReproducir } from "../clases/boton_reprocucir.js";

class VersionLobo extends Phaser.Scene {
  constructor() {
    super({ key: "VersionLobo" });
  }

  preload() {
    this.load.path = "./assets/";

    this.load.audio("lobo", "sounds/vozLobo.MP3");
  }

  create() {
    this.crearVersionLobo();
    this.crearBotones();
    this.crearListeners();
    this.botonRepr.reproducir();
  }

  crearVersionLobo() {
    this.versionLobo = this.sound.add("lobo", {
      loop: false,
      volume: 0.8,
    });

    this.audios = [this.versionLobo];
    this.videos = [];
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
export default VersionLobo;
