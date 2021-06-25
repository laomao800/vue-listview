<script lang="tsx">
import Vue from 'vue'
import parseSize from '@laomao800/parse-size-with-unit'
import debounce from 'lodash/debounce'
import storeProviderMixin from '@/mixins/storeProviderMixin'

function isDom(item: any): item is Element {
  return item instanceof Element
}

function getIntStyleValue(el: Element, prototype: string) {
  return parseInt(getComputedStyle(el)[prototype as any], 10) || 0
}

function getElBottomOffset(el: Element) {
  const bottomOffset =
    getIntStyleValue(el, 'padding-bottom') +
    getIntStyleValue(el, 'margin-bottom') +
    getIntStyleValue(el, 'border-bottom-width')
  return bottomOffset
}

export default Vue.extend({
  name: 'ListviewLayout',

  inheritAttrs: false,

  mixins: [storeProviderMixin],

  props: {
    height: { type: [String, Number], default: null },
    fullHeight: { type: Boolean, default: true },
  },

  data(): {
    wrapperHeight: null | number | string
    contentHeight: null | number
  } {
    return {
      wrapperHeight: null,
      contentHeight: null,
    }
  },

  computed: {
    contentLoading(): boolean {
      return this.lvStore.contentLoading
    },
    bottomOffset(): number {
      return getElBottomOffset(this.$el)
    },
    footerHeight(): number {
      return this.getSlotHeight('footer')
    },
  },

  mounted() {
    this.updateLayout()

    if (this.fullHeight) {
      window.addEventListener('resize', this._updateLayout)
    }
  },

  beforeDestroy: /* istanbul ignore next */ function () {
    window.removeEventListener('resize', this._updateLayout)
  },

  methods: {
    _updateLayout: debounce(
      function () {
        // @ts-ignore
        this.updateLayout()
      },
      0,
      { leading: true }
    ),

    updateLayout() {
      this.updateWrapperHeight()
      this.updateContentHeight()
      this.$emit('update-layout')
    },

    updateWrapperHeight() {
      if (this.height) {
        this.wrapperHeight = this.height
      } else if (this.fullHeight) {
        this.wrapperHeight = window.innerHeight
      } else {
        this.wrapperHeight = null
      }
    },

    updateContentHeight() {
      let maxHeight = 0
      if (this.height) {
        maxHeight = this.$el.getBoundingClientRect().height
      } else if (this.fullHeight) {
        maxHeight = window.innerHeight
      } else {
        // 自动高度
        return
      }

      if (isDom(this.$refs.content)) {
        // 指定高度时，需要从 $el 位置开始计算 top 高度，
        // 确保处于 listview-container 容器内的高度能铺满
        const wrapOffsetTop = this.wrapperHeight
          ? this.$el.getBoundingClientRect().top
          : 0
        const contentOffsetTop = this.$refs.content.getBoundingClientRect().top
        const contentHeight =
          maxHeight +
          wrapOffsetTop -
          contentOffsetTop -
          this.bottomOffset -
          this.footerHeight
        this.contentHeight = contentHeight
      }
    },

    getSlotHeight(name: string): number {
      const slot = this.$refs[name] as Element
      return slot ? slot.getBoundingClientRect().height : 0
    },

    renderSlot(name: string, scopeProps = {}) {
      return (
        this.$scopedSlots[name] && (
          <div class={`lv__${name}-wrapper`} ref={name}>
            {(this.$scopedSlots as any)[name](scopeProps)}
          </div>
        )
      )
    },
  },

  render() {
    const scopeProps = {
      contentHeight: this.lvStore.contentHeight,
      contentLoading: this.lvStore.contentLoading,
      contentData: this.lvStore.contentData,
      filterModel: this.lvStore.requestData,
      contentMessage: this.lvStore.internalContentMessage,
    }

    return (
      <div
        style={{ height: parseSize(this.wrapperHeight) }}
        class="lv__wrapper"
      >
        {this.renderSlot('header')}
        {this.renderSlot('filterbar')}
        <div v-loading={this.contentLoading}>
          {this.renderSlot('content', scopeProps, {
            style: {
              height: parseSize(this.contentHeight),
              overflow: 'auto',
            },
          })}
          {this.renderSlot('footer')}
        </div>
      </div>
    )
  },
})
</script>

<style>
.lv__wrapper {
  overflow: hidden;
  box-sizing: border-box;
  padding: 10px;
  padding-bottom: 5px;
  background-color: #fff;
  border: 5px solid #f0f2f5;
}

.lv__wrapper > * {
  box-sizing: border-box;
}
</style>
