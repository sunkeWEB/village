const bodyParser = require('koa-bodyparser');
const jwt = require('jsonwebtoken');
const jwtKoa = require('koa-json');
const util = require('util');
const verify = util.promisify(jwt.verify) // 解密
const {webSetting} = require('./../webConfig');
const secret = webSetting.secret;
/**
 * 判断token是否可用
 */
module.exports = function () {
    return async function (ctx, next) {
        try {
            // 获取jwt
            const token = ctx.header.authorization; // 请求头
            if (token) {
                try {
                    // 解密payload，获取用户名和ID
                    payload = await verify(token.split(' ')[1], secret)  // // 解密，获取payload
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