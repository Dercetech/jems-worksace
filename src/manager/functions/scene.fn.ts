import { getGame } from "./get-game.fn";
import { Slot, TilemapAsset } from "../../models";
import { SCENE_KEYS } from "../../scenes/scene.keys";
import * as ASSETS from "../../assets";
import * as FN_REG from "./registry.fn";

export function stopAllScenes() {
  const game = getGame();
  game.scene.scenes.forEach((aScene) => game.scene.stop(aScene.scene.key));
}

export function getTilemapForSlot(slot: Slot = FN_REG.getCurrentSlot()): TilemapAsset {
  const { currentMap } = slot;
  // const map = Object.values(ASSETS.TILES.MAPS).find((aMap) => aMap.key === currentMap);

  if (!ASSETS.TILES.MAPS[currentMap]) {
    throw new Error(`No scene found for map: ${currentMap}`);
  }

  return ASSETS.TILES.MAPS[currentMap];
}

export function getTilesetForSlot(slot: Slot = FN_REG.getCurrentSlot()) {
  const map = getTilemapForSlot(slot);
  const { tilesetKey } = map;
  const tileset = ASSETS.TILES.SETS[tilesetKey];

  if (!tileset) {
    throw new Error(`No tileset found for map: ${map}`);
  }

  return tileset;
}

export function getLayersForSlot(slot: Slot = FN_REG.getCurrentSlot()) {
  const map = getTilemapForSlot(slot);
  const { sceneKey, tilemapMetaKey } = map;
  const layers = ASSETS.TILES.LAYERS[tilemapMetaKey];

  if (!layers) {
    throw new Error(`No layers found for map: ${map}`);
  }

  return layers;
}

export function getSceneKeyForSlot(slot: Slot = FN_REG.getCurrentSlot()): SCENE_KEYS {
  const map = getTilemapForSlot(slot);

  if (!map) {
    throw new Error(`No scene found for map: ${map}`);
  }

  return map.sceneKey;
}
