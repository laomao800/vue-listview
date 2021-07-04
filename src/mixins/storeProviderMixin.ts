import Vue from 'vue'

export default Vue.extend({
  inject: {
    lvStore: {
      default: () => ({
        filterModel: {},
      }),
    },
  },

  methods: {
    $rootEmitProxy(event: string, ...args: any[]) {
      this.lvStore.$rootEmitProxy(event, ...args)
    },
  },
})
