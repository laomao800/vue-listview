import { create } from '@/create'
import Listview from './Listview'
import './importElementUI'

// @ts-ignore
Listview.install = function (Vue) {
  Vue.component(Listview.name, Listview)
}

if (typeof window !== 'undefined' && window.Vue) {
  // @ts-ignore
  Listview.install(window.Vue)
}

export default Listview
export { Listview, create }
