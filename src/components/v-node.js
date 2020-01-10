export default {
  abstract: true,
  name: 'VNode',
  props: ['node'],
  render() {
    /* istanbul ignore next */
    return this.node
  }
}
