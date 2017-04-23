const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'),
    port = 9000,
    rootPath = path.join(__dirname, '../'),
    outputPath = path.join(rootPath, 'dist');

module.exports = {
    port,
    rootPath,
    outputPath,
    modules: {
        rules: [
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'postcss-loader', 'less-loader']
                })
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less'],
        alias: {
            Root: path.resolve(rootPath, 'src/'),
            Components: path.resolve(rootPath, 'src/components/'),
            Containers: path.resolve(rootPath, 'src/containers/'),
            Styles: path.resolve(rootPath, 'src/styles/'),
            Stores: path.resolve(rootPath, 'src/stores/')
        }
    },
    devtool: 'source-map',
    plugins: [
        new CleanWebpackPlugin([outputPath], {
                root: rootPath,
                verbose: true,
                dry: false
            }
        ),
        new webpack.DllReferencePlugin({
           context: __dirname,
           manifest: path.join(rootPath, 'lib', 'manifest.json'),
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [require('autoprefixer')]
            }
        }),
        new webpack.NamedModulesPlugin(),
        new AddAssetHtmlPlugin({
            filepath: path.join(rootPath, 'lib', 'lib.js')
        }),
        new HtmlWebpackPlugin({
            template: `${rootPath}/src/index.html`
        })
    ]
};
