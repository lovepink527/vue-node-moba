const { json } = require('express');

module.exports = app => {
    // 引入输入库插件
    const mongoose = require('mongoose')
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

}