const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const router = express.Router()
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const registerSimpleRouter = () => {
  router.get('/simple/get', function(req, res) {
    console.log(req.params, 'req')
    res.json({
      msg: `hello world`
    })
  })
}
const registerBaseRouter = () => {
  router.get('/base/get', function(req, res) {
    console.log(req.query, 'req')
    res.json(req.query)
  })

  router.post('/base/post', function(req, res) {
    console.log(req.body, 'req')
    res.json(req.body)
  })

  router.post('/base/buffer', function(req, res) {
    let msg = []
    req.on('data', (chunk) => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}
const registerErrorRouter = () => {
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 5000)
  })
}
const registerExtendRouter = () => {
  router.post('/extend/post', function(req, res) {
    res.json({
      url: req.url,
      ...(req.body || {})
    })
  })

  router.get('/extend/get', function(req, res) {
    res.json({
      url: req.url
    })
  })

  router.options('/extend/options', function(req, res) {
    res.json({
      url: req.url
    })
  })

  router.delete('/extend/delete', function(req, res) {
    res.json({
      url: req.url
    })
  })

  router.head('/extend/head', function(req, res) {
    res.json({
      url: req.url
    })
  })

  router.put('/extend/put', function(req, res) {
    res.json({
      url: req.url
    })
  })

  router.patch('/extend/patch', function(req, res) {
    res.json({
      url: req.url
    })
  })

  router.get('/extend/user', function(req, res) {
    res.json({
      code: 0,
      result: {
        name: 'robin',
        age: 20
      },
      message: ''
    })
  })
  router.get('/extend/users', function(req, res) {
    const result = []
    for (let i = 0; i < 10; i++) {
      const user = {
        name: 'robin' + i,
        age: 20 + i
      }
      result.push(user)
    }
    res.json({
      code: 0,
      result,
      message: ''
    })
  })
}

registerSimpleRouter()
registerBaseRouter()
registerErrorRouter()
registerExtendRouter()

app.use(router)

const port = process.env.PORT || 8085
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})