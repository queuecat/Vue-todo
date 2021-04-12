<template>
  <div id="app">
    <a-input
      :value="inputValue"
      @change="handleInputChange"
      placeholder="请输入任务"
      class="my_ipt"
    />
    <a-button @click="addListItem" type="primary">添加事项</a-button>

    <a-list bordered :dataSource="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          @change="
            e => {
              doneChenge(e, item.id)
            }
          "
          :checked="item.done"
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>0条剩余</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button type="primary">全部</a-button>
          <a-button>未完成</a-button>
          <a-button>已完成</a-button>
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a>清除已完成</a>
      </div>
    </a-list>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('getList')
  },
  computed: {
    // list() {
    //   return this.$store.state.list
    // }
    ...mapState(['list', 'inputValue'])
  },
  methods: {
    handleInputChange(data) {
      this.$store.commit('setInputValue', data.target.value)
    },
    addListItem() {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框不能为空')
      }
      this.$store.commit('addList')
    },
    removeById(id) {
      this.$store.commit('removeItem', id)
    },
    doneChenge(e) {}
  }
}
</script>

<style scoped>
#app {
  padding: 10px;
}

.my_ipt {
  width: 500px;
  margin-right: 10px;
}

.dt_list {
  width: 500px;
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
