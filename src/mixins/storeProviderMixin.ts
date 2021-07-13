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
    $rootEmitProxy(event: string) {
      this.lvStore.$rootEmitProxy(event)
    },
  },
})
