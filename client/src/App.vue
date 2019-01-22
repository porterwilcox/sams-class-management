<template>
  <div id="app" class="container-fluid">
    <div id="nav" class="row">
      <div class="d-flex align-items-center col-1" @click="$router.go(-1)">
        <img class="clickable" src="https://schoolassets.s3.amazonaws.com/logos/12813/12813.gif" alt="home" :height="$mq == 'sm' ? '40px' : '70px'">
      </div>
      <div class="col-4 col-md-6 d-flex align-items-start">
        <mq-layout mq="md+">
          <h3 class="m-0 mt-2">{{c.period || student.firstName}} {{c.name || student.lastName}}</h3>
        </mq-layout>
        <mq-layout mq="sm">
          <h6 class="m-0 ml-3">{{c.period || student.lastName}}</h6>
        </mq-layout>
      </div>
      <div class="nav-components col-3">
        <div v-if="teacher._id">
          <router-link :to="{name: 'home'}" class="px-2">Home</router-link>
          <router-link :to="{name: 'classes'}" class="px-2">Classes</router-link>
          <router-link :to="{name: 'create'}" class="px-2">Create</router-link>
        </div>
        <div v-else>
          <router-link :to="{name: 'login'}" class="px-4">Sign In</router-link>
          <router-link :to="{name: 'about'}" class="px-4">About</router-link>
        </div>
      </div>
      <div class="col d-flex justify-content-end align-items-center" v-if="teacher._id">
        <button @click="$store.dispatch('logout')" class="btn btn-sm">Logout</button>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: "app",
    computed: {
      teacher() {
        return this.$store.state.teacher;
      },
      c() {
        return this.$store.state.activeClass;
      },
      student() {
        return this.$store.state.activeStudent || {};
      }
    }
  };
</script>


<style>
  /* school colors */
  #app {
    background-color: var(--white);
  }

  :root {
    --blue: #27408b;
    --opac-blue: #27408b28;
    --red: #e51212;
    --opac-red: #e5121256;
    --white: #fffefe;
  }

  #nav {
    display: flex;
    height: 15vh;
    border-bottom: 2px solid var(--blue);
    background-color: var(--opac-blue);
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
    padding: 0 0.5vw;
    padding-bottom: 2vh;
    border-radius: 6%;
    text-decoration: none;
  }

  #nav a:hover {
    color: var(--red);
  }

  #nav a.router-link-exact-active {
    /* color: #42b983; */
    padding-bottom: 1vh;
    border: 2px solid var(--blue);
    border-bottom: 1vh solid white;
    background-color: var(--white);
    color: #2c3e50;
  }

  .nav-components,
  .nav-components div {
    height: inherit;
    display: flex;
    align-items: flex-end;
    justify-content: space-evenly;
  }

  @media (max-width: 767px) {
    .nav-components a {
      font-size: 0.8rem;
    }


  }

  /* permeating classes defined here */
  .h85 {
    height: 85vh;
  }

  .h50 {
    height: 50vh;
  }

  .h60 {
    height: 60vh;
  }

  .h-fc {
    height: fit-content;
  }

  .inherent-h {
    height: inherit;
  }

  .w-fc {
    width: fit-content;
  }

  .clickable {
    cursor: pointer;
  }

  .bg-blue {
    background-color: var(--blue);
  }

  .bg-opac-blue {
    background-color: var(--opac-blue);
  }

  .bg-red {
    background-color: var(--red);
  }

  .bg-opac-red {
    background-color: var(--opac-red);
  }

  .blue {
    color: var(--blue);
  }

  .red {
    color: var(--red);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  .card {
    border: 2px solid rgb(221, 220, 220);
  }

  .card-header {
    background-color: var(--blue);
    border: 2px solid var(--blue);
    color: white;
  }

  input {
    border: 1px solid var(--blue);
    width: 30vw;
  }
</style>