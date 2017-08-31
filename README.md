Resume-it
======

一个灵活的数据模板分离的在线简历生成器。
效果：https://xiao555.github.io/Resume/
如果喜欢的话请给个star ^_^

![](./resume.png)

Node version v7.7.0

## 风格参考

[@DIYgod](http://html.love/)

## Configuration

### 使用默认模板

这个默认模板是参考@[DIYgod](http://html.love/) 的，如果直接用的话只需要修改 `data.yaml` 里的数据即可。

1. YAML语法可以参考[这里](http://www.ruanyifeng.com/blog/2016/07/yaml.html)
2. 如果需要用到Markdowm语法，请在字段开头加上 `!!md `，相应的前端模板要渲染md的话请加上safe过滤：`{{ example | safe}}`

### 使用自定义模板

#### 1. HTML
html部分在`template/index.html`，这一部分是页面body的内容，采用[Nunjucks](https://mozilla.github.io/nunjucks/)模板引擎，如果需要修改head，请前往`template/base.html`.

注：写模板的时候请在必要的地方用一下判断，有的地方可能没有数据。

#### 2. CSS

css部分在`src/styles/stylus`, 默认用stylus写。

注：
1. 已经加载了font-awesome，可以直接用
2. 加载了autoprefixer插件自动补全前缀

#### 3. 其他文件

注：现在改用gulp打包了，如果要添加其他文件的话需要写一下配置文件`gulpfile.js`, 暂时没有提供打包其他文件的task

## Usage

### 安装依赖

```javascript
npm i
```

### Dev

```javascript
npm start
```
自动打开浏览器访问：`http://localhost:3000/`。 Browsersync 带热重载功能。

打印版: 首页最下面有个打印版链接 或者 访问 `http://localhost:3000/print.html`，直接打印即可，注意勾选背景图片

### Public

请先在`public.js` 里配好repo地址，然后：

```javascript
npm run public
```
会提交到master分支和gh-pages分支
浏览：`https://yourname.github.io/reponame/` 即可，print版访问：`https://yourname.github.io/reponame/print.html`。

## TODO

1. 数据内容直接在页面上修改
2. 多模板
3. 命令行接口
4. 在线编辑+发布+导出

## 更新日志

2017.6.18
  调整结构，采用 Gulp 打包，public 用 `simple-git`, 不用shell脚本了

## LICENSE

MIT
