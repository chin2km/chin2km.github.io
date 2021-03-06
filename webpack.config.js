/* eslint-disable */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { resolve } = require("path");

module.exports = {
    entry: ["./src/index.tsx"],
    output: {
        path: resolve(process.cwd(), 'dist'),
        publicPath: "/",
        filename: "[name].[contenthash].js",
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: false,
            template: "./src/view/template.ejs",
            mobile: true,
            title: "built by chin2km",
            meta: [
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1",
                },
                {
                    name: "theme-color",
                    content: "rgb(27, 27, 27)",
                },
            ],
            links: [
                "https://fonts.googleapis.com/css?family=Ubuntu&display=swap",
                {
                    href: "/manifest.json",
                    rel: "manifest",
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
        new WorkboxPlugin.GenerateSW({
            clientsClaim: true, // => this allows to control the page by SW on first load itself
            skipWaiting: true, // => this allows to activate the SW without waiting when user revisits
            cleanupOutdatedCaches: true, // => cleanup outdated cached entries
            /**
             * exclude all non `js` files from here. A runtime cache strategy is added for relevant assets below.
             */
            exclude: [/\.(?:svg|png|jpg|jpeg|txt|json|js.map|css.map)$/],
            /**
             * use additionalManifestEntries to include paths which are not part of assets/loadableassets.json
             */
            additionalManifestEntries: [
                { url: '/app-shell', revision: `${Math.random()}` },
            ],
            /**
             * navigateFallback is needed for Navigate events, it provides a fallback UI when offline/reload.
             * This has to be a path already included in the precache manifest
             */
            navigateFallback: '/app-shell',
            /**
             * runtimeCaching is responsible for caching static assets at runtime
             */
            runtimeCaching: [
                {
                    urlPattern: /\.(?:svg|png|jpg|jpeg|woff2)$/,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'chin2km-static-assets',
                        expiration: {
                            maxAgeSeconds: 24 * 60 * 60 * 30, // => 30 days, images would never change.
                        },
                    },
                },
            ],
            mode: 'logs'
        }),
        new CopyWebpackPlugin([
            {
                from: "public",
                to: ".",
            },
            {
                from: "src/images",
                to: "images",
            },
        ]),
        new CompressionPlugin({
            algorithm: "gzip",
            compressionOptions: { level: 9 },
            test: /\.(js|css)$/,
            cache: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    "css-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    devServer: {
        contentBase: ".",
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true,
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false,
                },
            }),
        ],
    },
};

/* eslint-enable */
