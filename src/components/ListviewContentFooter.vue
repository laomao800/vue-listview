<script lang="tsx">
import Vue from 'vue'
// import pick from 'lodash/pick'
import storeProviderMixin from '@/mixins/storeProviderMixin'

export default Vue.extend({
  name: 'ListviewContentFooter',

  mixins: [storeProviderMixin],

  computed: {
    usePage() {
      return this.lvStore.usePage
    },
    pagePosition() {
      return this.lvStore.pagePosition
    },
    currentPage: {
      get() {
        return this.lvStore.currentPage
      },
      set(val) {
        this.lvStore.currentPage = val
      },
    },
    currentPageSize: {
      get() {
        return this.lvStore.currentPageSize
      },
      set(val) {
        this.lvStore.currentPageSize = val
      },
    },
    mergedPageProps(): any {
      return {
        pageSize: this.currentPageSize,
        pageSizes: this.lvStore.pageSizes,
        background: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        ...this.lvStore.pageProps,
        total: this.lvStore.contentData.total,
        currentPage: this.currentPage,
      }
    },
  },

  methods: {
    handleSizeChange(pageSize: number) {
      this.currentPageSize = pageSize
      this.currentPage = 1
    },
    handleCurrentChange(currentPage: number) {
      this.currentPage = currentPage
    },
  },

  render() {
    const pagination = this.usePage && (
      <el-pagination
        {...{ props: this.mergedPageProps }}
        ref="pagination"
        class="lv__pager"
        on-size-change={this.handleSizeChange}
        on-current-change={this.handleCurrentChange}
      />
    )

    return (
      <div class="lv__footer">
        <div class="lv__footer-left">
          <slot name="footer-left">
            {this.pagePosition !== 'right' && pagination}
          </slot>
        </div>

        <div class="lv__footer-center">
          <slot name="footer-center" />
        </div>

        <div class="lv__footer-right">
          <slot name="footer-right">
            {this.pagePosition === 'right' && pagination}
          </slot>
        </div>
      </div>
    )
  },
})
</script>

<style lang="less">
.lv__footer {
  display: flex;
  padding-top: 5px;

  &-left,
  &-center,
  &-right {
    display: flex;
    flex: 1;
    align-items: center;
  }

  &-left {
    justify-content: flex-start;
  }
  &-center {
    flex: inherit;
    justify-content: center;
  }
  &-right {
    justify-content: flex-end;
  }
}
</style>