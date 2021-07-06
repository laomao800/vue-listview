<script lang="tsx">
import Vue, { PropType } from 'vue'
import isPlainObject from 'lodash/isPlainObject'
import isFunction from 'lodash/isFunction'
import vNode from './VNode'
import { isVNode, hasRenderFn } from '@/utils'
import {
  FilterButton,
  FilterButtonHasChildren,
  FilterButtonHasRender,
} from '~/types'

function isValidButtonConfig(button: any) {
  return (
    button &&
    (isPlainObject(button) ||
      isFunction(button) ||
      isFunction(button.render) ||
      isVNode(button))
  )
}

function isDropdownButton(item: any): item is FilterButtonHasChildren {
  return isPlainObject(item) && Array.isArray(item.children)
}

function applyClick(clickListener: FilterButton['click'], $event: MouseEvent) {
  return isFunction(clickListener) && clickListener($event)
}

export default Vue.extend({
  name: 'FilterbarButtons',

  components: {
    vNode,
  },

  props: {
    buttons: {
      type: Array as PropType<FilterButton[]>,
      default: /* istanbul ignore next */ () => [],
    },
  },

  methods: {
    renderButton(button: FilterButton) {
      if (!isValidButtonConfig(button)) return null

      if (isFunction(button)) {
        return <vNode node={button()} />
      } else if (hasRenderFn<FilterButtonHasRender>(button)) {
        return <vNode node={button.render()} />
      } else if (isVNode(button)) {
        return <vNode node={button} />
      } else if (isDropdownButton(button)) {
        return this.renderDropdownButton(button)
      } else {
        return this.renderSingleButton(button)
      }
    },

    renderSingleButton(button: FilterButton) {
      return (
        <el-button
          type={button.type}
          plain={button.plain}
          icon={button.icon}
          on-click={($event: MouseEvent) => applyClick(button.click, $event)}
        >
          {button.text}
        </el-button>
      )
    },

    renderDropdownButton(button: FilterButtonHasChildren) {
      return (
        <el-dropdown
          type={button.type}
          split-button={button.splitButton}
          trigger="click"
          placement="bottom"
          on-click={($event: MouseEvent) => applyClick(button.click, $event)}
        >
          {button.splitButton ? (
            [button.icon && <i class={button.icon} />, button.text]
          ) : (
            <el-button
              type={button.type}
              icon={button.icon}
              on-click={($event: MouseEvent) =>
                applyClick(button.click, $event)
              }
            >
              {button.text}
              <i class="el-icon-arrow-down el-icon--right" />
            </el-button>
          )}
          <el-dropdown-menu slot="dropdown">
            {button.children.map((child) => (
              <el-dropdown-item
                {...{
                  nativeOn: {
                    click: ($event: MouseEvent) =>
                      applyClick(child.click, $event),
                  },
                }}
              >
                {child.icon && <i class={child.icon} />}
                {child.text}
              </el-dropdown-item>
            ))}
          </el-dropdown-menu>
        </el-dropdown>
      )
    },
  },

  render() {
    return (
      <el-form-item>
        {this.buttons.map((button) => this.renderButton(button))}
      </el-form-item>
    )
  },
})
</script>
