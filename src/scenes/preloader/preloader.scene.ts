import Phaser from "phaser";

import { ENV } from "../../environments/dev.env";
import { GG } from "../../manager";
import * as ASSETS from "../../assets";
import * as UTILS from "../../utils";

import { SCENE_KEYS } from "../scene.keys";

export class PreloaderScene extends Phaser.Scene {
  constructor() {
    super(SCENE_KEYS.PRELOADER);
  }

  init() {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
  }

  private shutdown() {}

  preload() {
    if (ENV.debug) {
      console.log(`[${this.scene.key}] Loading assets...`);
    }

    // Audio //
    ASSETS.AUDIO.PRELOAD_LIST.forEach((audioAsset) => {
      UTILS.ASSETS.loadAudio(this.load, audioAsset);
    });

    // Atlas //
    ASSETS.ATLASES.PRELOAD_LIST.forEach((atlasAsset) => {
      UTILS.ASSETS.loadAtlas(this.load, atlasAsset);
    });

    // Fonts //
    ASSETS.FONTS.PRELOAD_LIST.forEach((bmpFontAsset) => {
      UTILS.ASSETS.loadBitmapFont(this.load, bmpFontAsset);
    });

    // Images //
    ASSETS.IMAGES_PRELOAD_LIST.forEach((imageAsset) => {
      UTILS.ASSETS.loadImage(this.load, imageAsset);
    });

    // Spritesheets //
    ASSETS.SPRITESHEETS.PRELOAD_LIST.forEach((spritesheetAsset) => {
      UTILS.ASSETS.loadSpriteSheet(this.load, spritesheetAsset);
    });

    // Tiles //
    ASSETS.TILES.PRELOAD_SET_LIST.forEach((tilesetAsset) => {
      UTILS.ASSETS.loadImage(this.load, tilesetAsset);
    });
  }

  create() {
    if (ENV.debug) {
      console.log(`[${this.scene.key}] Creating animations...`);
    }

    ASSETS.ANIMS.registerSharedAnimations(this.anims);

    if (ENV.debug) {
      console.log(`[${this.scene.key}] Preload complete, starting main menu`);
    }

    GG.gotoMainMenu();
  }
}
