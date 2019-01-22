<template>
  <div class="row h85">
    <div class="col-12">
      <div class="row">
        <class v-for="c in classes" :c="c"></class>
      </div>
    </div>
  </div>
</template>
<script>
  import Class from "@/components/ClassCard.vue";
  export default {
    name: "classes",
    data() {
      return {};
    },
    computed: {
      classes() {
        return this.$store.state.classes;
      },
      clss() {
        return this.$store.state.activeClass;
      }
    },
    methods: {},
    components: {
      Class
    }
  };
</script>