import { TilesetAsset } from "../../models";
import { TILESETS_FOLDER } from "./tiles.folders";

export enum TILESET_KEYS {
  BASE = "base-tileset",
}

enum TILED_TILESET_NAMES {
  BASE = "base-tileset",
}

export const TILESETS: Record<TILESET_KEYS, TilesetAsset> = {
  [TILESET_KEYS.BASE]: {
    key: TILESET_KEYS.BASE,
    tiledName: TILED_TILESET_NAMES.BASE,
    url: `${TILESETS_FOLDER}/tileset_16_16_28cols_margin1_spacing2.png`,
    margin: 1,
    spacing: 2,
    tileSize: 16,
  },
};
