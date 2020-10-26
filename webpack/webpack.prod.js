const {merge} = require('webpack-merge');
const path= require('path')
const common = require('./webpack.common.js')
const webpack  = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports=merge(common,{
    mode:'production',
    optimization:{  //设置chunks  代码分割
        splitChunks:{
            chunks:'all',
            minChunks:1, //设置如果一个文件多余1次被多次引用，就只引用一次
        }
    },
    plugins:[
        new UglifyJsPlugin()
    ]
})