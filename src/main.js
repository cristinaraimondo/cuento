import CaperucitaBuscaIngredientes from "./scenes/caperucita_busca_ingredientes.js";
import CaperucitaCruzaBosque from "./scenes/caperucita_cruza_elBosque.js";
import CaperucitaJuntaResiduos from "./scenes/caperucita_junta_residuos.js";
import CaperucitaVuelaACasaAbuelita from "./scenes/caperucita_vuela_A_casa_abuelita.js";
import InicioCuento from "./scenes/inicio_cuento.js";
import Presentacion from "./scenes/presentacion.js";
import VersionCaperucita from "./scenes/VersionCaperucita.js";
import VersionCaperucitaFinal from "./scenes/versionCaperucitaFinal.js";
import VersionLobo from "./scenes/VersionLobo.js";
import VersionLoboFinal from "./scenes/versionLoboFinal.js";
const config = {
  title: "Capericita roja ",

  type: Phaser.AUTO,

  scale: {
    parent: "phaser_container",
    width: 900,
    height: 600,
    antialias: true, // Habilitar antialiasing
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  backgroundColor: "#34495e",

  physics: {
    default: "arcade",
    arcade: {
      // gravity: { y: 300 },
      debug: false,
    },
  },
  scene: [
    Presentacion,
    CaperucitaVuelaACasaAbuelita,
    CaperucitaBuscaIngredientes,
    VersionLoboFinal,
    VersionLobo,
    VersionCaperucitaFinal,
    CaperucitaCruzaBosque,
    InicioCuento,
    CaperucitaJuntaResiduos,
    VersionCaperucita,
   
    
  ],
  video: {
    key: "video",
    type: "video",
    sources: ["video.mp4", "video.ogg"],
    audio: true,
  },
};
const game = new Phaser.Game(config);
