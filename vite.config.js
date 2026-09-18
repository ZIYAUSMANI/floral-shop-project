import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default {
    root: resolve(__dirname, 'src'),

    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                index: resolve(__dirname, 'src/index.html'),
                account: resolve(__dirname, 'src/account.html'),
                cart: resolve(__dirname, 'src/cart.html'),
                checkout: resolve(__dirname, 'src/checkout.html'),
                login: resolve(__dirname, 'src/login.html'),
                product: resolve(__dirname, 'src/product.html'),
                register: resolve(__dirname, 'src/register.html'),
                shop: resolve(__dirname, 'src/shop.html'),
                wishlist: resolve(__dirname, 'src/wishlist.html')
            }
        }
    },

    server: {
        port: 8080
    },

    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: [
                    'import',
                    'mixed-decls',
                    'color-functions',
                    'global-builtin'
                ]
            }
        }
    }
}