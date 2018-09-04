const path = require('path')
const fs = require('fs')
const ftpConfigFile = path.join(__dirname, './ftp.local.js')

if (!fs.existsSync(ftpConfigFile)) {
  console.error(`[Error] ${ftpConfigFile} is not exists.`)
} else {
  const ftpConfig = require(ftpConfigFile)
  const FtpDeploy = require('ftp-deploy')
  const deployService = new FtpDeploy()

  const config = {
    host: ftpConfig.host,
    user: ftpConfig.user,
    password: ftpConfig.password,
    localRoot: path.join(__dirname, '../docs/.vuepress/dist'),
    remoteRoot: '/pps/bg-pps-vue-listview-doc',
    include: ['**/*'],
    exclude: []
  }

  deployService
    .deploy(config)
    .then(res => console.log('finished'))
    .catch(err => console.log(err))
}
