<script setup lang="ts">
import Pagehead from "../../../components/Pagehead.vue";
</script>

<template>
  <Pagehead title="User Manage" subtitle="User Manage">
    <RouterLink to="/user-create" class="btn btn-primary">Add User</RouterLink>
  </Pagehead>
  <section class="section-gap">
    <div class="card">
      <div class="card-body">
        <div class="table-head">
          <h5 class="card-title">Recent orders</h5>
          <span class="muted small">5 orders</span>
        </div>
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1001</td>
                <td>
                  <strong>Rahim Uddin</strong>
                  <div class="muted small">rahim@example.com</div>
                </td>
                <td>rahim@example.com</td>
                <td>Admin</td>
                <td>
                  <span class="badge badge-subtle theme-success"
                    >Active</span
                  >
                </td>
                <td>
                  <button
                    type="button"
                    class="btn-outline theme-secondary btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#order-1001"
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td>1002</td>
                <td>
                  <strong>Karim Ahmed</strong>
                  <div class="muted small">karim@example.com</div>
                </td>
                <td>karim@example.com</td>
                <td>Customer</td>
                <td>
                  <span class="badge badge-subtle theme-warning">Pending</span>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn-outline theme-secondary btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#order-1002"
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td>1003</td>
                <td>
                  <strong>Nusrat Jahan</strong>
                  <div class="muted small">nusrat@example.com</div>
                </td>
                <td>nusrat@example.com</td>
                <td>Customer</td>
                <td>
                  <span class="badge badge-subtle theme-success"
                    >Active</span
                  >
                </td>
                <td>
                  <button
                    type="button"
                    class="btn-outline theme-secondary btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#order-1003"
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td>1004</td>
                <td>
                  <strong>Tanvir Hasan</strong>
                  <div class="muted small">tanvir@example.com</div>
                </td>
                <td>tanvir@example.com</td>
                <td>Customer</td>
                <td>
                  <span class="badge badge-subtle theme-danger">Banned</span>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn-outline theme-secondary btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#order-1004"
                  >
                    View
                  </button>
                </td>
              </tr>
              <tr>
                <td>1005</td>
                <td>
                  <strong>Sadia Islam</strong>
                  <div class="muted small">sadia@example.com</div>
                </td>
                <td>sadia@example.com</td>
                <td>Customer</td>
                <td>
                  <span class="badge badge-subtle theme-warning">Pending</span>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn-outline theme-secondary btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#order-1005"
                  >
                    View
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </section>
</template>
