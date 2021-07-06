<template functional>
  <field-select v-bind="data.attrs" :style="data.style" v-on="listeners" />
</template>

<script>
import FieldSelect from './Select'

export default {
  name: 'FieldMultipleSelect',

  components: { FieldSelect },

  // created() {
  //   if (!Array.isArray(this.value)) {
  //     this.value = []
  //   }
  // },
}
</script>
