
const {merge} = require('webpack-merge');
const path= require('path')
const common = require('./webpack.common.js')
const webpack  = require('webpack')
module.exports=merge(common,{
    mode:'development',  //生产环境
    devServer:{  //开启本地服务器
        contentBase:'./dist',
        hot:true
    },
    plugins:[
        new webpack.NamedChunksPlugin(),  //给打包的模块，命名的
        new webpack.HotModuleReplacementPlugin() //启动热更新 
    ] 
})