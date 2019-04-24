
# 简易脚手架工具

## 工具介绍
 > 这是基于webpack + vue-cli，并添加常用loader（sass-loader，等常用包），用于前端构建vue项目的脚手架。

### 项目依赖的包
``` bash
# commander.js，可以自动的解析命令和参数，用于处理用户输入的命令。
# download-git-repo，下载并提取 git 仓库，用于下载项目模板。
# Inquirer.js，通用的命令行用户界面集合，用于和用户进行交互。
# handlebars.js，模板引擎，将用户提交的信息动态填充到文件中。
# ora，下载过程久的话，可以用于显示下载中的动画效果。
# chalk，可以给终端的字体加上颜色。
# log-symbols，可以在终端上显示出 √ 或 × 等的图标。
```
### 工具使用方法：
``` bash
 > 1.安装： 可以全局安装  npm npm i vue-tmp-cli -g
 > 2.在任意文件夹下运行  ameicli init  或 ameicli init (项目名)
 > 3.根据步骤创建webpack vue 项目

```