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
                <i class="fas fa-plus mr-2 fa-lg clickable"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'student-card',
    props: ['s'],
    data() {
        return {
            numbers: [1, 2, 3, 4]
        }
    }
}
</script>
<style scoped>
.my-file {
    border-top-right-radius: 40%;
}
</style>
