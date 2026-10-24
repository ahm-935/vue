<script setup lang="ts">
import { ref } from "vue";
import Child from "./components/Child.vue";
import HelloWorld from "./components/HelloWorld.vue";
  const name = 'Leader Khairul Deowan';
  const age = 35;
  const count = ref(0);
  function test(){
    alert('hello dear');
  }
</script>

<template>
  <div class="app">
    <h1 class="name">Leader Khairul Deowan &nbsp;</h1>
    <span class="ab"> <HelloWorld /></span>
    <Child class="child" />
    <p>Name: {{ name }}</p>
    <p>Age: {{ age }}</p>
    <button @click="test">Click Me</button> <br>
  </div>
  <div class="app1">
    <button @click="count--">-</button>
    <span>{{ count }}</span>
    <button @click="count++">+</button>
  </div>

</template>

<style scoped>
.app{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.name{
  color: rgb(8, 14, 209);
}
.ab {
  color: rgb(150, 18, 108);
}
.child{
  color: rgb(195, 3, 3);
}
.app1{
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
