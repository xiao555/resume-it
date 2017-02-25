Resume-it
======
一个灵活的数据模板分离的在线简历生成器。
## Configuration
### 默认模板

这个默认模板是别人那搞得。。如果要用的话只需要修改 `data.yaml` 里的数据即可，YAML语法可以参考[这里](http://www.ruanyifeng.com/blog/2016/07/yaml.html), 如果需要用到Markdowm语法，请在字段开头加上 `!!md `，相应的前端模板要渲染md的话请加上safe过滤：`{{ example | safe}}`

### 自定义模板
#### HTML
html部分在`template/index.html`，这一部分是页面body的内容，采用[Nunjucks](https://mozilla.github.io/nunjucks/)模板引擎，如果需要修改head，请前往`template/base.html`.

写模板的时候请在必要的地方用一下判断，有的地方可能没有数据。

#### CSS

css部分在`src/styles`, 用stylus写的话写在`stylus`，css写的写在`styles`，新建的文件需要在`index.js`里`import`一下，也可以import npm安装的库。

stylus的一些变量函数可以放在`variables.styl`, 其他文件直接用就行

注：
1. 已经加载了font-awesome，可以直接用
2. 加载了PostStylus，autoprefixer插件自动补全前缀
3. 除了`variables.styl`默认导入，其他css文件都要在index.js里`import`

#### 其他文件

如果有图片的话，放在`src/assets/images/`， 字体文件的话`src/assets/fonts/`，引用的时候无论html还是css路径这样写`assets/path/to/file`即可。

### Usage

```javascript
npm i
npm start
```
自动打开浏览器访问：`http://localhost:4001/`。
Browsersync 修改html、css、js后实时刷新。

如果喜欢的话请给个star ^_^