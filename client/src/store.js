import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from './router';

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
          router.push({name: 'home'})
          dispatch('getClasses')
        })
        .catch(() => {router.push({name: 'login'})})
    },
    login({commit, dispatch}, payload) {
      auth.post('login', payload)
        .then(res => {
          commit('setTeacher', res.data)
          dispatch('getClasses')
          router.push({name: 'home'})
        })
    },
    register({commit, dispatch}, payload) {
      auth.post('register', payload)
        .then(res => {
          commit('setTeacher', res.data)
          router.push({name: 'home'})
        })
    },
    logout({commit}){
      auth.delete('logout')
        .then(() => {
          commit('setTeacher', {})
          router.push({name: 'login'})
        })
        .catch(e => console.error(e))
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
