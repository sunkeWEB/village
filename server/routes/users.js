const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util');
const verify = util.promisify(jwt.verify); // 解密
const {webSetting} = require('./../webConfig');
const secret = webSetting.secret;
const utility = require('utility');
const {query} = require('./../asyncdb');
router.prefix('/users')

router.get('/', async (ctx, next) => {
    // ctx.body = 'this is a users response!'
    let sql = 'insert into users(title) values("sunke2")'
    let k = await query(sql);
    ctx.body = {
        msg: '登录成功',
        code: 0,
        data: k
    }
})

//登录
router.post('/login', async (ctx) => {
    let {name, pwd} = {...ctx.request.body};
    if (name === undefined || pwd === undefined) {
        const str = name === undefined ? "用户名不能为空" : "密码不能为空";
        ctx.body = {
            msg: '登录参数错误' + str,
            code: -1,
            data: []
        };
        return false;
    }
    let k = await query(`SELECT * FROM users WHERE username='${name}' and userpwd='${pwd}'`);
    if (k.length === 0) {
        ctx.body = {
            msg: '密码或者账号错误',
            code: 10001
        };
        return;
    }

    let userToken = {
        name: `${k[0].id},${k[0].username}`
    }
    let ips = ctx.request.ip.slice(7);
    let time = new Date().getTime();
    const token = jwt.sign(userToken, secret, {expiresIn: '12h'});
    ctx.cookies.set('userid', k[0].id, {
        maxAge: 800 * 60 * 60 * 1000,   // cookie有效时长 加密用户的id
    });
    ctx.body = {
        msg: '登录成功',
        code: 0,
        token,
        data: k[0]
    };
});
//修改密码
router.post('/updateinfo', async (ctx) => {
    const token = ctx.header.authorization  // 获取jwt
    // let {pwd} = {...ctx.request.body};
    let pwd = "sunke";
    let payload;
    console.log(pwd, token);
    if (!(pwd || token)) {
        ctx.body = {
            msg: '参数错误',
            code: 10001
        }
        return;
    }
    payload = await verify(token.split(' ')[1], secret);  // // 解密，获取payload payload  {name:'1,root'} 1是用户的id root是他的登录名
    let id = payload.name.split(',')[0];
    let status = await query(`update users set userpwd='${pwd}' where id =${id}`);
    ctx.body = {
        msg: '密码修改成功请重新登录',
        data: status
    };
});

router.get('/info', async ctx => {
    const userid = ctx.cookies.get('userid');
    let k = await query(`SELECT * FROM users WHERE id='${userid}'`);
    if (k.length > 0) {
        let userToken = {
            name: `${k[0].id},${k[0].username}`
        }
        let ips = ctx.request.ip.slice(7);
        let time = new Date().getTime();
        const token = jwt.sign(userToken, secret, {expiresIn: '12h'});
        ctx.body = {
            msg: '登录信息存在',
            code: 0,
            token,
            data: k[0]
        };
    } else {
        ctx.body = {
            code: 1,
            msg: '没找到用户相关数据'
        };
    }
});

// function md5(value) {
//     const k = webSetting.idsecrect;
//     value = value + k;
//     return utility.md5(utility.md5(value));
// }

module.exports = router;
