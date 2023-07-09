import { Component } from "../component";
import { SpriteComponent } from "../components";
import { Entity } from "../entity";
import { System } from "../system";

export class DestroySystem extends System {
  destroyEntity(entity: Entity): void {
    entity.components.forEach((component) => {
      this.destroyComponent(component);
      component.destroy();
    });
    entity.destroy();
  }

  destroyComponent(component: Component): void {
    switch (component.componentName) {
      case SpriteComponent.COMPONENT_KEY: {
        this.destroySpriteComponent(component as SpriteComponent);
        break;
      }
    }
  }

  protected destroySpriteComponent(component: SpriteComponent): void {
    component.sprite.destroy();
  }

  update(dt: number): void {}
}
