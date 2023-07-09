import { ATLAS_REGISTER_ANIMS, ANIMS as ATLAS_ANIMS } from "../atlases";
import { SPRITESHEET_REGISTER_ANIMS, ANIMS as SHEET_ANIMS } from "../spritesheets";

export const KEYS = {
  ...ATLAS_ANIMS,
  ...SHEET_ANIMS,
};

export function registerSharedAnimations(anims: Phaser.Animations.AnimationManager) {
  ATLAS_REGISTER_ANIMS.forEach((registerFn) => registerFn(anims));
  SPRITESHEET_REGISTER_ANIMS.forEach((registerFn) => registerFn(anims));
}
