import { Tile, TileType } from "./Tile.js";
import { Size2D } from "../interfaces/Size2D.js";
import { ArrayJSON } from "../interfaces/CommonTypes.js";
import { Entity } from "./Entity.js";

export class TileMap {
	// REMINDER: Put this in some global class
	public static readonly TileSize = 64;

	private _tiles: Tile[];
	private _floors: Tile[];
	private _size: Size2D;

	//#region props

	public get size(): Size2D {
		return Object.assign({}, this._size);
	}

	public get tiles(): Tile[] {
		return this._tiles;
	}
	public set tiles(v: Tile[]) {
		this._tiles = v;
	}

	//#endregion
	
	constructor() {
		this._tiles = [];
		this._floors = [];
		this._size = {width: 0, height: 0};
	}

	//#region loading

	/**
	 * 
	 * @param json Multi-dim json obj with tile as strings
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public loadFromJSON(json: ArrayJSON, mapping: Map<string, TileType<any>>): void {
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
					const tile = new tileType() as Tile;
					this._tiles[index] = tile;
				} else {
					console.error("Tile not defined: " + col);
				}

				index++
			});
		});
		
		this._size = {width: colCount, height: rowCount};

		this.resolveTilePositions();
	}

	private resolveTilePositions(): void {
		for (let index = 0; index < this._tiles.length; index++) {
			const tile = this._tiles[index];
			if (!tile) {
				continue;
			}

			const xPos = ((index % this._size.width) * TileMap.TileSize) + (TileMap.TileSize/2);
			const yPos = (Math.floor(index / this._size.width) * TileMap.TileSize) + (TileMap.TileSize/2);
			tile.transform.position = {x: xPos, y: yPos};
		}
	}

	//#endregion

	//#region init, update, destroy

	public init(stage: createjs.Stage): void {
		// Init floor tiles
		this._tiles.forEach(tile => {
			if (tile instanceof Entity) {
				// If entity, init just the floor
				const floorTile = new tile.floorTile() as Tile;
				floorTile.transform.position = tile.transform.position;
				floorTile.init(stage);
				this._floors.push(floorTile);
			} else {
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

	public updateAllEntities(): void {
		this._tiles.forEach(tile => {
			if (tile instanceof Entity) {
				tile.update();
			}
		});
	}

	public destroyAllTiles(): void {
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
	public getFirstTileOfType(type: TileType<any>): (Tile | undefined) {
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
