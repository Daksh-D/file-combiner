module.exports = {
    output: 'export',
    webpack(config) {
      config.module.rules.push({
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              publicPath: '/_next/static/media/',
              outputPath: 'static/media/',
              name: '[name].[hash].[ext]',
            },
          },
        ],
      });
      return config;
    },
  }