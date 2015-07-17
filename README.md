# miaow-livereload

> Miaow的实时刷新工具, 会在内容或是依赖的资源变化时自动刷新页面, 只在Miaow的`watch`模式下可用

## 使用说明

### 安装

```
npm install miaow-livereload --save-dev
```

### 在项目的 miaow.config.js 中添加模块的 tasks 设置

```javascript
//miaow.config.js
module: {
  tasks: [
    {
      test: /\.html$/,
      plugins: ['miaow-livereload']
    }
  ]
}
```

### 参数说明

* defaultEnable 默认值为`undefined`, 是否默认启用. 
如果是默认禁用, 只能在访问链接上面添加`livereload=true`参数启用. 
如果是默认启用, 只能在访问链接上面添加添加`livereload=false`参数禁用.

* placeholder 默认值为`undefined`, 注入`livereload`脚本的地方
如果不设置就默认给每个处理的文件底部追加, 如果设置了, 就只在`placeholder`内容的位置
替换注入`livereload`脚本
