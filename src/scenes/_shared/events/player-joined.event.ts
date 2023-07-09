import { PLAYER_IDS } from "../../../constants";
import * as UTILS from "../../../utils";

export const TYPE = "PLAYER_JOINED_EVENT";

export interface Payload {
  playerId: PLAYER_IDS;
}

export function emit(payload: Payload) {
  UTILS.EVENT_BUS.emit(TYPE, payload);
}
