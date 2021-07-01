import Vue from 'vue'

export default Vue.extend({
  inject: {
    lvStore: { default: () => ({}) },
  },

  methods: {
    $rootEmitProxy(event: string, ...args: any[]) {
      this.lvStore.$rootEmitProxy(event, ...args)
    },
  },
})
