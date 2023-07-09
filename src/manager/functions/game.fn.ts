import { ENV } from "../../environments/dev.env";
import { Slot } from "../../models";
import { SCENE_KEYS } from "../../scenes/scene.keys";

import { getGame } from "./get-game.fn";
import * as FN_REG from "./registry.fn";
import * as FN_SCENE from "./scene.fn";

export function gotoMainMenu() {
  if (ENV.debug) {
    console.log(`[GG] Going to main menu`);
  }

  FN_SCENE.stopAllScenes();
  FN_REG.setCurrentSlot(null);

  const game = getGame();
  game.scene.start(SCENE_KEYS.MAIN_MENU);
}

export function startNewGame(slot: Slot) {
  if (ENV.debug) {
    console.log(`[GG] Starting new game`, slot);
  }

  FN_SCENE.stopAllScenes();
  FN_REG.setCurrentSlot(slot);

  const game = getGame();
  const sceneKey = FN_SCENE.getSceneKeyForSlot(slot);
  game.scene.start(sceneKey);
}
