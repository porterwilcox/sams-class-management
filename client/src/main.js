import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import MQ from 'vue-mq'

Vue.config.productionTip = false
Vue.use(MQ, {
  breakpoints: {
    sm: 480,
    md: 768,
    lg: 1024
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    this.$store.dispatch('authenticate')
  }
}).$mount('#app')
