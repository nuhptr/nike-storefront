import { fileURLToPath } from "node:url"
import { defineConfig } from "astro/config"
import react from "@astrojs/react"
import tailwindcss from "@tailwindcss/vite"

/**
 * Astro 7 configuration for Nike Storefront.
 * Registers the React islands integration, Tailwind CSS v4 Vite plugin,
 * and explicit Vite path aliases mirroring `tsconfig.json`.
 */
export default defineConfig({
    integrations: [react()],
    vite: {
        plugins: [/** @type {any} */ (tailwindcss())],
        resolve: {
            alias: {
                "@models": fileURLToPath(new URL("./src/models", import.meta.url)),
                "@viewmodels": fileURLToPath(new URL("./src/viewmodels", import.meta.url)),
                "@views": fileURLToPath(new URL("./src/views", import.meta.url)),
                "@styles": fileURLToPath(new URL("./src/styles", import.meta.url)),
                "@": fileURLToPath(new URL("./src", import.meta.url)),
            },
        },
    },
})
