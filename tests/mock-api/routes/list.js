const router = require('express').Router()
const { successWrap, errorWrap } = require('../utils')
const Mock = require('mockjs')

router.post('/listview/list', (request, response) => {
  const data = Mock.mock({
    'items|20': [
      {
        id: '@guid',
        sku: /SKU\d{6}/
      }
    ],
    'total|20-30': 0
  })
  const isError = !!request.body.error
  const responseData = isError ? errorWrap(data) : successWrap(data)
  return response.json(responseData)
})

module.exports = router
