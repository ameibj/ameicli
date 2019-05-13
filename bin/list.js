
const chalk = require('chalk');

// 下载模板
const download = require('download-git-repo');

module.exports = function(){
    const tmpUrl = 'https://github.com:ameibj/my-vuetmp-cli#master';
    download(tmpUrl,'bin/', (err)=>{
        if(err){
            console.log(` ${chalk.red(err)}`);
        }else {
            // 模板列表
            const templates = require('./_templates');
            console.log(` ${chalk.green('模板列表如下：')}`);
            for(let key in templates){
                console.log(` ${chalk.yellow(' ★ ')} ${chalk.green(key)} : ${templates[key].description}`)
            }
        }
    });
}
