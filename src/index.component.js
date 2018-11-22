import _ from 'lodash'
import Listview from './listview'
import ListviewContainer from './listview-container'

Listview.install = function(Vue, options = {}) {
  Vue.component(Listview.name, Listview)
  if (_.isPlainObject(options)) {
    Vue.prototype.$LISTVIEW = _.pick(options, [
      'validateResponse',
      'resolveResponseErrorMessage',
      'transformRequestData',
      'transformResponseData',
      'contentDataMap'
    ])
  }
}

ListviewContainer.install = function(Vue) {
  Vue.component(ListviewContainer.name, ListviewContainer)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Listview)
  window.Vue.use(ListviewContainer)
}

export default Listview
export { Listview, ListviewContainer }
