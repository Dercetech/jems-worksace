import { AtlasAsset, AudioAsset, BmpFontAsset, GenericAsset, ImageAsset, SpriteSheetAsset, TilemapAsset } from "../models";

export function loadAtlas(load: Phaser.Loader.LoaderPlugin, { key, url, metaUrl }: AtlasAsset) {
  load.atlas(key, url, metaUrl);
}

export function loadAudio(load: Phaser.Loader.LoaderPlugin, { key, url }: AudioAsset) {
  load.audio(key, url);
}

export function loadImage(load: Phaser.Loader.LoaderPlugin, { key, url }: ImageAsset) {
  load.image(key, url);
}

export function loadSpriteSheet(load: Phaser.Loader.LoaderPlugin, { key, url, frameWidth, frameHeight }: SpriteSheetAsset) {
  load.spritesheet(key, url, { frameWidth, frameHeight: frameHeight || frameWidth });
}

export function loadBitmapFont(load: Phaser.Loader.LoaderPlugin, { key, url, metaUrl }: BmpFontAsset) {
  load.bitmapFont(key, url, metaUrl);
}

export function loadJson(load: Phaser.Loader.LoaderPlugin, { key, url }: GenericAsset) {
  load.json(key, url);
}

export function loadTilemap(load: Phaser.Loader.LoaderPlugin, { key, url }: TilemapAsset) {
  (load as any).tilemapTiledJSONExternal(key, url);
}
