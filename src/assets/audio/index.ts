import * as MISC from "./misc";
import * as MUSIC from "./music";

////////////////////////////////////////////////
// DEFAULT SOUNDS //////////////////////////////

export const DEFAULT_BLEEP = [MISC.SUPER_RETRO_COIN_3];

////////////////////////////////////////////////
// MAIN MENU ///////////////////////////////////

export const MAIN_MENU_MUSIC = [MUSIC.RETRO_STINGER_03];
export const MAIN_MENU_START = [...DEFAULT_BLEEP]; // [MISC.SUPER_RETRO_BTN_5];

export const MAIN_MENU_PRELOAD_LIST = [
  ...MAIN_MENU_MUSIC,
  // ...MAIN_MENU_START
];

////////////////////////////////////////////////
////////////////////////////////////////////////

export const PRELOAD_LIST = [...DEFAULT_BLEEP];
