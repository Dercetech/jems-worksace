import _ from "lodash";

import { AudioAsset, AudioPlaybackOptions } from "../models";
import { ENV } from "../environments/dev.env";

export function playSoundFromGroup(scene: Phaser.Scene, group: AudioAsset[], options?: AudioPlaybackOptions) {
  if (ENV.playSounds) {
    playAnyFromGroup(scene, group, options);
  }
}

export function playMusicFromGroup(scene: Phaser.Scene, group: AudioAsset[], options?: AudioPlaybackOptions) {
  if (ENV.playMusic) {
    playAnyFromGroup(scene, group, options);
  }
}

function playAnyFromGroup(scene: Phaser.Scene, group: AudioAsset[], options?: AudioPlaybackOptions) {
  const sound = _.sample(group);
  if (sound) {
    playSound(scene, sound, options);
  } else {
    if (ENV.logWarnings) {
      console.warn(`[${scene.scene.key}] Unable to find audio asset for playback sound: ${sound.key}`);
    }
  }
}

function playSound(scene: Phaser.Scene, asset: AudioAsset, options?: AudioPlaybackOptions) {
  if (ENV.debugAudio) {
    console.log(`[${scene.scene.key}] Playing sound: ${asset.key} (vol: ${asset.volume * 100}%)`);
  }

  let volume = asset.volume;

  if (options) {
    if (options.volume) {
      volume *= options.volume;
    }
  }

  scene.sound.play(asset.key, { volume });
}
