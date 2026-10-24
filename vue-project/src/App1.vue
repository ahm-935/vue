<script lang="ts">
import Child from "./components/Child.vue";
import HelloWorld from "./components/HelloWorld.vue";
export default {
  components: {
    Child,
    HelloWorld
  },
 setup(){
   return {
     name: 'Leader Khairul Deowan',
     age: 35,
  
    test(){
      alert('hello');
    },
    test2: () => {
      alert('hello Leader');
    }
  }
}
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
    <button @click="test2">Click Me</button>
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
</style>
