<template>
    <div class="row justify-content-start">
        <student v-for="s in c.students" :s="s"></student>
        <h6>this is the students array {{c.students}}</h6>
    </div>
</template>

<script>
import Student from '@/components/StudentCard.vue'
export default {
    name: 'class',
    mounted() {
        this.$store.dispatch('getClass', this.$route.params.cId)
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit('setActiveClass', {})
        next()
    },
    computed: {
        c() {
            return this.$store.state.activeClass
        }
    },
    methods: {},
    components: {
        Student
    }
}
</script>
