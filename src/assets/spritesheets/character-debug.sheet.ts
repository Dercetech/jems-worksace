import { SpriteSheetAsset } from "../../models";
import { folder } from "./spritesheets.folder";

export const KEY = "debugCharacter";

export enum ANIMS {
  CHAR_DEBUG_IDLE = "CHAR_DEBUG_IDLE",
  CHAR_DEBUG_MOVE = "CHAR_DEBUG_MOVE",
}

export const SHEET: SpriteSheetAsset = {
  key: KEY,
  url: `${folder}/character_16_16.png`,
  frameWidth: 16,
};

export function registerAnimations(anims: Phaser.Animations.AnimationManager) {
  anims.create({
    key: ANIMS.CHAR_DEBUG_IDLE,
    frames: anims.generateFrameNumbers(KEY, { first: 0, end: 3 }),
    frameRate: 4,
    repeat: -1,
  });

  anims.create({
    key: ANIMS.CHAR_DEBUG_MOVE,
    frames: anims.generateFrameNumbers(KEY, { first: 4, end: 7 }),
    frameRate: 4,
    repeat: -1,
  });
}
