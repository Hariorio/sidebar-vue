const Dotenv = require('dotenv-webpack');

module.exports = {
  publicPath: '/',
  transpileDependencies: ["vuetify"],
  configureWebpack: {
    plugins: [new Dotenv()]
  },
  transpileDependencies: ["vuetify", "sweet-alert-vuetify"],
  // devServer: {
  //   proxy: {
  //     '/viva-app': {
  //       target: 'https://svr02.kencana.org/jalan_api_viva'
  //     },
  //   }
  // }
  
};
