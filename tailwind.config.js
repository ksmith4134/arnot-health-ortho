const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */

module.exports = {
    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',

        // Or if using `src` directory:
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                arnotBlue: '#437FB8',
                arnotLightBlue: '#47ADC5',
                arnotTeal: '#3EB0B0',
                arnotPeach: '#E69886',
                arnotYellow: '#FFBB00',
                arnotRed: '#BF2B2B',
                arnotBrown: '#8A4A3B',
                arnotDarkBrown: '#4B1A0E',
            },
            fontFamily: {
                sans: ['var(--font-openSans)', ...fontFamily.sans],
            },
            typography: (theme) => ({
                DEFAULT: {
                  css: {
                    '--tw-prose-bullets': 'text-black',
                  },
                },
            }),
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/line-clamp'),
    ],
};
