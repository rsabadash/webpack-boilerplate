const path = require('path');
const webpackMerge = require('webpack-merge');
const modeConfig = mode => require(`./webpack/webpack.${mode}`)();
const TerserJSPlugin = require('terser-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

const fileName = (extension) => isDevelopment ? `[name].${extension}` : `[name].[contenthash].${extension}`;
const moduleIdsValue = isDevelopment ? 'named' : 'hashed';

module.exports = () => {
	return webpackMerge(
		{
			context: path.resolve(__dirname, 'src'),
			entry: './index.js',
			output: {
				filename: fileName('js'),
				chunkFilename: fileName('js'),
				path: path.resolve(__dirname, 'dist')
			},
			resolve: {
				extensions: ['.js', '.json', '.jsx']
			},
			optimization: {
				moduleIds: moduleIdsValue,
				runtimeChunk: 'single',
				// splitChunks: {
				// 	cacheGroups: {
				// 		defaultVendors: {
				// 			test: /[\\/]node_modules[\\/]/,
				// 			name: 'vendors',
				// 			chunks: 'all'
				// 		}
				// 	}
				// },
				minimizer: [
					new TerserJSPlugin(),
					new OptimizeCSSAssetsPlugin()
				]
			},
			module: {
				rules: [
					{
						test: /\.(js|jsx)$/,
						exclude: [/node_modules/, /webpack/],
						use: [
							{
								loader: 'babel-loader'
							}
						]
					},
					{
						test: /\.(png|jpg|svg)$/,
						use: ['file-loader']
					},
					{
						test: /\.(ttf|woff|woff2|eot)$/,
						use: ['file-loader']
					}
				]
			},
			plugins: [
				new HTMLWebpackPlugin({
					template: './index.html'
				}),
				new CleanWebpackPlugin(),
				// new CopyWebpackPlugin([
				// 	{
				// 		from: '',
				// 		to: ''
				// 	}
				// ]),
				new MiniCSSExtractPlugin({
					filename: fileName('css'),
					chunkFilename: fileName('css')
				})
			]
		},
		modeConfig(process.env.NODE_ENV)
	)
};
