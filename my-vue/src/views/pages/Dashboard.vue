<script setup lang="ts"> 


</script>

<template>
     <main>
          <h1 class="h3 mb-4">Dashboard</h1>
          <div class="row g-3 mb-4" id="stats">
            <div class="col-sm-6 col-xl-3">
              <div class="card">
                <div class="card-body d-flex align-items-center gap-3">
                  <div class="stat-icon bg-primary-subtle text-primary-emphasis"><i class="bi bi-people"></i></div>
                  <div>
                    <div class="text-body-secondary small">Users</div>
                    <div class="h4 mb-0">7</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="card">
                <div class="card-body d-flex align-items-center gap-3">
                  <div class="stat-icon bg-success-subtle text-success-emphasis"><i class="bi bi-box-seam"></i></div>
                  <div>
                    <div class="text-body-secondary small">Products</div>
                    <div class="h4 mb-0">8</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="card">
                <div class="card-body d-flex align-items-center gap-3">
                  <div class="stat-icon bg-info-subtle text-info-emphasis"><i class="bi bi-person-check"></i></div>
                  <div>
                    <div class="text-body-secondary small">Active users</div>
                    <div class="h4 mb-0">5</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-sm-6 col-xl-3">
              <div class="card">
                <div class="card-body d-flex align-items-center gap-3">
                  <div class="stat-icon bg-danger-subtle text-danger-emphasis"><i
                      class="bi bi-exclamation-triangle"></i></div>
                  <div>
                    <div class="text-body-secondary small">Out of stock</div>
                    <div class="h4 mb-0">2</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row g-3">
            <div class="col-lg-8">
              <div class="card h-100">
                <div class="card-header">Weekly sales</div>
                <div class="card-body pb-5">
                  <div class="bars" id="bars">
                    <div style="height:45%"><small>Mon</small></div>
                    <div style="height:70%"><small>Tue</small></div>
                    <div style="height:55%"><small>Wed</small></div>
                    <div style="height:90%"><small>Thu</small></div>
                    <div style="height:65%"><small>Fri</small></div>
                    <div style="height:40%"><small>Sat</small></div>
                    <div style="height:75%"><small>Sun</small></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="card h-100">
                <div class="card-header">Recent activity</div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item"><i class="bi bi-person-plus text-success me-2"></i>New user registered
                  </li>
                  <li class="list-group-item"><i class="bi bi-box-seam text-primary me-2"></i>Product stock updated</li>
                  <li class="list-group-item"><i class="bi bi-exclamation-circle text-warning me-2"></i>2 products out
                    of stock</li>
                  <li class="list-group-item"><i class="bi bi-shield-check text-info me-2"></i>Security scan passed</li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card mt-3">
            <div class="card-header d-flex justify-content-between">Latest users<a href="users.html" class="small">View
                all</a></div>
            <div class="table-responsive">
              <table class="table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody id="recent">
                  <tr>
                    <td><span class="avatar me-2">HT</span>Hiro Tanaka</td>
                    <td>hiro@example.com</td>
                    <td><span class="badge text-bg-info">Editor</span></td>
                    <td><span class="badge text-bg-success">Active</span></td>
                  </tr>
                  <tr>
                    <td><span class="avatar me-2">GK</span>Grace Kim</td>
                    <td>grace@example.com</td>
                    <td><span class="badge text-bg-secondary">Viewer</span></td>
                    <td><span class="badge text-bg-warning">Pending</span></td>
                  </tr>
                  <tr>
                    <td><span class="avatar me-2">FH</span>Farid Hasan</td>
                    <td>farid@example.com</td>
                    <td><span class="badge text-bg-primary">Admin</span></td>
                    <td><span class="badge text-bg-success">Active</span></td>
                  </tr>
                  <tr>
                    <td><span class="avatar me-2">EB</span>Emma Brown</td>
                    <td>emma@example.com</td>
                    <td><span class="badge text-bg-secondary">Viewer</span></td>
                    <td><span class="badge text-bg-success">Active</span></td>
                  </tr>
                  <tr>
                    <td><span class="avatar me-2">DL</span>David Lee</td>
                    <td>david@example.com</td>
                    <td><span class="badge text-bg-info">Editor</span></td>
                    <td><span class="badge text-bg-secondary">Inactive</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
</template>