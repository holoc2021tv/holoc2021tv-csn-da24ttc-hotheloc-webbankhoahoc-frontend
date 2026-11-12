/**
 * FILE: src/js/register.js
 * NHIỆM VỤ: Xử lý form đăng ký, kiểm duyệt dữ liệu và lưu tài khoản vào LocalStorage.
 */

document.addEventListener('DOMContentLoaded', () => {
    setupRegisterForm();
});

function setupRegisterForm() {
    const registerForm = document.getElementById('register-form');
    const phoneInput = document.getElementById('register-phone');
    const passwordInput = document.getElementById('register-password');
    const confirmPasswordInput = document.getElementById('register-confirm-password');

    if (!registerForm) return;

    // Ràng buộc số điện thoại: Tự động loại bỏ mọi ký tự không phải là số (0-9)
    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        const fullName = document.getElementById('register-name').value.trim();
        const email = document.getElementById('register-email').value.trim();
        const phone = phoneInput.value;
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;

        // Validate 1: Kiểm tra độ dài số điện thoại
        if (phone.length !== 10) {
            alert("Số điện thoại không hợp lệ! Vui lòng nhập chính xác 10 chữ số.");
            phoneInput.focus();
            return;
        }

        // Validate 2: Kiểm tra độ dài mật khẩu
        if (password.length < 6) {
            alert("Mật khẩu quá ngắn! Vui lòng nhập tối thiểu 6 ký tự.");
            passwordInput.focus();
            return;
        }

        // Validate 3: Khớp mật khẩu
        if (password !== confirmPassword) {
            alert("Mật khẩu xác nhận không khớp! Vui lòng nhập lại.");
            confirmPasswordInput.focus();
            return;
        }

        // Đọc danh sách user hiện tại từ LocalStorage
        let users = [];
        try {
            const storedUsers = localStorage.getItem('EDU_USERS');
            users = storedUsers ? JSON.parse(storedUsers) : [];
        } catch (error) {
            users = [];
        }

        // Validate 4: Kiểm tra Email đã tồn tại chưa
        const isEmailExist = users.some(user => user.email === email);
        if (isEmailExist) {
            alert("Email này đã được đăng ký! Vui lòng sử dụng email khác hoặc đăng nhập.");
            document.getElementById('register-email').focus();
            return;
        }

        // Đăng ký thành công -> Lưu vào mảng
        const newUser = {
            id: 'USR' + new Date().getTime(), // Tạo ID ngẫu nhiên bằng timestamp
            fullName: fullName,
            email: email,
            phone: phone,
            password: password // Lưu ý: Trong thực tế sẽ cần mã hóa hash, ở đây làm front-end ta lưu text
        };

        users.push(newUser);
        localStorage.setItem('EDU_USERS', JSON.stringify(users));

        alert("Đăng ký tài khoản thành công! Hệ thống sẽ chuyển hướng đến trang Đăng nhập.");
        window.location.href = 'login.html';
    });
}