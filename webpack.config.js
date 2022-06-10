const path = require("path");

var config = {
	mode: "development",
	devtool: "cheap-module-source-map",
	module: {
		rules: [
			{
				test: /\.s[ac]ss$/i,
				use: [
					// Creates `style` nodes from JS strings
					"style-loader",
					// Translates CSS into CommonJS
					"css-loader",
					// Compiles Sass to CSS
					"sass-loader",
				],
			},
		]
	}
};

var optionsConfig = Object.assign({}, config, {
	mode: "development",
	entry: "./src/js/options.js",
	output: {
		filename: "options.js",
		path: path.resolve(__dirname, "build"),
	},
});

var popupConfig = Object.assign({}, config, {
	mode: "development",
	entry: "./src/js/popup.js",
	output: {
		filename: "popup.js",
		path: path.resolve(__dirname, "build"),
	},
});

module.exports = [
	optionsConfig, popupConfig,       
];
