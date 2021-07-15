<script lang="tsx">
import Vue, { VNode as VNodeType } from 'vue'
import get from 'lodash/get'
import ListviewHeader from '@/components/ListviewHeader.vue'

function getListviewTitle(node: VNodeType, defaultTitle = '') {
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
    childViews(): VNodeType[] {
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
        <listview-header title={this.headerTitle} nav={this.headerNav} />
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
