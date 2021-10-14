<script lang="tsx">
import Vue, { PropType } from 'vue'
import hasValues from 'has-values'
import get from '@/utils/getValue'
import isFunction from 'lodash/isFunction'

import { FilterField, FilterFieldHasRender } from '~/types'
import storeProviderMixin from '@/mixins/storeProviderMixin'
import { isVNode, hasRenderFn } from '@/utils'
import vNode from './VNode'
import { allFieldComponents, getFieldComponent } from './fields/index'

export default Vue.extend({
  name: 'FilterbarField',

  mixins: [storeProviderMixin],

  components: { ...allFieldComponents, vNode },

  props: {
    field: {
      type: [Object, Function] as PropType<FilterField>,
    },
  },

  computed: {
    showLabel(): boolean {
      const value = get(this.lvStore.filterModel, this.field.model)
      // hasValues(null) -> true
      return value !== null && hasValues(value)
    },
  },

  render() {
    const field = this.field
    const label = field.label ? (
      <transition name="lv__field-label-trans">
        {this.showLabel && <div class="lv__field-label">{field.label}</div>}
      </transition>
    ) : null
    let content = null

    if (isFunction(field)) {
      const fieldVm = field()
      content = <vNode node={fieldVm} />
    } else if (hasRenderFn<FilterFieldHasRender>(field)) {
      const fieldVm = field.render()
      content = <vNode node={fieldVm} />
    } else if (isVNode(field)) {
      content = <vNode node={field} />
    } else {
      const FieldComponent = getFieldComponent(field.type) as any
      if (FieldComponent) {
        content = (
          <el-form-item>
            <FieldComponent
              {...{
                attrs: { field },
                style: field.width ? { width: `${field.width}px` } : null,
              }}
            />
          </el-form-item>
        )
      }
    }
    return (
      <div class="lv__field">
        {label}
        {content}
      </div>
    )
  },
})
</script>

<style lang="less">
@filter-gap-size: 10px;

.lv__field {
  position: relative;
  display: inline-block;
  margin: 0 @filter-gap-size @filter-gap-size 0;
  vertical-align: top;

  &-label {
    position: absolute;
    top: 0;
    left: 10px;
    z-index: 1;
    padding: 0 0.2em;
    font-size: 12px;
    line-height: 12px;
    color: #999;
    white-space: nowrap;
    cursor: default;
    background-color: #fff;
    opacity: 1;
    transform: translateY(-50%) scale(0.9);
    transform-origin: center bottom;

    &-trans-enter-active,
    &-trans-leave-active {
      top: 0;
      opacity: 1;
      transition: 0.2s;
    }
    &-trans-enter,
    &-trans-leave-active {
      top: 50%;
      opacity: 0;
    }
  }

  .el-form-item__content {
    > *,
    > .el-input .el-input__inner,
    > .el-select .el-input__inner,
    > .el-cascader .el-input__inner {
      vertical-align: top;
    }
  }
}
</style>
