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
        id: state.nextId,
        info: state.inputValue,
        done: false
      }
      state.list.push(obj)
      state.nextId++
      state.inputValue = ''
    },
    removeItem(state, id) {
      const index = state.list.findIndex(x => x.id === id)
      if (index !== -1) {
        state.list.splice(index, 1)
      }
    },
    doneChenge(state, params) {
      const index = state.list.findIndex(x => x.id === params.id)
      if (index !== -1) {
        state.list[index].done = params.status
      }
    },
    clean(state) {
      state.list = state.list.filter(x => x.done === false)
    },
    changeList(state, key) {
      state.key = key
    }
  },
  actions: {
    getList(context) {
      axios.get('/list.json').then(({ data }) => {
        context.commit('initList', data)
      })
    }
  },
  getters: {
    unDoneLength(state) {
      return state.list.filter(x => x.done === false).length
    },
    infoList(state) {
      if (state.key === 'all') {
        return state.list
      }
      if (state.key === 'undone') {
        return state.list.filter(x => !x.done)
      }
      if (state.key === 'done') {
        return state.list.filter(x => x.done)
      }
    }
  },
  modules: {}
})
