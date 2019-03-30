const Koa = require('koa')
const Router = require('koa-router')
const static = require('koa-static')
const render = require('koa-ejs')
const mongoose = require('mongoose')
const path = require('path')
const pckg = require('./package.json')
const config = require('./config')
const koaBody = require('koa-body')

/* Middlewares */
const main = require('./server/main')
const shortestWordServices = require('./server/api/shortestword');
const userServices = require('./server/api/user');

const app = new Koa()
const router = new Router()

mongoose.connect(config.mongodb)
mongoose.connection.on('error', console.error.bind(console, `Please check your mongo connection: ${config.mongodb}`))
mongoose.connection.once('open', console.info.bind(console, `Is it connected to mongo at: ${config.mongodb}`))

render(app, {
  root: path.join(__dirname, 'server/views'),
  layout: 'template',
  viewExt: 'html',
  cache: false,
  debug: true
})

app.use(static('public/js'))
app.use(static('public/css'))

app.use(async function (ctx, next) {
  try {
    return await next()
  } catch (err) {
    if (ctx.header['content-type'] === 'application/json') {
      ctx.type = 'application/json'
      ctx.status = +(err.status)
      ctx.body = {
        message: err.message
      }
    }
  }
})
app.use(koaBody());

router.post('/api/shortestword', shortestWordServices.method);
router.post('/api/users', userServices.createUser);
router.get('/api/users', userServices.users);
router
  .get('/', main.render)

app
  .use(router.routes())
  .use(router.allowedMethods())

if (module.parent) {
  module.exports = app
} else {
  mongoose.connection.once('open', () => {
    app.listen(config.port, function () {
      console.info('process.env.NODE_ENV', process.env.NODE_ENV)
      console.info('version', pckg.version)
      console.info(JSON.stringify(config))
    })

    console.info.bind(console, `Is it connected to mongo at: ${config.mongodb}`)
  })
}
