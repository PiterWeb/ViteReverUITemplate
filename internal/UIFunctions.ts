import StateStore from "./StateStore";

interface Signal<t> {
    value: t;
    readonly id: string;
}

// state (cambio) -> listener accion en la funcion -> rerender
// El methodo UI.HandleStateFull() es el encargado de hacer el rerender
export function useState<t>(el: () => HTMLElement, initvalue: t, id: string) {
    let value = initvalue;

    let state = el.prototype.state as StateStore;

    if (state === undefined) {
        el.prototype.state = new StateStore();
        state = el.prototype.state as StateStore;
        state.setProp("state-" + id, value);
    } else value = state.getProp("state-" + id);

    const setState = (newValue: t) => {
        state.setProp("last-state-" + id, value);
        value = newValue;
        state.setProp("state-" + id, newValue);
        state.setProp("el", el());
    };

    return [value, setState] as [t, (newValue: t) => void];
}

export function useSignal<T>(
    el: () => HTMLElement,
    initvalue: T,
    id: string
): Signal<T> {
    let value = initvalue;

    let state = el.prototype.state as StateStore;

    if (state === undefined) {
        el.prototype.state = new StateStore();
        state = el.prototype.state as StateStore;
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
        set value(newValue: T) {
            if (newValue === value) return;
            setState(newValue);
        },
        id,
    };
}

//
export function useEffect(
    el: () => HTMLElement,
    callback: () => void,
    dependencies?: Signal<any>[] | string[]
) {
    if (dependencies === undefined && el.prototype.state === undefined) {
        return callback();
    }

    if (dependencies !== undefined && el.prototype.state !== undefined) {
        dependencies.forEach((dep) => {
            const state = el.prototype.state as StateStore;

            if (typeof dep === "string") {
                const value = state.getProp("state-" + dep);

                const lastValue = state.getProp("last-state-" + dep);

                if (value === lastValue) return;

                callback();
                return;
            }

            const value = state.getProp("state-" + dep.id);

            const lastValue = state.getProp("last-state-" + dep.id);

            if (value === lastValue) return;

            callback();
        });
    }
}
