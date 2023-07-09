import { Slot } from "../../models/slot.models";
import * as TILES from "../tiles/";

export const defaultSlot: Slot = {
  currentMap: TILES.MAPS.dev0.key,
  lives: 3,
  score: 0,
};
