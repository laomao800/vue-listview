import Vue from 'vue'
import pick from 'lodash/pick'
import _Listview from '@/Listview'
import StoreProvider from '@/components/StoreProvider.vue'
import ListviewLayout from '@/components/ListviewLayout.vue'
import Filterbar from '@/components/Filterbar.vue'
import ListviewContent from '@/components/ListviewContent.vue'

const allowPresetProps = [
  // @ts-ignore
  ...Object.keys(StoreProvider.options.props),
  // @ts-ignore
  ...Object.keys(ListviewLayout.options.props),
  // @ts-ignore
  ...Object.keys(Filterbar.options.props),
  // @ts-ignore
  ...Object.keys(ListviewContent.options.props),
]

export function create(options: any = {}) {
  const component = Vue.extend({
    extends: _Listview,
    data() {
      return {
        presetProps: pick(options, allowPresetProps),
      }
    },
  })

  return { component }
}
