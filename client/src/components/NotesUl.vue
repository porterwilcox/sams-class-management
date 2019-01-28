<template>
<ul class="list-group">
    <em @click="newNote.active = !newNote.active" class="clickable mb-2 w-fc">{{newNote.active ? "Discard note" : "Add a note"}}</em>
    <li v-if="newNote.active" :class="{'flex-column': $mq == 'sm'}" class="list-group-item d-flex justify-content-between align-items-center">
        <input v-model="newNote.title" placeholder="Title">
        <textarea v-model="newNote.content" placeholder="Content"></textarea>
        <i @click="updateNote(newNote)" class="clickable far fa-save fa-lg text-success"></i>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(note, i) in s.notes">
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
                <i @click="updateNote(note, i)" class="clickable far fa-save fa-lg text-success"></i>
                <i @click="delete note.content; updateNote(note, i)" class="clickable far fa-trash-alt fa-lg ml-3 text-danger"></i>
            </span>
        </span>
    </li>
    <div v-if="!form && !s.notes.length && !newNote.active" class="text-center">
        <img src="@/assets/imgs/emptystate.jpg" alt="empty" height="180px">
        <h6 class="text-secondary">No notes for {{s.firstName}}!</h6>
    </div>
</ul>
</template>

<script>
export default {
    name: 'notesUl',
    props: ["s", "form"],
    data(){
        return {
            edit: "",
            newNote: {
                active: false,
                title: "",
                content: ""
            }
        }
    },
    methods: {
    updateNote(note, i) {
        if (!this.form) {
            this.$store.dispatch("updateStudent", { id: this.s._id, note });
        }
        else if (this.form == "newForm") {
            if (i == undefined) {
                this.$emit('addNew', note)
            } else {
                if (!note.content) {
                    this.s.notes.splice(i, 1)
                }
                this.$emit('modify', note, i)
            }
        }
        this.edit = "";
        this.newNote = {
        active: false,
        title: "",
        content: ""
        };
    }
  }
}
</script>
