//@ts-nocheck

interface createElementOptions {
    className?: string;
    id?: string;
    style?: string;
    onClick?: (e: MouseEvent) => void;
    // ref?: (el: HTMLElement) => void;
    src?: string;
    href?: string;
}

type children =
    | (string | number | boolean | HTMLElement)[]
    | (string | number | boolean | HTMLElement)[][]
    | HTMLElement
    | string
    | number
    | boolean
    | null;

export default class UI {
    public static createElement(
        tagName: string,
        opts: createElementOptions | null,
        ...children: children
    ): HTMLElement {
        let el = document.createElement(tagName);

        if (tagName === "Fragment") el = document.createDocumentFragment();

        if (opts !== null) {
            if (opts?.style !== undefined) el.style = opts?.style;
            if (opts?.className !== undefined) el.className = opts?.className;
            if (opts?.id !== undefined) el.id = opts?.id;
            if (opts?.onClick !== undefined) el.onclick = opts?.onClick;
            if (opts?.src !== undefined) el.src = opts?.src;
            if (opts?.href !== undefined) el.href = opts?.href;
        }

        if (children === null) return el;

        if (typeof children === "string") {
            el.appendChild(document.createTextNode(children));
        }

        if (typeof children === "number" || typeof children === "boolean") {
            el.appendChild(document.createTextNode(children.toString()));
        }

        if (children instanceof Array)
            children.forEach((child) => {
                if (child instanceof DocumentFragment) {
                    el.appendChild(child);
                    return;
                }

                if (child instanceof HTMLElement) {
                    el.appendChild(child);
                    return;
                }
                if (typeof child === "string") {
                    el.appendChild(document.createTextNode(child));
                    return;
                }

                if (typeof child === "number" || typeof child === "boolean") {
                    el.appendChild(document.createTextNode(child.toString()));
                    return;
                }

                // {array.map((el) => {return <div>{el}</div>})
                if (child instanceof Array) {
                    child.forEach((arrItem) => {
                        if (arrItem instanceof HTMLElement) {
                            el.appendChild(arrItem);
                            return;
                        }

                        if (
                            typeof arrItem === "string" ||
                            typeof arrItem === "number" ||
                            typeof arrItem === "boolean"
                        ) {
                            el.appendChild(document.createTextNode(arrItem));
                            return;
                        }
                    });
                }
            });

        const finalEl = el as HTMLElement;
        // if (opts?.ref !== undefined) opts?.ref(finalEl);

        return finalEl;
    }

    public static Fragment = "Fragment";

    private static setId(el: HTMLElement, id: string) {
        if (!(el instanceof DocumentFragment));

        for (let i = 0; i < el.children.length; i++) {
            const child = el.children.item(i);

            if (child === null) continue;
            child.setAttribute("data-fr-id", id);
        }
    }

    private static handleFragmentRerender(
        parent: HTMLElement,
        newElement: HTMLElement,
        actualElement: HTMLElement,
        id: string
    ) {
        let firstFragmentChild: Element;

        for (let i = 0; i < parent.children.length; i++) {
            const child = parent.children.item(i);
            if (child === null) continue;
            if (child.getAttribute("data-fr-id") === id) {
                parent.insertBefore(newElement, child);
                firstFragmentChild = child;
                break;
            }
        }

        if (firstFragmentChild === undefined) return;

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
        const id = Math.random().toString(36).substring(7);

        if (actualElement instanceof DocumentFragment)
            this.setId(actualElement, id);

        parent.appendChild(actualElement);

        elementFun.prototype.state.addListener(
            "el",
            (newElement: HTMLElement) => {
                console.log("rerender", id);

                if (!(newElement instanceof DocumentFragment)) {
                    parent.replaceChild(newElement, actualElement);
                    actualElement = newElement;
                    return;
                }
                this.setId(newElement, id);
                this.handleFragmentRerender(
                    parent,
                    newElement,
                    actualElement,
                    id
                );
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
