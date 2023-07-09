import { Entity, InputComponent, SpriteComponent } from "../../_shared/ecs";
import { IngameSystem } from "./_ingame.system";

const filter = [InputComponent.COMPONENT_KEY, SpriteComponent.COMPONENT_KEY];

export class InputSystem extends IngameSystem {
  update(dt: number): void {
    this.world.getEntitiesWithComponents(filter).forEach((entity) => {
      const inputComponent = entity.getComponent<InputComponent>(InputComponent.COMPONENT_KEY);
      const spriteComponent = entity.getComponent<SpriteComponent>(SpriteComponent.COMPONENT_KEY);

      if (inputComponent.inputState.x) {
        spriteComponent.sprite.x += inputComponent.inputState.x * 0.25 * dt;
      }

      if (inputComponent.inputState.y) {
        spriteComponent.sprite.y += inputComponent.inputState.y * -1 * 0.25 * dt;
      }
    });
  }
}
