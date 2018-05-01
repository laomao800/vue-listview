<template>
  <el-form
    ref="filterForm"
    :model="filterModel"
    :inline="true"
    size="small"
    submit.native.prevent>
    <div class="filterbar__buttons">
      <el-form-item>
        <render-vnode v-for="(button, index) in filterButtons" :key="index" :vnode="button" />
      </el-form-item>
    </div>
    <div class="filterbar__form-submit" ref="submit"
      :style="{ transform: `translateX(-${submitOffset}px)` }">
      <el-form-item>
        <el-button type="primary" @click="handleFilterSubmit">搜索</el-button>
        <el-button @click="filterReset">重置</el-button>
      </el-form-item>
    </div>
    <div class="filterbar__items">
      <list-view-filterbar-item class="form-item"
        v-for="(filter, index) in validFilters"
        ref="form-item"
        :key="index"
        :model="filterModel"
        :filter="filter"
      />
    </div>
  </el-form>
</template>

<script>
import deepmerge from 'deepmerge'
import RenderVnode from './render-vnode.js'
import ListViewFilterbarItem from './list-view-filterbar-item.vue'

const FILTER_PRESET = {
  input: {},
  select: {},
  multipleSelect: {
    componentProps: {
      multiple: true,
      collapseTags: true
    }
  },
  date: {
    width: 150,
    componentProps: {
      type: 'date'
    }
  },
  dateRange: {
    width: 250,
    componentProps: {
      type: 'daterange'
    }
  }
}

export default {
  name: 'ListViewFilterbar',

  components: {
    RenderVnode,
    ListViewFilterbarItem
  },

  props: {
    filterModel: { type: Object, default: () => ({}) },
    filterButtons: { type: Array, default: () => [] },
    filters: { type: Array, default: () => [] }
  },

  data () {
    return {
      topRightFilter: null,
      submitOffset: 0
    }
  },

  computed: {
    validFilters () {
      const result = []
      this.filters.forEach((filter) => {
        const filterConfig = FILTER_PRESET[filter.type]
        if (filterConfig && filter.model) {
          result.push({
            ...filterConfig,
            ...filter,
            componentProps: deepmerge(
              filterConfig.componentProps || {},
              filter.componentProps || {}
            ),
            tag: filterConfig.tag
          })
        }
      })
      return result
    }
  },

  mounted () {
    this.updateSubmitOffset()
    window.addEventListener('resize', this.updateSubmitOffset)
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.updateSubmitOffset)
  },

  methods: {
    handleFilterSubmit () {
      this.$emit('submit', this.filterModel)
    },
    filterReset () {},
    updateSubmitOffset () {
      const formItems = this.$refs['form-item']
      if (formItems) {
        let lastFilter
        for (const item of formItems) {
          if (lastFilter && lastFilter.$el.getBoundingClientRect().top !== item.$el.getBoundingClientRect().top) {
            break
          }
          lastFilter = item
        }
        this.topRightFilter = lastFilter
        const { x, width } = this.topRightFilter.$el.getBoundingClientRect()
        const offset = this.$refs.submit.getBoundingClientRect().x - (x + width)
        this.submitOffset = offset - 10
      }
    }
  }
}
</script>
