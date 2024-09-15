export {}; // This file needs to be a module

declare global {
	namespace JSX {
		type Element = HTMLElement;

		// type ComponentElement = () => HTMLElement;

		// interface ElementClass extends HTMLElement {}
		interface UIElement extends ElementChildrenAttribute, Partial<GlobalEventHandlers> {
			[key: string]: any;
			className?: string;
		}
		interface ElementChildrenAttribute {
			children?:
				| JSX.IntrinsicElements[keyof JSX.IntrinsicElements]
				| string
				| number;
		}
		type IntrinsicElements = {
			[elemName in
				| keyof HTMLElementTagNameMap
				| keyof customElements]: UIElement;
		};
	}
}

interface customElements {
	fragment: any;
}


