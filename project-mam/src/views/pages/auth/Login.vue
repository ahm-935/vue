<script setup lang="ts">
import { api } from "@/api";
import { ref } from "vue";
import {  useRouter } from "vue-router";

const emit = defineEmits<{
  submit: [credentials: { email: string; password: string }];
}>();

const email = ref("arif@mail.com");
const password = ref("0000");
const showPassword = ref(false);
const message = ref("");
const route = useRouter();
function handleSubmit() {
  api
    .post("/login", { email: email.value, password: password.value })
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("vue-token", res.data.token);
      route.push({ name: "Dashboard" });
    })
    .catch((err) => {
      console.error(err.response.data);
      message.value =
        err.response.data.message ||
        "An error occurred during login. Please try again later.";
    });
}
</script>

<template>
  <section class="login-page">
    <div class="login-card">
      <header class="login-header">
        <div class="login-icon" aria-hidden="true">
          <i class="bi bi-person-lock"></i>
        </div>
        <h1>Welcome back</h1>
        <p>Sign in to continue to your account.</p>
      </header>

      <form class="login-form" @submit.prevent="handleSubmit">
        <div class="form-field">
          <label for="login-email" class="form-label">Email address</label>
          <input
            id="login-email"
            v-model="email"
            class="form-control"
            type="email"
            name="email"
            autocomplete="username"
            placeholder="you@example.com"
            required
          />
        </div>

        <div class="form-field">
          <div class="password-label">
            <label for="login-password" class="form-label">Password</label>
          </div>
          <div class="password-input">
            <input
              id="login-password"
              v-model="password"
              class="form-control"
              :type="showPassword ? 'text' : 'password'"
              name="password"
              autocomplete="current-password"
              placeholder="Enter your password"
              required
            />
            <button
              class="password-toggle"
              type="button"
              :aria-label="showPassword ? 'Hide password' : 'Show password'"
              :aria-pressed="showPassword"
              @click="showPassword = !showPassword"
            >
              <i
                :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"
                aria-hidden="true"
              ></i>
            </button>
          </div>
        </div>
        <p
          v-if="message"
          class="login-error login-error text-center text-sm"
          role="alert"
        >
          {{ message }}
        </p>
        <button class="btn btn-primary login-submit" type="submit">
          Sign in
          <i class="bi bi-arrow-right" aria-hidden="true"></i>
        </button>
      </form>

      <p class="login-footer">Secure access to your account</p>
    </div>
  </section>
</template>

<style scoped>
.login-page {
  min-height: calc(100dvh - 5rem);
  display: grid;
  place-items: center;
  padding: 2rem 1rem;
}

.login-card {
  width: min(100%, 27rem);
  padding: clamp(1.5rem, 5vw, 2.5rem);
  border: 1px solid var(--bs-border-color);
  border-radius: 1rem;
  background: var(--bs-body-bg);
  box-shadow: 0 1rem 3rem rgb(0 0 0 / 8%);
}

.login-header {
  margin-bottom: 2rem;
  text-align: center;
}

.login-icon {
  width: 3.5rem;
  height: 3.5rem;
  display: grid;
  place-items: center;
  margin: 0 auto 1rem;
  border-radius: 1rem;
  background: var(--bs-primary-bg-subtle);
  color: var(--bs-primary);
  font-size: 1.5rem;
}

.login-header h1 {
  margin: 0 0 0.5rem;
  font-size: 1.75rem;
  font-weight: 700;
}

.login-header p,
.login-footer {
  margin: 0;
  color: var(--bs-secondary-color);
}

.login-form {
  display: grid;
  gap: 1.25rem;
}

.form-field {
  display: grid;
  gap: 0.5rem;
}

.form-label {
  margin: 0;
  font-weight: 600;
}

.password-input {
  position: relative;
}

.password-input .form-control {
  padding-inline-end: 3rem;
}

.password-toggle {
  position: absolute;
  inset-block: 0;
  inset-inline-end: 0;
  width: 3rem;
  border: 0;
  background: transparent;
  color: var(--bs-secondary-color);
}

.password-toggle:focus-visible {
  outline: 2px solid var(--bs-primary);
  outline-offset: -4px;
  border-radius: 0.5rem;
}

.login-submit {
  min-height: 2.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 0.25rem;
}

.login-error {
  color: var(--bs-danger);
}

.login-footer {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.875rem;
}
</style>
