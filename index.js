#!/usr/bin/env node
// 使用node开发命令行工具所执行JavaScript脚本必须在顶部加入 #!/usr/bin/env node 声明

// 处理命令行
const program = require('commander');
// 获取package信息
const package = require('./package.json');
// 下载模板
const download = require('download-git-repo');
// 命令行交互
const inquirer = require('inquirer');

// 填充信息 到package.json
const handlebars = require('handlebars');
// 下载模板动画效果
const ora = require('ora');
// 可以给终端字体加颜色
const chalk = require('chalk');
// 可以在终端上显示出 √ 或 × 等的图标
const symbols = require('log-symbols');
// 命令行操作
// const shell = require('shelljs');

// 可用模板
const list = require('./bin/list.js');
// 初始化
const init = require('./bin/init.js');


program
    .version(package.version, '-v, --version')
    .usage('<command>[options]')

// 初始化
program
    .command('init')
    .description('创建新项目')
    .action((template) => {
        init(template)
    })

// 查看 tmp list
program
    .command('list')
    .description('查看所有可用模板')
    .alias('l')
    .action(() => {
        list();
    })


program.parse(process.argv);

if (program.args.length === 0) {
    // 没有输入参数，默认显示 help信息
    program.help();
}
