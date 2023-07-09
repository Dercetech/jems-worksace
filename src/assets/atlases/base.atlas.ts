import { AtlasAsset } from "../../models";
import { folder } from "./atlases.folder";

export const KEY = "baseAtlas";

export enum ANIMS {
  BONUS_IDLE = "BONUS_IDLE",
}

export const ATLAS: AtlasAsset = {
  key: KEY,
  url: `${folder}/atlas-base.png`,
  metaUrl: `${folder}/atlas-base.json`,
};

export const FRAMES = {
  bonus_prefix: "bonus",
  bonus1: "bonus1.png",
  bonus2: "bonus2.png",
};

export function registerAnimations(anims: Phaser.Animations.AnimationManager) {
  anims.create({
    key: ANIMS.BONUS_IDLE,
    frames: anims.generateFrameNames(KEY, { prefix: FRAMES.bonus_prefix, start: 1, end: 2, suffix: ".png" }),
    frameRate: 2,
    repeat: -1,
  });
}
