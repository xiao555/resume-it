Resume-it
======
<a href="http://www.wtfpl.net/"><img
       src="http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-4.png"
       width="80" height="15" alt="WTFPL" /></a>
一个灵活的数据模板分离的在线简历生成器。
效果：https://xiao555.github.io/Resume/
如果喜欢的话请给个star ^_^

Node version v5.5.0 以上

## 风格参考

[@DIYgod](http://html.love/)

## Configuration

### 使用默认模板

这个默认模板是参考@DIYgod](http://html.love/) 的，如果直接用的话只需要修改 `data.yaml` 里的数据即可。

1. YAML语法可以参考[这里](http://www.ruanyifeng.com/blog/2016/07/yaml.html)
2. 如果需要用到Markdowm语法，请在字段开头加上 `!!md `，相应的前端模板要渲染md的话请加上safe过滤：`{{ example | safe}}`

### 使用自定义模板

#### 1. HTML
html部分在`template/index.html`，这一部分是页面body的内容，采用[Nunjucks](https://mozilla.github.io/nunjucks/)模板引擎，如果需要修改head，请前往`template/base.html`.

注：写模板的时候请在必要的地方用一下判断，有的地方可能没有数据。

#### 2. CSS

css部分在`src/styles`, 用stylus写的话写在`stylus`，css写在`styles`，新建的文件需要在`index.js`里`import`一下，也可以import npm安装的库。

stylus的一些变量、函数可以放在`variables.styl`, 其他文件直接用就行

注：
1. 已经加载了font-awesome，可以直接用
2. 加载了PostStylus，autoprefixer插件自动补全前缀
3. 除了`variables.styl`默认导入，其他css文件都要在index.js里`import`

#### 3. 其他文件

1. 添加图片, 放在`src/assets/images/`, 引用的时候无论html还是css路径这样写`assets/path/to/file`即可。
2. 添加字体文件, 放在`src/assets/fonts/`, 然后在`src/styles/stylus/fonts.styl`里导入。

## Usage

### Dev

```javascript
npm i
npm start
```
自动打开浏览器访问：`http://localhost:4001/`。
Browsersync 修改html、css、js后实时刷新。

### Print

```javascript
npm i
npm start
```
访问 `http://localhost:4001/print.html`，直接打印即可，注意勾选背景图片

### Publish

请先在`publish.sh` 里配好repo地址，然后：

```javascript
npm run publish
```
会提交到master分支和gh-pages分支
浏览：`https://yourname.github.io/reponame/` 即可，print版访问：`https://yourname.github.io/reponame/print.html`。

## LISCENSE

WTFPL 