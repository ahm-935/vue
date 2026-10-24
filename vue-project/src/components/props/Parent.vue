<script setup lang="ts">
import Child from './Child.vue';

</script>

<template>
    <div>
        <h1>Parent: Component</h1>
        <h4>Student Info</h4>
        <Child  :roll="10" :status="true" >
        <h4>Student's Photo</h4>
        <img src="https://i.pravatar.cc/150?img=5" alt="">
        </Child>
        <Child name="Khairul Deowan"  :roll="20" :status="false" />
    </div>
</template>