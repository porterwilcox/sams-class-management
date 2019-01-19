<template>
  <div class="row">
    <div class="col-12 col-md-8 offset-2" v-if="teacher._id">
      <div class="card">
        <div class="card-header">
          <h3>Notes</h3>
          <h6
            class="text-secondary"
          >These notes are for your use only. The student will never see them.</h6>
        </div>
        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item d-flex justify-content-between align-items-center" v-for="note in s.notes">
              <span>
                <b class="mr-2">{{note.title || ''}}</b>
                {{note.content}}
              </span>
              <span>
                <i class="far fa-edit"></i>
                <i class="far fa-trash-alt ml-2"></i>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
  }
};
</script>
