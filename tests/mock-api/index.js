const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')

module.exports = app => {
  app.use(bodyParser.json())

  // 将 tests/mock-api/routes 下的所有 mock 路由配置注册在 mockPath 路径下
  const mockPath = '/mock'
  fs.readdirSync(path.join(__dirname, 'routes')).forEach(routeFileName => {
    app.use(mockPath, require(`./routes/${routeFileName}`)(app))
  })
}
