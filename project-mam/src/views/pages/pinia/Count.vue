<script setup lang="ts">
import PageHead from '@/components/PageHead.vue';
import { useCounterState } from '@/store/Count';


const counter = useCounterState();

</script>

<template>
  <PageHead title="Counter" subtitle="Counter Example">
    <RouterLink class="btn-outline theme-accent" to="/products"><i class="bi bi-arrow-left"></i> Back</RouterLink>
  </PageHead>

  <section class="section-gap">
    <div class="card">
      <div class="card-body">
       <h5 class="card-title">Counter</h5>
       <button class="btn-solid theme-accent" @click="counter.increment">Increment +</button>
       <p>Count: {{ counter.count }}</p>
        <button class="btn-outline theme-accent" @click="counter.decrement">Decrement -</button>

      </div>
      <div class="card">
        <ul>
          <li>Double: {{ counter.doubleCount }}</li>
          <li>Triple: {{ counter.tripleCount }}</li>
          <li>Square: {{ counter.squareCount }}</li>
        </ul>
      </div>
    </div>
  </section>
</template>