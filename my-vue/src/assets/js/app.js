(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) =>
    String(s ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  /* ---------- Theme ---------- */
  const Theme = {
    get: () => localStorage.getItem("theme") || "auto",
    apply(m = Theme.get()) {
      const d =
        m === "auto"
          ? matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : m;
      document.documentElement.setAttribute("data-bs-theme", d);
    },
    set(m) {
      localStorage.setItem("theme", m);
      Theme.apply(m);
      document
        .querySelectorAll("[data-theme-set]")
        .forEach((b) => b.classList.toggle("active", b.dataset.themeSet === m));
      const r = $(`input[name=theme][value=${m}]`);
      if (r) r.checked = true;
    },
  };
  Theme.apply();
  matchMedia("(prefers-color-scheme: dark)").addEventListener(
    "change",
    () => Theme.get() === "auto" && Theme.apply(),
  );
  /* ---------- Data store (localStorage demo; swap for API calls) ---------- */
  const Store = {
    load(k, seed) {
      let v = null;
      try {
        v = JSON.parse(localStorage.getItem(k));
      } catch (e) {}
      if (!v) {
        v = seed;
        localStorage.setItem(k, JSON.stringify(v));
      }
      return v;
    },
    save(k, v) {
      localStorage.setItem(k, JSON.stringify(v));
    },
  };
  const SEED = {
    users: [
      [1, "Alice Johnson", "alice@example.com", "Admin", "Active"],
      [2, "Bob Smith", "bob@example.com", "Editor", "Active"],
      [3, "Carla Gomez", "carla@example.com", "Viewer", "Pending"],
      [4, "David Lee", "david@example.com", "Editor", "Inactive"],
      [5, "Emma Brown", "emma@example.com", "Viewer", "Active"],
      [6, "Farid Hasan", "farid@example.com", "Admin", "Active"],
      [7, "Grace Kim", "grace@example.com", "Viewer", "Pending"],
      [8, "Hiro Tanaka", "hiro@example.com", "Editor", "Active"],
    ].map((a) => ({
      id: a[0],
      name: a[1],
      email: a[2],
      role: a[3],
      status: a[4],
    })),
    products: [
      [1, "Wireless Mouse", "WM-100", "Accessories", 24.99, 120, "Active"],
      [2, "Mechanical Keyboard", "KB-220", "Accessories", 89, 45, "Active"],
      [3, '27" Monitor', "MN-270", "Displays", 259.5, 18, "Active"],
      [4, "USB-C Hub", "HB-040", "Accessories", 39.9, 0, "Out of stock"],
      [5, "Laptop Stand", "LS-015", "Furniture", 29, 64, "Active"],
      [6, "Webcam HD", "WC-720", "Electronics", 49.5, 33, "Draft"],
      [7, "Noise-Cancel Headset", "HS-900", "Electronics", 149, 12, "Active"],
      [8, "Desk Lamp", "DL-010", "Furniture", 34, 0, "Out of stock"],
    ].map((a) => ({
      id: a[0],
      name: a[1],
      sku: a[2],
      category: a[3],
      price: a[4],
      stock: a[5],
      status: a[6],
    })),
    profile: {
      name: "Alice Johnson",
      email: "alice@example.com",
      phone: "+1 555 0100",
      role: "Administrator",
      location: "New York, USA",
      bio: "Product owner and system administrator.",
    },
  };
  const badge = (t) => {
    const c =
      {
        Active: "success",
        Inactive: "secondary",
        Pending: "warning",
        "Out of stock": "danger",
        Draft: "secondary",
        Admin: "primary",
        Editor: "info",
        Viewer: "secondary",
      }[t] || "secondary";
    return `<span class="badge text-bg-${c}">${esc(t)}</span>`;
  };
  const initials = (n) =>
    String(n)
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  /* ---------- Toast / confirm ---------- */
  function toast(msg, type = "success") {
    let c = $("#toasts");
    if (!c) {
      c = document.createElement("div");
      c.id = "toasts";
      c.className = "toast-container position-fixed top-0 end-0 p-3";
      document.body.appendChild(c);
    }
    const t = document.createElement("div");
    t.className = `toast align-items-center text-bg-${type} border-0`;
    t.innerHTML = `<div class="d-flex"><div class="toast-body">${esc(msg)}</div><button class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button></div>`;
    c.appendChild(t);
    const x = new bootstrap.Toast(t, { delay: 2500 });
    x.show();
    t.addEventListener("hidden.bs.toast", () => t.remove());
  }
  function confirmBox(msg, cb) {
    const m = $("#confirmModal");
    $("#confirmMsg").textContent = msg;
    const modal = bootstrap.Modal.getOrCreateInstance(m);
    const ok = $("#confirmOk");
    ok.onclick = () => {
      modal.hide();
      cb();
    };
    modal.show();
  }
  /* ---------- Generic CRUD list ---------- */
  function list(o) {
    let data = Store.load(o.key, SEED[o.key]),
      page = 1,
      q = "";
    const per = 6,
      tb = $("#tbody"),
      pg = $("#pager"),
      info = $("#info");
    const draw = () => {
      const f = data.filter((r) =>
        Object.values(r).join(" ").toLowerCase().includes(q),
      );
      const pages = Math.max(1, Math.ceil(f.length / per));
      page = Math.min(page, pages);
      tb.innerHTML = f.length
        ? f
            .slice((page - 1) * per, page * per)
            .map(
              (r) =>
                `<tr>${o.cols.map((c) => `<td>${c(r)}</td>`).join("")}<td class="text-end text-nowrap"><a class="btn btn-sm btn-outline-secondary" href="${o.form}?id=${r.id}" title="Edit"><i class="bi bi-pencil"></i></a> <button class="btn btn-sm btn-outline-danger" data-del="${r.id}" title="Delete"><i class="bi bi-trash"></i></button></td></tr>`,
            )
            .join("")
        : `<tr><td colspan="${o.cols.length + 1}" class="text-center text-body-secondary py-5">No records found</td></tr>`;
      info.textContent = `${f.length} record(s)`;
      pg.innerHTML = Array.from(
        { length: pages },
        (_, i) =>
          `<li class="page-item ${i + 1 === page ? "active" : ""}"><a class="page-link" href="#" data-p="${i + 1}">${i + 1}</a></li>`,
      ).join("");
    };
    $("#q").addEventListener("input", (e) => {
      q = e.target.value.toLowerCase();
      page = 1;
      draw();
    });
    pg.addEventListener("click", (e) => {
      const a = e.target.closest("[data-p]");
      if (a) {
        e.preventDefault();
        page = +a.dataset.p;
        draw();
      }
    });
    tb.addEventListener("click", (e) => {
      const b = e.target.closest("[data-del]");
      if (b)
        confirmBox("Delete this record? This cannot be undone.", () => {
          data = data.filter((r) => r.id != b.dataset.del);
          Store.save(o.key, data);
          draw();
          toast("Record deleted");
        });
    });
    draw();
  }
  /* ---------- Generic create/edit form ---------- */
  function form(o) {
    const id = new URLSearchParams(location.search).get("id"),
      data = Store.load(o.key, SEED[o.key]),
      item = id && data.find((x) => x.id == id),
      f = $("#f");
    if (id && !item) {
      location.replace("404.html");
      return;
    }
    if (item) {
      $("#ftitle").textContent = "Edit " + o.label;
      [...f.elements].forEach(
        (el) => el.name && item[el.name] != null && (el.value = item[el.name]),
      );
    } else $("#ftitle").textContent = "Create " + o.label;
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      f.classList.add("was-validated");
      if (!f.checkValidity()) return;
      const v = Object.fromEntries(new FormData(f));
      (o.num || []).forEach((k) => (v[k] = +v[k]));
      if (item) Object.assign(item, v);
      else data.push({ id: Math.max(0, ...data.map((x) => x.id)) + 1, ...v });
      Store.save(o.key, data);
      sessionStorage.setItem(
        "flash",
        o.label[0].toUpperCase() +
          o.label.slice(1) +
          (item ? " updated" : " created"),
      );
      location.href = o.back;
    });
  }
  /* ---------- Layout shell ---------- */
  const NAV = [
    ["index.html", "Dashboard", "speedometer2"],
    ["users.html", "Users", "people"],
    ["products.html", "Products", "box-seam"],
    ["profile.html", "My profile", "person-circle"],
    ["settings.html", "Settings", "gear"],
  ];
  function shell() {
    const main = $("main");
    if (!main) return;
    if (!localStorage.getItem("auth")) {
      location.replace("login.html");
      return;
    }
    const cur = location.pathname.split("/").pop() || "index.html",
      pf = Store.load("profile", SEED.profile);
    const w = document.createElement("div");
    w.className = "d-flex";
    w.innerHTML = `<aside class="sidebar p-3" id="sidebar"><a class="brand d-flex align-items-center gap-2 mb-4" href="index.html"><i class="bi bi-grid-1x2-fill text-primary"></i> AdminKit</a>
 <ul class="nav flex-column gap-1">${NAV.map((n) => `<li><a class="nav-link ${cur === n[0] || (n[0] !== "index.html" && cur.startsWith(n[0].replace("s.html", ""))) ? "active" : ""}" href="${n[0]}"><i class="bi bi-${n[2]}"></i>${n[1]}</a></li>`).join("")}</ul>
 <hr><div class="small text-body-secondary px-2 mb-1">Pages</div><ul class="nav flex-column small">${["login", "register", "403", "404", "500"].map((p) => `<li><a class="nav-link py-1" href="${p}.html"><i class="bi bi-file-earmark"></i>${p}</a></li>`).join("")}</ul></aside>
 <div class="flex-grow-1 min-vw-0 d-flex flex-column min-vh-100" style="min-width:0"><header class="navbar bg-body border-bottom px-3 sticky-top"><button class="btn btn-outline-secondary d-lg-none" id="burger"><i class="bi bi-list"></i></button><div class="ms-auto d-flex align-items-center gap-2">
 <div class="dropdown"><button class="btn btn-outline-secondary" data-bs-toggle="dropdown" title="Theme"><i class="bi bi-circle-half"></i></button><ul class="dropdown-menu dropdown-menu-end">${[
   ["light", "sun", "Light"],
   ["dark", "moon-stars", "Dark"],
   ["auto", "circle-half", "Auto"],
 ]
   .map(
     (t) =>
       `<li><button class="dropdown-item" data-theme-set="${t[0]}"><i class="bi bi-${t[1]} me-2"></i>${t[2]}</button></li>`,
   )
   .join("")}</ul></div>
 <div class="dropdown"><a href="#" class="d-flex align-items-center gap-2 text-decoration-none text-body" data-bs-toggle="dropdown"><span class="avatar">${esc(initials(pf.name))}</span><span class="d-none d-sm-inline">${esc(pf.name)}</span></a><ul class="dropdown-menu dropdown-menu-end"><li><a class="dropdown-item" href="profile.html">Profile</a></li><li><a class="dropdown-item" href="settings.html">Settings</a></li><li><hr class="dropdown-divider"></li><li><a class="dropdown-item text-danger" href="#" id="logout">Log out</a></li></ul></div></div></header>
 <div class="p-4 flex-grow-1" id="slot"></div><footer class="text-center small text-body-secondary py-3 border-top bg-body">&copy; ${new Date().getFullYear()} AdminKit. All rights reserved.</footer></div>
 <div class="modal fade" id="confirmModal" tabindex="-1"><div class="modal-dialog modal-dialog-centered"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Confirm</h5><button class="btn-close" data-bs-dismiss="modal"></button></div><div class="modal-body" id="confirmMsg"></div><div class="modal-footer"><button class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button><button class="btn btn-danger" id="confirmOk">Delete</button></div></div></div></div>`;
    document.body.prepend(w);
    $("#slot").appendChild(main);
    Theme.set(Theme.get());
    $("#burger").onclick = () => $("#sidebar").classList.toggle("open");
    $("#logout").onclick = (e) => {
      e.preventDefault();
      localStorage.removeItem("auth");
      location.href = "login.html";
    };
    const fl = sessionStorage.getItem("flash");
    if (fl) {
      sessionStorage.removeItem("flash");
      toast(fl);
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    shell();
    document.addEventListener("click", (e) => {
      const b = e.target.closest("[data-theme-set]");
      if (b) Theme.set(b.dataset.themeSet);
      const t = e.target.closest("[data-theme-toggle]");
      if (t) {
        const d =
          document.documentElement.getAttribute("data-bs-theme") === "dark";
        Theme.set(d ? "light" : "dark");
      }
    });
    document.querySelectorAll("[data-pw-toggle]").forEach((b) =>
      b.addEventListener("click", () => {
        const i = b.previousElementSibling;
        i.type = i.type === "password" ? "text" : "password";
      }),
    );
  });
  window.App = {
    Theme,
    Store,
    SEED,
    badge,
    initials,
    esc,
    toast,
    confirmBox,
    list,
    form,
  };
})();
