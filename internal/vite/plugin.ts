import type { PluginOption } from "vite";
import { getJSXElementName, replaceSpecialFunctions, replaceImport, replaceSignalHTMLElement } from "./transform";
import configHandler from "./config";

export default {
	name: "ui-proccessor",
	transform(code: string, id: string) {
		if (!id.includes("tsx") && !id.includes("jsx")) return;

		const name = getJSXElementName(code);

		let newCode = replaceSpecialFunctions(code, name);

		newCode = replaceImport(newCode);

		console.log(newCode);

		// console.log(newCode);
		newCode = replaceSignalHTMLElement(newCode);

		return {
			code: newCode,
			map: null,
		};
	},
	version: "0.1.0",
	config: {
		handler: configHandler
	},
} as PluginOption;


