import { TilemapAsset } from "../../models";
import { SCENE_KEYS } from "../../scenes/scene.keys";
import { TILEMAPS_FOLDER } from "./tiles.folders";
import { TILESET_KEYS } from "./tileset";

const inGameTilemap: TilemapAsset = {
  sceneKey: SCENE_KEYS.IN_GAME,
  tilemapMetaKey: SCENE_KEYS.IN_GAME,
  tilesetKey: TILESET_KEYS.BASE,
  key: null,
  url: null,
};

// The keys are the filenames (without the extension)
export enum KEYS {
  l0s0 = "l0s0",
}

export const TILEMAPS: Record<KEYS, TilemapAsset> = (Object.values(KEYS) as KEYS[]).reduce((acc, key) => {
  acc[key] = {
    ...inGameTilemap,
    key,
    url: `${TILEMAPS_FOLDER}/${key}.json`,
  } as TilemapAsset;
  return acc;
}, {}) as Record<KEYS, TilemapAsset>;
