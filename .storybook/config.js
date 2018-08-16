/* eslint-disable import/no-extraneous-dependencies */
import { configure, addDecorator } from '@storybook/vue'
import { setOptions } from '@storybook/addon-options'
import { withNotes } from '@storybook/addon-notes'
import 'normalize.css'

setOptions({
  name: 'PPS Vue Listview',
  url: 'http://192.168.1.122:3000/pps-fe/bg-pps-vue-listview',
  addonPanelInRight: true
})
addDecorator(withNotes)

const req = require.context('../stories', true, /.stories.js$/)

function loadStories() {
  req.keys().forEach(filename => req(filename))
}

configure(loadStories, module)
