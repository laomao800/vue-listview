<template>
  <div class="el-form-item__label">{{ field.label }}</div>
</template>

<script>
import fieldMixin from '@/mixins/fieldMixin'

export default {
  name: 'FieldLabel',

  mixins: [fieldMixin],
}
</script>
