import { InputState } from "../../../models";

export function hasGamepad(scene: Phaser.Scene) {
  return scene.input.gamepad.total > 0;
}

export function getInputState(scene: Phaser.Scene, gamepadIndex: number = 0) {
  const pads = scene.input.gamepad.gamepads;
  const inputState: InputState = {
    y: 0,
    x: 0,
    hasInput: false,
  };

  if (!!pads[gamepadIndex]) {
    const pad = pads[gamepadIndex];

    if (pad.up || pad.down) {
      inputState.y = pad.up ? 1 : -1;
    } else {
      if (Math.abs(pad.axes[1].getValue()) > 0.2) {
        inputState.y = Phaser.Math.Clamp(-1 * pad.axes[1].getValue() * 2, -1, 1);
      }
    }

    if (pad.left || pad.right) {
      inputState.x = pad.left ? -1 : 1;
    } else {
      if (Math.abs(pad.axes[0].getValue()) > 0.2) {
        inputState.x = Phaser.Math.Clamp(pad.axes[0].getValue() * 2, -1, 1);
      } else {
        inputState.x = pad.axes[0].getValue();
      }
    }

    // if (pad.A || pad.B || pad.X || pad.Y || pad.L1 || pad.L2 || pad.R1 || pad.R2) {
    //   inputState.fire = 1;
    // }

    // Turret rotation
    // if (pad.rightStick) {
    //   inputState.turretRotate = pad.rightStick.x;
    // }
  }

  if (inputState.x || inputState.y) {
    inputState.hasInput = true;
  }

  return inputState;
}
