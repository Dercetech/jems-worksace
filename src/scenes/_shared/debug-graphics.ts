export class DebugGraphics {
  private _debugGraphics: Phaser.GameObjects.Graphics;

  private staticTilemapLayers: Phaser.Tilemaps.TilemapLayer[] = [];

  constructor(private _scene: Phaser.Scene) {}

  public toggleDebugPhysics() {
    if (this._debugGraphics || this._scene.matter.world.drawDebug) {
      this.hideDebugGraphics();
    } else {
      this.showDebugGraphics();
    }
  }

  public addStaticLayer(tilemapLayer: Phaser.Tilemaps.TilemapLayer) {
    this.staticTilemapLayers.push(tilemapLayer);
  }

  public showDebugGraphics() {
    // Debug bodies
    this._scene.matter.world.drawDebug = true;

    // Debug tilesets
    this._debugGraphics = this._scene.add.graphics().setAlpha(0.7).setDepth(100);

    // Debug static layers
    this.staticTilemapLayers.forEach((layer) =>
      layer.renderDebug(this._debugGraphics, {
        tileColor: null,
        collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
        faceColor: new Phaser.Display.Color(40, 39, 37, 255),
      })
    );
  }

  public hideDebugGraphics() {
    // Debug bodies
    if (this._scene.matter.world.debugGraphic) {
      this._scene.matter.world.drawDebug = false;
      this._scene.matter.world.debugGraphic.clear();
    }

    this.clear();
  }

  public clear() {
    if (this._debugGraphics) {
      this._debugGraphics.destroy();
      this._debugGraphics = null;
    }
  }
}
