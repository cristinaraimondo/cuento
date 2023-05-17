class Video extends Phaser.Scene {
  constructor() {
    super({ key: "Video" });
  }
  preload() {
    this.load.image("rep", "assets/audio.png");
    this.load.image("btnCap", "assets/sprites/botonCap.png");
    this.load.image("btnLobo", "assets/sprites/btnlobo.png");
    this.load.image("pausa", "assets/pausar.png");
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
  }

  crearIntro() {
    //Añade el sonido a la scena
    this.miSonido = this.sound.add("voz", {
      loop: false,
      volume: 0.8,
    });
    this.miSonido.play();
    this.miSonido.pause();
    // Añade el video a la escena
    this.video = this.add.video(450, 300, "video").setScale(0.48);
    this.video.pause();
  }

  crearBotones() {
    // Boton para reproducir y pausar el video
    this.botonRepr = this.add
      .image(
        this.sys.game.canvas.width - 10,
        this.sys.game.canvas.height - 10,
        "rep"
      )
      .setScale(0.2)
      .setOrigin(1, 1);
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
        console.log(this.video.isPlaying());
        console.log(this.miSonido.isPlaying);
        if (this.video.isPlaying() || this.miSonido.isPlaying) {
          console.log("pausa");
          this.botonRepr.setTexture("rep");
          this.pausarIntro();
        } else {
          console.log("reanudar");
          this.botonRepr.setTexture("pausa");
          this.reanudarIntro();
        }
      },
      this
    );
    // Al hacer click en el boton de caperucita se sigue su historia
    this.botonCaperucita.once(
      "pointerdown",
      () => {
        this.scene.start("Firstscene");
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
      },
      this
    );
  }

  pausarIntro() {
    console.log("pausarIntro");
    this.miSonido.pause();
    this.video.pause();
  }

  reanudarIntro() {
    console.log("reanudarIntro");
    this.miSonido.resume();
    this.video.resume();
  }

  update() {}
}
export default Video;
