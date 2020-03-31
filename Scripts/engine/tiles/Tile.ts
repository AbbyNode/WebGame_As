import { GameObject } from "../gameobject/GameObject.js";

export abstract class Tile extends GameObject {
	
}

export interface TileType<T extends Tile> {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	new(...args: any[]): T;
}
