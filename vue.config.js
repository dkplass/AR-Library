const name = "AR Library";

module.exports = {
  publicPath: "/library.web/",
  configureWebpack: {
    name
  }
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: '',
  //       ws: true,
  //       changeOrigin: true,
  //     },
  //   },
  // },
};
