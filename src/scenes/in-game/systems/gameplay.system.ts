import { Entity, getPlayerAssociationComponent } from "../../_shared/ecs";
import { IngameSystem } from "./_ingame.system";

import * as CONSTANTS from "../../../constants";
import * as EVENTS from "../events";
import * as UTILS from "../../../utils";

export class GameplaySystem extends IngameSystem {
  private get bus() {
    return UTILS.EVENT_BUS.getBus();
  }

  protected init() {
    super.init();

    this.bus.on(EVENTS.PLAYER_JOINED_EVENT.TYPE, this.onPlayerJoined, this);
  }

  destroy() {
    this.bus.off(EVENTS.PLAYER_JOINED_EVENT.TYPE, this.onPlayerJoined, this);
  }

  update(dt: number): void {}

  onPlayerJoined({ playerId }: EVENTS.PLAYER_JOINED_EVENT.Payload) {
    const playerAssociationComponent = getPlayerAssociationComponent(this.world);
    if (!playerAssociationComponent.playerAssociationMap[playerId]) {
      throw new Error(
        `[PlayerAssociationSystem] Cannot create player character for player ${playerId} as they are not registered / associated with a controller.`
      );
    }

    const { controllerType, gamepadIndex } = playerAssociationComponent.playerAssociationMap[playerId];
    let position: { x: number; y: number };

    switch (playerId) {
      case CONSTANTS.PLAYER_IDS.P1: {
        position = { x: 60, y: 40 };
        break;
      }

      case CONSTANTS.PLAYER_IDS.P2: {
        position = { x: 260, y: 40 };
        break;
      }

      case CONSTANTS.PLAYER_IDS.P3: {
        position = { x: 60, y: 180 };
        break;
      }

      case CONSTANTS.PLAYER_IDS.P4: {
        position = { x: 260, y: 180 };
        break;
      }
    }

    const entity = this.world.factory.createPlayableEntity(position.x, position.y, playerId);

    switch (controllerType) {
      case CONSTANTS.InputControllerType.Keyboard: {
        this.world.controlSystem.assignPlayerControl(entity, playerId, { controllerType: CONSTANTS.InputControllerType.Keyboard });
        break;
      }

      case CONSTANTS.InputControllerType.Gamepad: {
        this.world.controlSystem.assignPlayerControl(entity, playerId, {
          controllerType: CONSTANTS.InputControllerType.Gamepad,
          gamepadIndex,
        });
        break;
      }
    }
  }
}
