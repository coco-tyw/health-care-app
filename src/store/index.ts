import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    headerNavHeight: 0
  },
  getters: {
    headerNavHeight: (state: any) => state.headerNavHeight
  },
  mutations: {
    setHeaderNavHeight(state: any, height) {
      state.headerNavHeight = height
    }
  },
  actions: {
  },
  modules: {
  }
})
