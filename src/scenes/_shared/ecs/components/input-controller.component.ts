import { Component } from "../component";

import { InputControllerId } from "../../../../models";
import * as CONSTANTS from "../../../../constants";

export class InputControllerComponent extends Component {
  static readonly COMPONENT_KEY = "InputControllerComponent";

  constructor(private _playerId: CONSTANTS.PLAYER_IDS, private _controllerId: InputControllerId) {
    super(InputControllerComponent.COMPONENT_KEY);
  }

  get controllerType(): CONSTANTS.InputControllerType {
    return this._controllerId.controllerType;
  }

  get playerId(): CONSTANTS.PLAYER_IDS {
    return this._playerId;
  }

  get gamepadIndex(): number {
    return this._controllerId.gamepadIndex;
  }

  set controllerType(controllerType: CONSTANTS.InputControllerType) {
    this._controllerId.controllerType = controllerType;
  }

  destroy() {}
}
