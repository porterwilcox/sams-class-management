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
    classes: [],
    activeClass: {},
    activeStudent: {}
  },
  mutations: {
    setTeacher(state, t) {
      state.teacher = t;
    },
    setClasses(state, classes){
      state.classes = classes
    },
    setActiveClass(state, c) {
      state.activeClass = c
    },
    setActiveStudent(state, student) {
      state.activeStudent = student
    }
  },
  actions: {
    authenticate({commit, dispatch}) {
      auth.get('authenticate')
        .then(res => {
          console.log(res)
          commit('setTeacher', res.data)
          dispatch('getClasses')
          router.push({name: 'home'})
        })
        .catch(() => router.push({name: 'login'}))
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
        .catch(e => console.error(e))
    },
    getClass({commit}, cId){
      api.get(`classes/${cId}`)
        .then(res => commit('setActiveClass', res.data))
        .catch(e => console.error(e))
    },
    deleteClass({}, id){
      api.delete(`classes/delete/${id}`)
      .then(res => {
        console.log(res)
      })
    },
    getStudent({commit}, sId) {
      api.get(`students/${sId}`)
        .then(res => commit('setActiveStudent', res.data))
        .catch(e => console.error(e))
    },
    updateStudent({commit, dispatch}, payload) {
      api.post(`students/update`, payload) 
        .then(res => {
          console.log(res.data.message)
          dispatch('getStudent', payload.id)
        })
        .catch(e => console.error(e))
      }
  }
})