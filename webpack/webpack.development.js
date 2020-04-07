const webpack = require('webpack');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
	return {
		devServer: {
			port: 4200,
			hot: true,
			stats: {
				colors: true
			},
			// writeToDisk: true
		},
		devtool: 'cheap-module-source-map',
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/,
					use: [
						{
							loader: MiniCSSExtractPlugin.loader,
							options: {
								hmr: true
							}
						},
						{
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName: '[name]__[local]',
								},
								sourceMap: true
							},
						},
						'sass-loader'
					]
				},
			]
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	}
};
