# messidor

项目名字随便取的。

Base on [Lavas](https://lavas.baidu.com)，想利用（包括不限于）[FCC成都的周刊issue](https://github.com/FreeCodeCamp-Chengdu/IT-Technology-weekly/issues)做成类似日报的PWA。

目前考虑的是能用上indexedDB的情况，其他的再说...

## 首页获取blogList的逻辑

- 渲染页面前从indexedDB获取数据
  - 获取数据，存入Vuex blog/list computed
    - indexedDB不可用，从remote获取
    - indexedDB可用
      - 如果indexedDB没有数据就从remote获取，然后存入indexedDB
  - 更新，从remote

## 必须使用*nux系统

```js
const WebpackShellPlugin = require('webpack-shell-plugin');
...
onBuildExit: ['cp -Rf ./messidor/ ../../ShoneSingLone.github.io/']
```

在build之后，使用`cp`命令用移动dist（messido文件夹）到GithubPages根目录，所以window必须使用bash子系统，不然报错。

## scope