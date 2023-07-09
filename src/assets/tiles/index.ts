import { TilesetAsset } from "../../models";
import { SCENE_KEYS } from "../../scenes/scene.keys";

import { TILEMAPS as INGAME_DEV_TILEMAPS } from "./ingame-dev.tilemaps";
import { TILEMAPS as INGAME_TILEMAPS } from "./ingame.tilemaps";
import { LAYERS_KEYS as INGAME_LAYERS } from "./ingame.layers";

import { TILESETS } from "./tileset";

export const MAPS = {
  ...INGAME_DEV_TILEMAPS,
  ...INGAME_TILEMAPS,
};

export const LAYERS = {
  [SCENE_KEYS.IN_GAME]: INGAME_LAYERS,
};

export const SETS = {
  ...TILESETS,
};

export const PRELOAD_SET_LIST: TilesetAsset[] = Object.values(TILESETS);
