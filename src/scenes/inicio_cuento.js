import { BotonReproducir } from "../clases/boton_reprocucir.js";

class InicioCuento extends Phaser.Scene {
  constructor() {
    super({ key: "InicioCuento" });
  }
  preload() {
    this.load.image("btnCap", "assets/sprites/botonCap.png");
    this.load.image("btnLobo", "assets/sprites/btnlobo.png");
    this.load.video(
      "video",
      "assets/videos/cepe1.mp4",
      "loadeddata",
      false,
      true
    );
    this.load.audio("voz", "assets/sounds/voz1.MP3");
  }

  create() {
    this.crearIntro();
    this.crearBotones();
    this.crearListeners();
    this.botonRepr.reproducir();
  }

  crearIntro() {
    //Añade el sonido a la scena
    this.miSonido = this.sound.add("voz", {
      loop: false,
      volume: 0.8,
    });
    // Añade el video a la escena
    this.video = this.add.video(450, 300, "video").setScale(0.48);
    this.videos = [this.video];
    this.audios = [this.miSonido];
  }

  crearBotones() {
    // Boton para reproducir y pausar el video
    this.botonRepr = new BotonReproducir(
      this,
      this.sys.game.canvas.width - 10,
      this.sys.game.canvas.height - 10,
      this.videos,
      this.audios
    );
    this.botonRepr.setScale(0.2).setOrigin(1, 1);
    this.botonRepr.setInteractive();
    // Botones para alternar la historia
    this.botonCaperucita = this.add.image(800, 400, "btnCap").setScale(0.2);
    this.botonCaperucita.setVisible(false);
    this.botonLobo = this.add.image(800, 200, "btnLobo").setScale(0.2);
    this.botonLobo.setVisible(false);
  }

  crearListeners() {
    // Pausar o reproducir y cambiar la textura
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
    // Al hacer click en el boton de caperucita se sigue su historia
    this.botonCaperucita.once(
      "pointerdown",
      () => {
        this.scene.start("CaperucitaBuscaIngredientes");
        this.sound.stopAll();
      },
      this
    );
    // Al hacer click en el boton del lobo se sigue su historia
    this.botonLobo.once(
      "pointerdown",
      () => {
        this.sound.stopAll();
        this.scene.start("VersionLobo");
      },
      this
    );
    // Una vez terminado el video los botones para alternar la historia se vuelven interactivos
    this.video.once(
      "complete",
      () => {
        this.botonRepr.disableInteractive();
        this.botonCaperucita.setVisible(true);
        this.botonLobo.setVisible(true);
        this.botonCaperucita.setInteractive();
        this.botonLobo.setInteractive();
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
export default InicioCuento;
