<script setup lang="ts">
const list = ['Apple' , 'Banana' , 'Orange','Mango']

</script>

<template>
    <ul>
        <!-- <li v-for="item in list" v-bind:key="item">{{ item }}</li> -->
        <li v-for="item in list" :key="item">{{ item }}</li>
    </ul>
</template>