const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CleanWebpackPlugin = require('clean-webpack-plugin'),
    AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'),
    port = 9000,
    rootPath = path.join(__dirname, '../'),
    outputPath = path.join(rootPath, 'dist');

const getAlias = (init = {}) => {
    const dirs = [
        'components', 'containers', 'constants', 'actions',
        'styles', 'reducers', 'stores', 'sagas', 'helpers'
    ];
    return dirs.reduce((res, dir) => {
        const key = dir.replace(/(|^)[a-z]/, _ => _.toUpperCase());
        return Object.assign(res, {
            [key]: path.resolve(rootPath, `src/${dir}`)
        })
    }, init);
};

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
            },
            {
                test: /\.(png|jpg|gif|woff|woff2)$/,
                loaders: [
                    'url-loader?limit=10000&name=[chunkhash:8].[name].[ext]',
                    'image-webpack-loader?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: getAlias({
            Root: path.resolve(rootPath, 'src/')
        })
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
