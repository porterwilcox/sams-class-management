<template>
<ul class="list-group">
    <em @click="newNote.active = !newNote.active" class="clickable mb-2 w-fc">{{newNote.active ? "Discard note" : "Add a note"}}</em>
    <li v-if="newNote.active" :class="{'flex-column': $mq == 'sm'}" class="list-group-item d-flex justify-content-between align-items-center">
        <input v-model="newNote.title" placeholder="Title">
        <textarea v-model="newNote.content" placeholder="Content"></textarea>
        <i @click="updateNote(newNote)" class="clickable far fa-save fa-lg text-success"></i>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center" v-for="(note, i) in s.notes || form.notes">
        <span :class="{'d-flex flex-column': $mq == 'sm'}" v-if="edit == note._id || edit == i">
             Title:
            <input v-model="note.title">
            Content:
            <textarea v-model="note.content"></textarea>
        </span>
        <span v-else>
            <b class="mr-2">{{note.title || ''}}</b>
            {{note.content}}
        </span>
        <span>
            <span v-if="edit == note._id || edit == i">
                <i @click="updateNote(note, i)" class="clickable far fa-save fa-lg text-success"></i>
                <i @click="delete note.content; updateNote(note, i)" class="clickable far fa-trash-alt fa-lg ml-3 text-danger"></i>
            </span>
            <i v-else @click="edit = note._id || i" class="clickable far fa-edit"></i>
        </span>
    </li>
    <slot v-if="!newNote.active"></slot>
</ul>
</template>

<script>
export default {
    name: 'notesUl',
    props: ["s", "form"],
    data(){
        return {
            edit: "false",
            newNote: {
                active: false,
                title: "",
                content: ""
            }
        }
    },
    methods: {
    updateNote(note, i) {
        if (!this.form) this.$store.dispatch("updateStudent", { id: this.s._id, note });
        else {
            if(i == undefined) this.form.notes.push(note)
            else {
                note.content ? this.form.notes[i] = note : this.form.notes.splice(i, 1)
            }
        }
        this.edit = "false";
        this.newNote = {
        active: false,
        title: "",
        content: ""
        };
    }
  }
}
</script>
