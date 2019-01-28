<template>
  <div class="card mt-1">
    <div class="card-header">
      <span class="d-flex align-items-end">
        <h3 class="clickable" data-toggle="collapse" data-target="#note-collapse-body">Notes</h3>
        <i @click="info = !info" class="fas fa-info-circle text-secondary m-1 clickable"></i>
      </span>
      <h6 v-if="info" class="text-secondary">These notes are for your use only. {{s.firstName}} will never see them.</h6>
    </div>
    <div v-if="s._id" class="card-body collapse" id="note-collapse-body">
      <notes-ul :s="s" />
    </div>
  </div>
</template>

<script>
import NotesUl from '@/components/NotesUl.vue'
export default {
  name: "notes",
  props: ["s"],
  data() {
    return {
      info: false
    };
  },
  components: {
    NotesUl
  }
};
</script>