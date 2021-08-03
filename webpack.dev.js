const path = require("path");

const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  target: "web",
  entry: {
    main: "./src/demo.tsx",
  },
  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, ".dev"),
    clean: true,
  },
  module: {
    rules: [
      // babel-loader is just used here for adding specific browsers support (typescript can just target specific ECMAScripts version)
      { test: /\.tsx?$/, use: ["babel-loader", "ts-loader"], exclude: /node_modules/ },
      // // For documentation files which are not written in typescript
      // { test: /\.jsx?$/, use: ["babel-loader"], exclude: /node_modules/ },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          "style-loader",
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
      title: "Slidish - Full-featured slider component for react",
    }),
    new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      src: path.resolve(__dirname, "src"),
      components: path.resolve(__dirname, "src/components/"),
      hooks: path.resolve(__dirname, "src/hooks/"),
      store: path.resolve(__dirname, "src/store/"),
    },
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "public",
    // Letting the server to be accessible externally (for example from other devices in your local network)
    host: "0.0.0.0",
    port: 3000,
    // The index.html page will likely have to be served in place of any 404 responses
    historyApiFallback: true,
    open: true,
    // Will open this URL instead of `0.0.0.0:3000`
    openPage: "http://localhost:3000",
    hot: true,
    // For memory optimization
    writeToDisk: true,
    clientLogLevel: "warn",
  },
};
