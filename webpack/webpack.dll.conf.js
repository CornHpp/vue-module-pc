//DLLPlugin插件提前打包的文件，
//专门用来吧vue文件，提前打包，这样每次打包的时候，不需要重新打包，提升打包速度

const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');
const DllPlugin = require('webpack/lib/DllPlugin')
const path = require('path');
const webpack = require('webpack');
module.exports = {
  mode:'development',
  entry: {
    vendor: [
    'vue/dist/vue.esm.js',
    'vue-router',
    'vuex',
    'babel-polyfill' //提前打包一些基本不怎么修改的文件
    ]
  },
  output: {
    path: path.join(__dirname, '../static/js'), //放在项目的static/js目录下面
    filename: '[name].dll.js', //打包文件的名字
    library: '[name]_library' //可选 暴露出的全局变量名
    // vendor.dll.js中暴露出的全局变量名。
    // 主要是给DllPlugin中的name使用，
    // 故这里需要和webpack.DllPlugin中的`name: '[name]_library',`保持一致。
  },
  plugins: [
    new DllPlugin({
      path: path.join(__dirname,  '../static/js', '[name]-manifest.json'), //生成上文说到清单文件，放在当前build文件下面，这个看你自己想放哪里了。
      name: '[name]_library'
    }), 



    //压缩 只是为了包更小一点 
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
};
