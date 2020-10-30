
const {merge} = require('webpack-merge');
const path= require('path')
const common = require('./webpack.common.js')
const webpack  = require('webpack')


// ---------------------开启多进程的压缩js代码
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports=merge(common,{
    mode:'development',  //生产环境
    devServer:{  //开启本地服务器
        contentBase:'./dist',
        hot:true
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                use:[
                     /* 
                    开启多进程打包。 
                    进程启动大概为600ms，进程通信也有开销。
                    只有项目超级大，才需要多进程打包
                  */
                  {
                    loader: 'thread-loader',
                    options: {
                      workers: 2 // 进程2个
                    }
                  },
                ],
                     // 排除 node_modules 目录下的文件
                 exclude: /node_modules/
            }
        ],
    },

    plugins:[
        new webpack.NamedChunksPlugin(),  //给打包的模块，命名的
        new webpack.HotModuleReplacementPlugin(), //启动热更新 
        
         // 使用 ParallelUglifyPlugin 并行压缩输出JS代码
    new ParallelUglifyPlugin({
        // 传递给 UglifyJS的参数如下：
        uglifyJS: {
          output: {
             //是否输出可读性较强的代码，即会保留空格和制表符，默认为输出，为了达到更好的压缩效果，可以设置为false
            beautify: false,
             //是否保留代码中的注释，默认为保留，为了达到更好的压缩效果，可以设置为false
            comments: false
          },
          compress: {
             //是否在UglifyJS删除没有用到的代码时输出警告信息，默认为输出，可以设置为false关闭这些作用不大的警告
            warnings: false,
            // 是否删除代码中所有的console语句，默认为不删除，开启后，会删除所有的console语句
            drop_console: true,
             //是否内嵌虽然已经定义了，但是只用到一次的变量，比如将 var x = 1; y = x, 转换成 y = 5, 默认为不转换，为了达到更好的压缩效果，可以设置为false
            collapse_vars: true,
             //是否提取出现了多次但是没有定义成变量去引用的静态值，比如将 x = 'xxx'; y = 'xxx'  转换成
             //var a = 'xxxx'; x = a; y = a; 默认为不转换，为了达到更好的压缩效果，可以设置为false
            reduce_vars: true
          }
        }
      }),
 
    ] 
})