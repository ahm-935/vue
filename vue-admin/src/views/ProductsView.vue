<script setup>
import { computed, reactive, ref, watch } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import PaginationBar from '@/components/PaginationBar.vue'
import { CATEGORIES, PRODUCT_STATUSES, useProductsStore } from '@/stores/products'
import { useUiStore } from '@/stores/ui'

const store = useProductsStore()
const ui = useUiStore()

const tone = { Published: 'success', Draft: 'muted', 'Out of stock': 'danger' }
const money = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD' })

// --- list state ---
const q = ref('')
const category = ref('')
const status = ref('')
const sort = reactive({ key: 'name', dir: 'asc' })
const page = ref(1)
const perPage = 6

const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  const rows = store.items.filter(
    (p) =>
      (!category.value || p.category === category.value) &&
      (!status.value || p.status === status.value) &&
      (!term || p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term)),
  )
  const { key, dir } = sort
  const m = dir === 'asc' ? 1 : -1
  return [...rows].sort((a, b) =>
    typeof a[key] === 'number' ? (a[key] - b[key]) * m : String(a[key]).localeCompare(String(b[key])) * m,
  )
})
const paged = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))
watch([q, category, status], () => (page.value = 1))
watch(filtered, (rows) => {
  const last = Math.max(1, Math.ceil(rows.length / perPage))
  if (page.value > last) page.value = last
})

function sortBy(key) {
  if (sort.key === key) sort.dir = sort.dir === 'asc' ? 'desc' : 'asc'
  else Object.assign(sort, { key, dir: 'asc' })
}
const sortIcon = (key) => (sort.key !== key ? 'bi-arrow-down-up opacity-25' : sort.dir === 'asc' ? 'bi-sort-up' : 'bi-sort-down')

// --- form modal ---
const modalOpen = ref(false)
const editingId = ref(null)
const submitted = ref(false)
const blank = () => ({ name: '', sku: '', category: CATEGORIES[0], price: '', stock: 0, status: 'Draft' })
const form = reactive(blank())

const errors = computed(() => ({
  name: form.name.trim().length < 2 ? 'Product name is required.' : '',
  sku: !form.sku.trim()
    ? 'SKU is required.'
    : store.items.some((p) => p.id !== editingId.value && p.sku.toLowerCase() === form.sku.trim().toLowerCase())
      ? 'SKU must be unique.'
      : '',
  price: form.price === '' || Number(form.price) < 0 ? 'Enter a valid price.' : '',
  stock: !Number.isInteger(Number(form.stock)) || Number(form.stock) < 0 ? 'Stock must be a whole number ≥ 0.' : '',
}))

function openCreate() {
  editingId.value = null
  submitted.value = false
  Object.assign(form, blank())
  modalOpen.value = true
}
function openEdit(p) {
  editingId.value = p.id
  submitted.value = false
  Object.assign(form, { name: p.name, sku: p.sku, category: p.category, price: p.price, stock: p.stock, status: p.status })
  modalOpen.value = true
}
function save() {
  submitted.value = true
  if (Object.values(errors.value).some(Boolean)) return
  const data = { ...form, name: form.name.trim(), sku: form.sku.trim(), price: Number(form.price), stock: Number(form.stock) }
  if (editingId.value) {
    store.update(editingId.value, data)
    ui.toast('Product updated')
  } else {
    store.add(data)
    ui.toast('Product created')
  }
  modalOpen.value = false
}

const deleting = ref(null)
function confirmDelete() {
  store.remove(deleting.value.id)
  ui.toast(`Deleted ${deleting.value.name}`, 'danger')
  deleting.value = null
}
</script>

<template>
  <div>
    <div class="page-header">
      <div>
        <h1 class="page-title">Products</h1>
        <p class="text-secondary mb-0">Manage your catalogue and inventory.</p>
      </div>
      <button class="btn btn-primary" @click="openCreate"><i class="bi bi-plus-lg me-1"></i>Add product</button>
    </div>

    <div class="card">
      <div class="card-body border-bottom" style="border-color: var(--nova-border) !important">
        <div class="row g-2">
          <div class="col-12 col-md-6 col-lg-4">
            <div class="input-group">
              <span class="input-group-text bg-transparent"><i class="bi bi-search"></i></span>
              <input v-model="q" type="search" class="form-control" placeholder="Search name or SKU…" aria-label="Search products" />
            </div>
          </div>
          <div class="col-6 col-md-3 col-lg-2">
            <select v-model="category" class="form-select" aria-label="Filter by category">
              <option value="">All categories</option>
              <option v-for="c in CATEGORIES" :key="c">{{ c }}</option>
            </select>
          </div>
          <div class="col-6 col-md-3 col-lg-2">
            <select v-model="status" class="form-select" aria-label="Filter by status">
              <option value="">All statuses</option>
              <option v-for="s in PRODUCT_STATUSES" :key="s">{{ s }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-modern table-hover table-stack align-middle">
          <thead>
            <tr>
              <th class="sortable" @click="sortBy('name')">Product <i class="bi" :class="sortIcon('name')"></i></th>
              <th class="sortable" @click="sortBy('category')">Category <i class="bi" :class="sortIcon('category')"></i></th>
              <th class="sortable" @click="sortBy('price')">Price <i class="bi" :class="sortIcon('price')"></i></th>
              <th class="sortable" @click="sortBy('stock')">Stock <i class="bi" :class="sortIcon('stock')"></i></th>
              <th>Status</th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in paged" :key="p.id">
              <td data-label="Product">
                <div class="d-flex align-items-center gap-2 text-start">
                  <span class="stat-icon bg-primary-subtle text-primary" style="width: 38px; height: 38px; font-size: 1rem; border-radius: 10px"><i class="bi bi-box-seam"></i></span>
                  <span><span class="d-block fw-semibold lh-sm">{{ p.name }}</span><small class="text-secondary">{{ p.sku }}</small></span>
                </div>
              </td>
              <td data-label="Category">{{ p.category }}</td>
              <td data-label="Price" class="fw-medium">{{ money(p.price) }}</td>
              <td data-label="Stock"><span :class="{ 'text-danger fw-semibold': p.stock === 0 }">{{ p.stock }}</span></td>
              <td data-label="Status"><span class="badge-soft" :class="tone[p.status]">{{ p.status }}</span></td>
              <td data-label="Actions" class="text-end text-nowrap">
                <button class="btn btn-sm btn-light me-1" :aria-label="`Edit ${p.name}`" @click="openEdit(p)"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-light text-danger" :aria-label="`Delete ${p.name}`" @click="deleting = p"><i class="bi bi-trash3"></i></button>
              </td>
            </tr>
            <tr v-if="!paged.length">
              <td colspan="6" class="text-center text-secondary py-5">
                <i class="bi bi-box-seam fs-1 d-block mb-2 opacity-50"></i>No products match your filters.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PaginationBar v-model:page="page" :per-page="perPage" :total="filtered.length" />
    </div>

    <BaseModal v-model="modalOpen" :title="editingId ? 'Edit product' : 'Add product'" max-width="620px">
      <form novalidate @submit.prevent="save">
        <div class="row g-3 mb-4">
          <div class="col-12 col-sm-8">
            <label for="p-name" class="form-label fw-medium">Name</label>
            <input id="p-name" v-model="form.name" class="form-control" :class="{ 'is-invalid': submitted && errors.name }" />
            <div class="invalid-feedback">{{ errors.name }}</div>
          </div>
          <div class="col-12 col-sm-4">
            <label for="p-sku" class="form-label fw-medium">SKU</label>
            <input id="p-sku" v-model="form.sku" class="form-control" :class="{ 'is-invalid': submitted && errors.sku }" />
            <div class="invalid-feedback">{{ errors.sku }}</div>
          </div>
          <div class="col-12 col-sm-6">
            <label for="p-cat" class="form-label fw-medium">Category</label>
            <select id="p-cat" v-model="form.category" class="form-select"><option v-for="c in CATEGORIES" :key="c">{{ c }}</option></select>
          </div>
          <div class="col-12 col-sm-6">
            <label for="p-status" class="form-label fw-medium">Status</label>
            <select id="p-status" v-model="form.status" class="form-select"><option v-for="s in PRODUCT_STATUSES" :key="s">{{ s }}</option></select>
          </div>
          <div class="col-6">
            <label for="p-price" class="form-label fw-medium">Price</label>
            <div class="input-group has-validation">
              <span class="input-group-text">$</span>
              <input id="p-price" v-model="form.price" type="number" min="0" step="0.01" class="form-control" :class="{ 'is-invalid': submitted && errors.price }" />
              <div class="invalid-feedback">{{ errors.price }}</div>
            </div>
          </div>
          <div class="col-6">
            <label for="p-stock" class="form-label fw-medium">Stock</label>
            <input id="p-stock" v-model="form.stock" type="number" min="0" step="1" class="form-control" :class="{ 'is-invalid': submitted && errors.stock }" />
            <div class="invalid-feedback">{{ errors.stock }}</div>
          </div>
        </div>
        <div class="d-flex gap-2 justify-content-end">
          <button type="button" class="btn btn-light" @click="modalOpen = false">Cancel</button>
          <button class="btn btn-primary">{{ editingId ? 'Save changes' : 'Create product' }}</button>
        </div>
      </form>
    </BaseModal>

    <ConfirmModal
      :model-value="!!deleting"
      title="Delete product"
      :message="`Delete ${deleting?.name}? This cannot be undone.`"
      @update:model-value="deleting = null"
      @confirm="confirmDelete"
    />
  </div>
</template>
