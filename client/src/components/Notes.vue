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
      <!-- TODO: 12-42 to a new component for reuse -->
      <ul class="list-group">
        <em @click="newNote.active = !newNote.active" class="clickable mb-2 w-fc">{{newNote.active ? "Discard" : "Add a note"}}</em>
        <li v-if="newNote.active" :class="{'flex-column': $mq == 'sm'}" class="list-group-item d-flex justify-content-between align-items-center">
          <input v-model="newNote.title" placeholder="Title">
          <textarea v-model="newNote.content" placeholder="Content"></textarea>
          <i @click="updateNote(newNote)" class="clickable far fa-save fa-lg text-success"></i>
        </li>
        <li class="list-group-item d-flex justify-content-between align-items-center" v-for="note in s.notes">
          <span :class="{'d-flex flex-column': $mq == 'sm'}" v-if="edit != note._id">
            <b class="mr-2">{{note.title || ''}}</b>
            {{note.content}}
          </span>
          <span v-else>
            Title:
            <input v-model="note.title">
            Content:
            <textarea v-model="note.content"></textarea>
          </span>
          <span>
            <i v-if="edit != note._id" @click="edit = note._id" class="clickable far fa-edit"></i>
            <span v-else>
              <i @click="updateNote(note)" class="clickable far fa-save fa-lg text-success"></i>
              <i @click="delete note.content; updateNote(note)" class="clickable far fa-trash-alt fa-lg ml-3 text-danger"></i>
            </span>
          </span>
        </li>
        <div v-if="!s.notes.length && !newNote.active" class="text-center">
          <img src="@/assets/imgs/emptystate.jpg" alt="empty" height="180px">
          <h6 class="text-secondary">No notes for {{s.firstName}}!</h6>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "notes",
  props: ["s"],
  data() {
    return {
      edit: "",
      info: false,
      newNote: {
        active: false,
        title: "",
        content: ""
      }
    };
  },
  methods: {
    updateNote(note) {
      this.$store.dispatch("updateStudent", { id: this.s._id, note });
      this.edit = "";
      this.newNote = {
        active: false,
        title: "",
        content: ""
      };
    }
  }
};
</script>