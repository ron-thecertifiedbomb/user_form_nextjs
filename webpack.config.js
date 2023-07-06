const path = require('path');

module.exports = {
  entry: {
    shoppingCart: './shopping-cart-api/shoppingCart.js',
    app: './shopping-cart-api/app.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    fallback: {
      stream: require.resolve('stream-browserify'),
      async_hooks: require.resolve('async_hooks'),
      path: require.resolve('path-browserify'),
      fs: false,
      util: require.resolve('util/'), url: require.resolve('url/'),
      querystring: require.resolve('querystring-es3')
    }
  }
};
