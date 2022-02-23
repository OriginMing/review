module.exports = {
    configureWebpack:(config)=>{
        config.module.rules.push(
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
        )
        config.module.rules.push(
            {
                test:  /\.(png|jpg|gif|jfif)$/,
                exclude: /node_modules/,
                use: {
                    loader: "file-loader",
                }
            }
        )
    },
    devServer:{
        open:true,
        proxy: {
            '': {
              target: 'http://152.136.185.210:4000',
              pathRewrite: {
                '^/api': ''
              },
              changeOrigin: true
            }
          }
    }
}