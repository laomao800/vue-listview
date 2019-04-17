<script>
import VNode from '@/components/v-node.js'
import ListviewHeader from '@/components/listview-header.vue'
import './style.less'

let childListviews = []

export default {
  name: 'ListviewContainer',

  components: {
    VNode,
    ListviewHeader
  },

  props: {
    headerTitle: { type: String, default: '' },
    headerNav: { type: Array, default: () => [] }
  },

  data() {
    return {
      activeTab: 0
    }
  },

  watch: {
    async activeTab(index) {
      await this.$nextTick()
      childListviews[index].componentInstance.updateLayout()
    }
  },

  render() {
    // 在 computed 内计算出该值的话会和具体渲染实例不同，导致无法触发 tableSelection 的同步事件，
    // 并且避免触发无限更新界面 childListviews 不放入组件数据内
    childListviews = this.$slots.default.filter(
      slot =>
        slot.componentOptions &&
        slot.componentOptions.Ctor.extendOptions.name.toLowerCase() ===
          'listview'
    )
    const childListviewTitles = childListviews.map(
      child => child.componentOptions.propsData.headerTitle || ''
    )
    return (
      <div class="listview-container">
        <listview-header title={this.headerTitle} nav={this.headerNav} />
        <div class="listview-container__tabs">
          {childListviewTitles.map((title, index) => (
            <span
              class={{
                'listview-container__tab': true,
                'listview-container__tab--active': index === this.activeTab
              }}
              on-click={() => (this.activeTab = index)}
            >
              {title || '未命名'}
            </span>
          ))}
        </div>

        <div class="listview-container__content">
          {childListviews.map((item, index) => (
            <keep-alive>{index === this.activeTab ? item : null}</keep-alive>
          ))}
        </div>
      </div>
    )
  }
}
</script>
