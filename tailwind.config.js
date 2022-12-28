/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./content/**/*.json",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sans': ['Font', 'Helvetica', 'sans-serif'],
                'body': ['Font', 'Helvetica', 'sans-serif'],
            },
            aspectRatio: {
                '2/3': '2 / 3',
            },

            transitionProperty: {
                'height': 'height',
            }
        },
    }
}
