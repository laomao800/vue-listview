<template>
  <OriginSidebar :items="$attrs.items">
    <template #top>
      <VersionSwitch />
    </template>
  </OriginSidebar>
</template>

<script>
import OriginSidebar from '@parent-theme/components/Sidebar.vue'
import VersionSwitch from './VersionSwitch.vue'

export default {
  name: 'NewSidebar',
  components: {
    OriginSidebar,
    VersionSwitch,
  },
}
</script>
