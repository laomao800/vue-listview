<template>
  <div
    :class="[
      'list-view__filterbar',
      { 'list-view__filterbar--fold': filterbarFold }
    ]"
  >
    <el-form
      :inline="true"
      size="small"
      submit.native.prevent>
      <div class="filterbar__buttons">
        <el-form-item>
          <render-vnode
            v-for="(button, index) in filterButtons"
            :key="index"
            :vnode="button"
          />
        </el-form-item>
      </div>
      <div
        ref="submit"
        :class="[
          'filterbar__submit',
          { 'filterbar__submit--hasmore': filterbarHasMore }
        ]"
      >
        <div :style="{ transform: `translateX(${submitOffset}px)` }">
          <el-form-item>
            <el-button
              type="primary"
              @click="handleFilterSubmit">搜索</el-button>
            <el-button @click="handleFilterReset">重置</el-button>
          </el-form-item>
        </div>
        <el-button
          :icon="filterbarFold ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"
          type="primary"
          class="filterbar__form-more-btn"
          @click="togglerFilterbar"
        />
      </div>
      <filter-form
        ref="filterForm"
        :schema="filterSchema"
        :model="filterModel"
        class="filterbar__form"
      />
    </el-form>
  </div>
</template>

<script>
import RenderVnode from './components/render-vnode.js'
import FilterForm from './components/filter-form.vue'

export default {
  name: 'FilterBar',

  components: {
    RenderVnode,
    FilterForm
  },

  props: {
    filterButtons: { type: Array, default: () => [] },
    filterSchema: { type: Array, default: () => [] },
    filterModel: { type: Object, default: () => ({}) },
    filterbarFold: { type: Boolean, default: false }
  },

  data() {
    return {
      topRightFilterIndex: -1,
      submitOffset: 0
    }
  },

  computed: {
    filterbarHasMore() {
      const allFields = this.getAllFields()
      return (
        this.topRightFilterIndex &&
        this.topRightFilterIndex < allFields.length - 1
      )
    }
  },

  methods: {
    handleFilterSubmit() {
      this.$emit('filter-submit', this.filterModel)
    },

    handleFilterReset() {
      const model = this.filterModel
      this.filterSchema.forEach(field => {
        const name = field.model
        if (name && model.hasOwnProperty(name)) {
          const value = model[name]
          if (Array.isArray(value)) {
            this.$set(model, name, [])
          } else {
            this.$set(model, name, undefined)
          }
        }
      })
    },

    togglerFilterbar() {
      this.$emit('update:filterbarFold', !this.filterbarFold)
    },

    getAllFields() {
      const filterForm = this.$refs['filterForm']
      return filterForm ? filterForm.$refs.field : []
    },

    async updateLayout(from) {
      const allFields = this.getAllFields()
      if (allFields.length > 1) {
        let lastFilterTop = allFields[0].getBoundingClientRect().top
        let lastFilterIndex = -1
        for (const index in allFields) {
          const formItemTop = allFields[index].getBoundingClientRect().top
          if (lastFilterTop !== formItemTop) {
            break
          }
          lastFilterTop = formItemTop
          lastFilterIndex = index
        }
        this.topRightFilterIndex = lastFilterIndex
        await this.$nextTick()
        this.updateSubmitOffset()
      }
    },

    updateSubmitOffset() {
      const allFields = this.getAllFields()
      let offset = 0
      if (this.topRightFilterIndex >= 0) {
        const lastItem = allFields[this.topRightFilterIndex]
        const { x, width } = lastItem.getBoundingClientRect()
        offset = x + width - this.$refs.submit.getBoundingClientRect().x
        offset = Math.min(0, offset + 10)
      }
      this.submitOffset = offset
    }
  }
}
</script>

<style lang="less">
.list-view__filterbar {
  padding-top: 16px;
  margin-top: -16px;
  margin-bottom: 16px;

  &::after {
    display: table;
    clear: both;
    content: '';
  }

  &--fold {
    height: 32px;
    overflow: hidden;
  }

  .el-button {
    [class*=' el-icon-'],
    [class^='el-icon-'] {
      width: 1em;
    }

    padding-top: 0;
    padding-bottom: 0;
    line-height: 30px;
    vertical-align: top;
  }

  .filterbar__buttons,
  .filterbar__submit,
  .filterbar__form {
    .el-form-item,
    > * {
      margin: 0;
    }
  }

  .filterbar__buttons {
    float: left;
  }

  .filterbar__buttons,
  .filterbar__field {
    position: relative;
    display: inline-block;
    margin: 0 10px 16px 0;
  }

  .filterbar__form {
    margin-bottom: -16px;
  }

  .filterbar__submit {
    position: relative;
    float: right;
    margin: 0;

    .filterbar__form-more-btn {
      position: absolute;
      top: 0;
      right: 0;
      display: none;
      width: 40px;
      padding: 0;
      line-height: 30px;
    }
    &--hasmore {
      padding-right: 50px;
      .filterbar__form-more-btn {
        display: inline-block;
      }
    }
  }
}
</style>
