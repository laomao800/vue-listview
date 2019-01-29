import Vue from 'vue'
import App from './app.vue'
import 'normalize.css'

Vue.config.productionTip = false
Vue.config.performance = true

new Vue({
  render: h => h(App)
}).$mount('#app')
