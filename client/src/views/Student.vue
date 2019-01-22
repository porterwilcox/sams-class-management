<template>
  <div class="row">
    <div class="col-12 col-md-8 offset-md-2" v-if="teacher._id">
      <notes :s="s" />
    </div>
  </div>
</template>

<script>
import Notes from "@/components/Notes.vue"
export default {
  name: "student",
  mounted() {
    this.$store.dispatch("getStudent", this.$route.params.sId);
  },
  beforeRouteLeave(to, from, next) {
    this.$store.commit("setActiveStudent", {});
    next();
  },
  computed: {
    s() {
      return this.$store.state.activeStudent;
    },
    teacher() {
      return this.$store.state.teacher;
    }
  },
  components: {
    Notes
  }
};
</script>
