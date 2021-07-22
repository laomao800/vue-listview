const path = require('path')
const version = process.env.VERSION || require('../../package.json').version
const base =
  process.env.NODE_ENV === 'production'
    ? `/vue-listview${process.env.TARGET_VERSION_PATH || '/'}`
    : ''

module.exports = {
  base,
  head: [
    [
      'link',
      {
        rel: 'shortcut icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }
    ]
  ],
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
    lineNumbers: true,
    config: md => {
      md.use(require('markdown-it-plantuml'))
    }
  },
  themeConfig: {
    docsDir: 'docs',
    lastUpdated: '上次更新',
    repo: 'laomao800/vue-listview',
    repoLabel: '仓库地址',
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
          { text: 'Methods & Events', link: '/dev/methods-and-events.md' },
          { text: 'Listview Container', link: '/dev/listview-container.md' }
        ]
      },
      {
        text: 'Demo',
        items: [
          {
            text: '布局',
            items: [
              { text: '完整布局一览', link: '/demo/layout/all.md' },
              { text: '指定高度', link: '/demo/layout/fixed-height.md' },
              { text: '自动高度', link: '/demo/layout/auto-height.md' },
              {
                text: '多表格容器 (Listview Container)',
                link: '/demo/layout/listview-container.md'
              }
            ]
          },
          {
            text: '常用实例',
            items: [
              { text: '常用操作按钮', link: '/demo/example/filter-buttons.md' },
              {
                text: '自定义搜索组件',
                link: '/demo/example/custom-filter-field.md'
              },
              {
                text: '提交前验证 / 初始提示',
                link: '/demo/example/validate.md'
              },
              { text: '自定义布局', link: '/demo/example/custom-view.md' },
              {
                text: '自定义请求方法',
                link: '/demo/example/request-handler.md'
              }
            ]
          }
        ]
      },
      {
        text: 'Changelog',
        link:
          'https://github.com/laomao800/vue-listview/blob/master/CHANGELOG.md'
      }
    ],
    sidebar: {
      '/demo/': [
        {
          title: '布局',
          collapsable: false,
          children: [
            ['/demo/layout/all.md', '完整布局一览'],
            ['/demo/layout/fixed-height.md', '指定高度'],
            ['/demo/layout/auto-height.md', '自动高度'],
            [
              '/demo/layout/listview-container.md',
              '多表格容器 (Listview Container)'
            ]
          ]
        },
        {
          title: '常用实例',
          collapsable: false,
          children: [
            ['/demo/example/filter-buttons.md', '常用操作按钮'],
            ['/demo/example/custom-filter-field.md', '自定义搜索组件'],
            ['/demo/example/validate.md', '提交前验证 / 初始提示'],
            ['/demo/example/custom-view.md', '自定义布局'],
            ['/demo/example/request-handler.md', '自定义请求方法']
          ]
        }
      ],
      '/': [
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
}
