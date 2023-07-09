import { BaseScene } from "../_shared";
import { GG } from "../../manager";

import * as ASSETS from "../../assets";
import * as CONSTANTS from "../../constants";
import * as UTILS from "../../utils";

import { AbstractWorld } from "../_shared/ecs";
import { IngameComponentFactory } from "./ingame.component-factory";
import { IngameEntityFactory } from "./ingame.entity-factory";
import { GameplaySystem, IngameDestroySystem, InputSystem } from "./systems";
import { PhaserMatterTiledBody, TileProperties } from "../../models";

export default class InGameWorld extends AbstractWorld {
  private _factory: IngameEntityFactory;

  constructor(protected _scene: BaseScene) {
    super(_scene);

    const componentFactory = new IngameComponentFactory(this, _scene);
    this._factory = new IngameEntityFactory(this, componentFactory);

    this.systems.push(new InputSystem(this));
    this.systems.push(new GameplaySystem(this));
  }

  initDestroySystem() {
    this._destroySystem = new IngameDestroySystem(this);
  }

  //////////////////////////////////////////////
  // Systems ///////////////////////////////////

  public get controlSystem() {
    return this._controlSystem;
  }

  //////////////////////////////////////////////
  // Tilemap ///////////////////////////////////

  create() {
    const map = this.createTilemap();
    this.createObjects();
  }

  private createTilemap() {
    const map = this.scene.make.tilemap({ key: GG.getTilemapForSlot().key });

    const { key, tileSize, margin, spacing, tiledName } = GG.getTilesetForSlot();
    const tileset = map.addTilesetImage(tiledName, key, tileSize, tileSize, margin, spacing);

    const tilemapLayers: Phaser.Tilemaps.TilemapLayer[] = [];
    tilemapLayers.push(map.createLayer(GG.getLayersForSlot().BACKGROUND, tileset));

    tilemapLayers.forEach((tilemapLayer) => {
      tilemapLayer.setCollisionFromCollisionGroup();
      tilemapLayer.setCollisionByProperty({ collides: true }); // this is to create "classic" Phaser/Matter tile bodies
      this.scene.matter.world.convertTilemapLayer(tilemapLayer);
      // UTILS.TILES.postProcessLayer(tilemapLayer, this.postProcessTile );
    });

    this.scene.initializeAnimatedTilemap(map);

    return map;
  }

  // private postProcessTile(properties: TileProperties, body: PhaserMatterTiledBody){
  //   if (properties[CONSTANTS.TILE_PROPERTIES.OWP]) {
  //     body.setCollisionCategory(CONSTANTS.COLLISION_CATEGORIES.OWP);
  //   }
  //   if (tile.properties[TILED_TILE_PROPERTIES.LADDER]) {
  //     setLadder(matterBody);
  //   }
  // }

  //////////////////////////////////////////////
  // Object creation ///////////////////////////

  public get factory() {
    return this._factory;
  }

  private createObjects() {
    const { scene } = this;

    // const p1 = this._factory.createPlayerEntity(200, 100, CONSTANTS.PLAYER_IDS.P1);
    // const p2 = this._factory.createPlayerEntity(100, 100, CONSTANTS.PLAYER_IDS.P2);

    // const player = scene.matter.add.sprite(100, 100, ASSETS.ATLASES.BASE.KEY, ASSETS.ATLASES.BASE.FRAMES.bonus1, { shape: "rectangle" });
    // player.setFixedRotation();

    // const solid = scene.matter.add.sprite(100, 140, ASSETS.ATLASES.BASE.KEY, ASSETS.ATLASES.BASE.FRAMES.bonus2, {
    //   shape: "rectangle",
    //   isStatic: true,
    // });
  }

  //////////////////////////////////////////////
  // Update ////////////////////////////////////

  update(dt: number) {
    super.update(dt);
  }

  destroy() {
    this._factory.destroy();
    super.destroy();
  }
}
