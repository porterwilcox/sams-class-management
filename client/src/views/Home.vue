<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
      <input type="text" v-model="fooBar">
      <button @click="strFormater()">click me</button>
      <h3>lodash camelCase: {{lodashed}}</h3>
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
