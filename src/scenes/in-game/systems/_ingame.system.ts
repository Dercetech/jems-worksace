import { System } from "../../_shared/ecs/system";
import InGameWorld from "../ingame.world";

export abstract class IngameSystem extends System {
  protected get world(): InGameWorld {
    return super.world as InGameWorld;
  }
}
