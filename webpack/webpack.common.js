//webpack的公用配置
const path = require('path')
//每次重新打包后，清楚dist的目录
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
//生成一个html的模板的插件 
const htmlWebpackPlugin = require('html-webpack-plugin');
//解析vue文件的必须要的loader
const VueLoaderPlugin  = require('vue-loader/lib/plugin')
//压缩css的文件用的，
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
//抽离css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports={
    //打包入口
    entry:{
        main:'./src/main.js'
    },
    //打包出口
    output:{
        filename:'[name].js',   //打包的文件名
        path:path.resolve(__dirname,'dist'),  //打包的文件路径
    },  
    //公用的module
    module:{
        rules:[
            {
                test:/\.css$/,  //解析.css文件
                use:[MiniCssExtractPlugin.loader,"css-loader","postcss-loader"]
            },
            {
                test:/\.vue$/,   //解析.vue文件
                use:['vue-loader']
            },
            {
                test:'/\.(png|gif|jpg|jpeg|tff)/$',
                use:[{
                    loader:'url-loader',
                    options:{
                        limit:10000, //小于10000兆字节的会被转化为base64，
                        name:'[name].[ext]',  //转化的名字
                        outputPath:'assets/img',  //把图片放到哪个文件夹下
                        publicPath:'',  //配置第三方cdn的第三方地址
                    }
                }]
            },
            {
                test:/\.js$/,
                use:[
                    {
                        loader:'bebal-loader',
                        options:{
                            presets:['env']
                        }
                    },
                ],
                include:[   //只解析src下面的js文件，减少打node_modules
                    path.resolve(__dirname,'src')
                ]
            }
        ]
    },
    //公用plugins
    plugins:[
        new OptimizeCssAssetsWebpackPlugin(),  //压缩css文件
        new CleanWebpackPlugin(),  //每次打包的时候，删除上一次的dist文件
        new htmlWebpackPlugin({
            template:'public/index.html', //声明html文件的模板
            filename:'index.html'
        }),
        new VueLoaderPlugin(),//vue的plugin
        new MiniCssExtractPlugin()  //从js的代码中分离css代码出来
    ],

    resolve:{
        alias:{
            vue$:"vue/dist/vue.esm.js",  //必须要写，用来解析vue文件的
            "@":'src'
        }
    },
    devtool:"cheap-inline-source-map", //打开可以让我知道，我们哪个地方代码写错了
    devServer:{  //配置 webpack的服务器webpack-dev-server功能
        contentBase:'./dist',  //打开是哪个文件夹下的index.html
        open:false,  //设置是否自动打开浏览器
        hot:true,  //设置热更新
    }
}