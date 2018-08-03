<template>
  <div class="main">

    <!-- eslint-disable vue/attributes-order -->
    <listview
      :header-title="'演示列表'"
      :header-nav="[{ text: '菜单1' }, { text: '菜单2' }]"
      :autoload="true"
      :request-url="'/mock/listview'"
      :request-type="'post'"
      :request-config="{
        'withCredencials': true,
        'headers': {
          'foo': 'bar'
        }
      }"
      :transform-request-data="(data) => data"
      :transform-response-data="(res) => res"

      :filter-buttons="filterButtons"
      :filter-fields="filterFields"
      :filter-model="filterModel"

      :table-columns="tableColumns"
      :table-props="tableProps"
      :table-events="tableEvents"
      :table-selection.sync="tableSelection"

      :use-page="true"
      :page-sizes="[20, 50, 100]"
      :page-size="20"
    />
  </div>
</template>

<script>
import Listview from '@/listview'

export default {
  name: 'ListviewPage',

  components: {
    Listview
  },

  data() {
    return {
      filterButtons: [
        {
          type: 'success',
          icon: 'el-icon-circle-plus-outline',
          content: '添加',
          click: this.showAddModal
        },
        {
          type: 'danger',
          icon: 'el-icon-remove-outline',
          content: '批量删除',
          click() {
            alert('delete')
          }
        },
        {
          type: 'primary',
          icon: 'el-icon-circle-plus-outline',
          content: '下拉按钮',
          trigger: 'click',
          splitButton: true,
          click() {
            alert('button')
          },
          children: [
            {
              content: '菜单1',
              click() {
                alert(1)
              }
            },
            {
              content: '菜单2',
              click() {
                alert(2)
              }
            }
          ]
        }
      ],

      filterModel: {
        hidden: 'hidden'
      },

      filterFields: [
        {
          type: 'text',
          model: 'name',
          label: '文本字段',
          componentProps: {
            'suffix-icon': 'el-icon-date'
          }
        },
        {
          type: 'text',
          model: 'name2',
          label: '禁用文本',
          disabled: true
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
          type: 'multiple-Select',
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
      ],

      tableSelection: [],
      tableColumns: [
        // { type: 'selection', width: 50, align: 'center' },
        {
          label: '自定义标签',
          prop: 'sku',
          width: 100,
          align: 'center',
          fixed: true
        },
        {
          label: '产品名称',
          prop: 'name',
          width: 200,
          align: 'center',
          fixed: true
        },
        {
          label: '操作',
          width: 150,
          align: 'center',
          fixed: true,
          defaultSlot: prop => {
            return (
              <div>
                <el-button
                  on-click={e => e.stopPropagation()}
                  style="padding:4px 8px"
                  size="mini"
                  type="success"
                >
                  审核
                </el-button>
                <el-button
                  on-click={e => e.stopPropagation()}
                  style="padding:4px 8px"
                  size="mini"
                  type="danger"
                >
                  删除
                </el-button>
              </div>
            )
          }
        },
        { label: '销售员', prop: 'seller', align: 'center' },
        { label: '仓库', prop: 'warehouse', align: 'center' },
        { label: '零售价格', prop: 'sale_price', align: 'center' },
        {
          label: '折扣率',
          align: 'center',
          formatter: row => row.discount.toFixed(2)
        },
        {
          label: '折后价',
          align: 'center',
          formatter: row => (row.discount * row.sale_price).toFixed(2)
        },
        {
          label: '折扣时间',
          align: 'center',
          children: [
            { label: '折扣开始', prop: 'date', align: 'center' },
            { label: '折扣结束', prop: 'date', align: 'center' }
          ]
        },
        { label: '数量', prop: 'quantity', align: 'center' },
        {
          label: '是否启用',
          align: 'center',
          defaultSlot: prop => {
            if (prop.row.enable) {
              return <div style="color:#67c23a">启用</div>
            } else {
              return <div style="color:#f56c6c">禁用</div>
            }
          }
        },
        { label: '创建人', prop: 'seller', align: 'center' },
        { label: '创建时间', prop: 'date', align: 'center' },
        {
          label: '最后修改',
          align: 'center',
          children: [
            { label: '修改人', prop: 'seller', align: 'center' },
            { label: '修改时间', prop: 'date', align: 'center' }
          ]
        }
      ],
      tableProps: {
        size: 'small',
        border: false
      },
      tableEvents: {
        rowClick(val) {},
        selectionChange(val) {}
      }
    }
  },

  methods: {
    showAddModal() {
      alert('showAddModal')
    },
    handleFilterSubmit(data) {
      console.log('filter', data)
    }
  }
}
</script>
