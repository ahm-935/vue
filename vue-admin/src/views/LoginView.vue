<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

const auth = useAuthStore()
const ui = useUiStore()
const router = useRouter()
const route = useRoute()

const form = reactive({ email: 'admin@nova.dev', password: 'password', remember: true })
const showPw = ref(false)
const error = ref('')
const loading = ref(false)

async function submit() {
  error.value = ''
  loading.value = true
  await new Promise((r) => setTimeout(r, 450)) // simulate network
  try {
    auth.login(form.email, form.password)
    ui.toast('Welcome back!')
    router.push(route.query.redirect || '/')
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="fw-bold mb-1" style="letter-spacing: -0.02em">Sign in</h1>
    <p class="text-secondary mb-4">Enter your credentials to access your dashboard.</p>

    <div class="alert alert-info small py-2">
      <i class="bi bi-info-circle me-1"></i> Demo account is pre-filled: <strong>admin@nova.dev</strong> / <strong>password</strong>
    </div>
    <div v-if="error" class="alert alert-danger small py-2" role="alert">{{ error }}</div>

    <form novalidate @submit.prevent="submit">
      <div class="mb-3">
        <label for="email" class="form-label fw-medium">Email</label>
        <input id="email" v-model="form.email" type="email" class="form-control form-control-lg" placeholder="you@company.com" autocomplete="email" required />
      </div>
      <div class="mb-3">
        <div class="d-flex justify-content-between">
          <label for="password" class="form-label fw-medium">Password</label>
          <a href="#" class="small text-decoration-none" @click.prevent="ui.toast('Password reset is not wired up in this demo', 'info')">Forgot?</a>
        </div>
        <div class="input-group input-group-lg">
          <input id="password" v-model="form.password" :type="showPw ? 'text' : 'password'" class="form-control" autocomplete="current-password" required />
          <button type="button" class="btn btn-outline-secondary" :aria-label="showPw ? 'Hide password' : 'Show password'" @click="showPw = !showPw">
            <i class="bi" :class="showPw ? 'bi-eye-slash' : 'bi-eye'"></i>
          </button>
        </div>
      </div>
      <div class="form-check mb-4">
        <input id="remember" v-model="form.remember" class="form-check-input" type="checkbox" />
        <label class="form-check-label" for="remember">Remember me</label>
      </div>
      <button class="btn btn-primary btn-lg w-100" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>Sign in
      </button>
    </form>

    <div class="d-flex align-items-center gap-3 my-4 text-secondary small">
      <hr class="flex-grow-1 m-0" />or continue with<hr class="flex-grow-1 m-0" />
    </div>
    <div class="row g-2">
      <div class="col-6"><button class="btn btn-outline-secondary w-100" @click="ui.toast('Social login is a placeholder', 'info')"><i class="bi bi-google me-1"></i>Google</button></div>
      <div class="col-6"><button class="btn btn-outline-secondary w-100" @click="ui.toast('Social login is a placeholder', 'info')"><i class="bi bi-github me-1"></i>GitHub</button></div>
    </div>

    <p class="text-center text-secondary mt-4 mb-0">
      New here? <RouterLink to="/register" class="fw-semibold text-decoration-none">Create an account</RouterLink>
    </p>
  </div>
</template>
