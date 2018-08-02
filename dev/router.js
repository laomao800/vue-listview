import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'listview',
      component: () => import('./views/listview.vue')
    }
  ]
})

export default router
