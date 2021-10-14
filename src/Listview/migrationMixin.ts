import Vue from 'vue'
import get from '@/utils/getValue'
import camelCase from 'lodash/camelCase'
import { warn } from '@/utils/debug'
import { hasOwn } from '@/utils'

const insteadWarn = (type: string, oldName: string, newName: string) =>
  warn(
    `[Migration][${type}]: '${oldName}' is removed, use '${newName}' instead.`
  )

export default Vue.extend({
  mounted() {
    // Props
    const props = get(this, '$vnode.data.attrs', {})
    const migrationProps: Record<string, string> = {
      tableProps: 'contentProps',
      tableEvents: 'contentEvents',
      tableSelection: 'selection',
    }
    Object.entries(props).forEach(([propName, propValue]) => {
      propName = camelCase(propName)
      if (migrationProps[propName]) {
        insteadWarn('Props', propName, migrationProps[propName])
      }
      if (propName === 'filterFields') {
        if (
          Array.isArray(propValue) &&
          propValue.some((field: any) => hasOwn(field, 'get'))
        ) {
          insteadWarn('Props', 'filterFields.get()', 'transformRequestData()')
        }
      }
      if (propName === 'contentMessage') {
        if (hasOwn(propValue as any, 'message')) {
          insteadWarn('Props', 'contentMessage.message', 'contentMessage.text')
        }
      }
    })

    // Slots
    const migrationSlots: Record<string, string> = {
      'prepend-filterbar-submit': 'prepend-submit',
      'append-filterbar-submit': 'append-submit',
      'prepend-filterbar-more': 'prepend-more',
      'append-filterbar-more': 'append-more',
    }
    Object.keys(this.$slots).forEach((name) => {
      if (migrationSlots[name]) {
        insteadWarn('Slots', name, migrationSlots[name])
      }
    })
  },
})
