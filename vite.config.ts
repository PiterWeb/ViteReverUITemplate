import { defineConfig } from "vite";

export default defineConfig({
    /* Funcionaba solo el inject */
    esbuild: {
        // jsxInject: `import UI from "@UI";\n import UIElement from "@UIElement";`,
        jsxFactory: "UI.createElement",
        jsxFragment: "UI.Fragment",
    },
    resolve: {
        alias: {
            "@UI": "/internal/UI.ts",
            "@UIElements": "/internal/UIElements.tsx",
            "@UIFunctions": "/internal/UIFunctions.ts",
        },
    },
    plugins: [
        {
            name: "ui-proccessor",
            transform(code, id) {
                if (!id.includes("tsx") && !id.includes("jsx")) return;
                console.log(code);
            },
        },
    ],
});
