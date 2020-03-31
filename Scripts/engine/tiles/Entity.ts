import { Tile, TileType } from "./Tile.js";

export abstract class Entity extends Tile {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public abstract get floorTile(): TileType<any>;
}