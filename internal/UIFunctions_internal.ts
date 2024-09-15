import StateStore from "./StateStore";
import deepEqual from "./utils/deep_equal";
import { ElProto } from "@UI";

export interface Signal<t> {
	value: t;
	readonly id: string;
	readonly lastValue: t;
	readonly lastValueStringified: string;
}

// state (cambio) -> listener accion en la funcion -> rerender
// El methodo UI.HandleStateFull() es el encargado de hacer el rerender

// export function useState<t>(el: () => HTMLElement, initvalue: t, id: string) {
//     let value = initvalue;

//     let state = el.prototype.state as StateStore;

//     if (state === undefined) {
//         el.prototype.state = new StateStore();
//         state = el.prototype.state as StateStore;
//         state.setProp("state-" + id, value);
//     } else value = state.getProp("state-" + id);

//     const setState = (newValue: t) => {
//         state.setProp("last-state-" + id, value);
//         value = newValue;
//         state.setProp("state-" + id, newValue);
//         state.setProp("el", el());
//     };

//     return [value, setState] as [t, (newValue: t) => void];
// }

export function useSignal<T>(
	el: (() => HTMLElement) & ElProto,
	initvalue: T,
	id: string
): Signal<T> {
	let value = initvalue;
	let state = el.prototype.state;

	if (state === undefined) {
		el.prototype.state = new StateStore();
		state = el.prototype.state;
		state.setProp("state-" + id, value);
	} else if (state.getProp("state-" + id) === undefined) {
		state.setProp("state-" + id, value);
	} else value = state.getProp("state-" + id);

	const setState = (newValue: T) => {
		state.setProp("last-state-" + id, value);
		value = newValue;
		state.setProp("state-" + id, newValue);
		state.setProp("el", el());
	};

	return {
		get value() {
			return value;
		},
		get lastValue() {
			return state.getProp<T>("last-state-" + id);
		},
		get lastValueStringified() {
			return JSON.stringify(this.lastValue);
		},
		set value(newValue: T) {
			if (newValue === value || deepEqual(newValue, value)) return;
			setState(newValue);
		},
		id,
	};
}

//
export function useEffect(
	el: (() => HTMLElement) & ElProto,
	callback: () => void,
	dependencies?: Signal<unknown>[] | string[]
) {
	if (dependencies === undefined && el.prototype.state === undefined) {
		return callback();
	}

	if (dependencies !== undefined && el.prototype.state !== undefined) {
		const state = el.prototype.state as StateStore;

		dependencies.forEach((dependency) => {
			if (typeof dependency === "string") {
				const value = state.getProp("state-" + dependency);

				const lastValue = state.getProp("last-state-" + dependency);

				if (value === lastValue) return;

				callback();
				return;
			}

			const value = state.getProp("state-" + dependency.id);

			const lastValue = state.getProp("last-state-" + dependency.id);

			if (value === lastValue) return;

			callback();
		});
	}
}
