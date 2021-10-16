const AdminUser = require('../../models/AdminUser');

module.exports = app => {

    // 通用crud接口
    // 引入框架
    const express = require('express');
    // 引入toaken
    const jwt = require('jsonwebtoken');

    const assert = require('http-assert');
    // 引入路由
    const router = express.Router({
        mergeParams: true
    });
    // 引入数据模板
    // const Category = require('../../models/Category')

    // 新建资源
    router.post('/', async(req, res) => {
        const model = await req.Model.create(req.body);
        res.send(model);
    });
    // 资源列表
    router.get('/', async(req, res) => {
        let queryOptions = {};
        if (req.Model.modelName === 'Category') {
            queryOptions.populate = 'parent';
        }
        const items = await req.Model.find().setOptions(queryOptions).limit(100);
        res.send(items);
    });
    // 资源详情
    router.get('/:id', async(req, res) => {
        const model = await req.Model.findById(req.params.id);
        res.send(model);
    });
    // 修改资源
    router.put('/:id', async(req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body);
        res.send(model);
    });
    // 删除资源
    router.delete('/:id', async(req, res) => {
        const model = await req.Model.findByIdAndDelete(req.params.id);
        console.log(model, '123');
        res.send({
            success: true
        });
    });

    // 登陆校验中间件
    const authMiddleware = require('../../middleware/auth');
    // 资源路径中间件
    const resourceMiddleware = require('../../middleware/resource');
    app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router);

    // 引入multer上传图片
    const multer = require('multer');
    // 图片路径
    const upload = multer({
        dest: __dirname + '/../../uploads',
    });
    app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async(req, res) => {
        const file = req.file;
        file.url = `http://localhost:3001/uploads/${file.filename}`;
        res.send(file);
    });


    // 登陆
    app.post('/admin/api/login', async(req, res) => {
        const { username, password } = req.body;
        // 根据用户名找用户
        const AdminUser = require('../../models/AdminUser');
        const user = await AdminUser.findOne({ username: username }).select('+password');
        if (!user) {
            console.log('用户不存在');
            return res.status(422).send({
                message: '用户名不存在'
            });
        }
        // 校验密码
        const isvalid = require('bcrypt').compareSync(password, user.password);
        console.log(isvalid);
        if (!isvalid) {
            return res.status(422).send({
                message: '密码错误'
            });
        }
        // 返回token
        const jwt = require('jsonwebtoken');
        const token = jwt.sign({ id: user._id }, app.get('secret'));
        res.send({ token });
    });

    // 错误处理函数
    app.use(async(err, req, res, next) => {
        res.status(err.statusCode || 500).send({
            message: err.message
        });
    });
};