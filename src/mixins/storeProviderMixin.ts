import Vue from 'vue'

export default Vue.extend({
  inject: {
    lvStore: { default: () => ({}) },
  },

  // computed: {
  //   requestData() {
  //     return this.lvStore.requestData
  //   },
  //   contentData() {
  //     return this.lvStore.contentData
  //   },
  // },
})
