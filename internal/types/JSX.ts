export {}; // This file needs to be a module

declare global {
    namespace JSX {
        interface Element extends HTMLElement {}
        interface ElementClass extends HTMLElement {}
        interface ElementAttributesProperty {
            props: any;
        }
        interface ElementChildrenAttribute {
            children: {};
        }
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    }
}
