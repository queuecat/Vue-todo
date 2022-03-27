import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 任务列表
    list: [],
    // 文本框内容
    inputValue: '',
    nextId: 5,
    key: 'all'
  },
  mutations: {
    initList(state, list) {
      state.list = list
    },
    setInputValue(state, val) {
      state.inputValue = val
    },
    addList(state) {
      const obj = {
        _id: state.nextId,
        title: state.inputValue,
        completed: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    removeItem(state, id) {
      const index = state.list.findIndex(x => x._id === id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    doneChenge(state, params) {
      const index = state.list.findIndex(x => x._id === params._id)
      if (index !== -1) {
        state.list[index].completed = params.status
      }
    },
    clean(state) {
      state.list = state.list.filter(x => x.completed === false)
    },
    changeList(state, key) {
      state.key = key
    }
  },
  actions: {
    async getList(context) {
      await axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  getters: {
    unDoneLength(state) {
      return state.list.filter(x => x.completed === false).length
    },
    infoList(state) {
      if (state.key === 'all') {
        return state.list
      }
      if (state.key === 'undone') {
        return state.list.filter(x => !x.completed)
      }
      if (state.key === 'done') {
        return state.list.filter(x => x.completed)
      }
    }
  },
  modules: {}
})
