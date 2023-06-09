import { BotonReproducir } from "../clases/boton_reprocucir.js";

class Presentacion extends Phaser.Scene {
  constructor() {
    super({ key: "Presentacion" });
  }

  preload() {
    this.load.path = "./assets/";

    // LOAD IMAGES AND SPRITES
    this.load.image("iconoReproducir", "audio.png");
    this.load.image("iconoPausa", "pausar.png");
    this.load.image("intro", "fondos/tapa.png");
    this.load.image("creditos", "creditos.png");
  }
  create() {
    this.crearFondo();
    this.crearBotones();
    this.crearListeners();
  }

  crearFondo() {
    this.tapa = this.add.image(450, 300, "intro");
    this.creditos= this.add.image(450, 300, "creditos")
    this.creditos.setVisible(false)
  }

  crearBotones() {
    this.botonRepr = new BotonReproducir(
      this,
      this.sys.game.canvas.width - 10,
      this.sys.game.canvas.height - 150
    )
      .setScale(0.2)
      .setOrigin(1, 1);
    this.botonRepr.setInteractive();
  }

  crearListeners() {
    this.time.delayedCall(2000, () => {
      this.creditos.setVisible(true)
    });
    this.botonRepr.once(
      "pointerdown",
      () => {
        this.scene.start("InicioCuento");
      },
      this
    );
    
  }
}
export default Presentacion;
