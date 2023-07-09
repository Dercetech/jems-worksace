/**
 * @author     Richard Davey <rich@photonstorm.com>, Michael Kelly <me@mkelly.me>
 * @copyright  2019 Photon Storm Ltd.
 * @license    {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

import { TILESETS_FOLDER } from "../assets/tiles/tiles.folders";
import { ENV } from "../environments/dev.env";

const dpr = 1;

export function registerTiledJSONExternalLoader(Phaser) {
  const FileTypesManager = Phaser.Loader.FileTypesManager;
  const GetFastValue = Phaser.Utils.Objects.GetFastValue;
  const IsPlainObject = Phaser.Utils.Objects.IsPlainObject;
  const JSONFile = Phaser.Loader.FileTypes.JSONFile;
  const MultiFile = Phaser.Loader.MultiFile;

  class TiledJSONExternalFile extends MultiFile {
    constructor(loader, key, tilemapURL, tilesetUrls: string[], path, baseURL, tilemapXhrSettings, tilesetXhrSettings) {
      if (IsPlainObject(key)) {
        const config = key;

        key = GetFastValue(config, "key");
        tilemapURL = GetFastValue(config, "url");
        tilemapXhrSettings = GetFastValue(config, "xhrSettings");
        path = GetFastValue(config, "path");
        baseURL = GetFastValue(config, "baseURL");
        tilesetXhrSettings = GetFastValue(config, "tilesetXhrSettings");
      }

      const tilemapFile = new JSONFile(loader, key, tilemapURL, tilemapXhrSettings);
      super(loader, "tilemapJSON", key, [tilemapFile]);

      this.tilesetUrls = tilesetUrls;
      this.config.path = path;
      this.config.baseURL = baseURL;
      this.config.tilesetXhrSettings = tilesetXhrSettings;
    }

    onFileComplete(file) {
      const index = this.files.indexOf(file);
      if (index !== -1) {
        this.pending--;

        if (file.type === "json" && file.data.hasOwnProperty("tilesets")) {
          //  Inspect the data for the files to now load
          const tilesets = file.data.tilesets;

          const config = this.config;
          const loader = this.loader;

          const currentBaseURL = loader.baseURL;
          const currentPath = loader.path;
          const currentPrefix = loader.prefix;

          const baseURL = GetFastValue(config, "baseURL", currentBaseURL);
          const path = GetFastValue(config, "path", currentPath);
          const prefix = GetFastValue(config, "prefix", currentPrefix);
          const tilesetXhrSettings = GetFastValue(config, "tilesetXhrSettings");

          loader.setBaseURL(baseURL);
          loader.setPath(path);
          loader.setPrefix(prefix);

          // if (file.tilesetUrls) {
          //   (file.tilesetUrls as string[]).forEach((url) => {
          //     const tilesetFile = new JSONFile(loader, `_TILESET_${url}`, url, tilesetXhrSettings);
          //     tilesetFile.tilesetIndex = index;
          //     this.addToMultiFile(tilesetFile);
          //     loader.addFile(tilesetFile);
          //   });
          // }

          for (const [index, tileset] of tilesets.entries()) {
            if (!tileset.source) {
              continue;
            }

            // jem@dercetech: ignore the "objects" tileset
            const tilesetFileName = tileset.source.split("/").pop();
            if (["objects.tsx"].includes(tilesetFileName)) {
              continue;
            }

            // jem@dercetech: jemReactor uses the sibling "tiles" folder from now on - commenting out the original tilesetUrl logic.
            // Tileset is relative to the tilemap filename, so we abuse URL to get the relative path.
            const url = new URL(file.src, "http://example.com");
            url.pathname += `/../${tileset.source}`;
            // const tilesetUrl_notInUse = url.pathname.slice(1);

            const tilesetUrl = `${TILESETS_FOLDER}/${tilesetFileName.replace("tsx", "json")}`;

            if (ENV.debug) {
              console.log(`[External tileset loader] ${tilesetFileName} needs external tileset: ${tilesetUrl}`);
            }

            const tilesetFile = new JSONFile(loader, `_TILESET_${tilesetUrl}`, tilesetUrl, tilesetXhrSettings);
            tilesetFile.tilesetIndex = index;
            this.addToMultiFile(tilesetFile);
            loader.addFile(tilesetFile);
          }

          //  Reset the loader settings
          loader.setBaseURL(currentBaseURL);
          loader.setPath(currentPath);
          loader.setPrefix(currentPrefix);
        }
      }
    }

    addToCache() {
      if (this.isReadyToProcess()) {
        let tilemapFile = this.files[0];

        // jem@dercetech adding the DPR * object scale ratio
        tilemapFile = {
          ...tilemapFile,
          data: {
            ...tilemapFile.data,
            tileheight: tilemapFile.data.tileheight * dpr,
            tilewidth: tilemapFile.data.tilewidth * dpr,
          },
        };

        for (const file of this.files.slice(1)) {
          const index = file.tilesetIndex;
          tilemapFile.data.tilesets[index] = {
            ...tilemapFile.data.tilesets[index],
            ...file.data,
            // 16 -> 32
            tileheight: file.data.tileheight * dpr,
            tilewidth: file.data.tilewidth * dpr,
            // 320 -> 640
            imagewidth: file.data.imagewidth * dpr,
            imageheight: file.data.imageheight * dpr,
            source: undefined, // Avoid throwing in tilemap creator
          };
        }

        // TODO jem@dercetech make a better generic version here
        tilemapFile.data.tilesets = tilemapFile.data.tilesets.filter(
          (tileset) => !tileset.source || tileset.source.indexOf("objects.tsx") === -1
        );

        this.loader.cacheManager.tilemap.add(tilemapFile.key, {
          format: Phaser.Tilemaps.Formats.TILED_JSON,
          data: tilemapFile.data,
        });

        this.complete = true;

        for (const file of this.files) {
          file.pendingDestroy();
        }
      }
    }
  }

  FileTypesManager.register(
    "tilemapTiledJSONExternal",
    function (key, tilemapURL, tilesetUrls: string[], path, baseURL, tilemapXhrSettings) {
      //  Supports an Object file definition in the key argument
      //  Or an array of objects in the key argument
      //  Or a single entry where all arguments have been defined

      if (Array.isArray(key)) {
        for (var i = 0; i < key.length; i++) {
          const multifile = new TiledJSONExternalFile(this, key[i], tilesetUrls, null, null, null, null, null);
          this.addFile(multifile.files);
        }
      } else {
        const multifile = new TiledJSONExternalFile(this, key, tilemapURL, tilesetUrls, path, baseURL, tilemapXhrSettings, null);
        this.addFile(multifile.files);
      }

      return this;
    }
  );
}
