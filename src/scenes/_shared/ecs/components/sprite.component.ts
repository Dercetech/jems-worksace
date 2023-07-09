import { Component } from "../component";

export class SpriteComponent extends Component {
  static readonly COMPONENT_KEY = "SpriteComponent";

  constructor(public sprite: Phaser.GameObjects.Sprite) {
    super(SpriteComponent.COMPONENT_KEY);
  }

  destroy() {
    this.sprite = null;
  }
}
