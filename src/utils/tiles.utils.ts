import { PhaserMatterTiledBody, TileProperties } from "../models";
import * as CONSTANTS from "../constants";
import { ENV } from "../environments/dev.env";

export function postProcessLayer(
  tilemapLayer: Phaser.Tilemaps.TilemapLayer,
  enrichTile?: (properties: TileProperties, body: MatterJS.BodyType) => void
) {
  // Collision groups don't take DPR and actual tile width into consideration, use this custom method so custom shapes are scaled
  // layer.setCollisionFromCollisionGroup();
  // this.matter.world.convertTilemapLayer(tilemapLayer);
  //

  const layerData = tilemapLayer.layer;
  const tiles = tilemapLayer.getTilesWithin(0, 0, layerData.width, layerData.height, { isColliding: true });

  tiles.forEach((tile) => {
    const matterBody = getTileMatterBody(tile);
    if (matterBody) {
      // Scale custom shape to DPR, if any
      // this.scaleCollisionGroupShapeToDpr(tile);

      if (tile.properties) {
        if (ENV.debugTiles) {
          console.log(`Tile: ${tile.x}, ${tile.y}`, tile.properties);
        }

        // Enrich the tile's body (as MatterJS.BodyType)
        if (enrichTile) {
          enrichTile(tile.properties, matterBody.body); // better pass the wrapped BodyType rather than the wrapper
        }

        if (tile.properties[CONSTANTS.TILE_PROPERTIES.TILE_TYPE]) {
          const tileType: CONSTANTS.TILE_TYPES = tile.properties[CONSTANTS.TILE_PROPERTIES.TILE_TYPE];
          matterBody.setCollisionCategory(matchTiledCategoryNameWithCategoryNumber(tileType));
        }
      }
    }
  });
}

// function scaleCollisionGroupShapeToDpr(scene: Phaser.Scene, tile: Phaser.Tilemaps.Tile) {
//   const dpr = 1;
//   if (dpr > 1 && tile.getCollisionGroup()) {
//     const body = (tile.physics as any).matterBody.body as MatterJS.BodyType;
//     const point = { x: tile.width * tile.x, y: tile.height * tile.y };
//     scene.matter.body.scale(body, dpr, dpr, point);
//   }
// }

function getTileMatterBody(tile: Phaser.Tilemaps.Tile) {
  if (tile.physics && (tile.physics as any).matterBody) {
    return (tile.physics as any).matterBody as PhaserMatterTiledBody;
  }
  return null;
}

function matchTiledCategoryNameWithCategoryNumber(tileType: CONSTANTS.TILE_TYPES) {
  let result = 0;

  if (CONSTANTS.TILE_COLLISION_MAPPING.hasOwnProperty(tileType)) {
    result = CONSTANTS.TILE_COLLISION_MAPPING[tileType];

    if (ENV.debugTiles) {
      console.log(`Overriding collision category for tiled type "${tileType}": ${result}`);
    }
  }

  return result;
}
