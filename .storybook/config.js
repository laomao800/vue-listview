import Vue from 'vue'
import { configure } from '@storybook/vue'
import { setOptions } from '@storybook/addon-options'
import _ from 'lodash'
import { version } from '../package.json'
import 'normalize.css'
import { Listview, ListviewContainer } from '@/'

Vue.use(Listview)
Vue.use(ListviewContainer)

setOptions({
  name: `Vue Listview v${version}`
})

function loadStories() {
  const req = require.context('./stories', true, /.stories.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
