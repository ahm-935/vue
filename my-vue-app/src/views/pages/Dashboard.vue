<script setup lang="ts">
import Pagehead from "../../components/Pagehead.vue";
</script>

<template>
    <Pagehead title="Dashboard" subtitle="Welcome to AdminPro" />

      <!-- ===== KPI ===== -->
      <section class="row g-3 section-gap">
        <div class="col-12 sm:col-6 xl:col-3">
          <div class="card hover-lift">
            <div class="card-body kpi">
              <div class="kpi-icon bg-primary fg-contrast-primary">
                <i class="bi bi-currency-exchange"></i>
              </div>
              <div>
                <div class="muted small">Revenue</div>
                <div class="kpi-value">৳4,300</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 sm:col-6 xl:col-3">
          <div class="card hover-lift">
            <div class="card-body kpi">
              <div class="kpi-icon bg-success fg-contrast-success">
                <i class="bi bi-bag-check"></i>
              </div>
              <div>
                <div class="muted small">Total Orders</div>
                <div class="kpi-value">5</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 sm:col-6 xl:col-3">
          <div class="card hover-lift">
            <div class="card-body kpi">
              <div class="kpi-icon bg-info fg-contrast-info">
                <i class="bi bi-people"></i>
              </div>
              <div>
                <div class="muted small">Customers</div>
                <div class="kpi-value">5</div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12 sm:col-6 xl:col-3">
          <div class="card hover-lift">
            <div class="card-body kpi">
              <div class="kpi-icon bg-warning fg-contrast-warning">
                <i class="bi bi-hourglass-split"></i>
              </div>
              <div>
                <div class="muted small">Pending</div>
                <div class="kpi-value">2</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ===== Charts (pure CSS) ===== -->
      <section class="row g-3 section-gap">
        <div class="col-12 lg:col-8">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Revenue vs Expense (৳ thousand)</h5>
              <div
                class="bars"
                role="img"
                aria-label="Bar chart of revenue and expense for the last six months"
              >
                <div class="bar-col">
                  <div class="bar-pair">
                    <div class="bar rev" style="--v: 42"></div>
                    <div class="bar exp" style="--v: 30"></div>
                  </div>
                  <span class="bar-label">May</span>
                </div>
                <div class="bar-col">
                  <div class="bar-pair">
                    <div class="bar rev" style="--v: 51"></div>
                    <div class="bar exp" style="--v: 34"></div>
                  </div>
                  <span class="bar-label">Jun</span>
                </div>
                <div class="bar-col">
                  <div class="bar-pair">
                    <div class="bar rev" style="--v: 47"></div>
                    <div class="bar exp" style="--v: 33"></div>
                  </div>
                  <span class="bar-label">Jul</span>
                </div>
                <div class="bar-col">
                  <div class="bar-pair">
                    <div class="bar rev" style="--v: 63"></div>
                    <div class="bar exp" style="--v: 41"></div>
                  </div>
                  <span class="bar-label">Aug</span>
                </div>
                <div class="bar-col">
                  <div class="bar-pair">
                    <div class="bar rev" style="--v: 71"></div>
                    <div class="bar exp" style="--v: 45"></div>
                  </div>
                  <span class="bar-label">Sep</span>
                </div>
                <div class="bar-col">
                  <div class="bar-pair">
                    <div class="bar rev" style="--v: 68"></div>
                    <div class="bar exp" style="--v: 43"></div>
                  </div>
                  <span class="bar-label">Oct</span>
                </div>
              </div>
              <div class="legend">
                <span
                  ><span class="dot" style="background: #6f42c1"></span
                  >Revenue</span
                >
                <span
                  ><span class="dot" style="background: #20c997"></span
                  >Expense</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="col-12 lg:col-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Orders by status</h5>
              <div
                class="donut"
                role="img"
                aria-label="Donut chart: 40% completed, 40% pending, 20% cancelled"
              ></div>
              <div class="legend">
                <span
                  ><span class="dot" style="background: #198754"></span
                  >Completed 40%</span
                >
                <span
                  ><span class="dot" style="background: #ffc107"></span>Pending
                  40%</span
                >
                <span
                  ><span class="dot" style="background: #dc3545"></span
                  >Cancelled 20%</span
                >
              </div>
            </div>
          </div>
        </div>
      </section>
</template>