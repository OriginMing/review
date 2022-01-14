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
    },
    devServer:{
        open:true
    }
}