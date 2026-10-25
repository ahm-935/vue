<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

const auth = useAuthStore()
const ui = useUiStore()
const router = useRouter()

const form = reactive({ name: '', email: '', password: '', confirm: '', terms: false })
const touched = ref(false)
const error = ref('')
const showPw = ref(false)

const errors = computed(() => ({
  name: form.name.trim().length < 2 ? 'Please enter your full name.' : '',
  email: /^\S+@\S+\.\S+$/.test(form.email) ? '' : 'Enter a valid email address.',
  password: form.password.length < 8 ? 'Use at least 8 characters.' : '',
  confirm: form.confirm !== form.password || !form.confirm ? 'Passwords do not match.' : '',
  terms: form.terms ? '' : 'You must accept the terms.',
}))
const valid = computed(() => Object.values(errors.value).every((e) => !e))

const strength = computed(() => {
  const p = form.password
  let s = 0
  if (p.length >= 8) s++
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++
  if (/\d/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})
const strengthMeta = computed(() => [
  { t: 'Too short', c: 'bg-secondary' },
  { t: 'Weak', c: 'bg-danger' },
  { t: 'Fair', c: 'bg-warning' },
  { t: 'Good', c: 'bg-info' },
  { t: 'Strong', c: 'bg-success' },
][strength.value])

function submit() {
  touched.value = true
  error.value = ''
  if (!valid.value) return
  try {
    auth.register({ name: form.name.trim(), email: form.email, password: form.password })
    ui.toast('Account created — welcome aboard!')
    router.push('/')
  } catch (e) {
    error.value = e.message
  }
}
</script>

<template>
  <div>
    <h1 class="fw-bold mb-1" style="letter-spacing: -0.02em">Create account</h1>
    <p class="text-secondary mb-4">Start managing your business in minutes.</p>
    <div v-if="error" class="alert alert-danger small py-2" role="alert">{{ error }}</div>

    <form novalidate @submit.prevent="submit">
      <div class="mb-3">
        <label for="name" class="form-label fw-medium">Full name</label>
        <input id="name" v-model="form.name" class="form-control" :class="{ 'is-invalid': touched && errors.name }" autocomplete="name" />
        <div class="invalid-feedback">{{ errors.name }}</div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label fw-medium">Email</label>
        <input id="email" v-model="form.email" type="email" class="form-control" :class="{ 'is-invalid': touched && errors.email }" autocomplete="email" />
        <div class="invalid-feedback">{{ errors.email }}</div>
      </div>
      <div class="row g-3 mb-3">
        <div class="col-12 col-sm-6">
          <label for="password" class="form-label fw-medium">Password</label>
          <div class="input-group has-validation">
            <input id="password" v-model="form.password" :type="showPw ? 'text' : 'password'" class="form-control" :class="{ 'is-invalid': touched && errors.password }" autocomplete="new-password" />
            <button type="button" class="btn btn-outline-secondary" :aria-label="showPw ? 'Hide password' : 'Show password'" @click="showPw = !showPw">
              <i class="bi" :class="showPw ? 'bi-eye-slash' : 'bi-eye'"></i>
            </button>
            <div class="invalid-feedback">{{ errors.password }}</div>
          </div>
        </div>
        <div class="col-12 col-sm-6">
          <label for="confirm" class="form-label fw-medium">Confirm</label>
          <input id="confirm" v-model="form.confirm" :type="showPw ? 'text' : 'password'" class="form-control" :class="{ 'is-invalid': touched && errors.confirm }" autocomplete="new-password" />
          <div class="invalid-feedback">{{ errors.confirm }}</div>
        </div>
      </div>

      <div v-if="form.password" class="mb-3">
        <div class="progress" style="height: 6px" role="progressbar" :aria-valuenow="strength" aria-valuemin="0" aria-valuemax="4">
          <div class="progress-bar" :class="strengthMeta.c" :style="{ width: strength * 25 + '%' }"></div>
        </div>
        <small class="text-secondary">Strength: {{ strengthMeta.t }}</small>
      </div>

      <div class="form-check mb-4">
        <input id="terms" v-model="form.terms" class="form-check-input" :class="{ 'is-invalid': touched && errors.terms }" type="checkbox" />
        <label class="form-check-label small" for="terms">I agree to the <a href="#" @click.prevent>Terms</a> and <a href="#" @click.prevent>Privacy Policy</a></label>
        <div class="invalid-feedback">{{ errors.terms }}</div>
      </div>
      <button class="btn btn-primary btn-lg w-100">Create account</button>
    </form>

    <p class="text-center text-secondary mt-4 mb-0">
      Already registered? <RouterLink to="/login" class="fw-semibold text-decoration-none">Sign in</RouterLink>
    </p>
  </div>
</template>
