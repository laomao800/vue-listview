<template>
  <div id="app">
    <listview-page />
  </div>
</template>

<script>
import './views/common.less'
import ListviewPage from './views/listview'

export default {
  name: 'App',
  components: {
    ListviewPage
  }
}
</script>

<style>
/* stylelint-disable selector-max-type */
html,
body,
#app {
  height: 100%;
}
</style>
