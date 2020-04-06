const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = !isDevelopment;

const optimization = () => {
	const config = {};

	if (isProduction) {
		config.minimizer = [
			new TerserJSPlugin({}),
			new OptimizeCSSAssetsPlugin({})
		]
	}

	return config;
};

const fileName = (extension) => isDevelopment ? `[name].${extension}` : `[name].[contenthash].${extension}`;
const cssClassesName = isDevelopment ? '[name]__[local]' : '[name]__[hash:base64:5]';
const sourceMapType = isDevelopment ? 'cheap-module-source-map' : 'none';
// const styleLoaders = (loader) => {
// 	const loaders = [
// 		{
// 			loader: MiniCSSExtractPlugin.loader,
// 			options: {
// 				hmr: isDevelopment
// 			}
// 		},
// 		{
// 			loader: 'css-loader',
// 			options: {
// 				modules: {
// 					localIdentName: cssClassesName,
// 				},
// 				sourceMap: isDevelopment
// 			},
// 		},
// 	];
//
// 	if (loader) {
// 		loaders.push(loader);
// 	}
//
// 	return loaders;
// };

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: './index.js',
	output: {
		filename: fileName('js'),
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: ['.js', '.json', '.jsx']
	},
	devServer: {
		port: 4200,
		hot: isDevelopment
	},
	devtool: sourceMapType,
	optimization: optimization(),
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader'
					}
				]
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCSSExtractPlugin.loader,
						options: {
							hmr: isDevelopment
						}
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: cssClassesName,
							},
							sourceMap: isDevelopment
						},
					}
				]
			},
			{
				test: /\.s[ac]ss$/,
				use: [
					{
						loader: MiniCSSExtractPlugin.loader,
						options: {
							hmr: isDevelopment
						}
					},
					{
						loader: 'css-loader',
						options: {
							modules: {
								localIdentName: cssClassesName,
							},
							sourceMap: isDevelopment
						},
					},
					'sass-loader'
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
			filename: fileName('css')
		})
	]
};
