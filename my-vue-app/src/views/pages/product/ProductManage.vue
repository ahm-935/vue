<script setup lang="ts">
import { api } from "@/api.ts";
import Pagehead from "@/components/Pagehead.vue";

function getAllProducts() {
  api
    .get("/products")
    .then((res:any) => {
      console.log(res.data);
    })
    .catch((err:any) => {
      console.error(err);
    });
}

getAllProducts();

</script>

<template>
  <Pagehead title="Product Manage" subtitle="Product Manage">
    <RouterLink to="/product-create" class="btn btn-primary"
      >Add Product</RouterLink
    >
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
                <th>Customer</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1001</td>
                <td>
                  <strong>Rahim Uddin</strong>
                  <div class="muted small">rahim@example.com</div>
                </td>
                <td>Polo Shirt</td>
                <td>৳1,200</td>
                <td>
                  <span class="badge badge-subtle theme-success"
                    >Completed</span
                  >
                </td>
                <td>2026-10-18</td>
                <td>
                  <button
                    type="button"
                    class="btn-outline theme-secondary btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#order-1001"
                  ><i class="bi bi-eye"></i>
                  
                  </button> &nbsp;
                    <button
                    type="button"
                    class="btn-outline theme-secondary btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#edit-1005"
                  ><i class="bi bi-pencil"></i>
                  
                  </button> &nbsp;
                  <button
                    type="button"
                    class="btn-outline theme-danger btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#cancel-1005"
                  ><i class="bi bi-trash"></i>
                    
                  </button>
                </td>
              </tr>
              <tr>
                <td>1002</td>
                <td>
                  <strong>Karim Ahmed</strong>
                  <div class="muted small">karim@example.com</div>
                </td>
                <td>Denim Jeans</td>
                <td>৳2,400</td>
                <td>
                  <span class="badge badge-subtle theme-warning">Pending</span>
                </td>
                <td>2026-10-19</td>
                <td>
                  <button
                    type="button"
                    class="btn-outline theme-secondary btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#order-1002"
                  >
                    View
                  </button>
                    <button
                    type="button"
                    class="btn-outline theme-secondary btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#edit-1005"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn-outline theme-danger btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#cancel-1005"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>1003</td>
                <td>
                  <strong>Nusrat Jahan</strong>
                  <div class="muted small">nusrat@example.com</div>
                </td>
                <td>Hoodie</td>
                <td>৳3,100</td>
                <td>
                  <span class="badge badge-subtle theme-success"
                    >Completed</span
                  >
                </td>
                <td>2026-10-20</td>
                <td>
                  <button
                    type="button"
                    class="btn-outline theme-secondary btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#order-1003"
                  >
                    View
                  </button>
                    <button
                    type="button"
                    class="btn-outline theme-secondary btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#edit-1005"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn-outline theme-danger btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#cancel-1005"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>1004</td>
                <td>
                  <strong>Tanvir Hasan</strong>
                  <div class="muted small">tanvir@example.com</div>
                </td>
                <td>Panjabi</td>
                <td>৳1,850</td>
                <td>
                  <span class="badge badge-subtle theme-danger">Cancelled</span>
                </td>
                <td>2026-10-22</td>
                <td>
                  <button
                    type="button"
                    class="btn-outline theme-secondary btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#order-1004"
                  >
                    View
                  </button>
                    <button
                    type="button"
                    class="btn-outline theme-secondary btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#edit-1005"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn-outline theme-danger btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#cancel-1005"
                  >
                    Delete
                  </button>
                </td>
              </tr>
              <tr>
                <td>1005</td>
                <td>
                  <strong>Sadia Islam</strong>
                  <div class="muted small">sadia@example.com</div>
                </td>
                <td>Polo Shirt</td>
                <td>৳1,200</td>
                <td>
                  <span class="badge badge-subtle theme-warning">Pending</span>
                </td>
                <td>2026-10-24</td>
                <td>
                  <button
                    type="button"
                    class="btn-outline theme-secondary btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#order-1005"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    class="btn-outline theme-secondary btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#edit-1005"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    class="btn-outline theme-danger btn-sm"
                    data-bs-toggle="dialog"
                    data-bs-target="#cancel-1005"
                  >
                    Delete
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
