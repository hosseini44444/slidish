const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  title: "Slider component for React - Slidish",
  // Folder for static HTML style guide generated with styleguidist build command.
  styleguideDir: "docs",
  // An object with options to add a favicon, meta tags, inline JavaScript or CSS, etc. See @vxna/mini-html-webpack-template docs.
  template: {
    favicon: "/favicon.ico",
    head: {
      meta: [
        {
          name: "description",
          content: `React slider/carousel component for building sliders of all type of components, Read this
          documentation for full explanation of every feature with examples and playground`,
        },
        { name: "author", content: "Abbas Hosseini" },
        {
          name: "keywords",
          content:
            "react, slider, carousel, image, gallery, slidish, slideshow, swiper, responsive, mobile-friendly, touch",
        },
      ],
      raw: `<style>
            code {
              background-color: #1b1f230d !important;
              border-radius: 6px !important;
              font-size: 85% !important;
              padding: .2em .4em !important;
            }
            .next-section {
              display: block;
              float: right !important;
              padding: 10px 15px !important;
              text-align: center !important;
              border: 2px solid #06d !important;
              font-family: sans-serif !important;
            }
            .next-section::before {
              content:"Next: ";
            }
            .previous-section {
              display: block;
              float: left !important;
              padding: 10px 15px !important;
              text-align: center !important;
              border: 2px solid #06d !important;
              font-family: sans-serif !important;
            }
            .previous-section::before {
              content:"Previous: ";
            }
            main footer {
              margin-top: 100px !important;
            }
           </style>`,
    },
  },
  // components: "src/components/slider/index.tsx",
  // Modules that are required for your style guide. Useful for third-party styles or polyfills.
  require: [
    // // For making `Slidish` available in every example
    path.resolve(__dirname, "src", "styleguide", "setup.js"),
    path.resolve(__dirname, "src", "style.scss"),
  ],
  // tocMode: "collapse",
  pagePerSection: true,
  sections: [
    { name: "Introduction", content: "src/docs/introduction.md" },
    { name: "Features", content: "src/docs/features.md" },
    { name: "Playground", content: "src/docs/playground.md" },
    { name: "Fancy Demo", content: "src/docs/demo.md" },
    {
      name: "Documentation",
      sectionDepth: 3,
      href: "#/Documentation/Getting%20Started",
      sections: [
        { name: "Getting Started", content: "src/docs/documentation/getting-started.md" },
        { name: "Main Options", content: "src/docs/documentation/main-options.md" },
        { name: "Advanced Options", content: "src/docs/documentation/advanced-options.md" },
        { name: "Slideshow", content: "src/docs/documentation/slideshow.md" },
        { name: "Custom Thumbnails", content: "src/docs/documentation/thumbs.md" },
        { name: "Lazy Loading", content: "src/docs/documentation/lazy-loading.md" },
        { name: "Event Handlers", content: "src/docs/documentation/event-handlers.md" },
        { name: "Methods", content: "src/docs/documentation/methods.md" },
        {
          name: "User Interface",
          href: "#/Documentation/User%20Interface/Layout",
          sections: [
            { name: "Layout", content: "src/docs/documentation/ui/layout.md" },
            { name: "ClassNames", content: "src/docs/documentation/ui/classnames.md" },
            { name: "Inline Styles", content: "src/docs/documentation/ui/styles.md" },
          ],
        },
        {
          name: "Developer Guide",
          href: "#/Documentation/Developer%20Guide/Browser%20Support",
          sections: [
            { name: "Browser Support", content: "src/docs/documentation/developer-guide/browser-support.md" },
            { name: "TypeScript", content: "src/docs/documentation/developer-guide/typescript.md" },
            { name: "Server Side Rendering", content: "src/docs/documentation/developer-guide/ssr.md" },
            { name: "Testing", content: "src/docs/documentation/developer-guide/testing.md" },
          ],
        },
      ],
    },
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.(t|j)sx?$/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      targets: {
                        browsers: "last 2 versions",
                      },
                      useBuiltIns: "usage",
                      corejs: "3.15",
                    },
                  ],
                  ["@babel/preset-typescript", { onlyRemoveTypeImports: true }],
                ],
                babelrc: false,
              },
            },
            { loader: "ts-loader" },
          ],
          exclude: /node_modules/,
        },
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
      new CopyPlugin({
        patterns: [{ from: "public", to: "." }],
      }),
    ],
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".jsx"],
      alias: {
        src: path.resolve(__dirname, "src"),
        components: path.resolve(__dirname, "src/components/"),
        hooks: path.resolve(__dirname, "src/hooks/"),
        store: path.resolve(__dirname, "src/store/"),
        slidish: path.resolve(__dirname, "src"),
      },
    },
  },
};
