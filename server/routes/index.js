const router = require('koa-router')()
const {query} = require('./../asyncdb');
const multer = require('koa-multer');//加载koa-multer模块
var storage = multer.diskStorage({
    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
var upload = multer({storage: storage});

router.post('/upload', upload.single('logo'), async (ctx, next) => {
    ctx.body = {
        filename: ctx.req.file.filename//返回文件名
    }
})
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
    let {adders, card, edu, iscity, isxiapai, jointime, mingzu, oldtime, phone, realname, scqk, sex, townid, village, oldpost, beizhu, avatar} = {...ctx.request.body};
    console.log(`insert into cadre(adders,card,edu,iscity,isxiapai,jointime,mingzu,oldtime,phone,realname,scqk,sex,townid,village,oldpost,beizhu,avatar)
    values('${adders}','${card}','${edu}',${iscity},${isxiapai},'${jointime}','${mingzu}','${oldtime}','${phone}','${realname}',${scqk},${sex},${townid},${village},${oldpost},'${beizhu})','${avatar}')`);
    let stateus = await query(`insert into cadre(adders,card,edu,iscity,isxiapai,jointime,mingzu,oldtime,phone,realname,scqk,sex,townid,village,oldpost,beizhu,avatar)
    values('${adders}','${card}','${edu}','${iscity}',${isxiapai},'${jointime}','${mingzu}','${oldtime}','${phone}','${realname}',${scqk},${sex},${townid},${village},${oldpost},'${beizhu}','${avatar}')`);
    if (stateus) {
        ctx.body = {
            code: 0,
            msg: '添加信息成功'
        };
    }
});

// select a.id,a.realname,a.username,a.townid,a.role,a.roles,a.userpwd,b.townname from admins a  join town b  on a.townid = b.id
router.get('/readcadre', async ctx => {
    let {id, name, townid, villagesid} = {...ctx.request.query};
    let sql = `select a.*,b.id as bid,b.townname from cadre a`;
    // if (id) {
    //     sql += ` where a.id=${id}`;
    // }
    sql += ` join town b on a.townid=b.id`;

    let asd = {
        'name': {
            data: name ? `"${name}"` : null,
            sqlKey: "a.realname"
        },
        'townid': {
            data: townid,
            sqlKey: "b.id"
        },
        'villagesid': {
            data: villagesid,
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

    console.log("---------------------------------");
    console.log(sql);
    let arr = await query(sql);
    if (arr) {
        ctx.body = {
            code: 0,
            msg: '获取数据成功',
            data: arr
        };
    }
});

// 性别 比例查询
router.get('/readsex', async ctx => {
    let m = await query(`select sum(case when sex=1 then 1 else 0 end) as boy,sum(case when sex=0 then 1 else 0 end) as giry ,count(*) as total  from cadre`); // 女
    ctx.body = {
        code: 0,
        msg: '获取数据成功',
        data: m[0]
    };
});
// 文化 比例查询
router.get('/readwen', async ctx => {
    let m = await query(`select sum(case when edu='大专' then 1 else 0 end) as daz,
      sum(case when edu='高中' then 1 else 0 end) as gaoz,
      sum(case when edu='研究生' then 1 else 0 end) as yanjiu,
      sum(case when edu='初中' then 1 else 0 end) as chuz,
      sum(case when edu='博士' then 1 else 0 end) as boshi,
      sum(case when edu='本科' then 1 else 0 end) as benke ,count(*) as total  from cadre`); //

    let {daz,gaoz,yanjiu,chuz,boshi,benke,total} = {...m[0]};

    let dzys = yanjiu + boshi + benke; // 本科及以上的总人数

    ctx.body = {
        code: 0,
        msg: '获取数据成功',
        data: {daz,dzys,gaoz,chuz,total}
    };
});

// 下派 比例查询
router.get('/readxia', async ctx => {
    let m = await query(`select sum(case when isxiapai=1 then 1 else 0 end) as isxia,sum(case when isxiapai=0 then 1 else 0 end) as noxia ,count(*) as total  from cadre`); //
    ctx.body = {
        code: 0,
        msg: '获取数据成功',
        data: m[0]
    };
});

// 年龄占比
router.get('/readage',async ctx=>{

});


// router.get('/read');

router.post('/delcadre', async ctx => {
    let {id} = {...ctx.request.body};
    if (!id) {
        ctx.body = {
            code: 10001,
            msg: '参数错误'
        };
        return;
    }
    console.log(`delete from cadre where id=${id}`);
    let status = await query(`delete from cadre where id=${id}`);
    if (status) {
        ctx.body = {
            code: 0,
            msg: '删除成功',
            data: status
        };
    }
});

// 机构管理中的职务查询
router.get('/readzw', async ctx=>{

});



module.exports = router
