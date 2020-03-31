import { Entity } from "./Entity.js";
export class TileMap {
    //#endregion
    constructor() {
        this._tiles = [];
        this._floors = [];
        this._size = { width: 0, height: 0 };
    }
    //#region props
    get size() {
        return Object.assign({}, this._size);
    }
    get tiles() {
        return this._tiles;
    }
    set tiles(v) {
        this._tiles = v;
    }
    //#region loading
    /**
     *
     * @param json Multi-dim json obj with tile as strings
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    loadFromJSON(json, mapping) {
        let rowCount = 0;
        let colCount = 0;
        let index = 0;
        json.forEach(row => {
            rowCount++;
            row.forEach(col => {
                if (rowCount == 1) {
                    colCount++;
                }
                const tileType = mapping.get(col);
                if (tileType) {
                    const tile = new tileType();
                    this._tiles[index] = tile;
                }
                else {
                    console.error("Tile not defined: " + col);
                }
                index++;
            });
        });
        this._size = { width: colCount, height: rowCount };
        this.resolveTilePositions();
    }
    resolveTilePositions() {
        for (let index = 0; index < this._tiles.length; index++) {
            const tile = this._tiles[index];
            if (!tile) {
                continue;
            }
            const xPos = ((index % this._size.width) * TileMap.TileSize) + (TileMap.TileSize / 2);
            const yPos = (Math.floor(index / this._size.width) * TileMap.TileSize) + (TileMap.TileSize / 2);
            tile.transform.position = { x: xPos, y: yPos };
        }
    }
    //#endregion
    //#region init, update, destroy
    init(stage) {
        // Init floor tiles
        this._tiles.forEach(tile => {
            if (tile instanceof Entity) {
                // If entity, init just the floor
                const floorTile = new tile.floorTile();
                floorTile.transform.position = tile.transform.position;
                floorTile.init(stage);
                this._floors.push(floorTile);
            }
            else {
                // Else init tile itself
                tile.init(stage);
            }
        });
        // Init entity tiles
        this._tiles.forEach(tile => {
            if (tile instanceof Entity) {
                tile.init(stage);
            }
        });
    }
    updateAllEntities() {
        this._tiles.forEach(tile => {
            if (tile instanceof Entity) {
                tile.update();
            }
        });
    }
    destroyAllTiles() {
        this._tiles.forEach(tile => {
            tile.destroy();
        });
        this._tiles = [];
        this._floors.forEach(floorTile => {
            floorTile.destroy();
        });
    }
    //#endregion
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getFirstTileOfType(type) {
        for (let index = 0; index < this._tiles.length; index++) {
            const tile = this._tiles[index];
            if (tile) {
                if (tile instanceof type) {
                    return tile;
                }
            }
        }
        return undefined;
    }
}
// REMINDER: Put this in some global class
TileMap.TileSize = 64;
//# sourceMappingURL=TileMap.js.map