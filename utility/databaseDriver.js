var mysql = require('mysql');
var dao = {};

var pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: 'root',
    database: 'test',
    port: 3306
});
console.log('开启数据库连接池！');


dao.execute = function (sql, callback) {
    console.log('sql为<'+sql+'>，在获取数据库连接之前有' + pool._allConnections.length + '条连接！');
    pool.getConnection(function (err, connection) {
        if (err) {//如果有错就打印并返回
            console.log('获取数据库连接失败！' + err);
        } else {
            console.log('获取数据库连接成功！' + '当前有' + pool._allConnections.length + '条连接！');
            connection.query(sql, function (qerr, vals, fields) {
                if (qerr) {//执行失败
                    console.log('执行失败:', qerr.message);
                    callback(qerr);
                } else {//执行成功
                    console.log('执行成功！');
                    callback(qerr, vals, fields);//事件驱动回调
                }
                repay(connection);//释放连接
            });

        }
    });
};

dao.escape = function (identifier) {
    return pool.escape(identifier);
};
dao.connection = function (identifier) {
    return pool.escapeId(identifier);
};


repay = function (connection) {
    pool.releaseConnection(connection);
    console.log('放回数据库连接池成功！' + '当前有' + pool._allConnections.length + '条连接！');
};

module.exports = dao;