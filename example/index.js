import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './app.vue'
import 'normalize.css'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.config.performance = true

new Vue({
  render: h => h(App)
}).$mount('#app')
