<script setup lang="ts">
import { reactive } from 'vue';
import { defaultStudent } from '../interfaces/Student';

const stu = reactive(defaultStudent);

function handleSubmit() {
    console.log(stu);
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <h2>Registration Form</h2>
    <label class="label" for="ID">ID</label><br />
    <input type="text" name="ID" placeholder="Enter your ID" id="ID"
    v-model="stu.id" /><br />
    <label class="label" for="name">Name</label><br />
    <input
      type="text"
      name="name"
      placeholder="Enter your name"
      id="name" v-model="stu.name" 
    /><br />
    <label class="label" for="email">Email</label><br />
    <input
      type="email"
      name="email"
      placeholder="Enter your email"
      id="email" v-model="stu.email"
    /><br />
    <!-- <label class="label" for="password">Password</label><br />
    <input type="password" name="password" placeholder="Enter your password" id="password" /><br /> -->
    <!-- <label class="label" for="phone">Phone</label><br />
    <input
      type="tel"
      name="phone"
      placeholder="Enter your phone number"
      id="phone"
    /><br /> -->
    <div>
      <input type="checkbox" name="status" id="status" v-model="stu.status" /> Is Active <br />
    </div>
    <button type="submit">Submit</button>
  </form>
</template>

<style scoped>
h2 {
  text-align: center;
  color: #1dbd85;
  font-weight: bold;
  font-size: 40px;
}
form {
  background-color: #e9e6ea;
  width: 350px;
  padding: 100px;
  border-radius: 15px;
  margin: 0 auto;
}
input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
button[type="submit"] {
  background-color: #19a393 !important;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  margin: 0 auto;
}
div {
  display: flex;
  justify-content: start !important;
  align-items: center;
  gap: 5px;
}
</style>
