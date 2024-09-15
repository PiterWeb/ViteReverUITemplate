import { defineConfig } from "vite";
import UIPlugin from "./internal/vite/plugin"

export default defineConfig({
    plugins: [
        UIPlugin
    ],
});
