import { defineConfig, PluginOption } from "vite";
import { ReverVitePlugin } from "reverui"

export default defineConfig({
    plugins: [
        ReverVitePlugin as PluginOption
    ],
});
