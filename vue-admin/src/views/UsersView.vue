<script setup>
import { computed, reactive, ref, watch } from 'vue'
import BaseModal from '@/components/BaseModal.vue'
import ConfirmModal from '@/components/ConfirmModal.vue'
import PaginationBar from '@/components/PaginationBar.vue'
import { useUsersStore } from '@/stores/users'
import { useUiStore } from '@/stores/ui'

const store = useUsersStore()
const ui = useUiStore()

const ROLES = ['Admin', 'Editor', 'Viewer']
const STATUSES = ['Active', 'Pending', 'Suspended']
const tone = { Active: 'success', Pending: 'warning', Suspended: 'danger' }

// --- list state ---
const q = ref('')
const roleFilter = ref('')
const sort = reactive({ key: 'name', dir: 'asc' })
const page = ref(1)
const perPage = 6

const filtered = computed(() => {
  const term = q.value.trim().toLowerCase()
  const rows = store.items.filter(
    (u) =>
      (!roleFilter.value || u.role === roleFilter.value) &&
      (!term || u.name.toLowerCase().includes(term) || u.email.toLowerCase().includes(term)),
  )
  const k = sort.key
  const m = sort.dir === 'asc' ? 1 : -1
  return [...rows].sort((a, b) => String(a[k]).localeCompare(String(b[k])) * m)
})
const paged = computed(() => filtered.value.slice((page.value - 1) * perPage, page.value * perPage))
watch([q, roleFilter], () => (page.value = 1))
watch(filtered, (rows) => {
  const last = Math.max(1, Math.ceil(rows.length / perPage))
  if (page.value > last) page.value = last
})

function sortBy(key) {
  if (sort.key === key) sort.dir = sort.dir === 'asc' ? 'desc' : 'asc'
  else Object.assign(sort, { key, dir: 'asc' })
}
const sortIcon = (key) => (sort.key !== key ? 'bi-arrow-down-up opacity-25' : sort.dir === 'asc' ? 'bi-sort-up' : 'bi-sort-down')

// --- form modal (create + edit) ---
const modalOpen = ref(false)
const editingId = ref(null)
const submitted = ref(false)
const blank = () => ({ name: '', email: '', role: 'Viewer', status: 'Active' })
const form = reactive(blank())

const errors = computed(() => ({
  name: form.name.trim().length < 2 ? 'Name must be at least 2 characters.' : '',
  email: !/^\S+@\S+\.\S+$/.test(form.email)
    ? 'Enter a valid email.'
    : store.items.some((u) => u.id !== editingId.value && u.email.toLowerCase() === form.email.toLowerCase())
      ? 'This email is already in use.'
      : '',
}))

function openCreate() {
  editingId.value = null
  submitted.value = false
  Object.assign(form, blank())
  modalOpen.value = true
}
function openEdit(u) {
  editingId.value = u.id
  submitted.value = false
  Object.assign(form, { name: u.name, email: u.email, role: u.role, status: u.status })
  modalOpen.value = true
}
function save() {
  submitted.value = true
  if (Object.values(errors.value).some(Boolean)) return
  const data = { ...form, name: form.name.trim(), email: form.email.trim() }
  if (editingId.value) {
    store.update(editingId.value, data)
    ui.toast('User updated')
  } else {
    store.add(data)
    ui.toast('User created')
  }
  modalOpen.value = false
}

// --- delete ---
const deleting = ref(null)
function confirmDelete() {
  store.remove(deleting.value.id)
  ui.toast(`Deleted ${deleting.value.name}`, 'danger')
  deleting.value = null
}

const initials = (n) => n.split(' ').map((p) => p[0]).slice(0, 2).join('')
</script>

<template>
  <div>
    <div class="page-header">
      <div>
        <h1 class="page-title">Users</h1>
        <p class="text-secondary mb-0">Create, edit and remove team members.</p>
      </div>
      <button class="btn btn-primary" @click="openCreate"><i class="bi bi-person-plus me-1"></i>Add user</button>
    </div>

    <div class="card">
      <div class="card-body border-bottom" style="border-color: var(--nova-border) !important">
        <div class="row g-2">
          <div class="col-12 col-md-6 col-lg-5">
            <div class="input-group">
              <span class="input-group-text bg-transparent"><i class="bi bi-search"></i></span>
              <input v-model="q" type="search" class="form-control" placeholder="Search name or email…" aria-label="Search users" />
            </div>
          </div>
          <div class="col-6 col-md-3 col-lg-2">
            <select v-model="roleFilter" class="form-select" aria-label="Filter by role">
              <option value="">All roles</option>
              <option v-for="r in ROLES" :key="r">{{ r }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-modern table-hover table-stack align-middle">
          <thead>
            <tr>
              <th class="sortable" @click="sortBy('name')">User <i class="bi" :class="sortIcon('name')"></i></th>
              <th class="sortable" @click="sortBy('role')">Role <i class="bi" :class="sortIcon('role')"></i></th>
              <th class="sortable" @click="sortBy('status')">Status <i class="bi" :class="sortIcon('status')"></i></th>
              <th class="sortable" @click="sortBy('joined')">Joined <i class="bi" :class="sortIcon('joined')"></i></th>
              <th class="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="u in paged" :key="u.id">
              <td data-label="User">
                <div class="d-flex align-items-center gap-2 text-start">
                  <span class="avatar avatar-sm">{{ initials(u.name) }}</span>
                  <span><span class="d-block fw-semibold lh-sm">{{ u.name }}</span><small class="text-secondary">{{ u.email }}</small></span>
                </div>
              </td>
              <td data-label="Role">{{ u.role }}</td>
              <td data-label="Status"><span class="badge-soft" :class="tone[u.status]">{{ u.status }}</span></td>
              <td data-label="Joined" class="text-secondary">{{ u.joined }}</td>
              <td data-label="Actions" class="text-end text-nowrap">
                <button class="btn btn-sm btn-light me-1" :aria-label="`Edit ${u.name}`" @click="openEdit(u)"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-light text-danger" :aria-label="`Delete ${u.name}`" @click="deleting = u"><i class="bi bi-trash3"></i></button>
              </td>
            </tr>
            <tr v-if="!paged.length">
              <td colspan="5" class="text-center text-secondary py-5">
                <i class="bi bi-people fs-1 d-block mb-2 opacity-50"></i>No users match your filters.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PaginationBar v-model:page="page" :per-page="perPage" :total="filtered.length" />
    </div>

    <!-- Create / edit -->
    <BaseModal v-model="modalOpen" :title="editingId ? 'Edit user' : 'Add user'">
      <form novalidate @submit.prevent="save">
        <div class="mb-3">
          <label for="u-name" class="form-label fw-medium">Full name</label>
          <input id="u-name" v-model="form.name" class="form-control" :class="{ 'is-invalid': submitted && errors.name }" />
          <div class="invalid-feedback">{{ errors.name }}</div>
        </div>
        <div class="mb-3">
          <label for="u-email" class="form-label fw-medium">Email</label>
          <input id="u-email" v-model="form.email" type="email" class="form-control" :class="{ 'is-invalid': submitted && errors.email }" />
          <div class="invalid-feedback">{{ errors.email }}</div>
        </div>
        <div class="row g-3 mb-4">
          <div class="col-6">
            <label for="u-role" class="form-label fw-medium">Role</label>
            <select id="u-role" v-model="form.role" class="form-select"><option v-for="r in ROLES" :key="r">{{ r }}</option></select>
          </div>
          <div class="col-6">
            <label for="u-status" class="form-label fw-medium">Status</label>
            <select id="u-status" v-model="form.status" class="form-select"><option v-for="s in STATUSES" :key="s">{{ s }}</option></select>
          </div>
        </div>
        <div class="d-flex gap-2 justify-content-end">
          <button type="button" class="btn btn-light" @click="modalOpen = false">Cancel</button>
          <button class="btn btn-primary">{{ editingId ? 'Save changes' : 'Create user' }}</button>
        </div>
      </form>
    </BaseModal>

    <ConfirmModal
      :model-value="!!deleting"
      title="Delete user"
      :message="`Delete ${deleting?.name}? This cannot be undone.`"
      @update:model-value="deleting = null"
      @confirm="confirmDelete"
    />
  </div>
</template>
