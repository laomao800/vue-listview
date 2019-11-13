<template functional>
  <field-select v-bind="data.attrs" :style="data.style" v-on="listeners" />
</template>

<script>
import FieldSelect from './field-select'

export default {
  name: 'FieldMultipleSelect',

  components: { FieldSelect }
}
</script>
