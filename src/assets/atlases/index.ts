import { AtlasAsset } from "../../models";

import * as BASE from "./base.atlas";
export * as BASE from "./base.atlas";

export const ATLAS_REGISTER_ANIMS: ((anims: Phaser.Animations.AnimationManager) => void)[] = [BASE.registerAnimations];

export const PRELOAD_LIST: AtlasAsset[] = [BASE.ATLAS];

export const ANIMS = {
  ...BASE.ANIMS,
};

export const FRAMES = {
  ...BASE.FRAMES,
};
