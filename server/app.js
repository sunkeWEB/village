const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwtKoa = require('koa-jwt');
const tokenError = require('./middlreware/tokenError')
const {webSetting} = require('./webConfig');
const index = require('./routes/index')
const users = require('./routes/users')
const secret = webSetting.secret;
// error handler
onerror(app)

// 使用token验证
app.use(tokenError());
app.use(jwtKoa({secret}).unless({
    path: [/\/users\/login/, /\/users\/info/] //数组中的路径不需要通过jwt验证
}))

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))

app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
