/**
 * FILE: src/js/auth.js
 * NHIỆM VỤ: Khởi tạo tài khoản mẫu, kiểm tra trạng thái đăng nhập từ LocalStorage và cập nhật thanh Navbar.
 */

document.addEventListener('DOMContentLoaded', function() {
    ensureDefaultAccounts();
    updateNavbarAuth();
});

/**
 * Khởi tạo sẵn tài khoản Quản trị viên (Admin) và Học viên mẫu nếu EDU_USERS chưa có dữ liệu
 */
function ensureDefaultAccounts() {
    var storedUsers = localStorage.getItem('EDU_USERS');
    var users = storedUsers ? JSON.parse(storedUsers) : [];

    if (!users || users.length === 0) {
        users = [
            {
                id: 'USR_ADMIN_01',
                fullName: 'Quản Trị Viên (Admin)',
                email: 'admin@educourses.vn',
                phone: '0372765126',
                address: '126 Nguyễn Thiện Thành, Phường 5, TP. Trà Vinh',
                password: 'admin123',
                role: 'admin',
                createdAt: '01/10/2026'
            },
            {
                id: 'USR_SV_110124109',
                fullName: 'Hồ Thế Lộc',
                email: 'holoc2021.tv@gmail.com',
                phone: '0372765126',
                address: 'Đại học Trà Vinh (Lớp DA24TTC - MSSV: 110124109)',
                password: '123456',
                role: 'student',
                createdAt: '12/10/2026'
            }
        ];
        localStorage.setItem('EDU_USERS', JSON.stringify(users));
    }
}

/**
 * Kiểm tra EDU_CURRENT_USER và thay thế nút Đăng nhập bằng tên người dùng trên Navbar
 */
function updateNavbarAuth() {
    var currentUserStr = localStorage.getItem('EDU_CURRENT_USER');
    if (!currentUserStr) {
        return;
    }

    var currentUser = JSON.parse(currentUserStr);
    if (!currentUser) {
        return;
    }

    var authLinks = document.querySelectorAll('a[href="login.html"], a[href="register.html"]');
    if (authLinks.length > 0) {
        var parentContainer = authLinks[0].parentElement;
        var cartBtn = parentContainer.querySelector('a[href="cart.html"]');
        var cartHtml = '';

        if (cartBtn) {
            cartHtml = cartBtn.outerHTML;
        }

        // Cộng chuỗi HTML cơ bản theo chuẩn W3Schools
        var dropdownHtml = '';
        dropdownHtml += '<div class="dropdown">';
        dropdownHtml += '  <button class="btn btn-outline-primary dropdown-toggle fw-bold d-flex align-items-center" type="button" data-bs-toggle="dropdown">';
        dropdownHtml += '    <i class="bi bi-person-circle fs-5 me-2"></i>';
        dropdownHtml += '    <div class="d-inline-block">' + currentUser.fullName + '</div>';
        dropdownHtml += '  </button>';
        dropdownHtml += '  <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2">';
        dropdownHtml += '    <li><a class="dropdown-item py-2" href="profile.html"><i class="bi bi-person-vcard me-2 text-primary"></i>Hồ sơ cá nhân</a></li>';
        dropdownHtml += '    <li><a class="dropdown-item py-2" href="my-courses.html"><i class="bi bi-journal-check me-2 text-success"></i>Khóa học của tôi</a></li>';
        dropdownHtml += '    <li><hr class="dropdown-divider"></li>';
        dropdownHtml += '    <li><a class="dropdown-item text-danger py-2 fw-semibold" href="#" id="logout-btn"><i class="bi bi-box-arrow-right me-2"></i>Đăng xuất</a></li>';
        dropdownHtml += '  </ul>';
        dropdownHtml += '</div>';

        parentContainer.innerHTML = cartHtml + dropdownHtml;

        // Gắn sự kiện click cho nút Đăng xuất
        var logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function(e) {
                e.preventDefault();
                var isConfirm = confirm('Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?');
                if (isConfirm) {
                    localStorage.removeItem('EDU_CURRENT_USER');
                    window.location.href = 'index.html';
                }
            });
        }
    }
}

