export type PhaserMatterTiledBody = Phaser.Physics.Matter.Components.Bounce &
  Phaser.Physics.Matter.Components.Collision &
  Phaser.Physics.Matter.Components.Friction &
  Phaser.Physics.Matter.Components.Gravity &
  Phaser.Physics.Matter.Components.Mass &
  Phaser.Physics.Matter.Components.Sensor &
  Phaser.Physics.Matter.Components.Sleep &
  Phaser.Physics.Matter.Components.Static & {
    body: MatterJS.BodyType;
    entityId: string;
  };
