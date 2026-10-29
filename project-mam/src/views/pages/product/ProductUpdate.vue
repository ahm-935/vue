<script setup lang="ts">
import { onMounted, ref } from 'vue';
import PageHead from '../../../components/PageHead.vue';
import { defaultProduct } from '@/interfaces/Product.ts';
import type { Brand } from '@/interfaces/Brand.ts';
import type { Category } from '@/interfaces/Category.ts';
import { api, baseUrl } from '@/api.ts';
import { useRoute, useRouter } from 'vue-router';

const route = useRouter();
const id = useRoute().params.id;
let product = ref(defaultProduct);
let brands = ref<Brand[]>([]);
let categories = ref<Category[]>([]);
function getProduct() {
  api.get('products/' + id)
    .then((res: any) => {
      console.log(res.data.product);
      product.value = res.data.product;
    })
    .catch((err: any) => {
      console.log(err.response.data);
    });
}
function getAllBrands() {
  api.get('brands')
    .then((res: any) => {
      // console.log(res.data);
      brands.value = res.data.brands;
    })
    .catch((err: any) => {
      console.log(err.response.data);
    });
}
function getAllCategories() {
  api.get('categories')
    .then((res: any) => {
      categories.value = res.data.categories;
    })
    .catch((err: any) => {
      console.log(err.response.data);
    });
}
onMounted(() => {
  getProduct();
  getAllBrands();
  getAllCategories();
})
const handleSubmit = () => {
  // console.log(product.value);
  let formData = new FormData();
  // formData.append('_method', 'PUT');
  formData.append('name', product.value.name);
  formData.append('category_id', product.value.category_id.toString());
  formData.append('brand_id', product.value.brand_id.toString());
  formData.append('price', product.value.price.toString());
  formData.append('quantity', product.value.quantity.toString());
  if (product.value.reorder_level) formData.append('reorder_level', product.value.reorder_level.toString());
  formData.append('description', product.value.description ? product.value.description : '');
  formData.append('active', product.value.active.toString());
  if (product.value.image instanceof File) formData.append('image', product.value.image);

  api.put(`products/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
    .then((res: any) => {
      // console.log(res.data);
      route.push('/products');
    })
    .catch((err: any) => {
      console.log(err.response.data);
    });

}
function handleImage(event: any) {
  product.value.image = event.target.files[0] || null;
}
</script>

<template>
  <PageHead title="Product Edit" subtitle="Update current item">
    <RouterLink class="btn-outline theme-accent" to="/products"><i class="bi bi-arrow-left"></i> Back</RouterLink>
  </PageHead>

  <section class="section-gap">
    <div class="card">
      <div class="card-body">
        <form v-on:submit.prevent="handleSubmit">
          <div class="row g-3">
            <div class="col-12 md:col-sm-6">
              <div class="form-field">
                <label class="form-label">Name</label>
                <input type="text" class="form-control" v-model="product.name">
              </div>
            </div>
            <div class="col-12 md:col-sm-6">
              <div class="form-field">
                <label class="form-label">Category</label>
                <select class="form-control" v-model="product.category_id">
                  <option selected disabled>Select category...</option>
                  <option v-for="item in categories" :key="item.id" :value="item.id">{{ item.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-12 md:col-sm-6">
              <div class="form-field">
                <label class="form-label">Brand</label>
                <select class="form-control" v-model="product.brand_id">
                  <option selected disabled>Select brand...</option>
                  <option v-for="item in brands" :key="item.id" :value="item.id">{{ item.name }}</option>
                </select>
              </div>
            </div>
            <div class="col-12 md:col-sm-6 xl:col-3">
              <div class="form-field">
                <label class="form-label">Price (৳)</label>
                <input type="number" class="form-control" v-model="product.price">
              </div>
            </div>
            <div class="col-12 md:col-sm-6 xl:col-3">
              <div class="form-field">
                <label class="form-label">QTY</label>
                <input type="number" class="form-control" v-model="product.quantity">
              </div>
            </div>
            <div class="col-12 md:col-sm-6 xl:col-3">
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
                <label class="form-label">Image (optional)</label>
                <input type="file" class="form-control" accept="image/*" @change="handleImage" />
              </div>
              <div v-if="product.image">
                <img :src="`${baseUrl}${product.image}`" :alt="product.name" width="100" class="mt-2 rounded">
              </div>
            </div>
            <div class="col-sm-6">
              <div class="form-field">
                <input type="checkbox" id="active" class="check" v-model="product.active" :checked="product.active" />
                <label for="active">Is active</label>
              </div>
            </div>
            <div class="col-12 form-actions pt-4">
              <button type="submit" class="btn-solid theme-accent"><i class="bi bi-plus-lg"></i> Update</button>
              <button type="reset" class="btn-outline theme-secondary">Reset</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>