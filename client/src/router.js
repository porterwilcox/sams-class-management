import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/classes',
      name: 'classes',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('./views/Classes.vue')
    },  
    {
      path: '/create',
      name: 'create',
      component: () => import('./views/Create.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue') 
    },
    {
      path: '/classes/:cId',
      name: 'class',
      component: () => import('./views/Class.vue') 
    },
    {
      path: '/students/:sId',
      name: 'student',
      component: () => import('./views/Student.vue') 
    }
  ]
})

export default router