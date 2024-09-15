export {}; // This file needs to be a module

declare global {
	namespace JSX {
		interface Element extends HTMLElement {
            props: ElementAttributesProperty
        }
		interface ElementClass extends HTMLElement {}
		interface ElementAttributesProperty {
                [key: string]: any
                className: string
		}
		interface ElementChildrenAttribute {
			children: any
		}
		type IntrinsicElements = {
			[elemName in (keyof HTMLElementTagNameMap | keyof customElements)]: any;
		};
	}
}

interface customElements {
	fragment: any;
}
