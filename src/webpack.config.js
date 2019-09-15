let path = require("path");
const ExtractCSS = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

let MODE = process.env.WEBPACK_ENV;
let ENTRY_FILE = path.resolve(__dirname, "frontend", "js", "main.js");
let OUTPUT_DIR = path.resolve(__dirname, "static");

let config = {
	entry: ["@babel/polyfill", ENTRY_FILE],
	mode: MODE,
	module: {
		rules: [
			{
				test: /\.(js)$/,
				use: [
					{
						loader: "babel-loader"
					}
				]
			},
			{
				test: /\.(scss)$/,
				use: ExtractCSS.extract([
					{
						loader: "css-loader"
					},
					{
						loader: "postcss-loader",
						options: {
							plugins: () => {
								return [
									autoprefixer({
										overrideBrowserslist: "cover 99.5%"
									})
								];
							}
						}
					},
					{
						loader: "sass-loader"
					}
				])
			}
		]
	},
	output: {
		path: OUTPUT_DIR,
		filename: "[name].js"
	},
	plugins: [new ExtractCSS("styles.css")]
};

module.exports = config;
