const isProduction = process.argv.indexOf("production") !== -1;
const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const isDevelopment = !isProduction;
const distPath = path.join(__dirname, '/dist');


const config = {
    entry: {
        main: './index.tsx',
        admin: './admin.tsx'
    },
    mode: isDevelopment ? "development" : "production",
    output: {
        filename: '[name][hash].js',
        path: distPath
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".less"],
        alias: {
            'react': 'preact-compat',
            'react-dom': 'preact-compat',
            // Not necessary unless you consume a module using `createClass`
            'create-react-class': 'preact-compat/lib/create-react-class',
            // Not necessary unless you consume a module requiring `react-dom-factories`
            'react-dom-factories': 'preact-compat/lib/react-dom-factories'
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: [{
                    loader: 'ts-loader'
                }]
            },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader'
            }]
        }, {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
                isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader',
            ]
        }, {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'images/[name][hash].[ext]'
                }
            }
            ],
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name][hash].[ext]'
                }
            },
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name][hash].css',
            chunkFilename: '[id][hash].css'
        }),
        new HtmlWebpackPlugin({
            chunks: ["main"],
            template: './index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ["admin"],
            template: './index.html',
            filename: 'odmen.html'
        }),
        new webpack.EnvironmentPlugin({
            "API_URL": isProduction ? "https://svrjpymwp5.execute-api.us-east-1.amazonaws.com/dev" : "http://localhost:3000"
        }),
        new CopyWebpackPlugin([
            {
                from: "_redirects",
                to: "",
                toType: "dir",
            }
        ])
    ],
    optimization: isProduction ? {
        minimizer: [
            new UglifyJsPlugin({
                sourceMap: false,
                uglifyOptions: {
                    compress: {
                        inline: false,
                        drop_console: true
                    },
                },
            }),
        ],
        splitChunks: {
            chunks: "all",
            minSize: 0,
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: 1
                }
            }
        }
    } : {},
    devServer: {
        contentBase: distPath,
        port: 9000,
        compress: true,
        open: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\/odmen/, to: '/odmen.html'},
                { from: /^\/.*/, to: '/index.html'}
            ]
        }
    }
};

module.exports = config;
