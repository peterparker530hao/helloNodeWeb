/*操作用户信息的js*/
var express = require('express');//导入express模块
var router = express.Router();//获取路由分支
var dao = require('../utility/databaseDriver');


//登录
router.post('/Login', function (req, res, next) {
    var name = req.body.name;
    var password = req.body.password;
    var sql = "select * from users where name=" + dao.escape(name) + " and password=" + dao.escape(password);

    dao.execute(sql, function (err, vals, fields) {
        if (err) {
            console.log('查询出错！', err.message);
            res.send({error:'登录失败'});
        } else {
            console.log('\n\n\n----------------------------------------------SELECT------------------------------------------------------');
            console.log(vals);
            console.log('----------------------------------------------------------------------------------------------------------\n\n\n');
            if (vals.length) {
                res.cookie('nodeUser',vals[0]);
                res.send({message:'登录成功！'});
            } else {
                res.send({error:'登录失败'});
            }
        }

    });
});


module.exports = router;
