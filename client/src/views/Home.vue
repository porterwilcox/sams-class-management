<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div v-for="c in classes">
      <h6 @click="deleteClass(c._id)">{{c._id}}</h6>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  mounted() {
    this.$store.dispatch('login', {email: "porter@test.com", password: "thisthat"})
  },
  components: {
    HelloWorld
  },
  computed: {
    classes() {
      return this.$store.state.classes
    }
  },
  methods: {
    deleteClass(id){
      this.$store.dispatch('deleteClass', id)
    }
  }
}
</script>
