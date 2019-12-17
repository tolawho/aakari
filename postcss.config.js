module.exports = {
    plugins: [
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