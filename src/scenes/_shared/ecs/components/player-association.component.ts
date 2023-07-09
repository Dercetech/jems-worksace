import { Component } from "..";
import { InputControllerId } from "../../../../models";

import * as CONSTANTS from "../../../../constants";

export class PlayerAssociationComponent extends Component {
  static readonly COMPONENT_KEY = "PlayerAssociationComponent";

  public playerAssociationMap: Partial<Record<CONSTANTS.PLAYER_IDS, InputControllerId>> = {};
  public controllerAssociationMap = {
    [CONSTANTS.InputControllerType.Keyboard]: null,
    [CONSTANTS.InputControllerType.Gamepad]: {
      [CONSTANTS.GAMEPAD_IDS.G0]: null,
      [CONSTANTS.GAMEPAD_IDS.G1]: null,
      [CONSTANTS.GAMEPAD_IDS.G2]: null,
      [CONSTANTS.GAMEPAD_IDS.G3]: null,
    },
  };
  constructor() {
    super(PlayerAssociationComponent.COMPONENT_KEY);
  }

  destroy() {
    this.playerAssociationMap = null;
  }
}
