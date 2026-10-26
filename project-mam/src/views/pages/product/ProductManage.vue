<script setup lang="ts">
import PageHead from "@/components/PageHead.vue";
import { api, baseUrl } from "@/api.ts";
import { ref } from "vue";
import type { Product } from "@/interfaces/Product";

let products = ref<Product[]>([]);
function getAllProducts() {
  api
    .get("products")
    .then((res: any) => {
      // console.log(res.data.products.data);
      products.value = res.data.products.data;
      console.log(products);
    })
    .catch((err: any) => {
      console.log(err.response.data);
    });
}
getAllProducts();
</script>

<template>
  <PageHead title="Product" subtitle="Manage your products">
    <RouterLink class="btn-solid theme-accent" to="/products/create"
      ><i class="bi bi-plus-lg"></i> Add New
    </RouterLink>
  </PageHead>

  <section class="section-gap">
    <div class="card">
      <div class="card-body">
        <div class="table-head">
          <h5 class="card-title">Recent orders</h5>
          <span class="muted small">5 orders</span>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in products" :key="item.id">
                <td>{{ item.id }}</td>
                <td>
                  <div class="d-flex align-items-center gap-2">
                    <img
                      v-if="item.image"
                      :src="`${baseUrl}${item.image}`"
                      width="50"
                      height="50"
                      class="rounded"
                      style="object-fit: cover"
                    />
                    <img
                      v-else
                      src="https://via.placeholder.com/50x50.png?text=No+Image"
                      :alt="item.name"
                      width="50"
                      height="50"
                      class="rounded"
                      style="object-fit: cover"
                    />
                    {{ item.name }}
                  </div>
                </td>
                <td>{{ item.price }}</td>
                <td>{{ item.quantity }}</td>
                <td>
                  <span
                    class="badge"
                    :class="item.active ? 'bg-success' : 'bg-danger'"
                  >
                    {{ item.active ? "Active" : "Inactive" }}
                  </span>
                </td>
                <td>
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Accent theme example"
                  >
                    <button type="button" class="btn-outline theme-secondary">
                      <i class="bi bi-eye"></i>
                    </button>
                    <RouterLink
                      to="/products/update"
                      class="btn-outline theme-secondary"
                    >
                      <i class="bi bi-pencil"></i>
                    </RouterLink>
                    <button type="button" class="btn-outline theme-secondary">
                      <i class="bi bi-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
