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
// 功能分离
/*.command('init <templateName>')
.description('创建新项目')
.alias('i')
.action((tplName, name) => {
    if (!fs.existsSync(name)) {
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: '请输入项目名称',
                default: name
            },
            {
                type: 'input',
                name: 'description',
                message: '输入项目描述'
            },
            {
                type: 'input',
                name: 'author',
                message: '输入项目作者'
            }
        ]).then((answers) => {
            // git 模板地址
            let {downloadUrl} = templates[tplName];

            // 开始下载
            const spinner = ora('正在下载模板...');
            spinner.start();

            download(downloadUrl, name, (err) => {
                if (err) {
                    spinner.fail();
                    console.log(symbols.error, chalk.red(err))
                } else {
                    spinner.succeed();
                    const fileName = `${name}/package.json`;
                    const meta = {
                        name,
                        description: answers.description,
                        author: answers.author
                    }
                    if (fs.existsSync(fileName)) {
                        const content = fs.readFileSync(fileName).toString();
                        const result = handlebars.compile(content)(meta);
                        fs.writeFileSync(fileName, result);
                    }
                    console.log(symbols.success, chalk.green('项目初始化完成！'));
                }
            })
        })
    } else {
        // 错误提示项目已存在，避免覆盖原有项目
        console.log(symbols.error, chalk.red('项目已存在'))
    }
})*/

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
