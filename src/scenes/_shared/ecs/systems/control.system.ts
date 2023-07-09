import { InputComponent, InputControllerComponent } from "../components";
import { Entity } from "../entity";
import { InputControllerId } from "../../../../models";
import { System } from "../system";

import * as CONSTANTS from "../../../../constants";
import * as INPUT from "../../input";

const filter = [InputComponent.COMPONENT_KEY, InputControllerComponent.COMPONENT_KEY];

/** The ControlSystem looks for entities that have both an InputComponent and an InputControllerComponent.
 * It then updates the InputComponent's inputState based on the InputControllerComponent's controllerType.
 */
export class ControlSystem extends System {
  assignPlayerControl(entity: Entity, playerId: CONSTANTS.PLAYER_IDS, inputControllerType: InputControllerId): void {
    const entities = this.world.getEntitiesWithComponents(InputControllerComponent.COMPONENT_KEY);

    // Revoke control of all entities that are currently controlled by the player.
    entities
      .filter((e) => e.getComponent<InputControllerComponent>(InputControllerComponent.COMPONENT_KEY).playerId === playerId)
      .forEach((e) => {
        this.revokePlayerControl(e);
      });

    // Revoke existing control of this entity.
    this.revokePlayerControl(entity);

    // Assign control of the target entity to the player.
    const inputControllerComponent = new InputControllerComponent(playerId, inputControllerType);
    entity.addComponent(inputControllerComponent);
  }

  revokePlayerControl(entity: Entity): void {
    // If the entity has an InputControllerComponent, remove it.
    if (entity.hasComponent(InputControllerComponent.COMPONENT_KEY)) {
      entity.removeComponent(InputControllerComponent.COMPONENT_KEY);
    }
  }

  update(dt: number): void {
    this.world.getEntitiesWithComponents(filter).forEach((entity) => {
      const inputComponent = entity.getComponent<InputComponent>(InputComponent.COMPONENT_KEY);
      const inputControllerComponent = entity.getComponent<InputControllerComponent>(InputControllerComponent.COMPONENT_KEY);

      switch (inputControllerComponent.controllerType) {
        case CONSTANTS.InputControllerType.Keyboard: {
          const inputState = INPUT.KEYBOARD.getInputState(this.world.scene.keyboardInputState);
          inputComponent.inputState = inputState;
          break;
        }

        case CONSTANTS.InputControllerType.Gamepad: {
          const inputState = INPUT.GAMEPAD.getInputState(this.world.scene, inputControllerComponent.gamepadIndex);
          inputComponent.inputState = inputState;
          break;
        }

        case CONSTANTS.InputControllerType.AI: {
          // TBD
          //   inputComponent.inputState = inputState;
          break;
        }
      }
    });
  }
}
