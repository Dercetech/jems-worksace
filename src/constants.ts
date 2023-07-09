import * as ASSETS from "./assets";
import { BASE_KEYBOARD_CONTROLS } from "./models";

export const NEW_GAME_SLOT = ASSETS.SLOTS.defaultSlot;

export const FIXED_TIMESTEP = 1000 / 60;

export const MAIN_MENU = {
  START_DELAY: 400,
};

export enum PLAYER_IDS {
  P1 = 0,
  P2 = 1,
  P3 = 2,
  P4 = 3,
}

export const POSSIBLE_PLAYERS = [PLAYER_IDS.P1, PLAYER_IDS.P2, PLAYER_IDS.P3, PLAYER_IDS.P4];

export enum REGISTRY_KEYS {
  CURRENT_SLOT = "currentSlot",
}

export enum InputControllerType {
  Keyboard,
  Gamepad,
  AI,
}

export enum GAMEPAD_IDS {
  G0 = 0,
  G1 = 1,
  G2 = 2,
  G3 = 3,
}

export const INPUT_KEYBOARD_MAPPING: Record<BASE_KEYBOARD_CONTROLS, number> = {
  [BASE_KEYBOARD_CONTROLS.LEFT]: Phaser.Input.Keyboard.KeyCodes.LEFT,
  [BASE_KEYBOARD_CONTROLS.RIGHT]: Phaser.Input.Keyboard.KeyCodes.RIGHT,
  [BASE_KEYBOARD_CONTROLS.UP]: Phaser.Input.Keyboard.KeyCodes.UP,
  [BASE_KEYBOARD_CONTROLS.DOWN]: Phaser.Input.Keyboard.KeyCodes.DOWN,
  [BASE_KEYBOARD_CONTROLS.ATTACK]: Phaser.Input.Keyboard.KeyCodes.X,
  [BASE_KEYBOARD_CONTROLS.JUMP]: Phaser.Input.Keyboard.KeyCodes.SPACE,
};

export enum COLLISION_CATEGORIES {
  GROUND = 0b0001,
  OWP = 0b0010,
}

export enum TILE_PROPERTIES {
  OWP = "owp",
  TILE_TYPE = "tileType",
}

export enum TILE_TYPES {
  GROUND = "ground",
  // LADDER = "ladder",
  OWP = "owp",
}

export const TILE_COLLISION_MAPPING: Record<TILE_TYPES, number> = {
  [TILE_TYPES.GROUND]: COLLISION_CATEGORIES.GROUND,
  [TILE_TYPES.OWP]: COLLISION_CATEGORIES.OWP,
};
