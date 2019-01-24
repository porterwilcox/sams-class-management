<template>
  <div class="home d-flex justify-content-center align-items-center mt-5">
    <img alt="Vue logo" src="../assets/logo.png" height="180px">
    <div>
      <input type="text" v-model="fooBar" placeholder="  type here, yay, so fun" class="shadow ml-2">
      <button @click="strFormater()" class="btn-sm btn-success shadow ml-2">Submit</button>
      <h3 class="mt-3 ml-2">camelCase: {{lodashed}}</h3>
    </div>
  </div>
</template>

<script>
  // @ is an alias to /src
  import camelCase from "lodash.camelcase";

  export default {
    name: "home",
    data() {
      return {
        fooBar: "",
        lodashed: ""
      };
    },
    components: {},
    computed: {
      classes() {
        return this.$store.state.classes;
      }
    },
    methods: {
      strFormater() {
        this.lodashed = camelCase(this.fooBar);
      }
    }
  };
</script>

<style>
  @media (max-width: 767px) {

    img {
      height: 80px;
    }

  }
</style>