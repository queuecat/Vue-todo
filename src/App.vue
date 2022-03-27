<template>
  <div id="app">
    <a-input
      v-model="inputValue"
      placeholder="请输入任务"
      class="my_ipt"
    />
    <a-button @click="addListItem" type="primary">添加事项</a-button>

    <a-list bordered :dataSource="infoList" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          @change="
            e => {
              doneChenge(e, item._id)
            }
          "
          :checked="item.completed"
          >{{ item.title }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeById(item._id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div slot="footer" class="footer">
        <!-- 未完成的任务个数 -->
        <span>未完成任务 {{ unDoneLength }} 条</span>
        <!-- 操作按钮 -->
        <a-button-group>
          <a-button
            @click="changeList('all')"
            :type="active === 'all' ? 'primary' : 'default'"
            >全部</a-button
          >
          <a-button
            @click="changeList('undone')"
            :type="active === 'undone' ? 'primary' : 'default'"
            >未完成</a-button
          >
          <a-button
            @click="changeList('done')"
            :type="active === 'done' ? 'primary' : 'default'"
            >已完成</a-button
          >
        </a-button-group>
        <!-- 把已经完成的任务清空 -->
        <a @click="clean">清除已完成任务</a>
      </div>
    </a-list>
  </div>
</template>

<script>
// import { mapState, mapGetters } from 'vuex'
import { getTaskList, deleteById, doneChenge, addTask, clearTask } from './api/todo'

export default {
  name: 'app',
  data() {
    return {
      taskList: [],
      inputValue: '',
      active: 'all',
      isLow: false,
      isFirst: true
    }
  },
  created() {
    this.getList()
  },
  computed: {
    // ...mapGetters(['unDoneLength', 'infoList'])
    unDoneLength() {
      return this.taskList.filter(x => x.completed === false).length
    },
    infoList() {
      if (this.active === 'all') {
        return this.taskList
      }
      if (this.active === 'undone') {
        return this.taskList.filter(x => !x.completed)
      }
      if (this.active === 'done') {
        return this.taskList.filter(x => x.completed)
      }
      return this.taskList
    }
  },
  methods: {
    getList() {
      getTaskList({}).then(data => {
        this.taskList = data
      }).catch(err => {
        if (this.isFirst) {
          this.isLow = true
          // 走降级逻辑
          this.$store.dispatch('getList')
        }
        this.$message.error('列表获取失败：' + err.message)
      }).finally(async () => {
        this.isFirst = false
        // 走降级逻辑
        if (this.isLow) {
          await this.$store.dispatch('getList')
          this.taskList = this.$store.state.list
          this.$message.success('启动Vuex降级处理')
        }
      })
    },
    addListItem() {
      if (this.inputValue.trim().length <= 0) {
        return this.$message.warning('文本框不能为空')
      }
      // 降级
      if (this.isLow) {
        this.$store.commit('addList')
        this.inputValue = ''
        return
      }
      addTask({ title: this.inputValue }).then(data => {
        this.$message.success('新增成功')
        this.inputValue = ''
        this.getList()
      }).catch(err => {
        this.$message.error('新增失败:' + err.message)
      })
    },
    // 删除单个
    removeById(_id) {
      // 降级
      if (this.isLow) {
        this.$store.commit('removeItem', _id)
        return
      }

      deleteById({ _id }).then(data => {
        this.$message.success('删除成功')
        this.getList()
      }).catch(err => {
        this.$message.error('删除失败:' + err.message)
      })
    },
    // 完成状态切换
    doneChenge(e, _id) {
      // 降级
      if (this.isLow) {
        this.$store.commit('doneChenge', { _id, status: e.target.checked })
        return
      }
      doneChenge({ _id, completed: e.target.checked }).then(data => {
        this.getList()
      }).catch(err => {
        this.$message.error('状态切换失败:' + err.message)
      })
    },
    // 删除所有已完成
    clean() {
      // 降级
      if (this.isLow) {
        this.$store.commit('clean')
        this.taskList = this.$store.state.list
        return
      }
      clearTask().then(data => {
        this.$message.success('清理成功')
        this.getList()
      }).catch(err => {
        this.$message.error('清理失败:' + err.message)
      })
    },
    // tab按钮切换
    changeList(active) {
      this.active = active
    }
  },
  watch: {
    inputValue(val) {
      this.$store.commit('setInputValue', val)
    }
  }
}
</script>

<style scoped>
#app {
  width: fit-content;
  padding: 10px;
  margin: 0 auto;
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
