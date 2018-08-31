import _ from 'lodash'
import get from 'get-value'

export default {
  props: {
    model: { type: Object, default: () => ({}) },
    field: { type: Object, default: () => ({}) }
  },

  computed: {
    value: {
      get() {
        return get(this.model, this.field.model)
      },
      set(newVal) {
        const model = this.model
        const schema = this.field.model
        this.$set(model, schema, newVal)
      }
    },
    mergedProps() {
      const defaultProps = _.isPlainObject(this.defaultProps)
        ? this.defaultProps
        : {}
      const componentProps = _.isPlainObject(this.field.componentProps)
        ? this.field.componentProps
        : {}
      return _.merge(defaultProps, componentProps)
    }
  }
}
