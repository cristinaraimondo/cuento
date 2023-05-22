export class BotonReproducir extends Phaser.GameObjects.Image {
  constructor(scene, x, y, videos, audios) {
    super(scene, x, y, "iconoReproducir");
    this.videos = videos;
    this.audios = audios;
    this.scene.add.existing(this);
    this.iconoReproducir = "iconoReproducir";
    this.iconoPausa = "iconoPausa";
  }

  reproducir() {
    this.setTexture(this.iconoPausa);
    this.videos.forEach((video) => {
      video.play();
    });
    this.audios.forEach((audio) => {
      audio.play();
    });
  }

  pausar() {
    this.setTexture(this.iconoReproducir);
    this.videos.forEach((video) => {
      video.pause();
    });
    this.audios.forEach((audio) => {
      audio.pause();
    });
  }

  reanudar() {
    this.setTexture(this.iconoPausa);
    this.videos.forEach((video) => {
      video.resume();
    });
    this.audios.forEach((audio) => {
      audio.resume();
    });
  }

  detener() {
    this.setTexture(this.iconoReproducir);
    this.videos.forEach((video) => {
      video.stop();
    });
    this.audios.forEach((audio) => {
      audio.stop();
    });
  }

  estaReproduciendo() {
    return (
      this.videos.some((video) => video.isPlaying()) ||
      this.audios.some((audio) => audio.isPlaying)
    );
  }

  estaPausado() {
    return (
      this.videos.every((video) => video.isPaused()) &&
      this.audios.every((audio) => audio.isPaused)
    );
  }

  setIconoReproducir(icono) {
    if (icono) {
      this.setTexture(icono);
    } else {
      this.setTexture(this.iconoReproducir);
    }
  }

  setIconoPausa(icono) {
    if (icono) {
      this.setTexture(icono);
    } else {
      this.setTexture(this.iconoPausa);
    }
  }
}
