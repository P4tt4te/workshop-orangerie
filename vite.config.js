import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue2 from '@vitejs/plugin-vue2'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue2(),
        legacy({
            targets: ['ie >= 11'],
            additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
        }),
    ],
    assetsInclude: [
        'src/assets/img/splash/*.png',
        'src/assets/paintings/**/*.jpeg',
        'src/assets/paintings/**/stickers/*.png',
    ],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
                  @import "./src/assets/scss/_colors.scss";
                  @import "./src/assets/scss/_fonts.scss";
                  @import "./src/assets/scss/_utils.scss";
                `,
            },
        },
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
    build: {
        commonjsOptions: { include: [] },
    },
    optimizeDeps: {
        disabled: false,
    },
})
