// 模板列表
const templates = require('./_templates')

// 命令行交互
const inquirer = require('inquirer');

// 下载模板
const download = require('download-git-repo');
// 下载模板动画效果
const ora = require('ora');
// 可以给终端字体加颜色
const chalk = require('chalk');
// 可以在终端上显示出 √ 或 × 等的图标
const symbols = require('log-symbols');
// 填充信息 到package.json
const handlebars = require('handlebars');
// node 文件模块
const fs = require('fs');

// 存储模板信息
let tempList = [];
let temps = {};

module.exports = function (projectName) {
    getTemps(projectName);
}

function getTemps(projectName) {
    for (let key in templates) {
        tempList.push(key);
    }
    inquirer.prompt([
        {
            type: 'list',
            name: 'template',
            message: '请输入模板名称',
            choices: tempList
        }
    ]).then((answers) => {
        temps.name = answers.template
        temps.path = templates[answers.template].downloadUrl;
    }).then(() => {
        downloadTemplate(projectName)
    })
}

// 下载模板
function downloadTemplate(projectName) {
    if (!fs.existsSync(projectName)) {
        typeof projectName === 'string' ? projectName : projectName = 'demo';
        //  console.log( (typeof projectName) === 'string')
        inquirer.prompt([
            {
                type: 'input',
                name: 'name',
                message: '请输入项目名称',
                default: projectName
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
            if (fs.existsSync(answers.name)) {
                console.log(symbols.error, chalk.red(`${answers.name} 项目已存在`))
                return;
            }
            // 开始下载
            const spinner = ora('正在下载模板...');
            // git 模板地址 赋值解构（模板地址）
            let {path: downloadUrl} = temps;
            // 项目名称
            let name = answers.name;
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
        console.log(symbols.error, chalk.red(`${projectName} 项目已存在`))
    }
}
