<template>
    
</template>

<script>
export default {
    name: 'student',
    mounted() {
        this.$store.dispatch('getStudent', this.$route.params.sId)
    }
}
</script>
