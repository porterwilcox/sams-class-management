<template>
     <div class="col-12 col-md-3 h-fc">
        <div class="card m-1">
            <div @click="$router.push({name: 'student', params: {sId: s._id}})" class="card-header clickable d-flex align-items-end">
                <h4>{{s.firstName}} {{s.lastName}}</h4>
            </div>
            <div class="card-body d-flex justify-content-between align-items-center">
                <div v-if="s.forms.length" class="d-flex">
                    <i v-for="f in s.forms" class="far fa-file-alt mr-2 fa-2x clickable red bg-opac-red my-file"></i>
                </div>
                <div v-else>
                    <h6 class="m-0">No Forms!</h6>
                </div>
                <i data-toggle="modal" :data-target="'#form-modal'+s._id" class="fas fa-plus mr-2 fa-lg clickable"></i>
            </div>
        </div>
        <form-modal :s="s" :cId="cId"></form-modal>
    </div>
</template>

<script>
import FormModal from '@/components/CreateFormModal.vue'
export default {
    name: 'student-card',
    props: ['s', 'cId'],
    data() {
        return {
            numbers: [1, 2, 3, 4]
        }
    },
    components: {
        FormModal
    }
}
</script>
<style scoped>
.my-file {
    border-top-right-radius: 40%;
}
</style>
