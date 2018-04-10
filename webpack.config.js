//  build options

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require("webpack");
const path = require("path");
const bootstrapEntryPoints = require("./webpack.bootstrap.config");
const glob = require("glob");
const PurifyCSSPlugin = require("purifycss-webpack");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

////////////////////
const isProd = process.env.NODE_ENV === "production" ? true : false; // true or false

console.log("Starting " + (isProd ? "production" : "development") + " build");    

//  "style-loader"   // creates style nodes from JS strings
//  "css-loader"     // translates CSS into CommonJS
//  "sass-loader"    // compiles Sass to CSS
const cssDev = [
  {
    loader: "style-loader" // inject CSS to page
  },
  {
    loader: "css-loader?sourceMap" // translates CSS into CommonJS modules
  },
  {
    // cannot use it yet coz its breaking MDL
    loader: "postcss-loader", // Run post css actions
    options: {
      plugins: function() {
        // post css plugins, can be exported to postcss.config.js
        return [
          require("precss"), // Use Sass-like markup in your CSS
          require("autoprefixer") // Autoprefixer parse CSS and add vendor prefixes to rules by Can I Use
        ];
      }
    }
  },
  {
    loader: "sass-loader" // compiles SASS to CSS
  },
  {
    loader: "sass-resources-loader",
    options: {
      // Provide path to the file with resources
      resources: ["./src/scss/app.scss"]
    }
  }
];

const cssProd = ExtractTextPlugin.extract({
  fallback: "style-loader",
  use: [
    "css-loader",
    "sass-loader",
    {
      loader: "sass-resources-loader",
      options: {
        // Provide path to the file with resources
        resources: ["./src/scss/app.scss"]
      }
    }
  ],
  publicPath: "/dist"
});

const cssConfig = isProd ? cssProd : cssDev; //check is production? use cssProd else use cssDev
/////////////////

const bootstrapConfig = isProd
  ? bootstrapEntryPoints.prod
  : bootstrapEntryPoints.dev;

module.exports = {
  devtool: "cheap-module-eval-source-map",

  //  the entry file
  entry: {
    app: ["./src/js/app.jsx"],
    contact: "./src/js/contact.js",
    bootstrap: bootstrapConfig
  },

  //  the destination file/folder
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  module: {
    loaders: [
      {
        test: /.jsx?$/, // Match both .js and .jsx
        loaders: ["react-hot", "babel-loader"],
        include: path.join(__dirname, "src")
      }
    ],
    rules: [
      {
        test: /\.(html)$/,
        use: ["html-loader"]
      },
      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      {
        test: /\.scss$/,
        use: cssConfig
      },
      {
        test: /.jsx?$/, // Match both .js and .jsx
        exclude: /node_modules/,
        loader: ["babel-loader"]
        // isProd ?  'eval-cheap-module-source-map' : 'source-map',
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          "file-loader?name=img/[name].[ext]", // use "file-loader" and them images as they are named and their extension to the set output path
          //"file-loader?name=[name].[ext]&outputPath=img/&publicPath=img/", // use "file-loader" and them images as they are named and their extension to the set custom output path
          "image-webpack-loader" //  Minify PNG, JPEG, GIF, SVG images with image min
        ]
      },

      // the url-loader uses DataUrls.
      // the file-loader emits files.
      {
        test: /\.(woff2?)$/,
        loader: "url-loader?limit=10000&name=fonts/[name].[ext]"
      },
      // {
      //     test: /\.(jpe?g|png|gif)$/i,
      //     use: [{
      //         loader: "file-loader",
      //         options: {
      //             name: '[name].[ext]',
      //             outputPath: 'img/',
      //             publicPath:'img/'
      //         }
      //     }]
      // },

      {
        test: /\.(ttf|eot)$/,
        loader: "file-loader?name=fonts/[name].[ext]"
      },
      // { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      // { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      // { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      // { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }

      // Bootstrap 3
      {
        test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        loader: "imports-loader?jQuery=jquery"
      }

      // // Bootstrap 4
      // { test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
    ]
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true, //  Enable gzip compression for everything served
    stats: "errors-only", //  This option lets you precisely control what bundle information gets displayed
    hot: true //  a feature to inject updated modules into the active runtime
    //open: true                //  open a new window
  },

  plugins: [
    new HtmlWebpackPlugin({
      // Generate a index.html
      title: "index",
      // minify: {
      //     collapseWhitespace: true,    // minify html
      //         removeComments: true,
      //         collapseWhitespace: true,
      //         removeRedundantAttributes: true,
      //         useShortDoctype: true,
      //         removeEmptyAttributes: true,
      //         removeStyleLinkTypeAttributes: true,
      //         keepClosingSlash: true,
      //         minifyJS: true,
      //         minifyCSS: true,
      //         minifyURLs: true
      // },

      /*
            devtool: "eval-cheap-module-source-map" offers SourceMaps that only maps lines (no column mappings) and are much faster
            devtool: "source-map" cannot cache SourceMaps for modules and need to regenerate complete SourceMap for the chunk. It’s something for production.
            */
      //https://webpack.github.io/docs/build-performance.html#sourcemaps
      devtool: isProd ? "eval-source-map" : "source-map",
      hash: true, // append a unique webpack compilation hash to all included scripts and CSS files. This is useful for cache busting and chnages on each build.
      //cache: true,
      excludeChunks: ["contact"], // do not include "contact.js" in the html
      // filename: "./../index.html",  // set the creation file in the root folder
      template: "./src/index.html" // Load a custom template (ejs by default see the FAQ for details)
    }),

    new HtmlWebpackPlugin({
      // Generate a contact page dyanmically
      title: "Contact Page",
      hash: true,
      chunks: ["contact"], // only include "contact.js" in the html
      filename: "contact.html",
      template: "./src/contact.html" // Load a custom template (ejs by default see the FAQ for details)
    }),

    new ExtractTextPlugin({
      //  It moves all the required *.css modules in entry chunks into a separate CSS file. So your styles are no longer inlined into the JS bundle, but in a separate CSS file (styles.css)
      filename: "/css/[name].css",
      disable: !isProd,
      allChunks: true
    }),

    new webpack.HotModuleReplacementPlugin(), // Hot Module Replacement (HMR) exchanges, adds, or removes modules while an application is running, without a full reload
    new webpack.NamedModulesPlugin(), //  This plugin will cause the relative path of the module to be displayed when HMR is enabled

    // Make sure this is after ExtractTextPlugin!
    // new PurifyCSSPlugin({
    //   // Give paths to parse for rules. These should be absolute!
    //   // path to the html file, and only related css to this html file will be included
    //   paths: glob.sync(path.join(__dirname, "./src/*.html"))
    // }),

    new BundleAnalyzerPlugin({
      // Can be `server`, `static` or `disabled`.
      // In `server` mode analyzer will start HTTP server to show bundle report.
      // In `static` mode single HTML file with bundle report will be generated.
      // In `disabled` mode you can use this plugin to just generate Webpack Stats JSON file by setting `generateStatsFile` to `true`.
      analyzerMode: isProd ? "disabled" : "server",
      // Host that will be used in `server` mode to start HTTP server.
      analyzerHost: "127.0.0.1",
      // Port that will be used in `server` mode to start HTTP server.
      analyzerPort: 8888,
      // Path to bundle report file that will be generated in `static` mode.
      // Relative to bundles output directory.
      reportFilename: "report.html",
      // Module sizes to show in report by default.
      // Should be one of `stat`, `parsed` or `gzip`.
      // See "Definitions" section for more information.
      defaultSizes: "parsed",
      // Automatically open report in default browser
      openAnalyzer: isProd ? false : true,
      // If `true`, Webpack Stats JSON file will be generated in bundles output directory
      generateStatsFile: isProd ? false : true,
      // Name of Webpack Stats JSON file that will be generated if `generateStatsFile` is `true`.
      // Relative to bundles output directory.
      statsFilename: "stats.json",
      // Options for `stats.toJson()` method.
      // For example you can exclude sources of your modules from stats file with `source: false` option.
      // See more options here: https://github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      // Log level. Can be 'info', 'warn', 'error' or 'silent'.
      logLevel: "info"
    })
  ]
};
