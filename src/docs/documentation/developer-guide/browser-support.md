Reslide is built with compatibility in mind and supports all major web browsers including their mobile versions and is
tested on these web browsers:

- Google Chrome
- Safari
- Firefox
- Edge
- Opera
- IE 11

No extra configuration is needed if you are using `create-react-app`, `Nextjs`, `Gatsby` or similar pre-configured tools
.

**_Read further only if you want to setup your project manually (for example by using a bundler like webpack)._**

Reslide package is shipped in es2020 syntax, so if you need to transpile it using babel the following babel
configuration will do the trick:

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": "replace this with the version of the installed corejs package"
      }
    ],
    "@babel/preset-react"
  ]
}
```

You can also specify the target browsers by specifying it in the
[targets](https://babeljs.io/docs/en/options#output-targets) option of the babel configuration or by specifying it in a
[Browserslist](https://github.com/browserslist/browserslist) configuration.

<a class="previous-section" href="#/Documentation/User%20Interface/Inline%20Styles">Inline Styles</a>
<a class="next-section" href="#/Documentation/Developer%20Guide/TypeScript">TypeScript</a>
