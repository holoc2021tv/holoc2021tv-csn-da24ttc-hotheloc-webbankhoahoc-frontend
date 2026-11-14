/**
 * FILE: src/js/profile.js
 * NHIỆM VỤ: Đọc và cập nhật thông tin Hồ sơ cá nhân từ LocalStorage (EDU_CURRENT_USER & EDU_USERS).
 */

document.addEventListener('DOMContentLoaded', function() {
    updateCartBadgeUI();
    loadUserProfile();
    setupProfileForm();
    renderProfileFavorites();
});

/**
 * 1. Lấy thông tin người dùng đang đăng nhập
 */
function getActiveUser() {
    var raw = localStorage.getItem('EDU_CURRENT_USER');
    if (raw) {
        return JSON.parse(raw);
    }

    // Nếu chưa đăng nhập, hiển thị tài khoản mẫu Hồ Thế Lộc
    return {
        id: 'USR_SV_110124109',
        fullName: 'Hồ Thế Lộc',
        email: 'holoc2021.tv@gmail.com',
        phone: '0372765126',
        address: 'Đại học Trà Vinh (Lớp DA24TTC - MSSV: 110124109)',
        role: 'student'
    };
}

/**
 * 2. Đổ dữ liệu người dùng lên giao diện Hồ sơ cá nhân
 */
function loadUserProfile() {
    var activeUser = getActiveUser();
    var rawUsers = localStorage.getItem('EDU_USERS');
    var users = rawUsers ? JSON.parse(rawUsers) : [];
    var matched = activeUser;

    // Tìm user trong mảng EDU_USERS bằng vòng lặp for
    for (var i = 0; i < users.length; i++) {
        if (users[i].email === activeUser.email || users[i].id === activeUser.id) {
            matched = users[i];
            break;
        }
    }

    // Lấy chữ cái đầu của Họ và Tên làm Avatar
    var fullNameText = matched.fullName || 'Hồ Lộc';
    var words = fullNameText.trim().split(' ');
    var initials = 'HL';
    if (words.length > 1) {
        initials = (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
    } else {
        initials = words[0].substring(0, 2).toUpperCase();
    }

    document.getElementById('profile-avatar-text').innerHTML = initials;
    document.getElementById('profile-display-name').innerHTML = matched.fullName || 'Hồ Thế Lộc';
    document.getElementById('profile-display-email').innerHTML = matched.email || '';
    document.getElementById('profile-role-badge').innerHTML = matched.role === 'admin' ? 'Quản trị viên (Admin)' : 'Học viên chính thức';

    document.getElementById('profile-fullname').value = matched.fullName || '';
    document.getElementById('profile-email').value = matched.email || '';
    document.getElementById('profile-phone').value = matched.phone || '0372765126';
    document.getElementById('profile-address').value = matched.address || 'Đại học Trà Vinh (Lớp DA24TTC)';

    // Đếm số đơn hàng và số khóa học đã mua từ EDU_PURCHASES bằng vòng lặp for
    var allOrders = getAllPurchases();
    var myOrderCount = 0;
    var totalCoursesCount = 0;

    for (var j = 0; j < allOrders.length; j++) {
        var ord = allOrders[j];
        if (!ord.customerEmail || ord.customerEmail === matched.email) {
            myOrderCount = myOrderCount + 1;
            if (ord.items) {
                totalCoursesCount = totalCoursesCount + ord.items.length;
            }
        }
    }

    var favCount = getFavoriteIds().length;

    document.getElementById('profile-stat-orders').innerHTML = myOrderCount;
    document.getElementById('profile-stat-courses').innerHTML = totalCoursesCount;
    document.getElementById('profile-stat-favs').innerHTML = favCount;
}

/**
 * 3. Xử lý lưu cập nhật Hồ sơ cá nhân và Đổi mật khẩu
 */
function setupProfileForm() {
    var form = document.getElementById('profile-update-form');
    var phoneInput = document.getElementById('profile-phone');

    if (!form) {
        return;
    }

    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();

        var fullName = document.getElementById('profile-fullname').value.trim();
        var email = document.getElementById('profile-email').value.trim();
        var phone = phoneInput.value.trim();
        var address = document.getElementById('profile-address').value.trim();
        var newPass = document.getElementById('profile-new-password').value;
        var confirmPass = document.getElementById('profile-confirm-password').value;

        if (phone.length !== 10) {
            alert('Số điện thoại không hợp lệ! Vui lòng nhập chính xác 10 chữ số.');
            phoneInput.focus();
            return;
        }

        if (newPass !== '') {
            if (newPass.length < 6) {
                alert('Mật khẩu mới phải có tối thiểu 6 ký tự!');
                return;
            }
            if (newPass !== confirmPass) {
                alert('Xác nhận mật khẩu mới không khớp!');
                return;
            }
        }

        var rawUsers = localStorage.getItem('EDU_USERS');
        var users = rawUsers ? JSON.parse(rawUsers) : [];
        var userId = 'USR_SV_110124109';
        var userRole = 'student';

        for (var i = 0; i < users.length; i++) {
            if (users[i].email === email) {
                users[i].fullName = fullName;
                users[i].phone = phone;
                users[i].address = address;
                if (newPass !== '') {
                    users[i].password = newPass;
                }
                userId = users[i].id;
                userRole = users[i].role || 'student';
                break;
            }
        }

        localStorage.setItem('EDU_USERS', JSON.stringify(users));

        var updatedSession = {
            id: userId,
            fullName: fullName,
            email: email,
            phone: phone,
            address: address,
            role: userRole
        };
        localStorage.setItem('EDU_CURRENT_USER', JSON.stringify(updatedSession));

        document.getElementById('profile-new-password').value = '';
        document.getElementById('profile-confirm-password').value = '';

        alert('Cập nhật thông tin hồ sơ cá nhân thành công!');
        loadUserProfile();
        updateNavbarAuth();
    });
}

/**
 * 4. Hiển thị danh sách khóa học yêu thích trong trang Hồ sơ
 */
function renderProfileFavorites() {
    var container = document.getElementById('profile-favorites-list');
    if (!container) {
        return;
    }

    var favList = getFavoriteCoursesList();
    if (favList.length === 0) {
        var emptyHtml = '';
        emptyHtml += '<div class="col-12">';
        emptyHtml += '  <div class="alert alert-light border text-muted mb-0">';
        emptyHtml += '    Bạn chưa lưu khóa học yêu thích nào. <a href="courses.html" class="fw-semibold text-decoration-none">Khám phá khóa học ngay</a>';
        emptyHtml += '  </div>';
        emptyHtml += '</div>';
        container.innerHTML = emptyHtml;
        return;
    }

    var html = '';
    for (var i = 0; i < favList.length; i++) {
        var c = favList[i];
        html += '<div class="col-md-6">';
        html += '  <div class="card border shadow-sm h-100 p-3">';
        html += '    <div class="d-flex align-items-center gap-3">';
        html += '      <img src="' + c.image + '" alt="' + c.title + '" class="rounded cart-item-img">';
        html += '      <div class="overflow-hidden flex-grow-1">';
        html += '        <a href="course-detail.html?id=' + c.id + '" class="fw-bold text-dark text-decoration-none d-block text-truncate">' + c.title + '</a>';
        html += '        <div class="text-muted small">GV: ' + c.instructor + '</div>';
        html += '        <div class="text-danger fw-bold">' + formatCurrencyVND(c.salePrice) + '</div>';
        html += '      </div>';
        html += '    </div>';
        html += '  </div>';
        html += '</div>';
    }
    container.innerHTML = html;
}
