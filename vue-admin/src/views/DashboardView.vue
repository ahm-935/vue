<script setup>
import { computed } from 'vue'
import StatCard from '@/components/StatCard.vue'
import LineChart from '@/components/LineChart.vue'
import { useUsersStore } from '@/stores/users'
import { useProductsStore } from '@/stores/products'
import { useAuthStore } from '@/stores/auth'

const users = useUsersStore()
const products = useProductsStore()
const auth = useAuthStore()

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']
const series = [
  { name: 'Revenue', data: [4200, 5100, 4800, 6300, 7200, 6900, 8100, 8800, 9400, 10200], cls: 'chart-line' },
  { name: 'Expenses', data: [3100, 3400, 3300, 3900, 4200, 4100, 4600, 4900, 5200, 5400], cls: 'chart-line-2' },
]

const stockValue = computed(() => products.items.reduce((s, p) => s + p.price * p.stock, 0))
const money = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const byCategory = computed(() => {
  const map = {}
  products.items.forEach((p) => (map[p.category] = (map[p.category] ?? 0) + 1))
  const total = products.items.length || 1
  return Object.entries(map)
    .map(([name, n]) => ({ name, n, pct: Math.round((n / total) * 100) }))
    .sort((a, b) => b.n - a.n)
})

const recentUsers = computed(() => users.items.slice(0, 5))
const statusTone = { Active: 'success', Pending: 'warning', Suspended: 'danger' }
const initials = (n) => n.split(' ').map((p) => p[0]).slice(0, 2).join('')
</script>

<template>
  <div>
    <div class="page-header">
      <div>
        <h1 class="page-title">Welcome back, {{ auth.user?.name.split(' ')[0] }} 👋</h1>
        <p class="text-secondary mb-0">Here's what's happening with your store today.</p>
      </div>
      <RouterLink to="/products" class="btn btn-primary"><i class="bi bi-plus-lg me-1"></i>New product</RouterLink>
    </div>

    <div class="row g-3 g-xl-4 mb-4">
      <div class="col-12 col-sm-6 col-xl-3"><StatCard label="Total revenue" value="$10,200" icon="bi-currency-dollar" :change="8.2" tone="primary" /></div>
      <div class="col-12 col-sm-6 col-xl-3"><StatCard label="Users" :value="String(users.items.length)" icon="bi-people" :change="12.5" tone="success" /></div>
      <div class="col-12 col-sm-6 col-xl-3"><StatCard label="Products" :value="String(products.items.length)" icon="bi-box-seam" :change="-2.4" tone="warning" /></div>
      <div class="col-12 col-sm-6 col-xl-3"><StatCard label="Inventory value" :value="money(stockValue)" icon="bi-bar-chart-line" :change="4.1" tone="info" /></div>
    </div>

    <div class="row g-3 g-xl-4 mb-4">
      <div class="col-12 col-xl-8">
        <div class="card h-100">
          <div class="card-header d-flex flex-wrap align-items-center justify-content-between gap-2">
            <span>Revenue vs expenses</span>
            <span class="small text-secondary d-flex gap-3">
              <span><i class="bi bi-circle-fill me-1" style="color: var(--nova-primary); font-size: 0.6rem"></i>Revenue</span>
              <span><i class="bi bi-circle-fill me-1" style="color: var(--nova-accent); font-size: 0.6rem"></i>Expenses</span>
            </span>
          </div>
          <div class="card-body pt-0"><LineChart :labels="labels" :series="series" /></div>
        </div>
      </div>

      <div class="col-12 col-xl-4">
        <div class="card h-100">
          <div class="card-header">Products by category</div>
          <div class="card-body pt-0">
            <div v-for="c in byCategory" :key="c.name" class="mb-3">
              <div class="d-flex justify-content-between small mb-1">
                <span class="fw-medium">{{ c.name }}</span><span class="text-secondary">{{ c.n }} · {{ c.pct }}%</span>
              </div>
              <div class="bar-track"><div class="bar-fill" :style="{ width: c.pct + '%' }"></div></div>
            </div>
            <p v-if="!byCategory.length" class="text-secondary mb-0">No products yet.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-header d-flex align-items-center justify-content-between">
        <span>Recent users</span>
        <RouterLink to="/users" class="small text-decoration-none">View all</RouterLink>
      </div>
      <div class="table-responsive">
        <table class="table table-modern table-stack align-middle">
          <thead><tr><th>User</th><th>Role</th><th>Status</th><th>Joined</th></tr></thead>
          <tbody>
            <tr v-for="u in recentUsers" :key="u.id">
              <td data-label="User">
                <div class="d-flex align-items-center gap-2 text-start">
                  <span class="avatar avatar-sm">{{ initials(u.name) }}</span>
                  <span><span class="d-block fw-semibold lh-sm">{{ u.name }}</span><small class="text-secondary">{{ u.email }}</small></span>
                </div>
              </td>
              <td data-label="Role">{{ u.role }}</td>
              <td data-label="Status"><span class="badge-soft" :class="statusTone[u.status]">{{ u.status }}</span></td>
              <td data-label="Joined" class="text-secondary">{{ u.joined }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
