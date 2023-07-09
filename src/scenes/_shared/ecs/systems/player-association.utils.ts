import { PlayerAssociationComponent } from "../components";
import { AbstractWorld } from "../world";

const playerAssociationComponent = [PlayerAssociationComponent.COMPONENT_KEY];

export function getPlayerAssociationComponent(world: AbstractWorld) {
  const entities = world.getEntitiesWithComponents(playerAssociationComponent);

  if (entities.length === 0) {
    throw new Error("[PlayerAssociationSystem] No association entity exists.");
  } else if (entities.length > 1) {
    throw new Error("[PlayerAssociationSystem] Multiple association entities should not exist.");
  } else {
    const [entity] = entities;
    const playerAssociationComponent = entity.getComponent<PlayerAssociationComponent>(PlayerAssociationComponent.COMPONENT_KEY);

    if (!playerAssociationComponent) {
      throw new Error("[PlayerAssociationSystem] Association entity does not have a PlayerAssociationComponent.");
    }

    return playerAssociationComponent;
  }
}
