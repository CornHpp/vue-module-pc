//webpack的公用配置
const path = require('path')
//每次重新打包后，清楚dist的目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
//生成一个html的模板的插件 
const htmlWebpackPlugin = require('html-webpack-plugin');
//解析vue文件的必须要的loader
const {VueLoaderPlugin}  = require('vue-loader')
module.exports={
    //打包入口
    entry:{
        main:'../src/main.js'
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
                test:'/\.css/$',  //解析.css文件
                use:["style-loader","css-loader"]
            },
            {
                test:'/\.vue/$',   //解析.vue文件
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
                test:'/\.js/$',
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
    pulgins:[
        new CleanWebpackPlugin(),
        new htmlWebpackPlugin({
            template:'../src/public/index.html', //声明html文件的模板
            filename:'index.html'
        }),
        new VueLoaderPlugin()
    ],

    resolve:{
        alias:{
            vue$:"vue/dist/vue.esm.js",  //必须要写，用来解析vue文件的
            "@":'src'
        }
    }
    

}