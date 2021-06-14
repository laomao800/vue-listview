import Vue from 'vue'

export default Vue.extend({
  // @ts-ignore
  abstract: true,
  name: 'VNode',
  props: ['node'],
  render() {
    /* istanbul ignore next */
    return this.node
  },
})
