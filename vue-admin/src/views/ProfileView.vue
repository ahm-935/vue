<script setup>
import { computed, reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useUiStore } from '@/stores/ui'

const auth = useAuthStore()
const ui = useUiStore()

const tab = ref('details')
const initials = computed(() => auth.user.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase())

// --- details ---
const details = reactive({
  name: auth.user.name,
  email: auth.user.email,
  phone: auth.user.phone ?? '',
  location: auth.user.location ?? '',
  bio: auth.user.bio ?? '',
})
const detailsSubmitted = ref(false)
const detailsErr = computed(() => ({
  name: details.name.trim().length < 2 ? 'Name is required.' : '',
  email: /^\S+@\S+\.\S+$/.test(details.email) ? '' : 'Enter a valid email.',
}))
function saveDetails() {
  detailsSubmitted.value = true
  if (Object.values(detailsErr.value).some(Boolean)) return
  auth.updateProfile({ ...details, name: details.name.trim() })
  ui.toast('Profile updated')
}

// --- password ---
const pw = reactive({ current: '', next: '', confirm: '' })
const pwSubmitted = ref(false)
const pwError = ref('')
const pwErr = computed(() => ({
  current: pw.current ? '' : 'Enter your current password.',
  next: pw.next.length < 8 ? 'Use at least 8 characters.' : '',
  confirm: pw.confirm === pw.next && pw.confirm ? '' : 'Passwords do not match.',
}))
function savePassword() {
  pwSubmitted.value = true
  pwError.value = ''
  if (Object.values(pwErr.value).some(Boolean)) return
  try {
    auth.changePassword(pw.current, pw.next)
    Object.assign(pw, { current: '', next: '', confirm: '' })
    pwSubmitted.value = false
    ui.toast('Password changed')
  } catch (e) {
    pwError.value = e.message
  }
}

// --- notifications ---
const prefs = reactive({ email: true, push: true, weekly: false, marketing: false })
</script>

<template>
  <div>
    <div class="page-header">
      <div>
        <h1 class="page-title">Profile</h1>
        <p class="text-secondary mb-0">Manage your personal information and security.</p>
      </div>
    </div>

    <div class="row g-3 g-xl-4">
      <!-- Summary card -->
      <div class="col-12 col-lg-4 col-xxl-3">
        <div class="card overflow-hidden">
          <div class="profile-cover" style="border-radius: 0"></div>
          <div class="card-body text-center pt-0">
            <div class="profile-avatar-wrap"><span class="avatar avatar-lg">{{ initials }}</span></div>
            <h2 class="h5 fw-bold mt-3 mb-0">{{ auth.user.name }}</h2>
            <div class="text-secondary small mb-2">{{ auth.user.role }}</div>
            <p v-if="auth.user.bio" class="small text-secondary">{{ auth.user.bio }}</p>
            <ul class="list-unstyled text-start small mb-0 mt-3">
              <li class="d-flex gap-2 py-2 border-top" style="border-color: var(--nova-border) !important"><i class="bi bi-envelope text-secondary"></i><span class="text-break">{{ auth.user.email }}</span></li>
              <li v-if="auth.user.phone" class="d-flex gap-2 py-2 border-top" style="border-color: var(--nova-border) !important"><i class="bi bi-telephone text-secondary"></i>{{ auth.user.phone }}</li>
              <li v-if="auth.user.location" class="d-flex gap-2 py-2 border-top" style="border-color: var(--nova-border) !important"><i class="bi bi-geo-alt text-secondary"></i>{{ auth.user.location }}</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="col-12 col-lg-8 col-xxl-9">
        <div class="card">
          <div class="card-header pb-0">
            <ul class="nav nav-underline flex-nowrap overflow-auto">
              <li class="nav-item"><button class="nav-link text-nowrap" :class="{ active: tab === 'details' }" @click="tab = 'details'"><i class="bi bi-person me-1"></i>Details</button></li>
              <li class="nav-item"><button class="nav-link text-nowrap" :class="{ active: tab === 'security' }" @click="tab = 'security'"><i class="bi bi-shield-lock me-1"></i>Security</button></li>
              <li class="nav-item"><button class="nav-link text-nowrap" :class="{ active: tab === 'notifications' }" @click="tab = 'notifications'"><i class="bi bi-bell me-1"></i>Notifications</button></li>
            </ul>
          </div>

          <div class="card-body">
            <!-- Details -->
            <form v-if="tab === 'details'" novalidate @submit.prevent="saveDetails">
              <div class="row g-3">
                <div class="col-12 col-md-6">
                  <label for="pf-name" class="form-label fw-medium">Full name</label>
                  <input id="pf-name" v-model="details.name" class="form-control" :class="{ 'is-invalid': detailsSubmitted && detailsErr.name }" />
                  <div class="invalid-feedback">{{ detailsErr.name }}</div>
                </div>
                <div class="col-12 col-md-6">
                  <label for="pf-email" class="form-label fw-medium">Email</label>
                  <input id="pf-email" v-model="details.email" type="email" class="form-control" :class="{ 'is-invalid': detailsSubmitted && detailsErr.email }" />
                  <div class="invalid-feedback">{{ detailsErr.email }}</div>
                </div>
                <div class="col-12 col-md-6">
                  <label for="pf-phone" class="form-label fw-medium">Phone</label>
                  <input id="pf-phone" v-model="details.phone" type="tel" class="form-control" />
                </div>
                <div class="col-12 col-md-6">
                  <label for="pf-loc" class="form-label fw-medium">Location</label>
                  <input id="pf-loc" v-model="details.location" class="form-control" />
                </div>
                <div class="col-12">
                  <label for="pf-bio" class="form-label fw-medium">Bio</label>
                  <textarea id="pf-bio" v-model="details.bio" rows="4" maxlength="240" class="form-control"></textarea>
                  <div class="form-text text-end">{{ details.bio.length }}/240</div>
                </div>
              </div>
              <div class="mt-3 text-end"><button class="btn btn-primary">Save changes</button></div>
            </form>

            <!-- Security -->
            <form v-else-if="tab === 'security'" novalidate style="max-width: 480px" @submit.prevent="savePassword">
              <div v-if="pwError" class="alert alert-danger small py-2">{{ pwError }}</div>
              <div class="mb-3">
                <label for="pw-cur" class="form-label fw-medium">Current password</label>
                <input id="pw-cur" v-model="pw.current" type="password" class="form-control" :class="{ 'is-invalid': pwSubmitted && pwErr.current }" autocomplete="current-password" />
                <div class="invalid-feedback">{{ pwErr.current }}</div>
              </div>
              <div class="mb-3">
                <label for="pw-new" class="form-label fw-medium">New password</label>
                <input id="pw-new" v-model="pw.next" type="password" class="form-control" :class="{ 'is-invalid': pwSubmitted && pwErr.next }" autocomplete="new-password" />
                <div class="invalid-feedback">{{ pwErr.next }}</div>
              </div>
              <div class="mb-4">
                <label for="pw-conf" class="form-label fw-medium">Confirm new password</label>
                <input id="pw-conf" v-model="pw.confirm" type="password" class="form-control" :class="{ 'is-invalid': pwSubmitted && pwErr.confirm }" autocomplete="new-password" />
                <div class="invalid-feedback">{{ pwErr.confirm }}</div>
              </div>
              <button class="btn btn-primary">Update password</button>
            </form>

            <!-- Notifications -->
            <div v-else>
              <div v-for="[key, title, desc] in [
                ['email', 'Email notifications', 'Receive account activity by email.'],
                ['push', 'Push notifications', 'Get alerts in your browser.'],
                ['weekly', 'Weekly digest', 'A summary of your store every Monday.'],
                ['marketing', 'Product updates', 'News about new features.'],
              ]" :key="key" class="d-flex align-items-center justify-content-between py-3 border-bottom gap-3" style="border-color: var(--nova-border) !important">
                <div>
                  <div class="fw-medium">{{ title }}</div>
                  <div class="small text-secondary">{{ desc }}</div>
                </div>
                <div class="form-check form-switch m-0 fs-5">
                  <input v-model="prefs[key]" class="form-check-input" type="checkbox" role="switch" :aria-label="title" @change="ui.toast('Preference saved')" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
