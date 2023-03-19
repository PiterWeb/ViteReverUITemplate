// @ts-nocheck
interface createElementOptions {
    [key: string]: any;
}

type children =
    | (string | number | boolean | HTMLElement)[]
    | (string | number | boolean | HTMLElement)[][];
export default class UI {
    public static createElement(
        tagName: string,
        opts?: createElementOptions,
        ...children: children
    ): HTMLElement {
        let el = document.createElement(tagName);

        if (tagName === "Fragment") el = document.createDocumentFragment();

        if (opts !== null) {
            const keys = Object.keys(opts);

            for (const key of keys) {
                if (opts[key] === undefined) continue;
                el[key] = opts[key];
            }

            // if (opts?.style !== undefined) el.style = opts?.style;
            // if (opts?.className !== undefined) el.className = opts?.className;
            // if (opts?.id !== undefined) el.id = opts?.id;
            // if (opts?.onClick !== undefined) el.onclick = opts?.onClick;
            // if (opts?.src !== undefined) el.src = opts?.src;
            // if (opts?.href !== undefined) el.href = opts?.href;
        }

        // if (typeof children === "string")
        //     el.appendChild(document.createTextNode(children));

        // if (typeof children === "number" || typeof children === "boolean")
        //     el.appendChild(document.createTextNode(children.toString()));

        // if (children instanceof DocumentFragment) el.appendChild(children);
        this.createChilds(el, children);

        const finalEl = el as HTMLElement;
        // if (opts?.ref !== undefined) opts?.ref(finalEl);

        return finalEl;
    }

    private static createChilds(parent: HTMLElement, children: children) {
        for (const child of children) {
            if (typeof child === "string")
                parent.appendChild(document.createTextNode(child));

            if (typeof child === "number" || typeof child === "boolean")
                parent.appendChild(document.createTextNode(child.toString()));

            if (child instanceof DocumentFragment) parent.appendChild(child);
            if (child instanceof HTMLElement) parent.appendChild(child);

            // {array.map((el) => {return <div>{el}</div>})
            if (child instanceof Array) {
                this.createChilds(parent, child);
            }
        }
    }

    public static Fragment = "Fragment";

    private static setId(el: HTMLElement, id: string) {
        if (!(el instanceof DocumentFragment)) return;

        for (let i = 0; i < el.children.length; i++) {
            const child = el.children.item(i);

            if (child === null) continue;
            child.setAttribute("data-fr-id", id);
        }
    }

    // private static smartRerender(
    //     parent: HTMLElement,
    //     actualElement: HTMLElement,
    //     newElement: HTMLElement,
    //     recursive = false
    // ) {
    //     if (recursive) {
    //         parent.childNodes.forEach((child, i) => {
    //             const newChild = newElement.childNodes.item(i).cloneNode(true);

    //             if (newChild === null || child == null) return;

    //             console.log("child", child, newChild, "before equal");

    //             if (child.isEqualNode(newChild)) return;

    //             if (child.hasChildNodes())
    //                 return this.smartRerender(
    //                     parentChild,
    //                     child,
    //                     newChild,
    //                     true
    //                 );

    //             console.log("rerender", child, newChild, "not equal");

    //             parent.replaceChild(newChild, child);
    //         });

    //         return;
    //     }

    //     parent.childNodes.forEach((parentChild) => {
    //         if (!parentChild.isEqualNode(actualElement)) return;

    //         parentChild.childNodes.forEach((child, i) => {
    //             const newChild = newElement.childNodes.item(i).cloneNode(true);

    //             if (newChild === null || child == null) return;

    //             console.log("child", child, newChild, "before equal");

    //             if (child.isEqualNode(newChild)) return;

    //             if (child.hasChildNodes())
    //                 return this.smartRerender(
    //                     parentChild,
    //                     child,
    //                     newChild,
    //                     true
    //                 );

    //             console.log("rerender", child, newChild, "not equal");

    //             parentChild.replaceChild(newChild, child);
    //         });
    //     });
    // }

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
        const id = Math.random().toString(36).substring(7);

        this.setId(actualElement, id);

        parent.appendChild(actualElement);

        elementFun.prototype.state.addListener(
            "el",
            (newElement: HTMLElement) => {
                console.log("rerender", id);

                this.setId(newElement, id);
                this.handleFragmentRerender(parent, newElement, id);

                if (!(newElement instanceof DocumentFragment)) {
                    // this.smartRerender(parent, actualElement, newElement);
                    parent.replaceChild(newElement, actualElement);
                }

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
