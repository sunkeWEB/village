const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const jwtKoa = require('koa-json');
const util = require('util');
const verify = util.promisify(jwt.verify) // 解密
const {webSetting} = require('./../webConfig');
const {query} = require('./../asyncdb');
const secret = webSetting.secret;
/**
 * 判断token是否可用
 */

function checkUrl (url) {
    if (url.includes('/users/readusers')) {
        return "xxdd" // 用户信息读取
    }else if (url.includes('/users/addusers')) {
        return "xxdd" // 用户添加
    }
}

function filter (url) {
    let publicpath = ['users/info','/readvillage','/users/readusers'];
    let f = false;
    publicpath.map(v => {
        if (url.includes(v)) {
            f = true;
        }
    });
    return f;
}


module.exports = function () {
    return async function (ctx, next) {
        let payload = "";
        const token = ctx.header.authorization; // 请求头
        // if (!(filter(ctx.url))) { // 白名单
        //     payload = await verify(token.split(' ')[1], secret);  // // 解密，获取payload payload  {name:'1,root'} 1是用户的id root是他的登录名
        //     let userid = payload.id;
        //     let s = await query(`select * from admins where id=${userid}`);
        //     let auth = JSON.parse(s[0].roles); // 得到用户权限
        //     let pathname = checkUrl(ctx.url);
        //     console.log(auth);
        //     if (!(auth[pathname])) {
        //         ctx.body = {
        //             code:10002,
        //             msg:'无权限进行操作',
        //             data:[]
        //         };
        //         return;
        //     }
        // }
        try {
            // 获取jwt
            if (token) {
                try {
                    // 解密payload，获取用户名和ID
                    ctx.body = {
                        code: 1,
                        msg: '请求地址不存在'
                    };
                } catch (err) {
                    console.log('身份验证失败: ', err)
                }
            }
            await next();
        } catch (err) {
            if (err.status === 401) {
                ctx.status = 401;
                ctx.body = {
                    code: 0,
                    mag: 'token失效 认证失败'
                };
            } else {
                err.status = 404;
                ctx.body = {
                    code: 0,
                    msg: '404',
                    data: err
                };
            }
        }
    }
}