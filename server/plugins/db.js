const { json } = require('express');

module.exports = app => {
    // 引入输入库插件
    const mongoose = require('mongoose')

    // const http = require('http');
    // 数据库连接
    // mongoose.connect('mongodb://172.0.0.1:27017/node-vue-moba', {
    //     useNewUrlParser: true
    // })
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
        useNewUrlParser: true
    }, function(err, db) {
        if (err) {
            console.log(err);
        } else {
            console.log('连接成功 ' + db);
        }
    })

    // const server = http.createServer((req, res) => {
    //     res.statusCode = 200;
    //     res.setHeader('Content-Type', 'text/html;charset=UTF-8');
    //     var user = JSON.stringify(result); //转换成json格式字符串
    //     res.end(user);
    // });

    require('require-all')(__dirname + '/../models')
}