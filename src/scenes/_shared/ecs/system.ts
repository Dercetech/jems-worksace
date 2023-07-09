import { AbstractWorld } from "./world";

export abstract class System {
  protected get world() {
    return this._world;
  }

  constructor(private _world: AbstractWorld) {
    this.init();
  }

  protected init() {}

  destroy() {
    this._world = null;
  }

  // The update method will be called each frame.
  abstract update(dt: number): void;
}
