const path = require("path");

const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  mode: "production",
  entry: {
    main: "./src/demo.tsx",
  },
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, "demo"),
    clean: true,
  },
  module: {
    rules: [
      // babel-loader is just used here for adding specific browsers support (typescript can just target specific ECMAScripts version)
      { test: /\.tsx?$/, use: ["babel-loader", "ts-loader"], exclude: /node_modules/ },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: {
                auto: true,
                localIdentName: "[name]--[hash:base64:5]",
              },
              importLoaders: 2,
              // 0 => no loaders (default);
              // 1 => postcss-loader;
              // 2 => postcss-loader, sass-loader
            },
          },
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
          "sass-loader",
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html",
      title: "Reslide - Full-featured slider component for react",
      // // Modern browsers support non blocking javascript loading ('defer') to improve the page startup performance.
      // scriptLoading: "blocking",
    }),
    // you could use babel's auto-import plugin instead
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new CopyPlugin({
      patterns: [{ from: "public", to: "." }],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css",
    }),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      src: path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components/"),
      hooks: path.resolve(__dirname, "src/hooks/"),
      store: path.resolve(__dirname, "src/store/"),
    },
  },
  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      // The CSS can be extracted in one CSS file using optimization.splitChunks.cacheGroups
      cacheGroups: {
        styles: {
          name: "styles",
          type: "css/mini-extract",
          // For webpack@4
          // test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
};
