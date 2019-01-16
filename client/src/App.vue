<template>
  <div id="app" class="container-fluid">
    <div id="nav">
      <div class="nav-components offset-6 col-3" v-if="teacher._id">
        <router-link to="/">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/third">Third</router-link>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app',
  computed: {
    teacher() {
      return this.$store.state.teacher
    }
  }
}
</script>


<style>
/* school colors */
#app {
  background-color: var(--white);
}
:root {
  --blue: #27408b;
  --red: #e51212;
  --white: #fffefe;
}
#nav {
  height: 10vh;
  border: 3px solid var(--blue);
  background-color: #f6f8fa;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  padding: 0 .5vw;
  padding-bottom: 3vh;
  border-radius: 13%;
}
#nav a.router-link-exact-active {
  /* color: #42b983; */
  padding-bottom: 2vh;
  border: 3px solid var(--blue);
  border-bottom: 1vh solid white;
  background-color: var(--white);
}
.nav-components {
  height: inherit;
  display: flex;
  align-items: flex-end;
  justify-content: space-evenly;
}
</style>
