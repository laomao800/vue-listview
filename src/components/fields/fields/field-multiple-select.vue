<template functional>
  <field-select v-bind="data.attrs" v-on="listeners"/>
</template>

<script>
import FieldSelect from './field-select'

export default {
  name: 'FieldMultipleSelect',

  components: { FieldSelect }
}
</script>
