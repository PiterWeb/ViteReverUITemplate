//@ts-nocheck

interface createElementOptions {
    className?: string;
    id?: string;
    style?: string;
    onClick?: (e: MouseEvent) => void;
    ref?: (el: HTMLElement) => void;
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
        if (opts?.ref !== undefined) opts?.ref(finalEl);

        return finalEl;
    }

    public static Fragment = "Fragment";

    private static setOrderIds(el: HTMLElement, type: "local" | "globalFrag") {
        for (let i = 0; i < el.children.length; i++) {
            el.children.item(i)?.setAttribute(`data-${type}Id`, i.toString());
        }
    }

    public static HandleStateFull(
        elFun: () => HTMLElement,
        parent: HTMLElement
    ) {
        let actualEl = elFun();

        parent.appendChild(actualEl);

        elFun.prototype.state.addListener("el", (el: HTMLElement) => {
            console.log("rerendering");

            if (el instanceof DocumentFragment) {
                parent.replaceChildren(el);
            } else parent.replaceChild(el, actualEl);

            actualEl = el;
        });
    }

    public static HandleStateLess(
        elFun: () => HTMLElement,
        parent: HTMLElement
    ) {
        parent.appendChild(elFun());
    }
}
