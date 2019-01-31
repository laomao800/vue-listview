<template>
  <listview
    :request-url="requestUrl"
    :filter-buttons="filterButtons"
    :filter-fields="filterFields"
    :table-columns="tableColumns"
  >
    <template v-if="viewType === 'thumb'" slot-scope="{ contentData, contentMessage }">
      <el-alert
        v-if="contentMessage"
        :title="contentMessage.message"
        :type="contentMessage.type"
        :closable="false"
        center
        show-icon
      />
      <ul v-else class="thumb-view">
        <li v-for="(item, index) in contentData.items" :key="index">
          <div class="thumb">
            <img src="https://dummyimage.com/200x200">
          </div>
          <div class="info">
            <div class="sku">{{ item.sku }}</div>
            <div class="name">{{ item.name }}</div>
          </div>
          <div class="action">
            <el-button size="mini" type="success">审核</el-button>
            <el-button size="mini" type="danger">删除</el-button>
          </div>
        </li>
      </ul>
    </template>
  </listview>
</template>

<script>
export default {
  data() {
    return {
      viewType: 'table',

      requestUrl:
        'https://easy-mock.com/mock/5aee142c96e73977996d13b6/listview/list',
      filterButtons: [
        {
          render: () => (
            <el-radio-group
              value={this.viewType}
              on-input={val => (this.viewType = val)}
            >
              <el-radio-button label="table">表格视图</el-radio-button>
              <el-radio-button label="thumb">缩略图</el-radio-button>
            </el-radio-group>
          )
        }
      ],
      filterFields: [
        {
          type: 'text',
          model: 'text1',
          label: '文本字段'
        }
      ],
      tableColumns: [
        {
          label: '自定义标签',
          prop: 'sku',
          align: 'center'
        },
        {
          label: '产品名称',
          prop: 'name',
          align: 'center'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.thumb-view {
  padding: 0;
  padding-bottom: 1px;
  margin: 0;
  overflow: hidden;
  list-style: none;

  li {
    box-sizing: border-box;
    float: left;
    width: 12.5%;
    padding: 10px;
    margin: 0 -1px -1px 0;
    border: 1px solid #ddd;

    .thumb img {
      width: 100%;
    }

    .info {
      padding: 5px;

      .sku {
        font-size: 12px;
        color: #999;
      }
      .name {
        height: 1.6em;
        overflow: hidden;
        font-size: 12px;
        line-height: 1.6em;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }

    .action {
      button {
        padding: 4px 8px;
      }
    }
  }
}

@media (max-width: 1360px) {
  .thumb-view li {
    width: 20%;
  }
}
</style>
