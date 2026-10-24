<script setup lang="ts">
import { reactive, ref } from "vue";

const user = ref({
  name: 'Nahid',
  age: 35
});
const student = reactive(
  {
    name: 'Sohag',
    age: 35
  }  
)
function changeName() {
  user.value.name = 'Nahid!';
  console.log( user.value.name);
}
function changeStuName() {
  student.name = 'Salam';
  console.log( student.name);
}
</script>

<template>
  <p>Name: {{ user.name }}</p>
  <p>Age: {{ user.age }}</p>
  <!-- <button @click="user.name = 'Arif'">Change Name</button> -->
  <button @click="changeName">Change Name</button>
  <br><hr>
  <p>Name: {{ student.name }}</p>
  <p>Age: {{ student.age }}</p>
  <button @click="changeStuName">Change Name</button>
</template>

<style scoped>

</style>
