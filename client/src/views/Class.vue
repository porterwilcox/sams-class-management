<template>
  <div class="row">
    <div class="col-12 col-md-10 offset-md-1">
      <div class="row">
        <student v-for="s in c.students" :key="s._id" :s="s" :cId="c._id"></student>
      </div>
    </div>
  </div>
</template>

<script>
import Student from "@/components/StudentCard.vue";
export default {
  name: "class",
  mounted() {
    this.$store.dispatch("getClass", this.$route.params.cId);
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setActiveClass", {});
    next();
  },
  computed: {
    c() {
      return this.$store.state.activeClass;
    }
  },
  methods: {},
  components: {
    Student
  }
};
</script>
