var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'root',
    database: 'test'
});


//列出所有
router.post('/Login', function (req, res, next) {
    connection.connect();
    var name = req.body.name;
    var password = req.body.password;
    var sex = req.body.sex;

    var sql = 'select * from users where name=? and password=?';
    var addSqlParams=[name,password];
    connection.query(sql, addSqlParams,function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.redirect('http://localhost:3000/');
            return;
        }
        console.log('----------------------------------------------SELECT------------------------------------------------------');
        console.log(result);
        console.log('----------------------------------------------------------------------------------------------------------\n\n\n');
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
       if(result.length)
           res.end('登录成功！');
       else
           res.end('登录失败！');
    });
    connection.end();
});




//列出所有
router.get('/queryList', function (req, res, next) {
    connection.connect();
    var sql = 'select * from users';
    connection.query(sql, function (err, result) {
        if (err) {
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        console.log('----------------------------------------------SELECT------------------------------------------------------');
        console.log(result);
        console.log('----------------------------------------------------------------------------------------------------------\n\n\n');
    });
    connection.end();
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    res.end('查询完成！请看控制台。');
});

//新增数据
router.post('/addUser', function (req, res, next) {
        var addSql = 'INSERT INTO users(name,password,sex) VALUES(?,?,?)';
        var name = req.body.name;
        var password = req.body.password;
        var sex = req.body.sex;
        var addSqlParams = [name, password, sex];

        connection.query(addSql, addSqlParams, function (err, result) {
                if (err) {
                    console.log('[INSERT ERROR] - ', err.message);
                    return;
                }
                console.log('------------------------------------------INSERT------------------------------------------------------');
                console.log('INSERT ID:', result);
                console.log('----------------------------------------------------------------------------------------------------------\n\n\n');
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
            res.end('处理完毕！请看控制台。')
            }
        );

    }
);

//更新数据
router.put('/updateUser', function (req, res, next) {
        var addSql = 'update  users set age = ? , sex = ? where name = ?';
        var name = req.body.name;
        var age = req.body.age;
        var sex = req.body.sex;
        var addSqlParams = [age, sex, name];

        connection.query(addSql, addSqlParams, function (err, result) {
                if (err) {
                    console.log('[UPDATE ERROR] - ', err.message);
                    return;
                }
                console.log('------------------------------------------UPDATE----------------------------------------------------------------');
                console.log('UPDATE ID:', result);
                console.log('----------------------------------------------------------------------------------------------------------\n\n\n');
            }
        );
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end('修改完毕！请看控制台。')
    }
);


//删除数据
router.delete('/deleteUser', function (req, res, next) {
        var addSql = 'delete from users where name = ?';
        var name = req.body.name;
        var addSqlParams = [name];

        connection.query(addSql, addSqlParams, function (err, result) {
                if (err) {
                    console.log('[DELETE ERROR] - ', err.message);
                    return;
                }
                console.log('------------------------------------------DELETE----------------------------------------------------------------');
                console.log('DELETE ID:', result);
                console.log('----------------------------------------------------------------------------------------------------------\n\n\n');
            }
        );
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end('删除完毕！请看控制台。')
    }
);

//删除数据
router.delete('/deleteUser/:name', function (req, res, next) {
        var addSql = 'delete from users where name = ?';
        var name = req.params.name;
        var addSqlParams = [name];
        debugger
        connection.query(addSql, addSqlParams, function (err, result) {
                if (err) {
                    console.log('[DELETE ERROR] - ', err.message);
                    return;
                }
                console.log('------------------------------------------DELETE----------------------------------------------------------------');
                console.log('DELETE ID:', result);
                console.log('----------------------------------------------------------------------------------------------------------\n\n\n');
            }
        );
        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
        res.end('删除完毕！请看控制台。')
    }
);


module.exports = router;
