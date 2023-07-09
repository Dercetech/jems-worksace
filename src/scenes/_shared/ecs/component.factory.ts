import { Component } from "./component";
import { InputComponent, SpriteComponent } from "./components";
import { AbstractWorld } from "./world";

export class ComponentFactory {
  protected get world() {
    return this._world;
  }

  protected get scene() {
    return this._scene;
  }

  constructor(private _world: AbstractWorld, private _scene: Phaser.Scene) {}

  destroy() {
    this._world = null;
    this._scene = null;
  }

  createInputComponent(): Component {
    const component = new InputComponent();
    return component;
  }

  createSpriteComponent(x: number, y: number, textureKey: string, frameKey: string | number): Component {
    const sprite = this.scene.add.sprite(x, y, textureKey, frameKey);
    const component = new SpriteComponent(sprite);
    return component;
  }
}
