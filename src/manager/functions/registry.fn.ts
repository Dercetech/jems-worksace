import { getGame } from "./get-game.fn";
import { Slot } from "../../models";
import * as CONSTANTS from "../../constants";

export function getCurrentSlot(): Slot {
  return getGame().registry.get(CONSTANTS.REGISTRY_KEYS.CURRENT_SLOT);
}

export function setCurrentSlot(slot: Slot) {
  getGame().registry.set(CONSTANTS.REGISTRY_KEYS.CURRENT_SLOT, slot);
}
