import { ENV } from "../../environments/dev.env";
import { DebugGraphics } from "./debug-graphics";
import { GG } from "../../manager";

import * as ASSETS from "../../assets";
import * as CONSTANTS from "../../constants";
import * as INPUT from "./input";
import * as PLUGINS from "../../plugins";
import * as UTILS from "../../utils";

export class BaseScene extends Phaser.Scene {
  private _debugGraphics: DebugGraphics;

  private _keyboardInputState: INPUT.KEYBOARD.KeyboardInputState;

  private _fixedTickElapsedTime: number;

  init() {
    if (ENV.debug) {
      console.log(`[${this.scene.key}] Scene initializing`);
      this.initPhysicsDebug();
    }

    this._fixedTickElapsedTime = 0;

    this.initEvents();
    this.initInput();
  }

  protected initEvents() {
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, this.shutdown, this);
  }

  private initInput() {
    // Hit esc to return to main menu
    this.input.keyboard.on("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.onEscape();
      }
    });

    this._keyboardInputState = INPUT.KEYBOARD.initKeyboardInput(this);
  }

  protected shutdown() {
    if (ENV.debug) {
      console.log(`[${this.scene.key}] Scene shutting down`);
    }

    this.shutdownDebugGraphics();
  }

  create() {
    if (ENV.debug) {
      console.log(`[${this.scene.key}] Scene creating`);
    }
  }

  //////////////////////////////////////////////
  // Input /////////////////////////////////////

  public get keyboardInputState() {
    return this._keyboardInputState;
  }

  protected onEscape() {
    GG.gotoMainMenu();
  }

  //////////////////////////////////////////////
  // Debug: Physics ////////////////////////////

  protected get debugGraphics() {
    return this._debugGraphics;
  }

  protected initPhysicsDebug() {
    this._debugGraphics = new DebugGraphics(this);
    if (ENV.debugPhysics) {
      this.matter.world.drawDebug = true;
    } else {
      this.hideDebugGraphcis();
    }
    this.input.keyboard.on(
      "keydown-D",
      () => {
        if (this.debugGraphics) {
          console.log(`[${this.scene.key}] Toggle debug graphics`);
          this.debugGraphics.toggleDebugPhysics();
        } else {
          console.log(`[${this.scene.key}] Debug graphics not available`);
        }
      },
      this
    );
  }

  protected showDebugGraphics() {
    if (this.debugGraphics) {
      this.debugGraphics.showDebugGraphics();
    }
  }

  protected hideDebugGraphcis() {
    if (this.debugGraphics) {
      this.debugGraphics.hideDebugGraphics();
    }
  }

  protected toggleDebugGraphcis() {
    if (this.debugGraphics) {
      this.debugGraphics.toggleDebugPhysics();
    }
  }

  protected shutdownDebugGraphics() {
    if (this._debugGraphics) {
      this._debugGraphics.clear();
      this._debugGraphics = null;
    }
  }

  //////////////////////////////////////////////
  // Plugin: Tiles /////////////////////////////

  protected get activeTilemap() {
    return GG.getTilemapForSlot();
  }

  protected get activeTileset() {
    return ASSETS.TILES.SETS[this.activeTilemap.tilesetKey];
  }

  protected get activeTileLayers() {
    return ASSETS.TILES.LAYERS[this.activeTilemap.sceneKey];
  }

  public initializeAnimatedTilemap(map: Phaser.Tilemaps.Tilemap) {
    const animatedTiles = (this.sys as any).animatedTiles as PLUGINS.AnimatedTiles;
    animatedTiles.init(map);
  }

  protected updateAnimatedTiles(dt: number) {
    const animatedTiles = (this.sys as any).animatedTiles as PLUGINS.AnimatedTiles;
    animatedTiles.updateAnimatedTiles();
  }

  //////////////////////////////////////////////
  // Update: Fixed Timestep ////////////////////

  update(time: number, dt: number) {
    this._fixedTickElapsedTime += dt;
    while (this._fixedTickElapsedTime >= CONSTANTS.FIXED_TIMESTEP) {
      this._fixedTickElapsedTime -= CONSTANTS.FIXED_TIMESTEP;
      this.updateFixedTimestep(CONSTANTS.FIXED_TIMESTEP);
      this.updateAnimatedTiles(dt);
    }
  }

  protected updateFixedTimestep(dt: number) {
    throw new Error("Method not implemented.");
    // Console
    // Input
    // World update
  }
}
