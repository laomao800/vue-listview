import _ from 'lodash'
import Listview from './listview'
import ListviewContainer from './listview-container'

Listview.install = function(Vue, options = {}) {
  Vue.prototype.$LISTVIEW = {}

  // Function type prop
  const fnProp = [
    'validateResponse',
    'resolveResponseErrorMessage',
    'transformRequestData',
    'transformResponseData'
  ]
  fnProp.forEach(prop => {
    if (_.isFunction(options[prop])) {
      Vue.prototype.$LISTVIEW[prop] = options[prop]
    }
  })
  if (_.isPlainObject(options['contentDataMap'])) {
    Vue.prototype.$LISTVIEW['contentDataMap'] = options['contentDataMap']
  }
  if (_.isPlainObject(options['usePage']) || _.isBoolean('usePage')) {
    Vue.prototype.$LISTVIEW['usePage'] = options['usePage']
  }

  Vue.component(Listview.name, Listview)
}

ListviewContainer.install = function(Vue) {
  Vue.component(ListviewContainer.name, ListviewContainer)
}

if (typeof window !== 'undefined' && window.Vue) {
  Listview.install(window.Vue)
  ListviewContainer.install(window.Vue)
}

export default Listview
export { Listview, ListviewContainer }
