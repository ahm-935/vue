<script setup lang="ts">
import './assets/css/style.css';
// import './assets/js/app.js';
import Sidebar from './views/layouts/Sidebar.vue';
import Header from './views/layouts/Header.vue';
import { RouterView } from 'vue-router';
import { useRoute } from 'vue-router';
const route = useRoute();
</script>

<template>
  <div class="d-flex">
  <Sidebar v-if="!route.meta.noLayout" />
    <div class="flex-grow-1 min-vw-0 d-flex flex-column min-vh-100" style="min-width:0">
      <Header v-if="!route.meta.noLayout" />
      <div class="p-4 flex-grow-1" id="slot">
       <RouterView />
      </div>
     
    </div>
    <!-- <div class="modal fade" id="confirmModal" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm</h5><button class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body" id="confirmMsg"></div>
          <div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button><button
              class="btn btn-danger" id="confirmOk">Delete</button></div>
        </div>
      </div>
    </div> -->
  </div>
</template>
