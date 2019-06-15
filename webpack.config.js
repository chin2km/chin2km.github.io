var HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: "./src/index.tsx",
    output: {
        path: __dirname,
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
                    content: "rgb(27, 27, 27, 0.90)",
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
        new WorkboxPlugin.GenerateSW(),
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
