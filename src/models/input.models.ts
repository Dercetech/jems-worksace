import * as CONSTANTS from "../constants";

export interface InputControllerId {
  controllerType: CONSTANTS.InputControllerType;
  gamepadIndex?: number;
}

export interface InputState {
  y: number;
  x: number;
  hasInput: boolean;
}

export enum BASE_KEYBOARD_CONTROLS {
  // ESC,
  // DEBUG,

  LEFT,
  RIGHT,
  UP,
  DOWN,
  ATTACK,
  JUMP,
}
