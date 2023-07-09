import { ENV } from "../../../../environments/dev.env";
import { getPlayerAssociationComponent } from "./player-association.utils";
import { PlayerAssociationComponent } from "../components";
import { System } from "../system";
import * as CONSTANTS from "../../../../constants";
import * as EVENTS from "../../events";
import * as INPUT from "../../input";

export class PlayerAssociationSystem extends System {
  protected init(): void {
    const associationEntity = this.world.createEntity();
    associationEntity.addComponent(new PlayerAssociationComponent());
  }

  update(dt: number): void {
    const playerAssociationComponent = getPlayerAssociationComponent(this.world);

    // Keyboard
    {
      const inputState = INPUT.KEYBOARD.getInputState(this.world.scene.keyboardInputState);

      // Check that value is not undefined as 0 is a valid value
      if (inputState.hasInput && playerAssociationComponent.controllerAssociationMap[CONSTANTS.InputControllerType.Keyboard] === null) {
        if (ENV.debug) {
          console.log(`[PlayerAssociationSystem] Detecting keyboard input, associating with next available player.`);
        }

        const playerId = this.getNextUnassociatedPlayerId(playerAssociationComponent);
        if (CONSTANTS.POSSIBLE_PLAYERS.includes(playerId)) {
          if (ENV.debug) {
            console.log(`[PlayerAssociationSystem] Associating keyboard with player ${playerId}.`);
          }

          playerAssociationComponent.playerAssociationMap[playerId] = { controllerType: CONSTANTS.InputControllerType.Keyboard };
          playerAssociationComponent.controllerAssociationMap[CONSTANTS.InputControllerType.Keyboard] = playerId;
          this.handlePlayerJoined(playerId);
        } else {
          if (ENV.debug) {
            console.log(`[PlayerAssociationSystem] No available players to associate with keyboard.`);
          }
        }
      }
    }

    // Gamepads
    [CONSTANTS.GAMEPAD_IDS.G0, CONSTANTS.GAMEPAD_IDS.G1, CONSTANTS.GAMEPAD_IDS.G2, CONSTANTS.GAMEPAD_IDS.G3].forEach((gamepadId) => {
      const inputState = INPUT.GAMEPAD.getInputState(this.world.scene, gamepadId);
      if (
        inputState.hasInput &&
        playerAssociationComponent.controllerAssociationMap[CONSTANTS.InputControllerType.Gamepad][gamepadId] === null
      ) {
        if (ENV.debug) {
          console.log(`[PlayerAssociationSystem] Detecting gamepad ${gamepadId} input, associating with next available player.`);
        }

        const playerId = this.getNextUnassociatedPlayerId(playerAssociationComponent);
        if (CONSTANTS.POSSIBLE_PLAYERS.includes(playerId)) {
          if (ENV.debug) {
            console.log(`[PlayerAssociationSystem] Associating gamepad ${gamepadId} with player ${playerId}.`);
          }

          playerAssociationComponent.playerAssociationMap[playerId] = {
            controllerType: CONSTANTS.InputControllerType.Gamepad,
            gamepadIndex: gamepadId,
          };
          playerAssociationComponent.controllerAssociationMap[CONSTANTS.InputControllerType.Gamepad][gamepadId] = playerId;
          this.handlePlayerJoined(playerId);
        } else {
          if (ENV.debug) {
            console.log(`[PlayerAssociationSystem] No available players to associate with gamepad ${gamepadId}.`);
          }
        }
      }
    });
  }

  private getNextUnassociatedPlayerId(playerAssociationComponent: PlayerAssociationComponent): CONSTANTS.PLAYER_IDS {
    const unassignedPlayer = CONSTANTS.POSSIBLE_PLAYERS.find((playerId) => {
      if (!playerAssociationComponent.playerAssociationMap[playerId]) {
        return true;
      }
    });

    return CONSTANTS.POSSIBLE_PLAYERS.includes(unassignedPlayer) ? unassignedPlayer : -1;
  }

  // This should later move to a different system that handles the lifecycle of the game
  private handlePlayerJoined(playerId: CONSTANTS.PLAYER_IDS) {
    if (ENV.debug) {
      console.log(`[PlayerAssociationSystem] Player ${playerId} joined.`);
    }

    EVENTS.PLAYER_JOINED_EVENT.emit({ playerId });
  }
}
