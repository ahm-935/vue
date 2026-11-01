<template>
     <main>
        <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
            <h1 class="h3 mb-0">Users</h1><a href="/user-create" class="btn btn-primary"><i
                    class="bi bi-plus-lg me-1"></i>Add user</a>
        </div>
        <div class="card">
            <div class="card-header">
                <div class="row g-2 align-items-center">
                    <div class="col-md-4">
                        <div class="input-group"><span class="input-group-text"><i
                                    class="bi bi-search"></i></span><input id="q" class="form-control"
                                placeholder="Search..."></div>
                    </div>
                    <div class="col-md-8 text-md-end small text-body-secondary" id="info"></div>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table table-hover align-middle mb-0">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th class="text-end">Actions</th>
                        </tr>
                        <tr>
                            <td>01</td>
                            <td>Akbar</td>
                            <td>akbar@example.com</td>
                            <td>Admin</td>
                            <td>Active</td>
                            <td class="text-end">
                                <button class="btn btn-sm btn-outline-primary me-1"><i class="bi bi-pencil"></i></button>
                                <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>02</td>
                            <td>Hasan</td>
                            <td>hasan@example.com</td>
                            <td>User</td>
                            <td>Active</td>
                            <td class="text-end">
                                <button class="btn btn-sm btn-outline-primary me-1"><i class="bi bi-pencil"></i></button>
                                <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                            </td>
                        </tr>
                        <tr>
                            <td>03</td>
                            <td>Farid</td>
                            <td>farid@example.com</td>
                            <td>Admin</td>
                            <td>Active</td>
                            <td class="text-end">
                                <button class="btn btn-sm btn-outline-primary me-1"><i class="bi bi-pencil"></i></button>
                                <button class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></button>
                            </td>
                        </tr>
                    </thead>
                    <tbody id="tbody"></tbody>
                </table>
            </div>
            <div class="card-footer">
                <ul class="pagination pagination-sm mb-0 justify-content-end" id="pager"></ul>
            </div>
        </div>
    </main>
</template>