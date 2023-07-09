import { SpriteSheetAsset } from "../../models";

import * as DEBUG_CHARACTER from "./character-debug.sheet";
export * as DEBUG_CHARACTER from "./character-debug.sheet";

export const SPRITESHEET_REGISTER_ANIMS: ((anims: Phaser.Animations.AnimationManager) => void)[] = [DEBUG_CHARACTER.registerAnimations];

export const PRELOAD_LIST: SpriteSheetAsset[] = [DEBUG_CHARACTER.SHEET];

export const ANIMS = {
  ...DEBUG_CHARACTER.ANIMS,
};
