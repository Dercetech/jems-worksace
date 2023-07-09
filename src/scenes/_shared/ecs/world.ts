import { v4 as UUID } from "uuid";

import { BaseScene } from "../base.scene";
import { Entity } from "./entity";
import { System } from "./system";
import { ControlSystem, DestroySystem } from "./systems";
import { PlayerAssociationSystem } from "./systems/player-association.system";

export abstract class AbstractWorld {
  private _entities: Record<string, Entity> = {};
  private _entitiesArray: Entity[] = [];

  protected _systems: System[] = [];
  protected _controlSystem: ControlSystem;
  protected _destroySystem: DestroySystem;

  public get scene() {
    return this._scene;
  }

  protected get systems() {
    return this._systems;
  }

  constructor(protected _scene: BaseScene) {
    this.initDestroySystem();

    this._controlSystem = new ControlSystem(this);
    this.systems.push(this._controlSystem);

    this.systems.push(new PlayerAssociationSystem(this));
  }

  protected abstract initDestroySystem(): void;

  destroy() {
    this._entitiesArray.forEach((entity) => this.destroyEntity(entity));
    this._scene = null;

    this._systems.forEach((system) => system.destroy());
    this._systems = null;

    this._destroySystem.destroy();
    this._destroySystem = null;
  }

  createEntity(id: string = UUID()): Entity {
    if (this._entities[id]) {
      throw new Error(`Entity with id ${id} already exists.`);
    }

    const entity = new Entity(id);
    this._entities[id] = entity;
    this._entitiesArray.push(entity);
    return entity;
  }

  destroyEntity(entityOrId: Entity | string): void {
    let entityId: string;
    if (typeof entityOrId === "string") {
      entityId = entityOrId;
    } else {
      entityId = entityOrId.id;
    }
    delete this._entities[entityId];

    const index = this._entitiesArray.findIndex((entity) => entity.id === entityId);
    if (index !== -1) {
      this._entitiesArray.splice(index, 1);
    }
  }

  get entities(): Entity[] {
    return this._entitiesArray;
  }

  getEntity(id: string): Entity {
    const entity = this._entities[id];
    if (!entity) {
      throw new Error(`Entity with id ${id} does not exist.`);
    }

    return entity;
  }

  getEntitiesWithComponents(componentKeys: string | string[]): Entity[] {
    return this._entitiesArray.filter((entity) => {
      if (typeof componentKeys === "string") {
        return entity.hasComponent(componentKeys);
      }

      // TODO: if the array is empty, all entities are returned by every. Is this the desired behavior?
      return componentKeys.every((key) => entity.hasComponent(key));
    });
  }

  registerSystem(system: System): void {
    this._systems.push(system);
  }

  update(dt: number): void {
    for (let system of this._systems) {
      system.update(dt);
    }
  }
}
