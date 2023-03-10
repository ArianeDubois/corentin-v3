export default {
    // Target: https://go.nuxtjs.dev/config-target

    target: 'static',
    router: {
        base: '/corentin-corneau'
    },
    actions: {
        async nuxtServerInit({ dispatch }) {
            await dispatch('core/load')
        }
    },
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'corentin',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
        '@/assets/css/main.css',
    ],
    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        // https://go.nuxtjs.dev/tailwindcss
        // https://tailwindcss.com/docs/guides/nuxtjs
        '@nuxt/postcss8',
        ['@nuxt/image', {
            provider: 'static',
        }],
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxt/image',
    ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        standalone: true,
        postcss: {
            plugins: {
                'tailwindcss/nesting': {},
                tailwindcss: {},
                autoprefixer: {},
            },
        },
    },

    image: {
        screens: {
            xs: 320,
            sm: 640,
            md: 768,
            lg: 1024,
            xl: 1280,
            xxl: 1536,
            '2xl': 1536
        },
    }
}
