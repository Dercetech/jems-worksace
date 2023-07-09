import * as ASSETS from "../../assets";
import * as CONSTANTS from "../../constants";

import { Entity, EntityFactory } from "../_shared/ecs";

import InGameWorld from "./ingame.world";
import { InputControllerId } from "../../models/input.models";

export class IngameEntityFactory extends EntityFactory {
  protected get world() {
    return super.world as InGameWorld;
  }

  destroy() {
    super.destroy();
  }

  createPlayableEntity(x: number, y: number, playerId: CONSTANTS.PLAYER_IDS): Entity {
    const entity = this.world.createEntity();

    // Input component //
    const inputComponent = this.componentFactory.createInputComponent();
    entity.addComponent(inputComponent);

    // Sprite component //
    const textureKey = ASSETS.ATLASES.BASE.KEY;
    const frameKey = playerId === CONSTANTS.PLAYER_IDS.P1 ? ASSETS.ATLASES.BASE.FRAMES.bonus1 : ASSETS.ATLASES.BASE.FRAMES.bonus2;
    const spriteComponent = this.componentFactory.createSpriteComponent(x, y, textureKey, frameKey);
    entity.addComponent(spriteComponent);
    return entity;
  }
}
