import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

let auth = Axios.create({
  baseURL: '//localhost:3000/auth/',
  withCredentials: true
})

let api = Axios.create({
  baseURL: '//localhost:3000/api/',
  withCredentials: true
})

export default new Vuex.Store({
  state: {
    classes: []
  },
  mutations: {
    setClasses(state, classes){
      state.classes = classes
    }
  },
  actions: {
    login({commit, dispatch}, payload) {
      auth.post('login', payload)
        .then(res => {
          dispatch('getClasses')
        })
    },
    getClasses({commit, dispatch}){
      api.get('classes')
        .then(res => {
          commit('setClasses', res.data)
        })
    },
    deleteClass({}, id){
      api.delete(`classes/delete/${id}`)
      .then(res => {
        console.log(res)
      })
    }
  }
})
