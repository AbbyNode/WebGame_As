import { EventHandler } from "../../engine/interfaces/CommonTypes.js";

export type KeyMap = {
	up: () => void;
	down: () => void;
};

/**
 * Utility class to help track keyboard input.
 *
 * @export
 * @class KeyboardInput
 */
export class KeyboardInput {
	private _keyMap = new Map();
	private _isDownMap = new Map();

	private _downListener: EventHandler;
	private _upListener: EventHandler;

	constructor() {
		this._downListener = (event): void => {
			if (this._keyMap.has(event.key) // exists
				&& !this._isDownMap.get(event.key)) { // is not held
				this._keyMap.get(event.key).down();
				this._isDownMap.set(event.key, true);
			}
		};
		document.addEventListener("keydown", this._downListener);

		this._upListener = (event): void => {
			if (this._keyMap.has(event.key)) {
				this._keyMap.get(event.key).up();
				this._isDownMap.set(event.key, false);
			}
		};
		document.addEventListener("keyup", this._upListener);
	}

	public addKey(key: string, keyMap: KeyMap): void {
		if (this._keyMap.has(key)) {
			console.log(`Key ${key} already in use`);
		} else {
			this._keyMap.set(key, keyMap);
			this._isDownMap.set(key, false);
		}
	}

	public removeKey(key: string): void {
		this._keyMap.delete(key);
		this._isDownMap.delete(key);
	}

	public destroy(): void {
		document.removeEventListener("keydown", this._downListener);
		document.removeEventListener("keyup", this._upListener);
	}
}

// any file containing a top-level import or export is considered a module.
// Also we should use direct file modules instead of namespaces
// https://www.typescriptlang.org/docs/handbook/modules.html
// https://stackoverflow.com/questions/40267190/typescript-2-0-how-can-i-reference-objects-in-the-same-namespace-but-in-a-sub-f/43023392#43023392

// exports is not defined
// CommonJS isn't installed (which defines exports)
// https://stackoverflow.com/questions/43042889/typescript-referenceerror-exports-is-not-defined
// https://stackoverflow.com/questions/19059580/client-on-node-uncaught-referenceerror-require-is-not-defined

// Module doesn't have to be the same as Target
// https://stackoverflow.com/questions/41993811/understanding-target-and-module-in-tsconfig

// Ultimately, switched over to es6 modules
