<script setup lang="ts">
import Pagehead from "../../../components/Pagehead.vue";
</script>

<template>
    <Pagehead title="Edit Product" subtitle="Fillup the form below to edit product">
        <RouterLink to="/products" class="btn btn-primary">Back</RouterLink>
    </Pagehead> 
    
      <section class="section-gap">
        <div class="card"><div class="card-body">
          <!-- data-bs-validate: Bootstrap 6 ভ্যালিডেশন (ইউজার টাইপ করার পর :user-invalid স্টাইল) -->
          <form action="orders.html" method="get" data-bs-validate>
            <div class="row g-3">
              <div class="col-12 md:col-6">
                <div class="form-field">
                  <label class="form-label" for="fName">Customer name</label>
                  <input type="text" class="form-control" id="fName" name="name" required minlength="3" placeholder="e.g. Rahim Uddin">
                </div>
              </div>
              <div class="col-12 md:col-6">
                <div class="form-field">
                  <label class="form-label" for="fEmail">Email</label>
                  <input type="email" class="form-control" id="fEmail" name="email" required placeholder="name@example.com">
                </div>
              </div>
              <div class="col-12 md:col-6 xl:col-3">
                <div class="form-field">
                  <label class="form-label" for="fProduct">Product</label>
                  <select class="form-control" id="fProduct" name="product" required>
                    <option value="">Choose...</option>
                    <option>Polo Shirt</option>
                    <option>Denim Jeans</option>
                    <option>Hoodie</option>
                    <option>Panjabi</option>
                  </select>
                </div>
              </div>
              <div class="col-12 md:col-6 xl:col-3">
                <div class="form-field">
                  <label class="form-label" for="fAmount">Amount (৳)</label>
                  <input type="number" class="form-control" id="fAmount" name="amount" required min="1" placeholder="1500">
                </div>
              </div>
              <div class="col-12 md:col-6 xl:col-3">
                <div class="form-field">
                  <label class="form-label" for="fStatus">Status</label>
                  <select class="form-control" id="fStatus" name="status" required>
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
              </div>
              <div class="col-12 md:col-6 xl:col-3">
                <div class="form-field">
                  <label class="form-label" for="fDate">Date</label>
                  <input type="date" class="form-control" id="fDate" name="date" required>
                </div>
              </div>
              <div class="col-12">
                <div class="form-field">
                  <label class="form-label" for="fNote">Note (optional)</label>
                  <textarea class="form-control" id="fNote" name="note" rows="2"></textarea>
                </div>
              </div>
              <div class="col-12 form-actions">
                <button type="submit" class="btn-solid theme-primary"><i class="bi bi-plus-lg"></i> Add order</button>
                <button type="reset" class="btn-outline theme-secondary">Reset</button>
              </div>
            </div>
          </form>
        </div></div>
      </section>
</template>