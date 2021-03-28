module.exports = {
  pwa: {
    workboxPluginMode: 'GenerateSW',
    workboxOptions: {
      navigateFallback: '/',
      runtimeCaching: [

      ]
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000/',
        ws: true,
        changeOrigin: true,
        pathRewrite: { '^/api': '/' }
      }
    }
  }
}
