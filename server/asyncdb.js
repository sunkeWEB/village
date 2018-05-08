const mysql = require('mysql');
const {webSetting} = require('./webConfig');
const dbOptions = webSetting.database; // 数据库配置参数

const pool = mysql.createPool(dbOptions);  // 链接数据库

let query = (sql, value = '') => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        // insertLog(sql)
                        resolve(rows);
                    }
                    connection.release()
                })
            }
        })
    });
};

async function insertLog(sqls) {
    console.log(sqls);
    let sql = sqls.toLowerCase();
    if (sql.indexOf('select')>-1 && sql.indexOf('username')>-1 && sql.indexOf('userpwd')>-1) { // 登录操作
        let name = "孙轲";
        let txt = "用户孙轲登录";
        await query1(`insert into logs(czname,cztxt) values('${name}','${txt}')`);
    }
}

let query1 = (sql, value = '') => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows);
                    }
                    connection.release()
                })
            }
        })
    });
};


module.exports = {query};
