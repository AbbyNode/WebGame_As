import { GameComponent } from "../gameobject/GameComponent.js";
import { EventName } from "./EventName.js";
/**
 * An event class used within the event manager
 *
 * @export
 * @class Event
 */
export class Event {
    constructor() {
        this._listeners = [];
    }
    addListener(listener) {
        this._listeners.push(listener);
    }
    removeListener(listener) {
        const index = this._listeners.indexOf(listener);
        this._listeners.splice(index, 1);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invoke(data) {
        this._listeners.forEach(listener => {
            listener(data);
        });
    }
    clear() {
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
    constructor(gameObject) {
        super(gameObject);
        this._events = new Map();
        this.addListener(EventName.GameObject_Destroy, () => {
            this.destroy();
        });
    }
    addListener(name, listener) {
        let event = this._events.get(name);
        if (event == undefined) {
            event = new Event();
            this._events.set(name, event);
        }
        event.addListener(listener);
    }
    removeListener(name, listener) {
        const event = this._events.get(name);
        if (event != undefined) {
            event.removeListener(listener);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    invoke(name, data = undefined) {
        const event = this._events.get(name);
        if (event != undefined) {
            event.invoke(data);
        }
    }
    destroy() {
        this._events.forEach(event => {
            event.clear();
        });
        this._events.clear();
    }
}
//# sourceMappingURL=EventManager.js.map