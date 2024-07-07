const path = require('path');

module.exports = {
  entry: './src/index.js', // Adjust this path if your entry point is different
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      // Add other loaders if necessary
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      "vm": true, // Using an empty module for 'vm'
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
};
