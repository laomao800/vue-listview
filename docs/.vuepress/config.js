const path = require('path')

const version =
  process.env.TARGET_VERSION || require('../../package.json').version

const base = process.env.NODE_ENV === 'production' ? '/vue-listview/' : ''

module.exports = {
  base,
  head: [
    [
      'link',
      { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  ],
  locales: {
    '/': {
      lang: 'zh-CN',
      title: `Vue Listview v${version}`,
    },
  },
  configureWebpack: (config, isServer) => {
    return {
      resolve: {
        alias: {
          '@': path.join(__dirname, '../../src'),
        },
      },
    }
  },
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use(require('markdown-it-plantuml'))
    },
  },
  themeConfig: {
    docsDir: 'docs',
    lastUpdated: '上次更新',
    repo: 'laomao800/vue-listview',
    repoLabel: '仓库地址',
    nav: [
      {
        text: 'Changelog',
        link: 'https://github.com/laomao800/vue-listview/blob/master/CHANGELOG.md',
      },
    ],
    sidebar: [
      {
        title: '基础',
        collapsable: false,
        children: [
          ['/', '使用'],
          ['/dev/migration.md', '从 1.x 迁移'],
        ],
      },
      {
        title: 'Listview',
        collapsable: false,
        children: [
          ['/dev/props.md', 'Props'],
          ['/dev/prop-filter-buttons.md', 'Prop: filterButtons'],
          ['/dev/prop-filter-fields.md', 'Prop: filterFields'],
          ['/dev/prop-table-columns.md', 'Prop: tableColumns'],
          ['/dev/slots.md', 'Slots'],
          ['/dev/methods-and-events.md', 'Methods & Events'],
        ],
      },
      ['/dev/listview-container.md', 'ListviewContainer'],
      {
        title: '定制',
        collapsable: false,
        children: [
          ['/dev/create.md', 'create'],
          ['/dev/lv-store.md', 'lvStore'],
        ],
      },
      {
        title: 'Demo',
        collapsable: false,
        children: [
          {
            title: '布局',
            children: [
              ['/demo/layout/all.md', '完整布局一览'],
              ['/demo/layout/height.md', '指定高度'],
              ['/demo/layout/auto-height.md', '自动高度'],
              [
                '/demo/layout/listview-container.md',
                '多表格容器 (ListviewContainer)',
              ],
            ],
          },
          {
            title: '常用实例',
            children: [
              ['/demo/example/filter-buttons.md', '常用操作按钮'],
              ['/demo/example/custom-filter-field.md', '自定义搜索组件'],
              ['/demo/example/validate.md', '提交前验证 / 初始提示'],
              ['/demo/example/custom-view.md', '自定义布局'],
              ['/demo/example/request-handler.md', '自定义请求方法'],
            ],
          },
        ],
      },
    ],
  },
}
