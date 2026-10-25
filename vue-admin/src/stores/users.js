import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { load, save, uid } from './storage'

const seed = [
  { id: 'u1', name: 'Sophia Carter', email: 'sophia@example.com', role: 'Admin', status: 'Active', joined: '2026-01-14' },
  { id: 'u2', name: 'Liam Johnson', email: 'liam@example.com', role: 'Editor', status: 'Active', joined: '2026-02-03' },
  { id: 'u3', name: 'Olivia Brown', email: 'olivia@example.com', role: 'Viewer', status: 'Pending', joined: '2026-03-21' },
  { id: 'u4', name: 'Noah Davis', email: 'noah@example.com', role: 'Editor', status: 'Suspended', joined: '2026-04-09' },
  { id: 'u5', name: 'Emma Wilson', email: 'emma@example.com', role: 'Viewer', status: 'Active', joined: '2026-05-30' },
  { id: 'u6', name: 'Ava Martinez', email: 'ava@example.com', role: 'Admin', status: 'Active', joined: '2026-06-18' },
  { id: 'u7', name: 'Ethan Anderson', email: 'ethan@example.com', role: 'Viewer', status: 'Pending', joined: '2026-07-07' },
  { id: 'u8', name: 'Mia Thomas', email: 'mia@example.com', role: 'Editor', status: 'Active', joined: '2026-08-25' },
  { id: 'u9', name: 'Lucas Moore', email: 'lucas@example.com', role: 'Viewer', status: 'Active', joined: '2026-09-12' },
  { id: 'u10', name: 'Isabella Clark', email: 'isabella@example.com', role: 'Editor', status: 'Suspended', joined: '2026-10-01' },
]

export const useUsersStore = defineStore('users', () => {
  const items = ref(load('nova:users', seed))
  watch(items, (v) => save('nova:users', v), { deep: true })

  const add = (u) => items.value.unshift({ ...u, id: uid(), joined: new Date().toISOString().slice(0, 10) })
  const update = (id, patch) => {
    const i = items.value.findIndex((u) => u.id === id)
    if (i > -1) items.value[i] = { ...items.value[i], ...patch }
  }
  const remove = (id) => (items.value = items.value.filter((u) => u.id !== id))

  return { items, add, update, remove }
})
