import { TilemapAsset } from "../../models";
import { BaseScene } from "../_shared";

import { GG } from "../../manager";
import { SCENE_KEYS } from "../scene.keys";
import * as ASSETS from "../../assets";
import * as CONSTANTS from "../../constants";
import * as UTILS from "../../utils";

import InGameWorld from "./ingame.world";

export class InGameScene extends BaseScene {
  private _world: InGameWorld;

  constructor() {
    super(SCENE_KEYS.IN_GAME);
  }

  protected shutdown(): void {
    super.shutdown();

    this._world.destroy();
  }

  preload() {
    UTILS.ASSETS.loadTilemap(this.load, this.activeTilemap);
  }

  create() {
    super.create();
    this._world = new InGameWorld(this);
    this._world.create();
  }

  protected updateFixedTimestep(dt: number) {
    this._world.update(dt);
  }
}
