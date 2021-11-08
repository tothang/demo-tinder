const path = require('path');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
const webpack = require('webpack');
const AntdScssThemePlugin = require('antd-scss-theme-plugin');
module.exports = withCss(withSass({
	distDir: '../.dist',
	// useFileSystemPublicRoutes: true,
	webpack: (config, {dev, defaultLoaders, isServer}) => {
		/**
		 * Install and Update our Service worker
		 * on our main entry file :		 * Reason: https://github.com/ooade/NextSimpleStarter/issues/32
		 */
		// const oldEntry = config.entry
		// config.entry = () =>
		// 	oldEntry().then(entry => {
		// 		entry['main.js'] && entry['main.js'].push(path.resolve('./utils/offline'))
		// 		return entry
		// 	})
		//
		// /* Enable only in Production */
		// if (!dev) {
		// 	// Service Worker
		// 	config.plugins.push(
		// 		new SWPrecacheWebpackPlugin({
		// 			cacheId: 'next-ss',
		// 			filepath: './src/static/sw.js',
		// 			minify: true,
		// 			staticFileGlobsIgnorePatterns: [/\.map$/],
		// 			staticFileGlobs: [
		// 				'./src/static/**/*', // Precache all static files by default
		// 			],
		// 			mergeStaticsConfig: false,
		// 			stripPrefix: './src/static/',
		// 			runtimeCaching: [
		// 				// Example with different handlers
		// 				{
		// 					handler: 'fastest',
		// 					urlPattern: /[.](png|jpg|css)/
		// 				},
		// 				{
		// 					handler: 'networkFirst',
		// 					urlPattern: /^http.*/ //cache all files
		// 				}
		// 			]
		// 		})
		// 	)
		// }
		config.module.rules.push({
			test: /\.+(js)$/,
			loader: defaultLoaders.babel,
			include: path.resolve(__dirname, '../src'),
		});
		if (isServer) {
			const antStyles = /antd\/.*?\/style\/css.*?/;
			console.log(config.externals)
			const origExternals = [...config.externals];
			config.externals = [
				(context, request, callback) => {
					if (request.match(antStyles)) return callback();
					if (typeof origExternals[0] === 'function') {
						origExternals[0](context, request, callback)
					} else {
						callback()
					}
				},
				...(typeof origExternals[0] === 'function' ? [] : origExternals),
			];
			config.module.rules.unshift({
				test: antStyles,
				use: 'null-loader',
			});
		}
		config.plugins.push(
			new FilterWarningsPlugin({
				exclude: /mini-css-extract-plugin[^]*Conflicting order between:/,
			}),
		);
		config.plugins.push(
			new AntdScssThemePlugin('./theme.scss'),
		);
		config.plugins.push(
			new webpack.ProvidePlugin({
				'$': 'jquery',
				'jQuery': 'jquery'
			})
		);
		return config
	}
}));
