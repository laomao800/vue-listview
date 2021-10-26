import type { VueConstructor, PluginObject, PluginFunction } from 'vue'
import Vue from 'vue'
import { create } from '@/create'
import _Listview from './Listview'
import _ListviewContainer from './ListviewContainer'
import './importElementUI'

type SFCWithInstall<T> = T & PluginObject<Vue>

function bindInstall(name: string, component: VueConstructor) {
  const install: PluginFunction<Vue> = (vue) => vue.component(name, component)
  // @ts-ignore
  component.install = install
  window && window.Vue && install(window.Vue as any)
  return component as SFCWithInstall<typeof component>
}

const Listview = bindInstall('Listview', _Listview)
const ListviewContainer = bindInstall('ListviewContainer', _ListviewContainer)

export default Listview
export { create, Listview, ListviewContainer }
