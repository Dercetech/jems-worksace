import _ from "lodash";

import { Environment } from "./env.models";
import { baseEnvrionment } from "./base.env";

export const ENV: Environment = {
  ..._.cloneDeep(baseEnvrionment),

  // Debug //
  // debug: true,
  // debugPhysics: true,

  // skipMainMenu: false,

  // Features //
  // features: {},
};
