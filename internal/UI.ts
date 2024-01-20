interface createElementOptions {
    [key: string]: any;
}

type children =
    | (string | number | boolean | HTMLElement)[]
    | (string | number | boolean | HTMLElement)[][];
export default class UI {
    public static createElement(
        tagName: string | (() => HTMLElement),
        opts?: createElementOptions,
        ...children: children
    ): HTMLElement {
        if (typeof tagName === "function") {
            const el = tagName();
            this.createChilds(el, children);
            return el;
        }

        let el = document.createElement(tagName);

        if (tagName === "Fragment")
            el = document.createDocumentFragment() as unknown as HTMLElement;

        if (opts) {
            const keys = Object.keys(opts);

            for (const key of keys) {
                if (opts[key] === undefined) continue;
                // @ts-ignore
                el[key] = opts[key];

                if (
                    el.getAttribute(key) != opts[key] &&
                    !key.startsWith("on") &&
                    key != "className"
                )
                    el.setAttribute(key, opts[key]);

                // if (key.startsWith("data-")) el.setAttribute(key, opts[key]);
            }
        }

        this.createChilds(el, children);

        return el;
    }

    private static createChilds(parent: HTMLElement, children: children) {
        for (const child of children) {
            if (typeof child === "string")
                parent.appendChild(document.createTextNode(child));

            if (typeof child === "number" || typeof child === "boolean")
                parent.appendChild(document.createTextNode(child.toString()));

            if (child instanceof HTMLElement) {
                parent.appendChild(child);
            }

            if (child instanceof DocumentFragment) {
                parent.appendChild(child);
            }

            // {array.map((el) => {return <div>{el}</div>})
            if (child instanceof Array) {
                this.createChilds(parent, child);
            }
        }
    }

    public static Fragment = "Fragment";

    private static setId(el: HTMLElement, id: string) {
        // if (!(el instanceof DocumentFragment)) return;
        el.setAttribute("data-fr-id", id);

        for (let i = 0; i < el.children.length; i++) {
            const child = el.children.item(i);

            if (child === null) continue;

            if (child.hasChildNodes()) this.setId(child as HTMLElement, id);
        }
    }

    private static smartRerender(
        parent: HTMLElement,
        actualElement: HTMLElement,
        newElement: HTMLElement
    ) {
        // Search actual element in parent, then search for changes in itself and in children recursively

        // If not found, return

        // If found, replace with new element, using replaceWith function

        for (let i = 0; i < parent.children.length; i++) {
            const child = parent.children.item(i);
            if (child === null) continue;
            if (
                child.getAttribute("data-fr-id") ===
                    actualElement.getAttribute("data-fr-id") &&
                child.tagName === newElement.tagName &&
                // @ts-ignore
                child["uid"] === newElement["uid"] &&
                child.getAttribute("key") === newElement.getAttribute("key")
            ) {
                for (let j = 0; j < newElement.attributes.length; j++) {
                    const newChildAttribute = newElement.attributes.item(j);

                    if (newChildAttribute === null) continue;

                    if (!newChildAttribute.name.startsWith("data-rui-"))
                        continue;

                    for (let k = 0; k < child.attributes.length; k++) {
                        const childAttribute = child.attributes.item(k);

                        if (childAttribute === null) continue;

                        if (childAttribute.name === newChildAttribute.name) {
                            if (
                                childAttribute.value !== newChildAttribute.value
                            ) {
                                child.replaceWith(newElement);
                                return;
                            }
                        }
                    }

                    child.replaceWith(newElement);
                }

                // Search for changes in children recursively

                for (let j = 0; j < child.children.length; j++) {
                    const childChild = child.children.item(j);
                    const newChildChild = newElement.children.item(j);
                    if (childChild === null || newChildChild === null) continue;
                    this.smartRerender(
                        child as HTMLElement,
                        childChild as HTMLElement,
                        newChildChild as HTMLElement
                    );
                }
            }
        }
    }

    private static handleFragmentRerender(
        parent: HTMLElement,
        newElement: HTMLElement,
        id: string
    ) {
        if (!(newElement instanceof DocumentFragment)) return;

        let firstFragmentChild: Element | null = null;

        for (let i = 0; i < parent.children.length; i++) {
            const child = parent.children.item(i);
            if (child === null) continue;
            if (child.getAttribute("data-fr-id") === id) {
                parent.insertBefore(newElement, child);
                firstFragmentChild = child;
                break;
            }
        }

        if (firstFragmentChild === null) return;

        let nextSibling = firstFragmentChild.nextSibling;
        firstFragmentChild.remove();

        while (nextSibling !== null) {
            const next = nextSibling.nextSibling;
            parent.removeChild(nextSibling);
            nextSibling = next;
        }
    }

    public static HandleStateFull(
        elementFun: () => HTMLElement,
        parent: HTMLElement
    ) {
        let actualElement = elementFun();
        const id = generateId();

        this.setId(actualElement, id);

        parent.appendChild(actualElement);

        if (elementFun.prototype.state === undefined) return;

        elementFun.prototype.state.addListener(
            "el",
            (newElement: () => HTMLElement) => {
                //@ts-ignore
                this.setId(newElement, id);
                //@ts-ignore
                this.handleFragmentRerender(parent, newElement, id);

                if (!(newElement instanceof DocumentFragment)) {
                    //@ts-ignore
                    this.smartRerender(parent, actualElement, newElement);
                }

                //@ts-ignore
                actualElement = newElement;
            }
        );
    }

    public static HandleStateLess(
        elFun: () => HTMLElement,
        parent: HTMLElement
    ) {
        parent.appendChild(elFun());
    }
}

const usedIds: string[] = [];

function generateId() {
    let id = Math.random().toString(36).substring(7);
    while (usedIds.includes(id)) id = Math.random().toString(36).substring(7);
    usedIds.push(id);
    return id;
}
