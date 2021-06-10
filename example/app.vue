<template>
  <div id="app">
    <listview />
    <listview2 />
  </div>
</template>

<script>
import './common.less'
import { create as createListview } from '@/create'

const { component: component1 } = createListview({
  defaultSlots: {
    filterbar: (props) => <filterbar {...{ attrs: { props } }} />,
    content: () => <div>123</div>,
  },
  searchButton: { type: 'primary', text: '123' },
  resetButton: { text: '333' },

  // usePage: '',
  // pagePosition: '',
  // pageSizes: '',
  // pageSize: '',
  // pageProps: '',

  // transformRequestData: '',
  // transformResponseData: '',
  // resolveResponseErrorMessage: '',
  // contentDataMap: '',
})
const { component: component2 } = createListview()

export default {
  name: 'App',

  components: {
    Listview: component1,
    Listview2: component2,
  },
}
</script>

<style>
html,
body,
#app {
  height: 100%;
}
</style>
