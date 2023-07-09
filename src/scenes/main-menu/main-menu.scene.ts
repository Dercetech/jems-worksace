import { ENV } from "../../environments/dev.env";
import { GG } from "../../manager";

import { SCENE_KEYS } from "../scene.keys";
import * as ASSETS from "../../assets";
import * as CONSTANTS from "../../constants";
import * as UTILS from "../../utils";

enum DEPTHS {
  BACKGROUND = 1,
  MOBS = 10,
  TEXT = 20,
}

interface MainMenuState {
  gameStarting: boolean;
}

export class MainMenuScene extends Phaser.Scene {
  /** Allows skipping the menu via a dev/debug option while not preventing ESC to return to main menu */
  private _firstBoot: boolean = true;
  private _state: MainMenuState;

  constructor() {
    super(SCENE_KEYS.MAIN_MENU);
  }

  init() {
    if (ENV.debug) {
      console.log(`[${this.scene.key}] Main menu initializing`);
    }

    this._state = {
      gameStarting: false,
    };

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);

    this.input.keyboard.on("keydown", this.onStartGame, this);
  }

  protected shutdown() {
    if (ENV.debug) {
      console.log(`[${this.scene.key}] Main menu shutting down`);
    }
    // this.sound.stopAll();
  }

  preload() {
    if (ENV.skipMainMenu && this._firstBoot) {
      return;
    }

    if (ENV.debug) {
      console.log(`[${this.scene.key}] Loading assets...`);
    }

    // Audio //
    ASSETS.AUDIO.MAIN_MENU_PRELOAD_LIST.forEach((audioAsset) => {
      UTILS.ASSETS.loadAudio(this.load, audioAsset);
    });

    // Images //
    UTILS.ASSETS.loadImage(this.load, ASSETS.BACKGROUNDS.MAIN_MENU);
  }

  create() {
    if (ENV.skipMainMenu && this._firstBoot) {
      this.startGame();
    } else {
      this.createMainMenu();
    }
  }

  private createMainMenu() {
    const { centerX, centerY, height, width } = this.cameras.main;

    this.add
      .image(centerX, centerY, ASSETS.BACKGROUNDS.MAIN_MENU.key)
      .setDepth(DEPTHS.BACKGROUND)
      .setInteractive()
      .on(Phaser.Input.Events.GAMEOBJECT_POINTER_DOWN, this.onStartGame, this);

    this.add
      .bitmapText(centerX, height * 0.25, ASSETS.FONTS.SMALL_PIXEL.key, "Main Menu", 16)
      .setDepth(DEPTHS.TEXT)
      .setOrigin(0.5, 0.5)
      .setCenterAlign();

    [width * 0.25, width * 0.75].forEach((x) => {
      this.add
        .sprite(x, height * 0.25, ASSETS.ATLASES.BASE.KEY, ASSETS.ATLASES.BASE.FRAMES.bonus1)
        .setDepth(DEPTHS.MOBS)
        .play(ASSETS.ATLASES.BASE.ANIMS.BONUS_IDLE);
    });

    this.add
      .bitmapText(centerX, height * 0.75, ASSETS.FONTS.SMALL_PIXEL.key, "click anywhere or press a key to start", 8)
      .setDepth(DEPTHS.TEXT)
      .setOrigin(0.5, 0.5)
      .setCenterAlign();

    this.add
      .sprite(width * 0.4, height * 0.5, ASSETS.SPRITESHEETS.DEBUG_CHARACTER.KEY)
      .setDepth(DEPTHS.MOBS)
      .play(ASSETS.ANIMS.KEYS.CHAR_DEBUG_IDLE);

    this.add
      .sprite(width * 0.6, height * 0.5, ASSETS.SPRITESHEETS.DEBUG_CHARACTER.KEY)
      .setDepth(DEPTHS.MOBS)
      .play(ASSETS.ANIMS.KEYS.CHAR_DEBUG_MOVE);

    UTILS.AUDIO.playMusicFromGroup(this, ASSETS.AUDIO.MAIN_MENU_MUSIC);
  }

  private onStartGame() {
    if (!this._state.gameStarting) {
      this._state.gameStarting = true;
      UTILS.AUDIO.playSoundFromGroup(this, ASSETS.AUDIO.MAIN_MENU_START);
      this.time.delayedCall(CONSTANTS.MAIN_MENU.START_DELAY, () => this.startGame());
    }
  }

  private startGame() {
    if (ENV.debug) {
      console.log(`[${this.scene.key}] Starting new game`);
    }

    this._firstBoot = false;
    GG.startNewGame(CONSTANTS.NEW_GAME_SLOT);
  }
}
