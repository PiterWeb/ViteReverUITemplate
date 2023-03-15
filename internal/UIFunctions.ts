import StateStore from "./StateStore";

// state (cambio) -> listener accion en la funcion -> rerender
// El methodo UI.HandleStateFull() es el encargado de hacer el rerender
export function useState<t>(el: () => HTMLElement, initvalue: t, id?: string) {
    let value = initvalue;

    if (el.prototype.state === undefined) {
        el.prototype.state = new StateStore();
        el.prototype.state.setProp("state-" + id, value);
    } else value = el.prototype.state.getProp("state-" + id);

    const setState = (newValue: t) => {
        value = newValue;
        el.prototype.state.setProp("state-" + id, newValue);
        el.prototype.state.setProp("el", el());
    };

    return [value, setState] as [t, (newValue: t) => HTMLElement];
}

//
export function useEffect(
    el: () => HTMLElement,
    callback: () => void,
    dependencies?: string[]
) {
    if (dependencies === undefined && el.prototype.state === undefined) {
        callback();
        return;
    }

    if (dependencies !== undefined && el.prototype.state !== undefined) {
        callback();
    }
}
