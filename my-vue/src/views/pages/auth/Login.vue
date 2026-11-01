<script></script>

<template>
  <button
    class="btn btn-outline-secondary btn-sm position-fixed top-0 end-0 m-3"
    data-theme-toggle
    title="Toggle theme"
  >
    <i class="bi bi-circle-half"></i>
  </button>
  <div class="auth-wrap">
    <div class="card auth-card shadow-sm">
      <div class="card-body p-4">
        <div class="text-center mb-4">
          <i class="bi bi-grid-1x2-fill text-primary fs-1"></i>
          <h1 class="h4 mt-2">Welcome back</h1>
          <p class="text-body-secondary">
            Sign in to your account (demo: any email/password)
          </p>
        </div>
        <form id="f" class="needs-validation" novalidate>
          <div class="mb-3">
            <label class="form-label">Email</label
            ><input
              type="email"
              class="form-control"
              placeholder="you@example.com"
            />
            <div class="invalid-feedback">Enter a valid email.</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Password</label>
            <div class="input-group">
              <input
                type="password"
                name="p"
                class="form-control"
                minlength="6"
                placeholder=""
              /><button
                type="button"
                class="btn btn-outline-secondary"
                data-pw-toggle
              >
                <i class="bi bi-eye"></i>
              </button>
              <div class="invalid-feedback">Min. 6 characters.</div>
            </div>
          </div>
          <div class="d-flex justify-content-between mb-3">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="rm" /><label
                class="form-check-label"
                for="rm"
                >Remember me</label
              >
            </div>
            <a href="#" class="small">Forgot password?</a>
          </div>
          <RouterLink to="/" class="btn btn-primary w-100">Sign in</RouterLink>
        </form>
        <p class="text-center mt-3 mb-0 small">
          No account? <RouterLink to="/register">Register</RouterLink>
        </p>
      </div>
    </div>
  </div>
  <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script> -->
</template>
<!-- <script>
const f = document.getElementById("f");
f.addEventListener("submit", (e) => {
  e.preventDefault();
  f.classList.add("was-validated");
  if (f.checkValidity()) {
    localStorage.setItem("auth", "1");
    location.href = "index.html";
  }
});
</script> -->
