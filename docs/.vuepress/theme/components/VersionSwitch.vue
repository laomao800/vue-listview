<template>
  <div class="version-switch">
    <span>Version:</span>
    <ElSelect
      v-model="curVersion"
      :loading="loading"
      size="small"
      placeholder="选择版本"
    >
      <ElOption v-for="version in versions" :key="version" :value="version">
        v{{ version }}
      </ElOption>
    </ElSelect>
  </div>
</template>

<script>
import Axios from 'axios'
import Select from 'element-ui/lib/select'
import Option from 'element-ui/lib/option'
import 'element-ui/lib/theme-chalk/select.css'

export default {
  components: {
    ElSelect: Select,
    ElOption: Option,
  },
  data() {
    return {
      curVersion: undefined,
      versions: [],
      loading: false,
    }
  },
  watch: {
    curVersion() {
      let prePath = ''
      try {
        const path = window.location.pathname.toLowerCase()
        prePath = path.match(/(.*\/version\/)/)[1]
      } catch (e) {}
      window.location.pathname = prePath + this.curVersion
    },
  },
  created: async function () {
    this.loading = true
    let res = await Axios.get(
      'https://api.github.com/repos/laomao800/vue-listview/git/trees/gh-pages'
    )
    const versionPath = res.data.tree.find((item) => item.path === 'version')
    if (!versionPath) {
      return
    }

    res = await Axios.get(versionPath.url)
    const versions = res.data.tree
      .map((item) => item.path)
      .sort()
      .reverse()
    this.versions = versions

    let curVersion
    try {
      const path = window.location.pathname.toLowerCase()
      curVersion = path.match(/\/version\/([\d.]*)\//)[1]
    } catch (e) {}

    this.curVersion = curVersion
    this.loading = false
  },
}
</script>

<style lang="less">
@height: 32px;

.version-switch {
  display: flex;
  height: @height;
  padding: 1em 1.5em 0;
  line-height: @height;
  white-space: nowrap;

  > span {
    margin-right: 0.5em;
  }
  > * {
    vertical-align: middle;
  }
}
</style>
