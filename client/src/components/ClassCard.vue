<template>
    <div class="col-12 col-md-3">
        <div class="card m-1">
            <div @click="$router.push({name: 'class', params: {cId: c._id}})" class="card-header clickable d-flex align-items-end">
                <h4>{{c.period}}</h4>
                <h5 class="ml-2">{{c.name}}</h5>
            </div>
            <div class="card-body">
                <h6>{{c.students.length}} students</h6>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'class-card',
    props: ['c']
}
</script>
