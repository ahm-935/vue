<script setup>
import { computed, reactive, ref } from 'vue'
import { useUiStore } from '@/stores/ui'

const ui = useUiStore()

const f = reactive({
  first: '', last: '', email: '', username: '', website: '', amount: '', country: '',
  gender: 'female', interests: ['design'], plan: 'pro', notify: true, volume: 40,
  date: '', time: '', color: '#4f46e5', message: '', agree: false,
})
const submitted = ref(false)
const fileName = ref('')

const errors = computed(() => ({
  first: f.first.trim() ? '' : 'First name is required.',
  email: /^\S+@\S+\.\S+$/.test(f.email) ? '' : 'Enter a valid email.',
  country: f.country ? '' : 'Please choose a country.',
  agree: f.agree ? '' : 'You must agree before submitting.',
}))

function submit() {
  submitted.value = true
  if (Object.values(errors.value).some(Boolean)) return ui.toast('Please fix the highlighted fields', 'danger')
  ui.toast('Form submitted successfully')
}
function reset() {
  Object.assign(f, {
    first: '', last: '', email: '', username: '', website: '', amount: '', country: '', gender: 'female',
    interests: ['design'], plan: 'pro', notify: true, volume: 40, date: '', time: '', color: '#4f46e5', message: '', agree: false,
  })
  submitted.value = false
  fileName.value = ''
}
const onFile = (e) => (fileName.value = e.target.files[0]?.name ?? '')
</script>

<template>
  <div>
    <div class="page-header">
      <div>
        <h1 class="page-title">Form Group</h1>
        <p class="text-secondary mb-0">A reference for every input pattern, with live validation.</p>
      </div>
    </div>

    <div class="row g-3 g-xl-4">
      <!-- Main form -->
      <div class="col-12 col-xl-8">
        <form class="card" novalidate @submit.prevent="submit" @reset.prevent="reset">
          <div class="card-header">Account details</div>
          <div class="card-body">
            <div class="row g-3">
              <div class="col-12 col-md-6">
                <div class="form-floating">
                  <input id="f-first" v-model="f.first" class="form-control" :class="{ 'is-invalid': submitted && errors.first }" placeholder="First name" />
                  <label for="f-first">First name</label>
                  <div class="invalid-feedback">{{ errors.first }}</div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-floating">
                  <input id="f-last" v-model="f.last" class="form-control" placeholder="Last name" />
                  <label for="f-last">Last name</label>
                </div>
              </div>
              <div class="col-12">
                <div class="form-floating">
                  <input id="f-email" v-model="f.email" type="email" class="form-control" :class="{ 'is-invalid': submitted && errors.email }" placeholder="Email" />
                  <label for="f-email">Email address</label>
                  <div class="invalid-feedback">{{ errors.email }}</div>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <label for="f-user" class="form-label fw-medium">Username</label>
                <div class="input-group">
                  <span class="input-group-text">@</span>
                  <input id="f-user" v-model="f.username" class="form-control" placeholder="johndoe" />
                </div>
              </div>
              <div class="col-12 col-md-6">
                <label for="f-amount" class="form-label fw-medium">Budget</label>
                <div class="input-group">
                  <span class="input-group-text">$</span>
                  <input id="f-amount" v-model="f.amount" type="number" class="form-control" placeholder="0.00" />
                  <span class="input-group-text">USD</span>
                </div>
              </div>
              <div class="col-12">
                <label for="f-web" class="form-label fw-medium">Website</label>
                <div class="input-group">
                  <span class="input-group-text">https://</span>
                  <input id="f-web" v-model="f.website" class="form-control" placeholder="example.com" />
                  <button type="button" class="btn btn-outline-secondary">Verify</button>
                </div>
                <div class="form-text">Input groups combine text, inputs and buttons.</div>
              </div>

              <div class="col-12 col-md-6">
                <label for="f-country" class="form-label fw-medium">Country</label>
                <select id="f-country" v-model="f.country" class="form-select" :class="{ 'is-invalid': submitted && errors.country }">
                  <option value="" disabled>Choose…</option>
                  <option>Bangladesh</option><option>India</option><option>United Kingdom</option><option>United States</option><option>Germany</option>
                </select>
                <div class="invalid-feedback">{{ errors.country }}</div>
              </div>
              <div class="col-6 col-md-3">
                <label for="f-date" class="form-label fw-medium">Date</label>
                <input id="f-date" v-model="f.date" type="date" class="form-control" />
              </div>
              <div class="col-6 col-md-3">
                <label for="f-time" class="form-label fw-medium">Time</label>
                <input id="f-time" v-model="f.time" type="time" class="form-control" />
              </div>

              <div class="col-12 col-md-6">
                <div class="form-label fw-medium">Gender</div>
                <div class="d-flex flex-wrap gap-3">
                  <div v-for="g in ['female', 'male', 'other']" :key="g" class="form-check">
                    <input :id="`g-${g}`" v-model="f.gender" class="form-check-input" type="radio" name="gender" :value="g" />
                    <label class="form-check-label text-capitalize" :for="`g-${g}`">{{ g }}</label>
                  </div>
                </div>
              </div>
              <div class="col-12 col-md-6">
                <div class="form-label fw-medium">Interests</div>
                <div class="d-flex flex-wrap gap-3">
                  <div v-for="i in ['design', 'coding', 'music', 'travel']" :key="i" class="form-check">
                    <input :id="`i-${i}`" v-model="f.interests" class="form-check-input" type="checkbox" :value="i" />
                    <label class="form-check-label text-capitalize" :for="`i-${i}`">{{ i }}</label>
                  </div>
                </div>
              </div>

              <div class="col-12">
                <div class="form-label fw-medium">Plan</div>
                <div class="btn-group w-100 flex-wrap" role="group" aria-label="Plan">
                  <template v-for="p in ['free', 'pro', 'team']" :key="p">
                    <input :id="`plan-${p}`" v-model="f.plan" type="radio" class="btn-check" name="plan" :value="p" />
                    <label class="btn btn-outline-primary text-capitalize" :for="`plan-${p}`">{{ p }}</label>
                  </template>
                </div>
              </div>

              <div class="col-12 col-md-6">
                <label for="f-vol" class="form-label fw-medium d-flex justify-content-between">Volume <span class="text-secondary">{{ f.volume }}%</span></label>
                <input id="f-vol" v-model.number="f.volume" type="range" class="form-range" min="0" max="100" />
              </div>
              <div class="col-12 col-md-3">
                <label for="f-color" class="form-label fw-medium">Brand colour</label>
                <input id="f-color" v-model="f.color" type="color" class="form-control form-control-color w-100" />
              </div>
              <div class="col-12 col-md-3 d-flex align-items-end">
                <div class="form-check form-switch fs-5 mb-1">
                  <input id="f-notify" v-model="f.notify" class="form-check-input" type="checkbox" role="switch" />
                  <label class="form-check-label fs-6" for="f-notify">Notify me</label>
                </div>
              </div>

              <div class="col-12">
                <label for="f-file" class="form-label fw-medium">Attachment</label>
                <input id="f-file" class="form-control" type="file" @change="onFile" />
                <div v-if="fileName" class="form-text">Selected: {{ fileName }}</div>
              </div>

              <div class="col-12">
                <label for="f-msg" class="form-label fw-medium">Message</label>
                <textarea id="f-msg" v-model="f.message" rows="4" class="form-control" placeholder="Tell us more…"></textarea>
              </div>

              <div class="col-12">
                <div class="form-check">
                  <input id="f-agree" v-model="f.agree" class="form-check-input" :class="{ 'is-invalid': submitted && errors.agree }" type="checkbox" />
                  <label class="form-check-label" for="f-agree">I confirm the information above is correct</label>
                  <div class="invalid-feedback">{{ errors.agree }}</div>
                </div>
              </div>
            </div>
          </div>
          <div class="card-footer bg-transparent d-flex flex-wrap gap-2 justify-content-end" style="border-color: var(--nova-border)">
            <button type="reset" class="btn btn-light">Reset</button>
            <button class="btn btn-primary"><i class="bi bi-send me-1"></i>Submit</button>
          </div>
        </form>
      </div>

      <!-- Side patterns -->
      <div class="col-12 col-xl-4">
        <div class="card mb-3 mb-xl-4">
          <div class="card-header">Horizontal layout</div>
          <div class="card-body">
            <div class="row mb-3 align-items-center">
              <label for="h-name" class="col-sm-4 col-form-label">Name</label>
              <div class="col-sm-8"><input id="h-name" class="form-control" /></div>
            </div>
            <div class="row mb-3 align-items-center">
              <label for="h-role" class="col-sm-4 col-form-label">Role</label>
              <div class="col-sm-8"><select id="h-role" class="form-select"><option>Admin</option><option>Editor</option></select></div>
            </div>
            <div class="text-end"><button type="button" class="btn btn-primary btn-sm">Save</button></div>
          </div>
        </div>

        <div class="card mb-3 mb-xl-4">
          <div class="card-header">Inline search</div>
          <div class="card-body">
            <div class="row g-2">
              <div class="col"><input class="form-control" placeholder="Keyword" aria-label="Keyword" /></div>
              <div class="col-auto"><button type="button" class="btn btn-primary">Go</button></div>
            </div>
          </div>
        </div>

        <div class="card mb-3 mb-xl-4">
          <div class="card-header">Input sizes &amp; states</div>
          <div class="card-body d-grid gap-2">
            <input class="form-control form-control-lg" placeholder="Large" aria-label="Large" />
            <input class="form-control" placeholder="Default" aria-label="Default" />
            <input class="form-control form-control-sm" placeholder="Small" aria-label="Small" />
            <input class="form-control" value="Disabled" disabled aria-label="Disabled" />
            <input class="form-control" value="Read-only" readonly aria-label="Read-only" />
            <input class="form-control is-valid" value="Looks good" aria-label="Valid" />
            <input class="form-control is-invalid" value="Needs attention" aria-label="Invalid" />
          </div>
        </div>

        <div class="card">
          <div class="card-header">Live values</div>
          <div class="card-body">
            <pre class="small mb-0 text-wrap" style="white-space: pre-wrap">{{ JSON.stringify({ first: f.first, email: f.email, country: f.country, gender: f.gender, interests: f.interests, plan: f.plan, volume: f.volume, notify: f.notify }, null, 2) }}</pre>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
