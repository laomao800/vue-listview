<template>
  <listview v-bind="lvConfig">
    <template
      v-if="viewType === 'thumb'"
      slot-scope="{ contentData, contentMessage }"
    >
      <div v-if="contentMessage.text">
        <p>message type: {{ contentMessage.type }}</p>
        <p>message text: {{ contentMessage.text }}</p>
      </div>
      <ul v-else class="thumb-view">
        <li v-for="(item, index) in contentData.items" :key="index">
          <div class="thumb"></div>
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

      lvConfig: {
        contentDataMap: null,
        requestHandler() {
          return {
            items: Array.from(Array(30), (_n, i) => ({
              id: i,
              name: `name ${i}`,
            })),
            total: 30,
          }
        },
        filterButtons: [
          {
            render: () => (
              <div>
                <label on-click={() => (this.viewType = 'table')}>
                  <input
                    type="radio"
                    value="table"
                    checked={this.viewType === 'table'}
                  />
                  表格视图
                </label>
                <label on-click={() => (this.viewType = 'thumb')}>
                  <input
                    type="radio"
                    value="thumb"
                    checked={this.viewType === 'thumb'}
                  />
                  缩略图
                </label>
              </div>
            ),
          },
        ],
        filterFields: [{ type: 'text', model: 'text1', label: '文本字段' }],
        tableColumns: [
          { label: 'id', prop: 'id', width: 120 },
          { label: 'name', prop: 'name' },
        ],
      },
    }
  },
}
</script>

<style lang="less" scoped>
.thumb-view {
  padding: 0;
  padding-bottom: 1px;
  margin: 0;
  // overflow: auto;
  list-style: none;

  li {
    box-sizing: border-box;
    float: left;
    width: 12.5%;
    padding: 10px;
    margin: 0 -1px -1px 0;
    border: 1px solid #ddd;

    .thumb {
      width: 100%;
      height: 160px;
      background: #efefef;
      &::after {
        display: block;
        color: #999;
        content: 'Image';
        text-align: center;
      }
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
