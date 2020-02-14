import { GameObject } from "./GameObject.js";

export class Button extends GameObject {
	constructor(imgPath: string = "./Assets/images/default.png", x: number = 0, y: number = 0, isCentered: boolean = false) {
		super(imgPath, x, y, isCentered);

		this.on("mouseover", this.mouseover);
		this.on("mouseout", this.mouseout);
	}

	// method
	mouseover(): void {
		this.alpha = 0.1;
	}

	mouseout(): void {
		this.alpha = 1;
	}

	// PROTECTED METHODS

	protected _checkBounds(): void {
		// throw new Error("Method not implemented.");
	}

	// PUBLIC METHODS

	public start(): void {
		// throw new Error("Method not implemented.");
	}
	public update(): void {
		// throw new Error("Method not implemented.");
	}
	public reset(): void {
		// throw new Error("Method not implemented.");
	}
}