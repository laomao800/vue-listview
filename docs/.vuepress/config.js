const path = require('path')
const pkgConfig = require('../../package.json')

const base =
  process.env.DOC_MODE === 'build' ? '/pps/bg-pps-vue-listview-doc/' : '/'

module.exports = {
  base,
  title: `PPS Vue Listview v${pkgConfig.version}`,
  configureWebpack: (config, isServer) => {
    return {
      resolve: {
        alias: {
          '@': path.join(__dirname, '../../src')
        }
      }
    }
  },
  markdown: {
    config: md => {
      md.use(require('markdown-it-plantuml'))
    }
  },
  themeConfig: {
    docsDir: 'docs',
    lastUpdated: '上次更新',
    nav: [
      {
        text: '基本使用',
        link: '/'
      },
      {
        text: '开发指南',
        items: [
          { text: 'Props 一览', link: '/dev/props.md' },
          { text: 'Prop: filterButtons', link: '/dev/prop-filter-buttons.md' },
          { text: 'Prop: filterFields', link: '/dev/prop-filter-fields.md' },
          { text: 'Prop: tableColumns', link: '/dev/prop-table-columns.md' },
          { text: 'Slots', link: '/dev/slots.md' },
          { text: 'Methods', link: '/dev/methods.md' }
        ]
      },
      {
        text: '仓库地址',
        link: 'http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview'
      }
    ],
    sidebar: [
      ['/', '基本使用'],
      {
        title: '开发指南',
        collapsable: false,
        children: [
          ['/dev/props.md', 'Props 一览'],
          ['/dev/prop-filter-buttons.md', 'Prop: filterButtons'],
          ['/dev/prop-filter-fields.md', 'Prop: filterFields'],
          ['/dev/prop-table-columns.md', 'Prop: tableColumns'],
          ['/dev/slots.md', 'Slots'],
          ['/dev/methods.md', 'Methods']
        ]
      }
    ]
  }
}
