export default {
  abstract: true,
  name: 'VNode',
  props: ['node'],
  render() {
    return this.node
  }
}
