import Vue, { VueConstructor, PluginFunction } from 'vue'
import { create } from '@/create'
import _Listview from './Listview'
import _ListviewContainer from './ListviewContainer'
import './importElementUI'

type SFCWithInstall<T> = T & { install(vue: Vue): void }

function bindInstall(component: VueConstructor<Vue>) {
  const install: PluginFunction<Vue> = (vue) =>
    vue.component(component.name, component)

  // @ts-ignore
  component.install = install

  window && window.Vue && install(window.Vue as any)

  return component as SFCWithInstall<typeof component>
}

const Listview = bindInstall(_Listview)
const ListviewContainer = bindInstall(_ListviewContainer)

export default Listview
export { create, Listview, ListviewContainer }
