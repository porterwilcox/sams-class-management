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
    teacher: {},
    classes: []
  },
  mutations: {
    setTeacher(state, t) {
      state.teacher = t;
    },
    setClasses(state, classes){
      state.classes = classes
    }
  },
  actions: {
    authenticate({commit}) {
      auth.get('authenticate')
        .then(res => {
          console.log(res)
          commit('setTeacher', res.data)
        })
    },
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
