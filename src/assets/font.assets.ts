import { BmpFontAsset } from "../models";

const folder = "fonts";

export const SMALL_PIXEL: BmpFontAsset = {
  key: "smallPixel",
  url: `${folder}/small_pixel.png`,
  metaUrl: `${folder}/small_pixel.fnt`,
};

export const PRELOAD_LIST: BmpFontAsset[] = [SMALL_PIXEL];
