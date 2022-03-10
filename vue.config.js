const proxyConfig = {
    // 开发环境，本地代理
    development: {
        '/api': {
            target: 'http://192.168.2.119:5668',
            changeOrigin: true,
            secure: false, //如果是http接口，需要配置该参数
            // pathRewrite:{
            //     '/api':''
            // }
            timeout: 3600000,
        },
    },
    // 生产环境，在线代理
    production: {
        '/api': {
            target: 'http://192.168.35.43:9091',
            changeOrigin: true,
            secure: false, //如果是http接口，需要配置该参数
            // pathRewrite:{
            //     '/api':''
            // }
            timeout: 600000,
        },
        '/ai': {
            target: 'http://192.168.2.19:6060',
            changeOrigin: true,
            secure: false, //如果是http接口，需要配置该参数
            pathRewrite: {
                '/ai': ''
            },
            timeout: 3600000,
        },
    },
}

module.exports = {
    // baseUrl: './',   //cli3.3取消 使用publicPath
    // publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
    //部署应用包时的基本 URL
    publicPath: './',
    assetsDir: 'static',
    //Default: true 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
    productionSourceMap: false,

    devServer: {
        open: true,//设置自动打开
        host: '192.168.2.106',
        port: 9999,//设置端口
        proxy: proxyConfig[process.env.NODE_ENV]
    },

    //是否在保存时用eslint检查
    lintOnSave: false,

    //用于多页配置，默认是 undefined
    // pages: {
    //     index: {
    //         // page 的入口文件
    //         entry: 'src/index/main.js',
    //         // 模板文件
    //         template: 'public/index.html',
    //         // 在 dist/index.html 的输出文件
    //         filename: 'index.html',
    //         // 当使用页面 title 选项时，
    //         // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
    //         title: 'Index Page',
    //         // 在这个页面中包含的块，默认情况下会包含
    //         // 提取出来的通用 chunk 和 vendor chunk。
    //         chunks: ['chunk-vendors', 'chunk-common', 'index']
    //     },
    //     // 当使用只有入口的字符串格式时，
    //     // 模板文件默认是 `public/subpage.html`
    //     // 如果不存在，就回退到 `public/index.html`。
    //     // 输出文件默认是 `subpage.html`。
    //     subpage: 'src/subpage/main.js'
    // },

    // CSS 相关选项
    // css: {
    //     // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    //     // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    //     extract: true,
    //     // 是否开启 CSS source map？
    //     sourceMap: false,
    //     // 为预处理器的 loader 传递自定义选项。比如传递给
    //     // Css-loader 时，使用 `{ Css: { ... } }`。
    //     loaderOptions: {
    //         css: {
    //             // 这里的选项会传递给 css-loader
    //         },
    //         postcss: {
    //             // 这里的选项会传递给 postcss-loader
    //         }
    //     },
    //     // 为所有的 CSS 及其预处理文件开启 CSS Modules。
    //     // 这个选项不会影响 `*.vue` 文件。
    //     modules: false
    // },

    pwa: {},

    // 三方插件的选项
    pluginOptions: {
        // ...
    }
}
