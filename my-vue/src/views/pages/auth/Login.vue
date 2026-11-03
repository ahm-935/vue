<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const loginForm = ref<HTMLFormElement | null>(null);
const passwordVisible = ref(false);
const submitted = ref(false);

function toggleTheme() {
  const root = document.documentElement;
  const currentTheme = root.getAttribute('data-bs-theme');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

  localStorage.setItem('theme', nextTheme);
  root.setAttribute('data-bs-theme', nextTheme);
}

function signIn() {
  submitted.value = true;

  if (!loginForm.value?.checkValidity()) {
    return;
  }

  localStorage.setItem('auth', '1');
  void router.push('/');
}
</script>

<template>
  <button
    type="button"
    class="btn btn-outline-secondary btn-sm position-fixed top-0 end-0 m-3"
    data-theme-toggle
    title="Toggle theme"
    aria-label="Toggle theme"
    @click="toggleTheme"
  >
    <i class="bi bi-circle-half" aria-hidden="true"></i>
  </button>

  <div class="auth-wrap">
    <div class="card auth-card shadow-sm">
      <div class="card-body p-4">
        <div class="text-center mb-4">
          <i class="bi bi-grid-1x2-fill text-primary fs-1" aria-hidden="true"></i>
          <h1 class="h4 mt-2">Welcome back</h1>
          <p class="text-body-secondary">
            Sign in to your account (demo: any email/password)
          </p>
        </div>

        <form
          ref="loginForm"
          class="needs-validation"
          :class="{ 'was-validated': submitted }"
          novalidate
          @submit.prevent="signIn"
        >
          <div class="mb-3">
            <label class="form-label" for="login-email">Email</label>
            <input
              id="login-email"
              type="email"
              name="email"
              class="form-control"
              autocomplete="username"
              placeholder="you@example.com"
              required
            />
            <div class="invalid-feedback">Enter a valid email.</div>
          </div>

          <div class="mb-3">
            <label class="form-label" for="login-password">Password</label>
            <div class="input-group">
              <input
                id="login-password"
                name="password"
                :type="passwordVisible ? 'text' : 'password'"
                class="form-control"
                autocomplete="current-password"
                minlength="6"
                required
              />
              <button
                type="button"
                class="btn btn-outline-secondary"
                :aria-label="passwordVisible ? 'Hide password' : 'Show password'"
                :aria-pressed="passwordVisible"
                @click="passwordVisible = !passwordVisible"
              >
                <i
                  :class="passwordVisible ? 'bi bi-eye-slash' : 'bi bi-eye'"
                  aria-hidden="true"
                ></i>
              </button>
              <div class="invalid-feedback">Min. 6 characters.</div>
            </div>
          </div>

          <div class="d-flex justify-content-between mb-3">
            <div class="form-check">
              <input id="remember-me" class="form-check-input" type="checkbox" />
              <label class="form-check-label" for="remember-me">Remember me</label>
            </div>
            <a href="#" class="small" @click.prevent>Forgot password?</a>
          </div>

          <button type="submit" class="btn btn-primary w-100">Sign in</button>
        </form>

        <p class="text-center mt-3 mb-0 small">
          No account? <RouterLink to="/register">Register</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>
