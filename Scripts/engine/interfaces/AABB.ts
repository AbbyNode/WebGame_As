import { Point2D } from "./Point2D.js";
import { Size2D } from "./Size2D.js";

export interface AABB {
	position: Point2D;
	size: Size2D;
}