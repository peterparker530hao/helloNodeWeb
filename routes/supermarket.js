/*操作用户信息的js*/
var express = require('express');//导入express模块
var router = express.Router();//获取路由分支
var dao = require('../utility/databaseDriver');

router.get('/index',function (req, res, next) {
    res.render('index');
});

module.exports = router;
