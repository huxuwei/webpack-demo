#### 简单配置webpack

1、项目初始化并添加webpack

`yarn init -y` or `npm init -y`

`yarn add webpack webpack-cli`

2、添加启动配置并在根目录下新建`webpack.config.js`配置文件

在`package.json`的`scripts`下添加`"build": "webpack"`

此时可以在零配置下启动项目：`yarn build`

3、添加项目入口`Entry`

```
  entry: './src/index.js'
  //多文件入口
  entry: {
    main: './src/index.js',
    test: './src/test/js'
  }
```
4、添加打包出口配置`Output`

- filname：打包后的文件名称,[hash]代表当文件修改时会重新生成hash值，以保证用户请求的一直是最新的文件。
- path：打包的路径，引入node下的path模块，来保证路径的正确。

```
  const Path = require('path')

  output: {
    filname: '[main]_bundle_[hash].js',
    path: Path.join(__dirname, 'dist')
  }
```
5、用`html-webpack-plugin`插件打包html文件。

  安装插件`yarn add html-webpack-plugin`

  - template: 使用的html模块
  - filename: 输出的文件名称
  
  ```
  const HtmlWebpackPlugin = require('html-webpack-plugin')

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ]
  ```

6、使用loader加载样式

安装loader: `yarn add style-loader css-loader`

安装less: `yarn add less less-loader`

安装sass： `yarn add node-sass sass-loader`

```
module: {
  rules: [
    {
      test: /\.css/,
      use: ['style-loader','css-loader']
    },
    {
      test: /\.less/,
      use: ['style-loader','css-loader','less-loader']
    },
    {
      test: /\.scss/,
      use: ['style-loader','css-loader', 'sass-loader']
    }
  ]
}
```

7、用`extract-text-webpack-plugin`提取css为单独文件。
安装`yarn add extract-text-webpack-plugin`

在loader中使用插件
- fallback: 失败时使用的loader 
- use: 使用到的loader

在plugin中：文件名称

```
  const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')


  module: {
    rules: [
      {
        test: /\.css/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        })
      },
      {
        test: /\.less/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        })
      },
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('style.css')
  ]
```



