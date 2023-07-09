import { InputState, BASE_KEYBOARD_CONTROLS } from "../../../models";
import * as CONSTANTS from "../../../constants";

export type KeyboardInputState = Record<BASE_KEYBOARD_CONTROLS, Phaser.Input.Keyboard.Key>;

export function initKeyboardInput(scene: Phaser.Scene) {
  return scene.input.keyboard.addKeys(CONSTANTS.INPUT_KEYBOARD_MAPPING) as KeyboardInputState;
}

export function getInputState(keyboardInputState: KeyboardInputState) {
  const inputState: InputState = {
    y: 0,
    x: 0,
    hasInput: false,
  };

  if (keyboardInputState) {
    if (keyboardInputState[BASE_KEYBOARD_CONTROLS.LEFT].isDown || keyboardInputState[BASE_KEYBOARD_CONTROLS.RIGHT].isDown) {
      inputState.x = keyboardInputState[BASE_KEYBOARD_CONTROLS.LEFT].isDown ? -1 : 1;
      inputState;
    }

    if (keyboardInputState[BASE_KEYBOARD_CONTROLS.UP].isDown || keyboardInputState[BASE_KEYBOARD_CONTROLS.DOWN].isDown) {
      inputState.y = keyboardInputState[BASE_KEYBOARD_CONTROLS.UP].isDown ? 1 : -1;
    }
  }

  if (inputState.x || inputState.y) {
    inputState.hasInput = true;
  }

  return inputState;
}
