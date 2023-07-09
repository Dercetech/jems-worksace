import { ImageAsset } from "../models";

export * as AUDIO from "./audio";
export * as ANIMS from "./animations";
export * as ATLASES from "./atlases";
import * as BACKGROUNDS from "./background.assets";
export * as BACKGROUNDS from "./background.assets";
export * as FONTS from "./font.assets";
export * as TILES from "./tiles";
export * as SLOTS from "./slots";
export * as SPRITESHEETS from "./spritesheets";

export const IMAGES_PRELOAD_LIST: ImageAsset[] = [...BACKGROUNDS.PRELOAD_LIST];
