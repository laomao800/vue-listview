const router = require('express').Router()
const { successWrap, errorWrap } = require('../utils')
const Mock = require('mockjs')
var delay = require('express-delay')

module.exports = app => {
  app.use(delay(200, 1000))

  router.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
      'Access-Control-Allow-Headers',
      'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
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

  router.post('/listview', (request, response) => {
    const data = Mock.mock({
      'items|20': [
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
      total: '@integer(20, 30)'
    })
    const isError = !!request.body.error
    const responseData = isError ? errorWrap(data) : successWrap(data)
    return response.json(responseData)
  })

  return router
}
