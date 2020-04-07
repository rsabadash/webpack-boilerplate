const BrotliPlugin = require('brotli-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
	return {
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/,
					use: [
						{
							loader: MiniCSSExtractPlugin.loader
						},
						{
							loader: 'css-loader',
							options: {
								modules: {
									localIdentName: '[name]__[hash:base64:5]',
								}
							},
						},
						'postcss-loader',
						'sass-loader'
					]
				},
			]
		},
		plugins: [
			new CompressionPlugin({
				filename: '[path].gz[query]',
				algorithm: 'gzip',
				test: /\.js$|\.css$|\.html$/,
				threshold: 10240,
				minRatio: 0.8
			}),
			new BrotliPlugin({
				asset: '[path].br[query]',
				test: /\.js$|\.css$|\.html$/,
				threshold: 10240,
				minRatio: 0.8
			})
		]
	}
};
