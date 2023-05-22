import { BotonReproducir } from "../clases/boton_reprocucir.js";

class VersionCaperucita extends Phaser.Scene {
  constructor() {
    super({ key: "Cape" });
  }

  preload() {
    this.load.path = "./assets/";

    this.load.audio("cape", "sounds/loboComeAbuela.MP3");
  }
  create() {
    this.crearVersionCaperucita();
    this.crearBotones();
    this.crearListeners();
    this.botonRepr.reproducir();
  }

  crearVersionCaperucita() {
    this.versionCape = this.sound.add("cape", {
      loop: false,
      volume: 0.8,
    });

    this.audios = [this.versionCape];
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
    this.versionCape.on(
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
export default VersionCaperucita;
