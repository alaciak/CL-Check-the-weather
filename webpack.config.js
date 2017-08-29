//Konfiguracja Webpack
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry : {
        'js/out.js': './js/components/App.jsx',
        'css/out.css~': './scss/style.scss'
    },
    output : {
        path: __dirname+'/',
        filename: '[name]'
    },
  devServer: {
    inline: true,
    contentBase: './',
    port: 3001
  },
  watch: true,
  module: {
    loaders: [{
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-2', 'react']
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
                 fallback: 'style-loader',
                 use: ['css-loader', 'resolve-url-loader', 'sass-loader']
             })
      },
      {
            test: /\.jpg$/,
            loader: 'file-loader',
            query: {
                name: '../img/[name].[ext]'
            }
        }
    ],
  },
  plugins: [
    new ExtractTextPlugin("./css/styles.css")
  ]
};
