<template>
     <div class="col-12 col-md-3 h-fc">
        <div class="card m-1">
            <div @click="$router.push({name: 'student', params: {sId: s._id}})" class="card-header clickable d-flex align-items-end">
                <h4>{{s.firstName}} {{s.lastName}}</h4>
            </div>
            <div class="card-body">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'student-card',
    props: ['s']
}
</script>
