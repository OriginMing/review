
const {
    CleanWebpackPlugin,
  } = require("clean-webpack-plugin");

 console.log('prod');
 const MiniCssExtractPlugin = require("mini-css-extract-plugin")
module.exports = {
    mode:'production',
    plugins:[new CleanWebpackPlugin({}),  
        new MiniCssExtractPlugin({filename:"css/[name].[hash:8].css"})],
} 