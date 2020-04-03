import { GameObject } from "../engine/gameobject/GameObject.js";

export abstract class Scene {
	protected stage: createjs.Stage;
	protected _objects: (createjs.DisplayObject | GameObject)[];

	constructor(stage: createjs.Stage) {
		this.stage = stage;
		this._objects = [];
	}

	public abstract init(): void;

	public abstract update(): void;

	public destroy(): void {
		this._objects.forEach(object => {
			if (object instanceof GameObject) {
				object.destroy();
			} else if (object instanceof createjs.DisplayObject) {
				this.stage.removeChild(object);
			}
		});
		
		this.stage.enableMouseOver(0);
	}
}
