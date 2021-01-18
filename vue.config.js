const path = require("path");
const webpack = require("webpack");

function resolveSrc(_path) {
	return path.join(__dirname, _path);
}
// vue.config.js
module.exports = {
	lintOnSave: true,
	devServer: {
		port: 8080
	},
	publicPath: "/work-scheduler-web/",
	configureWebpack: {
		resolve: {
			alias: {
				"src": resolveSrc("src"),
				"assets": resolveSrc("src/assets"),
				"chart.js": "chart.js/dist/Chart.js"
			}
		},
		plugins: [
			new webpack.optimize.LimitChunkCountPlugin({
				maxChunks: 6
			})
		]
	},
	css: {
		sourceMap: process.env.NODE_ENV !== "prod"
	}
};
