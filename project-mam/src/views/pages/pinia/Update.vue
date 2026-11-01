<script setup lang="ts">
import PageHead from '@/components/PageHead.vue';
import { useCounterState } from '@/store/Count';
import { ref } from 'vue';
const counter = useCounterState();
const id = ref(counter.id);
function updateId() {
    counter.setId(id.value);
}
</script>

<template>
    <PageHead title="Update ID" subtitle="Update current item">
    </PageHead>

    <section class="section-gap">
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">Current ID</h5>
                ID: {{ counter.id }}
                <button class="btn-solid theme-accent" @click="counter.randomId">Update</button>
                <form @submit.prevent="updateId">
                    <input type="text" class="form-control" placeholder="Enter ID" v-model="id" />
                    <button type="submit" class="btn-outline theme-accent input-group-btn">Apply</button>
                </form>
            </div>
        </div>
    </section>
</template>