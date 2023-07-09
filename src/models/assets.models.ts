import { SCENE_KEYS } from "../scenes/scene.keys";
import * as AUDIO from "./audio.models";

export interface GenericAsset {
  key: string;
  url: string;
}

export interface AssetMeta {
  metaUrl: string;
}

export interface AudioAsset extends GenericAsset, AUDIO.AudioPlaybackOptions {}

export interface AtlasAsset extends ImageAsset, AssetMeta {}

export interface BmpFontAsset extends GenericAsset, AssetMeta {}

export interface ImageAsset extends GenericAsset {}

export interface SpriteSheetAsset extends ImageAsset {
  frameWidth: number;
  frameHeight?: number;
}

export interface TilemapAsset extends GenericAsset {
  /** Scene implementation to handle the logic */
  sceneKey: SCENE_KEYS;
  /** Scene parent group to pick the tileset and tile layers */
  tilemapMetaKey: SCENE_KEYS;
  tilesetKey: string;
}

export interface TilesetAsset extends ImageAsset {
  tiledName: string;
  tileSize: number;
  tileHeight?: number;
  margin: number;
  spacing: number;
}
