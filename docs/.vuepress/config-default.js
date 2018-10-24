const path = require('path')
const version = process.env.VERSION || require('../../package.json').version

module.exports = {
  base: '/vue-listview/',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: `Vue Listview v${version}`
    }
  },
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
          { text: 'Methods & Events', link: '/dev/methods-and-events.md' }
        ]
      },
      {
        text: 'Demo',
        link: 'https://laomao800.github.io/vue-listview/storybook/index.html'
      },
      {
        text: 'Changelog',
        link:
          'https://github.com/laomao800/vue-listview/blob/master/CHANGELOG.md'
      },
      {
        text: '仓库地址',
        link: 'https://github.com/laomao800/vue-listview'
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
          ['/dev/methods-and-events.md', 'Methods & Events'],
          ['/dev/listview-container.md', 'Listview Container']
        ]
      }
    ]
  }
}