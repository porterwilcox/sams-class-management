<template>
    
</template>

<script>
export default {
    name: 'student',
    mounted() {
        this.$store.dispatch('getStudent', this.$route.params.sId)
    },
    beforeRouteLeave(to, from, next) {
        this.$store.commit('setActiveStudent', {})
        next()
    },
}
</script>
