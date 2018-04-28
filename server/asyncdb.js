const mysql = require('mysql');
const {webSetting} = require('./webConfig');
const dbOptions = webSetting.database; // 数据库配置参数

const pool = mysql.createPool(dbOptions);  // 链接数据库

let query = (sql, value='') => {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    });
};

module.exports = {query};
