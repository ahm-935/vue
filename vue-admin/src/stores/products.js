import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { load, save, uid } from './storage'

const seed = [
  { id: 'p1', name: 'Aero Wireless Headphones', sku: 'AUD-1001', category: 'Audio', price: 129.0, stock: 48, status: 'Published' },
  { id: 'p2', name: 'Pulse Smart Watch', sku: 'WRB-2040', category: 'Wearables', price: 199.5, stock: 22, status: 'Published' },
  { id: 'p3', name: 'Orbit Desk Lamp', sku: 'HOM-3302', category: 'Home', price: 59.0, stock: 0, status: 'Out of stock' },
  { id: 'p4', name: 'Nimbus Mechanical Keyboard', sku: 'PER-4410', category: 'Peripherals', price: 149.0, stock: 15, status: 'Published' },
  { id: 'p5', name: 'Lumen 4K Monitor 27"', sku: 'DIS-5005', category: 'Displays', price: 449.0, stock: 9, status: 'Published' },
  { id: 'p6', name: 'Flux USB-C Hub', sku: 'ACC-6120', category: 'Accessories', price: 39.9, stock: 120, status: 'Draft' },
  { id: 'p7', name: 'Zen Ergonomic Chair', sku: 'FUR-7001', category: 'Furniture', price: 329.0, stock: 6, status: 'Published' },
  { id: 'p8', name: 'Echo Bluetooth Speaker', sku: 'AUD-1022', category: 'Audio', price: 79.0, stock: 0, status: 'Out of stock' },
]

export const CATEGORIES = ['Audio', 'Wearables', 'Home', 'Peripherals', 'Displays', 'Accessories', 'Furniture']
export const PRODUCT_STATUSES = ['Published', 'Draft', 'Out of stock']

export const useProductsStore = defineStore('products', () => {
  const items = ref(load('nova:products', seed))
  watch(items, (v) => save('nova:products', v), { deep: true })

  const add = (p) => items.value.unshift({ ...p, id: uid() })
  const update = (id, patch) => {
    const i = items.value.findIndex((p) => p.id === id)
    if (i > -1) items.value[i] = { ...items.value[i], ...patch }
  }
  const remove = (id) => (items.value = items.value.filter((p) => p.id !== id))

  return { items, add, update, remove }
})
