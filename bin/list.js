
const chalk = require('chalk');
// 模板列表
const templates = require('./_templates')

module.exports = function(){
    for(let key in templates){
        console.log(` ${chalk.yellow(' ★ ')} ${chalk.green(key)} : ${templates[key].description}`)
    }
}
