import { GAME_MANAGER } from "../manager/game-manager";

export function getBus() {
  return GAME_MANAGER.getEventBus();
}

export function emit(type: string, payload: any) {
  GAME_MANAGER.getEventBus().emit(type, payload);
}

export function onEvent<T>(type: string, handler: (payload: T) => void, context?: any) {
  GAME_MANAGER.getEventBus().on(type, handler, context);
}
