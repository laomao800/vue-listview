import Vue from 'vue'
import { configure } from '@storybook/vue'
import { setOptions } from '@storybook/addon-options'
import _ from 'lodash'
import { version } from '../package.json'
import 'normalize.css'
import Listview from '@/'

Vue.use(Listview)

setOptions({
  name: `PPS Vue Listview v${version}`,
  url: 'http://192.168.1.122:3000/pps-fe/vue-listview'
  // addonPanelInRight: false
})

function loadStories() {
  const req = require.context('./stories', true, /.stories.js$/)
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
