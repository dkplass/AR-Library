const name = defaultSettings.title || "AR Library";

module.exports = {
  publicPath: "/ar_library/",
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
