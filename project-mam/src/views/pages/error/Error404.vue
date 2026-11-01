<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goHome = () => {
  router.push('/')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <div class="error-page min-vh-100 d-flex align-items-center justify-content-center">
    <div class="container">
      <div class="row justify-content-center text-center">
        <div class="col-lg-7 col-md-9">

          <!-- Error Icon -->
          <div class="error-icon mb-4">
            <i class="bi bi-exclamation-triangle-fill"></i>
          </div>

          <!-- Error Code -->
          <h1 class="error-code fw-bold">404</h1>

          <!-- Heading -->
          <h2 class="fw-bold mb-3">
            Oops! Page Not Found
          </h2>

          <!-- Description -->
          <p class="text-muted fs-5 mb-4">
            Sorry, the page you are looking for doesn't exist,
            has been removed, or the URL is incorrect.
          </p>

          <!-- Buttons -->
          <div class="d-flex justify-content-center gap-3 flex-wrap">
            <button
              class="btn btn-primary btn-lg px-4"
              @click="goHome"
            >
              <i class="bi bi-house-door me-2"></i>
              Back to Home
            </button>

            <button
              class="btn btn-outline-secondary btn-lg px-4"
              @click="goBack"
            >
              <i class="bi bi-arrow-left me-2"></i>
              Go Back
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.error-icon {
  font-size: 65px;
  color: #ffc107;
}

.error-code {
  font-size: clamp(100px, 20vw, 180px);
  line-height: 1;
  color: #0d6efd;
  letter-spacing: -8px;
  text-shadow: 5px 5px 0 rgba(13, 110, 253, 0.1);
}

h2 {
  color: #1e4d7c;
}

button {
  border-radius: 8px;
  transition: all 0.3s ease;
}

button:hover {
  transform: translateY(-3px);
}
</style>