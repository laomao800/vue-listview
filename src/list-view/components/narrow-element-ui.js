import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'

const neededComponents = [
  'Button',
  'ButtonGroup',
  'Dialog',
  'Loading',
  'Pagination',
  'Form',
  'FormItem',
  'Input',
  'Select',
  'Option',
  'DatePicker',
  'TimeSelect',
  'TimePicker',
  'Cascader',
  'Table',
  'TableColumn'
]

neededComponents.forEach(name => {
  Vue.use(require('element-ui')[name])
})
