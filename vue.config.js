module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',

    }
  },
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://8.138.5.73:10020',
        pathRewrite: { '^/api': '' },
        ws: true,
        changeOrigin: true
      },
      '/newapi': {
        target: 'http://8.134.9.230:8080',
        pathRewrite: { '^/newapi':'' },
        ws: true,
        changeOrigin: true
      }
    }
  }
}
