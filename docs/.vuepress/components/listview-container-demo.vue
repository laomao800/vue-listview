<template>
  <listview-container
    :header-title="'列表容器'"
    :header-nav="[{ text: '菜单1' }, { text: '菜单2' }]"
  >
    <listview
      header-title="演示列表1"
      :full-height="false"
      :filter-fields="[
        {
          type: 'select',
          model: 'error',
          label: '接口错误',
          options: [{ label: '触发500错误', value: 1 }]
        },
        {
          type: 'text',
          model: 'name',
          label: '文本字段',
          componentSlots: {
            prepend: '$',
            append: '$'
          },
          componentProps: {
            'suffix-icon': 'el-icon-date'
          }
        },
        {
          type: 'text',
          model: 'disabled',
          label: '禁用文本',
          disabled: true
        },
        {
          type: 'label',
          label: '数字'
        },
        {
          type: 'number',
          model: 'number'
        },
        {
          type: 'select',
          model: 'select',
          label: '单选字段',
          options: [
            { label: '选项 1', value: 1 },
            { label: '选项 2', value: 2 },
            { label: '选项 3', value: 3 },
            { label: '禁用项', value: 4, disabled: true }
          ]
        },
        {
          type: 'multipleSelect',
          model: 'multipleSelect',
          label: '多选字段',
          options: [
            { label: '选项 1', value: 1 },
            { label: '选项 2', value: 2 },
            { label: '选项 3', value: 3 },
            { label: '禁用项', value: 4, disabled: true }
          ]
        },
        {
          type: 'date',
          model: 'date',
          label: '日期选择'
        },
        {
          type: 'dateRange',
          model: 'dateRange',
          label: '日期范围'
        },
        {
          type: 'timeSelect',
          model: 'timeSelect',
          label: '固定时间'
        },
        {
          type: 'timePicker',
          model: 'timePicker',
          label: '任意时间'
        },
        {
          type: 'timePickerRange',
          model: 'timePickerRange',
          label: '时间范围'
        },
        {
          type: 'dateTime',
          model: 'dateTime',
          label: '日期时间'
        },
        {
          type: 'dateTimeRange',
          model: 'dateTimeRange',
          label: '日期时间范围'
        },
        {
          type: 'cascader',
          model: 'cascader',
          label: '级联选项',
          options: [
            {
              value: '1',
              label: '菜单1',
              children: [
                {
                  value: '2',
                  label: '菜单2',
                  children: [
                    {
                      value: '3',
                      label: '菜单3',
                      children: [
                        {
                          value: '4',
                          label: '菜单4'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]"
    />
    <listview
      header-title="演示列表2"
      :full-height="false"
      :filter-fields="[{
        type: 'number',
        model: 'number'
      }]"
    />
  </listview-container>
</template>

<script>
export default {
  name: 'ListviewContainerDemo'
}
</script>
