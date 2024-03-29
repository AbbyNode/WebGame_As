import { GameObject } from "../gameobject/GameObject.js";
import { GameComponent } from "../gameobject/GameComponent.js";
import { EventName } from "./EventName.js";

// Type instead of an interface
// Previously tried interface instead of an abstract class
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Listener = (data: any) => void;

/**
 * An event class used within the event manager
 *
 * @export
 * @class Event
 */
export class Event {
	private _listeners: Listener[];

	constructor() {
		this._listeners = [];
	}

	public addListener(listener: Listener): void {
		this._listeners.push(listener);
	}

	public removeListener(listener: Listener): void {
		const index = this._listeners.indexOf(listener);
		this._listeners.splice(index, 1);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public invoke(data: any): void {
		this._listeners.forEach(listener => {
			listener(data);
		});
	}

	public clear(): void {
		this._listeners = [];
	}
}

/**
 * An Event Manager that can associate multiple listeners to named events
 *
 * @export
 * @class EventManager
 */
export class EventManager extends GameComponent {
	private _events: Map<EventName, Event>;

	constructor(gameObject: GameObject) {
		super(gameObject);
		this._events = new Map();
		
		this.addListener(EventName.GameObject_Destroy, () => {
			this.destroy();
		});
	}

	public addListener(name: EventName, listener: Listener): void {
		let event = this._events.get(name);

		if (event == undefined) {
			event = new Event();
			this._events.set(name, event);
		}

		event.addListener(listener);
	}

	public removeListener(name: EventName, listener: Listener): void {
		const event = this._events.get(name)
		if (event != undefined) {
			event.removeListener(listener);
		}
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public invoke(name: EventName, data: any = undefined): void {
		const event = this._events.get(name)

		if (event != undefined) {
			event.invoke(data);
		}
	}

	public destroy(): void {
		this._events.forEach(event => {
			event.clear();
		});

		this._events.clear();
	}
}