import { Component } from "../../_shared/ecs";
import { DestroySystem } from "../../_shared/ecs/systems/destroy.system";

export class IngameDestroySystem extends DestroySystem {
  destroyComponent(component: Component): void {
    switch (component.componentName) {
      // case "SpriteComponent": {
      //   this.destroySpriteComponent(component as any);
      //   break;
      // }

      default: {
        super.destroyComponent(component);
      }
    }
  }
}
