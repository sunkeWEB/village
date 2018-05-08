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
let auth = require('./../middlreware/auth');
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
    let k = await query(`SELECT * FROM admins WHERE username='${name}' and userpwd='${pwd}'`);
    if (k.length === 0) {
        ctx.body = {
            msg: '密码或者账号错误',
            code: 10001
        };
        return;
    }
    let userToken = {
        name: `${k[0].id},${k[0].username}`,
        roles: `${k[0].roles}`,
        id:`${k[0].id}`
    }
    let ips = ctx.request.ip.slice(7);
    let time = new Date().getTime();
    const token = jwt.sign(userToken, secret, {expiresIn: '12h'});
    ctx.cookies.set('userid', k[0].id, {
        maxAge: 800 * 60 * 60 * 1000,   // cookie有效时长 加密用户的id
    });
    ctx.cookies.set('token', token, {
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
    let k = await query(`SELECT * FROM admins WHERE id='${userid}'`);
    if (k.length > 0) {
        let userToken = {
            name: `${k[0].id},${k[0].username}`,
            roles: `${k[0].roles}`,
            id:`${k[0].id}`
        }
        let ips = ctx.request.ip.slice(7);
        let time = new Date().getTime();
        const token = jwt.sign(userToken, secret, {expiresIn: '12h'});
        ctx.cookies.set('token', token, {
            maxAge: 800 * 60 * 60 * 1000,   // cookie有效时长 加密用户的id
        });
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

// 添加用户
router.post('/addusers', async ctx => {
    let {realname, townid, username, userpwd, role, roles} = {...ctx.request.body};
    if (!(realname || townid || username || userpwd || role)) {
        ctx.body = {
            code: 10001,
            msg: '参数错误'
        };
        return;
    }
    let sql = `insert into admins(realname, townid, username, userpwd, role, roles) values('${realname}', '${townid}', '${username}', '${userpwd}', '${role}', '${roles}')`;
    let status = await query(sql);
    ctx.body = {
        code: 0,
        msg: '添加用户成功',
        data: status
    };
});

// 读取用户

router.get('/readusers', async ctx => {
    let {pagesize, current, townid, villageid, name} = {...ctx.request.query};
    let num = parseInt(pagesize) * parseInt(current - 1);
    let sql = `select a.id,a.realname,a.username,a.townid,a.role,a.roles,a.userpwd,b.townname from admins a  join town b  on a.townid = b.id`;
    let asd = {
        'name': {
            data: name ? `"${name}"` : null,
            sqlKey: "a.realname"
        },
        'townid': {
            data: townid,
            sqlKey: "b.id"
        }
    }
    let w = '';
    for (let i in asd) {
        let d = asd[i];
        if (d.data) {
            if (w == '') w = " where "
            w += ` ${d.sqlKey} = ${d.data} and`
        }
    }
    if (w) {
        let ls = w.lastIndexOf("and") || w.length;
        w = w.slice(0, ls);
    }
    sql += w;
    sql += ` LIMIT ${num},${pagesize}`;
    let status = await query(sql);
    let sqls = `select a.*,b.*  from admins a  join town b  on a.townid = b.id`;
    let count = await query(sqls += w);
    ctx.body = {
        code: 0,
        msg: '获取用户数据成功',
        data: status,
        count: count.length === 0 ? 0 : count.length
    };
});

// 删除用户

router.post('/delusers', async ctx => {
    let {id} = {...ctx.request.body};
    if (!id) {
        ctx.body = {
            code: 10001,
            msg: '参数错误'
        };
        return;
    }
    let status = await query(`delete from admins where id=${parseInt(id)}`);
    if (status) {
        ctx.body = {
            code: 0,
            msg: '删除数据成功'
        };
    }
});

// 编辑用户信息
router.post('/updateusers', async ctx => {
    let {id, username, realname, roles, role, userpwd, townid} = {...ctx.request.body};
    if (!(id || username || userpwd || townid || realname || roles || role)) {
        ctx.body = {
            code: 10001,
            msg: '参数错误'
        };
        return;
    }
    let status = await query(`update admins set username='${username}',userpwd='${userpwd}',realname='${realname}',roles='${roles}',role='${role}',townid='${townid}' where id='${id}'`);
    if (status) {
        ctx.body = {
            code: 0,
            msg: '用户信息修改'
        };
    }

});

// function md5(value) {
//     const k = webSetting.idsecrect;
//     value = value + k;
//     return utility.md5(utility.md5(value));
// }

async function checkauth(url, token, biao) {
    let x = webSetting.autharr, k = false;
    url.indexOf(biao) > -1 ? k = x.readusers.name : null; // 判断权限取得路由的 权限名字
    payload = await verify(token.split(' ')[1], secret);  // // 解密，获取payload payload  {name:'1,root'} 1是用户的id root是他的登录名
    let userautharr = payload.roles;
    return new Promise((s1, s2) => {
        s1(JSON.parse(userautharr)[k] || false);
    })
}


module.exports = router;
