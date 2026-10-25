import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { load, save, uid } from './storage'

const DEMO_USER = {
  id: 'me',
  name: 'Alex Morgan',
  email: 'admin@nova.dev',
  password: 'password',
  phone: '+880 1700 000000',
  role: 'Administrator',
  location: 'Dhaka, Bangladesh',
  bio: 'Product lead who keeps the lights on. Coffee first, dashboards second.',
}

export const useAuthStore = defineStore('auth', () => {
  const accounts = ref(load('nova:accounts', [DEMO_USER]))
  const session = ref(load('nova:session', null)) // user id
  const user = computed(() => accounts.value.find((a) => a.id === session.value) ?? null)
  const isLoggedIn = computed(() => !!user.value)

  const persist = () => {
    save('nova:accounts', accounts.value)
    save('nova:session', session.value)
  }

  function login(email, password) {
    const found = accounts.value.find(
      (a) => a.email.toLowerCase() === email.trim().toLowerCase() && a.password === password,
    )
    if (!found) throw new Error('Invalid email or password.')
    session.value = found.id
    persist()
  }

  function register({ name, email, password }) {
    if (accounts.value.some((a) => a.email.toLowerCase() === email.trim().toLowerCase()))
      throw new Error('An account with this email already exists.')
    const account = { id: uid(), name, email: email.trim(), password, role: 'Administrator', phone: '', location: '', bio: '' }
    accounts.value.push(account)
    session.value = account.id
    persist()
  }

  function logout() {
    session.value = null
    persist()
  }

  function updateProfile(patch) {
    const idx = accounts.value.findIndex((a) => a.id === session.value)
    if (idx > -1) accounts.value[idx] = { ...accounts.value[idx], ...patch }
    persist()
  }

  function changePassword(current, next) {
    if (user.value.password !== current) throw new Error('Current password is incorrect.')
    updateProfile({ password: next })
  }

  return { user, isLoggedIn, login, register, logout, updateProfile, changePassword }
})
