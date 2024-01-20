import { defineConfig } from "vite";
import UIPlugin from "./internal/vite/plugin"

export default defineConfig({
    esbuild: {
        jsxInject: `import UI from "@UI";\n`,
        jsxFactory: "UI.createElement",
        jsxFragment: "UI.Fragment",
        jsxImportSource: "@UI",
    },
    resolve: {
        alias: {
            "@UI": "/internal/UI.ts",
            "@UIElements": "/internal/UIElements.tsx",
            "@UIFunctions": "/internal/UIFunctions.ts",
            "@UIFunctions_internal": "/internal/UIFunctions_internal.ts",
        },
    },
    plugins: [
        UIPlugin
    ],
});
