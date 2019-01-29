module.exports = {
    plugins: [
        require('autoprefixer')({
            flexbox: true
        }),
        require('cssnano')({
            preset: 'default',
        })
    ],
};
