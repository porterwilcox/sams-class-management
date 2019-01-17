<template>
  <div class="row h90">
    <div class="col-12 col-md-10 offset-md-1 inherent-h">
      <div class="row inherent-h">
        <class v-for="c in classes" :c="c"></class>
        <!-- <div class="col-12 col-md-3">
          <div class="card m-1 bg-red text-white">
            <h4>Add Class</h4>
          </div>
        </div> -->
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
