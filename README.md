# miaow-livereload

> Miaow的实时刷新工具, 会在内容或是依赖的资源变化时自动刷新页面, 只在Miaow的`watch`模式下可用

### 参数说明

#### defaultEnable
Type:`Boolean` Default:`undefined`

是否默认启用

如果是默认禁用, 只能在访问链接上面添加`livereload=true`参数启用. 
如果是默认启用, 只能在访问链接上面添加添加`livereload=false`参数禁用.

#### placeholder
Type:`String` Default:`undefined`

注入刷新脚本的占位符

如果不设置就默认给每个处理的文件底部追加, 如果设置了, 就只在`placeholder`内容的位置
替换注入刷新脚本
