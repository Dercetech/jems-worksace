import { InputState } from "../../../../models";
import { Component } from "../component";

export class InputComponent extends Component {
  static readonly COMPONENT_KEY = "InputComponent";

  private _inputState: InputState;

  get inputState(): InputState {
    return this._inputState;
  }

  set inputState(inputState: InputState) {
    this._inputState = inputState;
  }

  constructor() {
    super(InputComponent.COMPONENT_KEY);
    this._inputState = {
      x: 0,
      y: 0,
    };
  }

  destroy() {}
}
