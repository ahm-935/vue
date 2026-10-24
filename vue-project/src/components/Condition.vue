<script setup lang="ts">
import { ref } from "vue";

// const num = 0;
const count = ref(0);
</script>

<template>
  <h2>Condition</h2>
  <p v-if="count < 10">Number is less than 10</p>
  <p v-else>Number is more than 10</p>
  <hr />
  <p v-if="count < 0">Number is Negative</p>
  <p v-else-if="count > 0">Number is Positive</p>
  <p v-else="">Number is Zero</p>
  <hr />
  <button @click="count++">Increment</button>
  <p>Count: {{ count }}</p>
  <button @click="count--">Decrement</button>
  <!-- <p>Number is :  {{ count % 2 === 0 ? 'Even' : 'Odd' }}</p> -->
  <div v-if="count != 0">
    <p v-if="count % 2 == 0">Number is Even</p>
    <p v-else-if="count % 2 != 0">Number is Odd</p>
  </div>
  <p v-else>Number is Zero</p>
</template>
