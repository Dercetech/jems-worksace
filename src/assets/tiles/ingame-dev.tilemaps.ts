import { TilemapAsset } from "../../models";
import { SCENE_KEYS } from "../../scenes/scene.keys";
import { TILEMAPS_DEV_FOLDER } from "./tiles.folders";
import { TILESET_KEYS } from "./tileset";

const inGameTilemap: TilemapAsset = {
  sceneKey: SCENE_KEYS.IN_GAME,
  tilemapMetaKey: SCENE_KEYS.IN_GAME,
  tilesetKey: TILESET_KEYS.BASE,
  key: null,
  url: null,
};

// The keys are the filenames :-) (without the extension)
export enum KEYS {
  DEV0 = "dev0",
}

export const TILEMAPS: Record<KEYS, TilemapAsset> = {
  [KEYS.DEV0]: { ...inGameTilemap, key: KEYS.DEV0, url: `${TILEMAPS_DEV_FOLDER}/${KEYS.DEV0}.json` },
};
