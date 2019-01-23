<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
// @ is an alias to /src

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
  }
};
</script>
