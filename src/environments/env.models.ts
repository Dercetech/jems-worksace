export interface Environment {
  // Debug //
  debug: boolean;
  debugAudio: boolean;
  debugPhysics: boolean;
  debugTiles: boolean;

  playMusic: boolean;
  playSounds: boolean;
  skipMainMenu: boolean;

  logWarnings: boolean;
  logErrors: boolean;

  // Features //
  features: {};
}
