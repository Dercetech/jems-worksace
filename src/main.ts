import Phaser from "phaser";

import { ENV } from "./environments/dev.env";
import { GAME_MANAGER } from "./manager/game-manager";
import * as PLUGINS from "./plugins";
import * as SCENES from "./scenes";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",

  width: 320,
  height: 240,

  scale: {
    zoom: 2,
  },
  autoFocus: true,

  pixelArt: true,

  input: {
    gamepad: true,
  },

  physics: {
    default: "matter",
    matter: {
      debug: ENV.debug,
      gravity: { x: 0, y: 0.25 },
    },
  },

  plugins: {
    scene: [{ key: PLUGINS.AnimatedTiles.ID, plugin: PLUGINS.AnimatedTiles, start: true, mapping: "animatedTiles" }],
  },

  scene: [SCENES.PreloaderScene, SCENES.MainMenuScene, SCENES.InGameScene],
};

PLUGINS.registerTiledJSONExternalLoader(Phaser);
GAME_MANAGER.init(new Phaser.Game(config));
