import StateStore from "./StateStore";
import deepEqual from "./utils/deep_equal";
import { ElProto } from "@UI";

export interface Signal<t> {
	value: t;
	readonly id: string;
	readonly lastValue: t;
	readonly lastValueStringified: string;
}

export function useSignal<T>(
	el: (() => HTMLElement) & ElProto,
	initvalue: T,
	id: string
): Signal<T> {
	let value = initvalue;
	let state = el.prototype.state;

	const keyState = `state-${id}`;
	const lastKeyState = `last-${keyState}`;

	if (state === undefined) {
		el.prototype.state = new StateStore();
		state = el.prototype.state;
		state.setProp(keyState, value);
	} else if (state.getProp(keyState) === undefined) {
		state.setProp(keyState, value);
	} else value = state.getProp(keyState);

	const setState = (newValue: T) => {
		state.setProp(lastKeyState, value);
		state.setProp(keyState, newValue);

		// Trigger re-render
		state.setProp("el", el());
	};

	return {
		get value() {
			return state.getProp<T>(keyState);
		},
		get lastValue() {
			return state.getProp<T>(lastKeyState);
		},
		get lastValueStringified() {
			return JSON.stringify(this.lastValue);
		},
		set value(newValue: T) {
			const value = this.value
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
