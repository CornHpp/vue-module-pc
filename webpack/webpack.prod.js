const {merge} = require('webpack-merge');
const path= require('path')
const common = require('./webpack.common.js')
const webpack  = require('webpack')
// 压缩js
const TerserPlugin = require('terser-webpack-plugin');

module.exports=merge(common,{
    mode:'production',
    optimization:{  //设置chunks  代码分割
        splitChunks:{ 
            chunks:'all',  //设置为all代表分离公共代码和第三方代码，
            minChunks:1, //设置如果一个文件多余1次被多次引用，就只引用一次

            // 缓存分组
            cacheGroups: {
                vendors: {  //自定义打包模块
                    test: /[\\/]node_modules[\\/]/, 
                    priority: 1, //优先级，先打包到哪个组里面，值越大，优先级越高
                    filename: 'vendors.js',
                    minChunks:1 //最少复用几次
                  },

                  //抽离出来的公共模块
                common:{
                    name:'common',  //chunk的名称
                    priority:0, //优先级
                    minChunks:2 //公共模块最少复用过几次
                }
            },
          
        },
      
        // 压缩js  //基本配置https://github.com/webpack-contrib/terser-webpack-plugin
        minimizer: [
            // new TerserPlugin({
            // // parallel: true,  //启动多进程打包
            // // parallel: 4,  //设置进程的进程数
            // // extractComments: true,  //删除我们在js代码中写的注释
            // })
        ],
        
    },
})