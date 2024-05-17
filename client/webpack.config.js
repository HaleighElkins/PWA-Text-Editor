const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    // HAd to move these two files to the main client folder. I had so many bugs trying to run via the src folder. I kept getting errors after errors. 
    main: './index.js', 
    install: './install.js' 
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'client'), // Updated path to the client directory. I had to move the main.bundle.js to the client folder. Had so so so many bugs trying to run through other folders.
  },  
  
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // Path to the HTML template file
      title: 'Text Editor'
    }),
    new InjectManifest({
      swSrc: './src-sw.js', // Path to the service worker file
      swDest: 'sw.js',
    }),
    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'Text Editor',
      short_name: "Jate",
      description: 'Editing Text!',
      background_color: '#4600BB',
      theme_color: '#4600BB',
      start_url: './',
      publicPath: './',
      icons: [
        {
          src: './src/images/logo.png', // Path to the logo image
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
          },
        },
      },
    ],
  },
};
