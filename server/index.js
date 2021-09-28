// 引入框架
const express = require("express");

// 引入路径
const path = require('path');

// 实例化一个服务
const app = express();

// 定义token变量
app.set('secret', 'i23nfweoj34jofsne');

// 加入json才可以使用
app.use(express.json());

// 加入才可以跨域
app.use(require('cors')());

// 引入admin路由文件并且把app实例传递到路由文件中
require('./routes/admin/index')(app);

// 引入数据文件并且把app实例传递到数据文件中
require('./plugins/db')(app);

// app.get('/', (req, res) => {
//     res.send('ok')
// })


// app.use(express.static(path.join(__dirname, '/uploads')));
// 相当于开放uploads文件，让接口上加uploads/图片地址可以访问uploads里面的图片
app.use('/uploads', express.static(__dirname + '/uploads'));

// 服务接通后的执行
app.listen(3001, () => {
    console.log('http://localhost:3001');
    console.log('成功');
    // console.log(__dirname + '/uploads')
});