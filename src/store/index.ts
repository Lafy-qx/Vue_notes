import { createStore } from 'vuex'
import noteState from './noteState'
import userState from './userState'


export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
    
  },
  modules: {
    noteState : noteState,
    userState : userState
  }
})


