const express = require('express')
const { successWrap, errorWrap } = require('./utils')
const Mock = require('mockjs')

const sleep = (time = 200) =>
  new Promise((resolve) => setTimeout(resolve, time))

module.exports = (app) => {
  app.use(express.json())

  app.all('*', function (req, res, next) {
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

  app.all('/mock/listview', async (req, res) => {
    const errorFlag = req.body.error || req.query.error
    if (errorFlag === 'apiError') {
      return res.json(errorWrap('apiError'))
    } else if (errorFlag === 'httpError') {
      return res.status(500).json(errorWrap('httpError'))
    } else if (errorFlag === 'empty') {
      return res.json(successWrap({ items: [], total: 0 }))
    }

    const pageSize = req.query.page_size || req.body.page_size || 20
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
          'enable|1': true,
        },
      ],
      total: 800,
    })
    const responseData = successWrap(data)
    await sleep()
    return res.json(responseData)
  })
}
