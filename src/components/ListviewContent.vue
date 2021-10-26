<template>
  <div class="lv__content lv__table-content">
    <el-table
      ref="contentTable"
      :data="contentData.items"
      :height="_height"
      :style="{ width: '100%' }"
      v-bind="normalizedContentProps"
      @selection-change="handleTableSelectionChange"
      @row-click="handleRowClick"
      v-on="normalizedContentEvents"
    >
      <template #empty>
        <slot name="empty" v-bind="contentMessage">
          <MessageBlock
            v-if="contentMessage.text"
            :type="contentMessage.type"
            :text="contentMessage.text"
          />
        </slot>
      </template>

      <template v-if="!!selectionColumn">
        <el-table-column
          v-if="selectionColumn.type === 'single'"
          :resizable="false"
          :fixed="tableColumns.some((col) => col.fixed)"
          width="50"
          align="center"
          class-name="el-table-column--selection el-table-column--single-selection"
        >
          <template slot-scope="{ row, $index }">
            <el-radio
              :value="selection.indexOf(row) > -1 ? '' : null"
              :disabled="
                selectionColumn.selectable
                  ? !selectionColumn.selectable.call(null, row, $index)
                  : false
              "
              label
              @click.native.stop.prevent="
                ($event) => handleRowClick(row, null, $event)
              "
            />
          </template>
        </el-table-column>

        <el-table-column
          v-else
          v-bind="selectionColumn"
          type="selection"
          width="50"
          align="center"
        />
      </template>

      <template v-for="(column, index) in tableColumns">
        <v-node :key="index" :node="renderTableColumn(column)" />
      </template>
    </el-table>
  </div>
</template>

<script lang="tsx">
import type { VNodeData } from 'vue'
import Vue from 'vue'
import isPlainObject from 'lodash/isPlainObject'
import isFunction from 'lodash/isFunction'
import mapKeys from 'lodash/mapKeys'
import kebabCase from 'lodash/kebabCase'
import merge from 'lodash/merge'
import parseSize from '@laomao800/parse-size-with-unit'
import storeProviderMixin from '@/mixins/storeProviderMixin'
import { nodeParents } from '@/utils'
import VNode from '@/components/VNode'
import MessageBlock from '@/components/MessageBlock.vue'

export default Vue.extend({
  name: 'ListviewContent',

  inheritAttrs: false,

  mixins: [storeProviderMixin],

  components: { VNode, MessageBlock },

  props: {
    tableColumns: { type: Array, default: () => [] },
    tableSelectionColumn: { type: [Boolean, String, Object], default: true },
    contentProps: { type: Object, default: () => ({}) },
    contentEvents: { type: Object, default: () => ({}) },
  },

  computed: {
    _height() {
      return parseSize(this.lvStore.contentHeight)
    },
    selection: {
      get() {
        return this.lvStore.selection
      },
      set(newVal: any[]) {
        this.lvStore.selection = newVal
      },
    },
    contentData() {
      return this.lvStore.contentData
    },
    contentMessage() {
      return this.lvStore.internalContentMessage
    },

    /**
     * 规范化表格选择列配置
     */
    selectionColumn(): any {
      const column = this.tableSelectionColumn
      if (column === false) {
        return false
      }
      let finalColumn: any = {}
      if (column === 'single') {
        finalColumn.type = 'single'
      } else if (isPlainObject(column)) {
        finalColumn.type = column.type === 'single' ? 'single' : 'selection'
      }
      finalColumn.selectable = isFunction(column.selectable)
        ? column.selectable
        : null
      return finalColumn
    },

    /**
     * 写在 $attrs 上的 prop 优先级会比 v-bind 内的高，以下 3 个属性需要可配置，
     * 既 <el-table size="small" v-bind="contentProps" /> 无法修改 size 的值，
     * 因此先通过 computed 合并所需的 props ，再统一绑定最后的合并结果
     */
    normalizedContentProps(): any {
      const defaultProps = { size: 'small', border: true, stripe: true }
      const mergedPros = mapKeys(
        merge(defaultProps, this.contentProps),
        (value, key) => kebabCase(key)
      )

      const _rowClassName = mergedPros['row-class-name']
      const getRowClassName = (rowData: {
        row: Record<string, any>
        rowIndex: number
      }) => {
        const classNames = [this.getRowClassName(rowData)]
        if (isFunction(_rowClassName)) {
          classNames.push(_rowClassName(rowData))
        } else if (_rowClassName) {
          classNames.push(_rowClassName)
        }
        return classNames.join(' ')
      }
      mergedPros['row-class-name'] = getRowClassName

      return mergedPros
    },

    /**
     * 对传入的 contentEvents 的 key 统一转换为横线分隔格式
     */
    normalizedContentEvents(): any {
      /* istanbul ignore next */
      return mapKeys(this.contentEvents, (value, key) => kebabCase(key))
    },
  },

  watch: {
    contentData() {
      try {
        // 重置表格垂直滚动距离
        if (this.$refs.contentTable as any) {
          ;(this.$refs.contentTable as any).bodyWrapper.scrollTop = 0
        }
      } catch (e) {}
    },
  },

  methods: {
    /**
     * el-table 表格选中数据同步至父组件
     */
    handleTableSelectionChange(val: any) {
      this.selection = val
    },

    /**
     * tableColumns 转换为 el-table-column ，支持 children 属性多级列配置
     */
    renderTableColumn(tableColumn: any) {
      const _createColumn = (column: any) => {
        const { render, children, ...props } = column
        const VNodeData: VNodeData = { props }
        if (render) {
          VNodeData.scopedSlots = {
            default: render,
          }
        }
        const VNodeChildren = Array.isArray(children)
          ? children.map((child) => _createColumn(child))
          : null
        return (
          <el-table-column {...{ ...VNodeData }}>
            {VNodeChildren}
          </el-table-column>
        )
      }
      return isPlainObject(tableColumn) ? _createColumn(tableColumn) : null
    },

    /**
     * el-table 开启表格数据选择功能时表格行点击切换已选选项
     */
    handleRowClick(row: any, column: any, event: MouseEvent) {
      if (this.selectionColumn) {
        if (this.selectionColumn.selectable && event) {
          // 选择列中若有禁用选项则当行数据禁止选中
          const $rowNode = nodeParents(
            event.target as Element,
            '.el-table__row'
          )
          if ($rowNode) {
            const $selectNode = $rowNode.querySelector(
              '.el-table-column--selection input'
            )
            if (
              !$selectNode ||
              ($selectNode && ($selectNode as HTMLInputElement).disabled)
            ) {
              return
            }
          }
        }
        // 单选效果每次选择前清空 el-table 内部的存储值
        if (this.selectionColumn.type === 'single') {
          ;(this.$refs.contentTable as any).store.states.selection = []
        }
        ;(this.$refs.contentTable as any).toggleRowSelection(row)
      }
    },

    /**
     * el-table 自定义选中行高亮
     */
    getRowClassName(rowData: any): string {
      return this.selection.indexOf(rowData.row) > -1 ? 'row--selected' : ''
    },
  },
})
</script>

<style lang="less">
.lv__content {
  overflow: auto;

  .el-table__empty-text {
    width: auto;
    max-width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
