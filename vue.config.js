module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://www.goaladdin.org/',
                secure: false,
                changeOrigin: true,
                pathRewrite: {}
            },
            '/home/': {
                target: 'http://www.goaladdin.org/',
                secure: false,
                changeOrigin: true,
                pathRewrite: {}
            },
        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import "~@/assets/css/config.scss";`
            },
            postcss: {
                // options here will be passed to postcss-loader
                plugins: [require('postcss-px2rem')({
                          remUnit: 100
                })]
           }
        }
        
    },
}