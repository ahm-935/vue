<template>
     <button
      class="btn btn-outline-secondary btn-sm position-fixed top-0 end-0 m-3"
      data-theme-toggle
      title="Toggle theme"
    >
      <i class="bi bi-circle-half"></i>
    </button>
    <div class="auth-wrap">
      <div class="text-center">
        <div class="error-code text-primary">404</div>
        <i class="bi bi-compass fs-1 text-primary"></i>
        <h1 class="h3 mt-3">Page not found</h1>
        <p class="text-body-secondary">
          The page you're looking for doesn't exist or was moved.
        </p>
        <a href="/" class="btn btn-primary"
          ><i class="bi bi-house me-1"></i>Back to dashboard</a
        >
        <a href="/login" class="btn btn-outline-secondary">Login</a>
      </div>
    </div>
</template>