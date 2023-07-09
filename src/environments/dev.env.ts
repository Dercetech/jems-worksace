import _ from "lodash";

import { Environment } from "./env.models";
import { baseEnvrionment } from "./base.env";

export const ENV: Environment = {
  ..._.cloneDeep(baseEnvrionment),

  // Debug //
  debug: true,
  // debugAudio: true,
  // debugPhysics: true,
  // debugTiles: true,

  // playMusic: false,
  // playSounds: false,
  skipMainMenu: true,

  logWarnings: true,
  logErrors: true,

  // Features //
  features: {},
};
