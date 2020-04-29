const router = require('express').Router()
const { successWrap, errorWrap } = require('../utils')
const Mock = require('mockjs')
const delay = require('express-delay')

module.exports = app => {
  app.use(delay(200, 1000))

  router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
    )
    res.header(
      'Access-Control-Allow-Methods',
      'PUT, POST, GET, DELETE, OPTIONS'
    )

    if (req.method === 'OPTIONS') {
      res.send(200)
    } else {
      next()
    }
  })

  router.post('/listview', (req, res) => {
    if (req.body.error) {
      return res.json(errorWrap('演示接口返回错误信息'))
    }
    const pageSize = req.body.page_size || 20
    const data = Mock.mock({
      [`items|${pageSize}`]: [
        {
          id: '@guid',
          sku: /SKU\d{6}/,
          name: '@ctitle(10, 30)',
          'warehouse|1': ['中仓', '英仓', '美仓', '香港仓'],
          sale_price: '@integer(100, 2000)',
          discount: '@float(0, 0, 1, 99)',
          seller: '@cname',
          date: '@date',
          quantity: '@integer(10, 200)',
          'enable|1': true
        }
      ],
      total_count: 800
    })
    const responseData = successWrap(data)
    return res.json(responseData)
  })

  router.all('/listview-empty', (req, res) => {
    const responseData = successWrap({
      items: [],
      total_count: 0
    })
    return res.json(responseData)
  })

  router.all('/listview-error', (req, res) => {
    return res.json(errorWrap('演示接口返回错误信息'))
  })

  router.all('/500', (req, res) => {
    return res.status(500).json(errorWrap('演示接口返回 500 错误信息'))
  })

  return router
}
