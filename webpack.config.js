var nib                 = require('nib');
var path                = require('path');
var glob                = require('glob');
var webpack             = require('webpack');
var poststylus          = require('poststylus');
var stylusUrl           = require('stylus-url');
var ExtractTextPlugin   = require("extract-text-webpack-plugin");
var BrowserSyncPlugin   = require('browser-sync-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var fs                  = require('fs');
var yaml                = require('js-yaml');
var njx                 = require('njx');
var util                = require('util');
var matter              = require('gray-matter');
var nunjucks            = require('nunjucks');
var MarkdownIt          = require('markdown-it');
var markdownItAttrs     = require('markdown-it-attrs');


var YAML_SCHEMA;
var md = new MarkdownIt({
  html: true,
  breaks: true,
  typographer: true,
  //highlight: function (str, lang) {
  //  return '<div class="col '+lang+'">'+str+'</div>';
  //}
});
md.use(markdownItAttrs);

// 文档: https://webpack.github.io/docs/configuration.html

var paths = {
  root: path.join(__dirname, './'),
  src: path.join(__dirname, './src/'),
  scripts: path.join(__dirname, './src/scripts'),
  styles: path.join(__dirname, './src/styles'),
  assets: path.join(__dirname, './src/assets'),
}

var config = {
  context: paths.root,
  debug: true,
  watch: true,
  separateStylesheet: true,
  devtool: 'source-map',
  entry: {
    style: 'styles', // alias, realpath is ./src/styles/index.js
    main: 'scripts', // alias, realpath is ./src/scripts/index.js
  },
  output: {
    path: 'build/assets',
    filename: "[name].js",
    chunkFilename: "[id].js"
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/},
      { test: /\.(jpe?g|png|gif|svg)(\?(\w|\W)*)*$/, loader: 'file-loader?name=static/[hash].[ext]'},
      { test: /\.(woff|woff2)(\?(\w|\W)*)*$/, loader: 'file-loader?name=static/[hash].[ext]'},
      { test: /\.(ttf|eot|otf)(\?(\w|\W)*)*$/, loader: 'file-loader?name=static/[hash].[ext]'},
      { test: /\.txt$/, loader: 'raw-loader'},
      // Extract css files
      { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader?sourceMap") },
      // Optionally extract less files
      // or any other compile-to-css language
      { test: /\.styl$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!stylus-loader?sourceMap") }
      // You could also use other loaders the same way. I. e. the autoprefixer-loader
    ]
  },
  resolve: {
    root: [
            __dirname + '/src',
        ],
    modulesDirectories: ['node_modules', 'bower_components'],
    extensions: ['', '.es6.js', '.js', '.vue' ],
    alias: {
      'assets': paths.assets,
      'styles': paths.styles,
      'scripts': paths.scripts,
      'masonry': 'masonry-layout',
      'isotope': 'isotope-layout',
    }
  },
  resolveLoader: {
    alias: {
      'copy': 'file-loader?name=[name].[ext]', //&context=./src
    }
  },
  // User Custom Config
  stylus: {
    use: [
      stylusUrl({
        root: paths.src
      }),
      poststylus([ 'autoprefixer' ]),
    ],
    import: [
      '~nib/index.styl',
      path.join(paths.styles, 'stylus/variables.styl')
    ]
  },
  babel: {
    presets: ['es2015'],
    plugins: ['transform-runtime']
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    new ExtractTextPlugin("[name].css"),
    new BrowserSyncPlugin(
      // BrowserSync options 
      {
        // browse to http://localhost:3000/ during development 
        host: 'localhost',
        port: 4000,
        // proxy the Webpack Dev Server endpoint 
        // (which should be serving on http://localhost:3100/) 
        // through BrowserSync 
        // proxy: 'http://localhost:3100/'
        server: { 
          baseDir: ['build'],
          directory: true  // with directory listing
        }
      },
      // plugin options 
      {
        // prevent BrowserSync from reloading the page 
        // and let Webpack Dev Server take care of this 
        reload: true
      }
    )
  ]
};

var MarkdownType = new yaml.Type('tag:yaml.org,2002:md', {
  kind: 'scalar',
  construct: function (text) {
    return md.render(text);
  },
});

YAML_SCHEMA = yaml.Schema.create([ MarkdownType ]);

var contents = fs.readFileSync('./data.yaml', 'utf8');
var data = matter(contents, {schema: YAML_SCHEMA });
data.data.content = data.content;
// console.log('data', data);
var context  = JSON.stringify(data.data);
var pages = ['index','print'];
pages.forEach(function(filename) {
    var conf = {
        template:  '!!file-loader?name=../'+ filename +'.html!nunjucks-extend-loader?{"searchPaths":["template"],"context":'+ context +',"imgroot":"src"}!template/'+ filename +'.html', //html模板路径
    };
    config.plugins.push(new HtmlWebpackPlugin(conf));
});


module.exports = config;



