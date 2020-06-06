/*
 * @Author: your name
 * @Date: 2020-06-01 21:54:25
 * @LastEditTime: 2020-06-01 22:32:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \俄罗斯方块\TetrisGame\webpack.config.js
 */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "script/bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./template/index.html"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [{
            test: /\.ts$/,
            loader: "ts-loader"
        }]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
}