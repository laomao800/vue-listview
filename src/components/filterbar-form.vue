<script>
import _ from 'lodash'
import hasValues from 'has-values'
import VNode from '@/components/v-node.js'
import { allComponents, getFieldComponentName } from '@/components/fields'
import { isVNode } from '@/utils/utils.js'

export default {
  name: 'FilterbarForm',

  components: {
    ...allComponents,
    VNode
  },

  props: {
    model: {
      type: Object,
      default: /* istanbul ignore next */ () => ({})
    },
    fields: {
      type: Array,
      default: /* istanbul ignore next */ () => []
    }
  },

  methods: {
    isVNode,

    isFunction: _.isFunction,

    getFieldComponentName,

    getFieldValue(field) {
      return this.model[field.model]
    },

    showFieldLabel(field) {
      const value = this.getFieldValue(field)
      // hasValues(null) -> true ，所以需要和 value 同时判断
      return value !== null && hasValues(value)
    },

    renderField(field) {
      const label = field.label ? (
        <transition name="label-trans">
          {this.showFieldLabel(field) && (
            <div class="filterbar__field-label">{field.label}</div>
          )}
        </transition>
      ) : null
      const key = field.key || field.model || null
      let content
      if (_.isFunction(field)) {
        content = <v-node node={field()} key={key} />
      } else if (_.isFunction(field.render)) {
        content = <v-node node={field.render(field)} key={key} />
      } else if (isVNode(field)) {
        content = <v-node node={field} key={key} />
      } else {
        const FieldComponent = getFieldComponentName(field.type)
        content = (
          <el-form-item key={key}>
            <FieldComponent
              form-model={this.model}
              field={field}
              style={field.width ? { width: `${field.width}px` } : null}
            />
          </el-form-item>
        )
      }
      return (
        <div ref="field" refInFor={true} class="filterbar__field">
          {label}
          {content}
        </div>
      )
    }
  },

  render() {
    return (
      <div>
        {this.fields.map(field => {
          if (Array.isArray(field)) {
            const subFieldNodes = []
            field.forEach(subField => {
              subFieldNodes.push(this.renderField(subField))
            })
            return subFieldNodes.length > 0 ? (
              <div class="filterbar__field filterbar__field--group">
                {subFieldNodes}
              </div>
            ) : null
          }
          return this.renderField(field)
        })}
      </div>
    )
  }
}
</script>

<style lang="less">
.filterbar__field-label {
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
}
.label-trans-enter-active,
.label-trans-leave-active {
  top: 0;
  opacity: 1;
  transition: 0.2s;
}
.label-trans-enter,
.label-trans-leave-active {
  top: 50%;
  opacity: 0;
}
</style>
