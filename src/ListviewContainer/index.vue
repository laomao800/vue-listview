<script lang="tsx">
import type { VNode } from 'vue'
import Vue from 'vue'
import ListviewHeader from '@/components/ListviewHeader.vue'
import { get } from '@/utils'

function getListviewTitle(node: VNode, defaultTitle = '') {
  return (
    get(node, 'data.attrs.header-title') ||
    get(node, 'data.attrs.headerTitle') ||
    defaultTitle
  )
}

export default Vue.extend({
  name: 'ListviewContainer',

  components: {
    ListviewHeader,
  },

  props: {
    headerTitle: { type: String, default: '' },
    headerNav: { type: Array, default: () => [] },
    type: { type: String, default: '' },
    tabPosition: { type: String, default: 'left' },
  },

  data() {
    return {
      activeTab: 0,
    }
  },

  computed: {
    childViews(): VNode[] {
      return (this.$slots.default || [])
        .filter((item) => !!item.tag)
        .map((item, index) => {
          item.key = `view-${index}`
          return item
        })
    },
    tabTitles(): string[] {
      return this.childViews.map((node) => getListviewTitle(node, '未命名'))
    },
  },

  render() {
    return (
      <div class="lvc__wrapper">
        <listview-header
          header-title={this.headerTitle}
          header-nav={this.headerNav}
        />
        <div
          class={{
            lvc__tabs: true,
            'lvc__tabs--line': this.type === 'line',
            'lvc__tabs--card': this.type !== 'line',
            'lvc__tabs--center': this.tabPosition === 'center',
          }}
        >
          {this.tabTitles.map((title, index) => (
            <div
              class={{
                lvc__tab: true,
                'lvc__tab--active': index === this.activeTab,
              }}
              on-click={() => (this.activeTab = index)}
            >
              <span>{title}</span>
            </div>
          ))}
        </div>

        <div class="lvc__content">
          <keep-alive>
            {this.childViews.map((item, index) =>
              index === this.activeTab ? item : null
            )}
          </keep-alive>
        </div>
      </div>
    )
  },
})
</script>
