/**
 * FILE: src/js/auth.js
 * NHIỆM VỤ: Kiểm tra trạng thái đăng nhập từ LocalStorage và cập nhật thanh Navbar.
 */

document.addEventListener('DOMContentLoaded', () => {
    updateNavbarAuth();
});

function updateNavbarAuth() {
    // Đọc thông tin user đang đăng nhập
    const currentUserStr = localStorage.getItem('EDU_CURRENT_USER');
    
    if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr);
        
        // Tìm các thẻ <a> chứa link login và register trên navbar
        const authLinks = document.querySelectorAll('a[href="login.html"], a[href="register.html"]');
        
        if (authLinks.length > 0) {
            const parentContainer = authLinks[0].parentElement;
            
            // Giữ lại nút Giỏ hàng nếu nó nằm chung cụm (đối với trang chủ, khóa học)
            const cartBtn = parentContainer.querySelector('a[href="cart.html"]');
            let cartHtml = '';
            if (cartBtn) {
                cartHtml = cartBtn.outerHTML;
            }
            
            // Thay thế cụm Đăng nhập/Đăng ký bằng Dropdown Profile của Bootstrap
            parentContainer.innerHTML = cartHtml + `
                <div class="dropdown">
                    <button class="btn btn-outline-primary dropdown-toggle fw-bold d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                        <i class="bi bi-person-circle fs-5 me-2"></i> 
                        <div class="d-inline-block">${currentUser.fullName}</div>
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2">
                        <li><a class="dropdown-item py-2" href="#"><i class="bi bi-person me-2"></i>Hồ sơ cá nhân</a></li>
                        <li><a class="dropdown-item py-2" href="#"><i class="bi bi-journal-check me-2"></i>Khóa học của tôi</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item text-danger py-2 fw-semibold" href="#" id="logout-btn"><i class="bi bi-box-arrow-right me-2"></i>Đăng xuất</a></li>
                    </ul>
                </div>
            `;
            
            // Bắt sự kiện Đăng xuất
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    if(confirm("Bạn có chắc chắn muốn đăng xuất?")) {
                        localStorage.removeItem('EDU_CURRENT_USER');
                        window.location.reload(); // Tải lại trang
                    }
                });
            }
        }
    }
}