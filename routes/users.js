/*操作用户信息的js*/
var express = require('express');//导入express模块
var router = express.Router();//获取路由分支
var dao = require('../utility/databaseDriver');


//登录
router.post('/Login', function (req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    var sql = "select * from users where name="+dao.escape(name)+" and password="+dao.escape(password);

    dao.execute(sql,function (err, vals, fields) {
        if (err) {
            console.log('查询出错！', err.message);
             res.render('index');
        } else {
            console.log('\n\n\n----------------------------------------------SELECT------------------------------------------------------');
            console.log(vals);
            console.log('----------------------------------------------------------------------------------------------------------\n\n\n');
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});

            if (vals.length) {
                res.end('登录成功！');
            } else {
                res.end('登录失败！');
            }
        }
    });
});

//列出所有
router.get('/queryList', function (req, res, next) {

    var sql = 'select * from users';
    dao.execute(sql, function (err, vals, fields) {
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        console.log('----------------------------------------------SELECT------------------------------------------------------');
        console.log(vals);
        console.log('----------------------------------------------------------------------------------------------------------\n');
        res.end('查询完成！请看控制台。');
    })
});


module.exports = router;
