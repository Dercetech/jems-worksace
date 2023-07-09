import { AbstractWorld } from "./world";
import { ComponentFactory } from "./component.factory";
import { Entity } from "./entity";

import * as ASSETS from "../../../assets";
import * as CONSTANTS from "../../../constants";

export class EntityFactory {
  protected get world() {
    return this._world;
  }

  protected get componentFactory() {
    return this._componentFactory;
  }

  constructor(private _world: AbstractWorld, private _componentFactory: ComponentFactory) {}

  destroy() {
    this._world = null;
    this._componentFactory.destroy();
    this._componentFactory = null;
  }

  createSpriteEntity(x: number, y: number, textureKey: string, frameKey: string | number): Entity {
    const entity = this.world.createEntity();

    const spriteComponent = this.componentFactory.createSpriteComponent(x, y, textureKey, frameKey);
    entity.addComponent(spriteComponent);

    return entity;
  }
}
