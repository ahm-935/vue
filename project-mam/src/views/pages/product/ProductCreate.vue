<script setup lang="ts">
import { ref } from 'vue';
import PageHead from '../../../components/PageHead.vue';
import { defaultProduct } from '@/interfaces/Product.ts';
import type { Category } from '@/interfaces/Category.ts';
import type { Brand } from '@/interfaces/Brand.ts';
import { api } from '@/api.ts';

let product = ref(defaultProduct);
let categories = ref<Category[]>([]);
let brands = ref<Brand[]>([]);

const handleSubmit = () => {
  // console.log(product.value);
  let data = new FormData();
  // data.append('name', product.value.name);
  // data.append('category_id', product.value.category_id);
  // data.append('brand_id', product.value.brand_id);
  // data.append('image', product.value.image);
  if (product.value.image) {
    data.append('image', product.value.image);
  }
  api
    .post('products', FormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((res: any) => {
      console.log(res.data);
    })
    .catch((err: any) => {
      console.log(err.response.data);
    });
}
function handleImage(e: any) {
  // const file = e.target.files[0];
  product.value.image = e.target.files[0] || null;
}
</script>

<template>
  <PageHead title="Product" subtitle="Create new item">
    <RouterLink class="btn-outline theme-accent" to="/products"><i class="bi bi-arrow-left"></i> Back</RouterLink>
  </PageHead>

  <section class="section-gap">
    <div class="card">
      <div class="card-body">
        <form v-on:submit.prevent="handleSubmit" enctype="multipart/form-data">
          <div class="row g-3">
            <div class="col-12 md:col-6">
              <div class="form-field">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" v-model="product.name">
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="form-field">
                <label class="form-label">Category</label>
                <select class="form-control" v-model="product.category_id">
                  <option selected disabled>Select category...</option>
                </select>
              </div>
            </div>
            <div class="col-12 md:col-6">
              <div class="form-field">
                <label class="form-label">Brand</label>
                <select class="form-control" v-model="product.brand_id">
                  <option selected disabled>Select brand...</option>
                </select>
              </div>
            </div>
            <div class="col-12 md:col-6 xl:col-3">
              <div class="form-field">
                <label class="form-label">Price (৳)</label>
                <input type="number" class="form-control" v-model="product.price">
              </div>
            </div>
            <div class="col-12 md:col-6 xl:col-3">
              <div class="form-field">
                <label class="form-label">QTY</label>
                <input type="number" class="form-control" v-model="product.quantity">
              </div>
            </div>
            <div class="col-12 md:col-6 xl:col-3">
              <div class="form-field">
                <label class="form-label">Reorder level</label>
                <input type="number" class="form-control" v-model="product.reorder_level">
              </div>
            </div>
            <div class="col-12">
              <div class="form-field">
                <label class="form-label">Description (optional)</label>
                <textarea class="form-control" v-model="product.description"></textarea>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-field">
                <label class="form-label">Image</label>
                <input type="file" class="form-control" accept="image/*" @change="handleImage">
              </div>
            </div>
            <div class="col-12">
              <div class="form-field">
                <input type="checkbox" id="active" class="check" v-model="product.active" />
                <label for="active">Is active</label>
              </div>
            </div>
            <div class="col-12 form-actions">
              <button type="submit" class="btn-solid theme-accent"><i class="bi bi-plus-lg"></i> Add New</button>
              <button type="reset" class="btn-outline theme-secondary">Reset</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>