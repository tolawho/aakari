module.exports = {
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        require('@fullhuman/postcss-purgecss')({
            content: [ './**/*.hbs' ],
            whitelist: [
                'fixed-top'
            ]
        }),
        require('cssnano')
    ]
};