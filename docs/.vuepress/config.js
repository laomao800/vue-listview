const pkgConfig = require('../../package.json')

const base =
  process.env.DOC_MODE === 'build' ? '/pps/bg-pps-vue-listview-doc/' : '/'

module.exports = {
  base,
  title: `PPS Vue Listview v${pkgConfig.version}`,
  themeConfig: {
    docsDir: 'docs',
    lastUpdated: '上次更新',
    nav: [
      {
        text: '仓库地址',
        link: 'http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview'
      }
    ],
    sidebar: [['/layout', '布局']]
  }
}
