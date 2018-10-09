export default {
  functional: true,
  name: 'VNode',
  props: ['node'],
  render(h, context) {
    return context.props.node
  }
}
