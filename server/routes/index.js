const router = require('koa-router')()
const {query} = require('./../asyncdb');

router.get('/', async (ctx, next) => {
    await ctx.render('index', {
        title: 'Hello Koa 2!'
    })
})

router.get('/string', async (ctx, next) => {
    ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
    ctx.body = {
        title: 'koa2 json'
    }
})

router.post('/addvillage', async ctx => {
    let {townname, parentid} = {...ctx.request.body};
    if (!townname) {
        ctx.body = {
            code: -1,
            msg: "名字不能为空"
        };
        return;
    }
    parentid ? parentid : parentid = 0;  // id 代表的是城镇 最高级
    let k = await query(`insert into town(townname,parentid) values('${townname}','${parentid}')`);
    if (k) {
        ctx.body = {
            code: 0,
            msg: "添加成功",
            data: k
        };
    }
});

router.get('/readvillage', async ctx => {
    let {parentid} = {...ctx.request.query};
    parentid ? parentid : parentid = 0;
    let k = await query(`select * from town where parentid='${parentid}'`);
    if (k) {
        ctx.body = {
            code: 0,
            msg: "获取成功",
            data: k
        };
    }
});

router.post('/addposts', async ctx => {
    let {realname} = {...ctx.request.body};
    if (!realname) {
        ctx.body = {
            code: 10001,
            msg: '参数错误'
        };
        return;
    }
    let status = await query(`insert into posts(realname) values('${realname}')`);
    if (status) {
        ctx.body = {
            code: 0,
            msg: '添加职务成功'
        };
    }
});

router.get('/readposts', async ctx => {
    let status = await query(`select * from  posts`);
    if (status) {
        ctx.body = {
            code: 0,
            msg: '读取职务成功',
            data: status
        };
    }
});

router.post('/addcadrs', async ctx => {
    let {adders, card, edu, iscity, isxiapai, jointime, mingzu, oldtime, phone, realname, scqk, sex, townid, village,oldpost,beizhu} = {...ctx.request.body};
    console.log(`insert into cadre(adders,card,edu,iscity,isxiapai,jointime,mingzu,oldtime,phone,realname,scqk,sex,townid,village,oldpost,beizhu)
    values('${adders}','${card}','${edu}',${iscity},${isxiapai},'${jointime}','${mingzu}','${oldtime}','${phone}','${realname}',${scqk},${sex},${townid},${village},${oldpost},'${beizhu})'`);
    let stateus = await query(`insert into cadre(adders,card,edu,iscity,isxiapai,jointime,mingzu,oldtime,phone,realname,scqk,sex,townid,village,oldpost,beizhu)
    values('${adders}','${card}','${edu}','${iscity}',${isxiapai},'${jointime}','${mingzu}','${oldtime}','${phone}','${realname}',${scqk},${sex},${townid},${village},${oldpost},'${beizhu}')`);
    if (stateus) {
        ctx.body = {
            code: 0,
            msg: '添加信息成功'
        };
    }
});

// select a.id,a.realname,a.username,a.townid,a.role,a.roles,a.userpwd,b.townname from admins a  join town b  on a.townid = b.id
router.get('/readcadre',async ctx=>{

    let {id} = {...ctx.request.body};
    let sql = `select a.adders,a.card,a.edu,a.iscity,a.isxiapai,a.jointime,a.mingzu,a.oldtime,a.phone,a.realname,a.scqk,a.sex,a.townid,a.village,a.oldpost,a.beizhu,b.id,b.townname from cadre a`;
    if (id) {
        sql += ` where a.id=${id}`;
    }
    sql += ` join town b on a.townid=b.id`;
    console.log(sql);
    let arr = await query(sql);
    if (arr) {
        ctx.body = {
            code:0,
            msg:'获取数据成功',
            data:arr
        };
    }
});


module.exports = router
