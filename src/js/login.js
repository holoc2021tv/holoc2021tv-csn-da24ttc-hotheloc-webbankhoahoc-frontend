/**
 * FILE: src/js/login.js
 * NHIỆM VỤ: Xử lý form đăng nhập, kiểm tra thông tin với tài khoản trong LocalStorage và tạo phiên đăng nhập.
 */

document.addEventListener('DOMContentLoaded', () => {
    setupLoginForm();
});

function setupLoginForm() {
    const loginForm = document.getElementById('login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        // Đọc danh sách tài khoản từ LocalStorage
        let users = [];
        try {
            const storedUsers = localStorage.getItem('EDU_USERS');
            users = storedUsers ? JSON.parse(storedUsers) : [];
        } catch (error) {
            users = [];
        }

        // Kiểm tra nếu chưa có ai đăng ký trên hệ thống
        if (users.length === 0) {
            alert("Hệ thống chưa có tài khoản nào. Vui lòng đăng ký tài khoản trước!");
            window.location.href = 'register.html';
            return;
        }

        // Tìm kiếm user khớp cả email và password
        const matchedUser = users.find(user => user.email === email && user.password === password);

        if (matchedUser) {
            // Đăng nhập thành công -> Lưu phiên đăng nhập
            const currentUser = {
                id: matchedUser.id,
                fullName: matchedUser.fullName,
                email: matchedUser.email
            };
            
            localStorage.setItem('EDU_CURRENT_USER', JSON.stringify(currentUser));
            
            alert("Đăng nhập thành công! Chào mừng " + matchedUser.fullName + " quay lại.");
            window.location.href = 'index.html';
        } else {
            // Đăng nhập thất bại
            alert("Email hoặc mật khẩu không chính xác! Vui lòng kiểm tra lại.");
            document.getElementById('login-password').value = ''; // Xóa trắng ô password
            document.getElementById('login-password').focus();
        }
    });
}