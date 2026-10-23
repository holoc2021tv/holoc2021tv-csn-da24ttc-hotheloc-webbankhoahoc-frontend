/**
 * FILE: src/js/home.js
 * NHIỆM VỤ: Render danh sách khóa học nổi bật lên Trang chủ và bắt sự kiện Thêm vào giỏ.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Đồng bộ số lượng giỏ hàng lên Navbar khi tải trang
    updateCartBadgeUI();

    // 2. Render danh sách khóa học nổi bật
    renderFeaturedCourses();
});

/**
 * Hàm tạo HTML và hiển thị các khóa học nổi bật vào vùng chứa #featured-courses-container
 */
function renderFeaturedCourses() {
    const container = document.getElementById('featured-courses-container');
    if (!container) return;

    const featuredList = getFeaturedCourses();

    if (featuredList.length === 0) {
        container.innerHTML = '<p class="text-center text-muted">Hiện chưa có khóa học nổi bật nào.</p>';
        return;
    }

    // Biến đổi mảng dữ liệu thành chuỗi cấu trúc HTML Bootstrap 5 Card
    const htmlContent = featuredList.map(course => `
        <div class="col-md-6 col-lg-3">
            <div class="card h-100 shadow-sm border-0 course-card">
                <img src="${course.image}" class="card-img-top" alt="${course.title}">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-center mb-2">
                        <small class="badge bg-primary-subtle text-primary fw-semibold">${course.category}</small>
                        <small class="text-warning fw-bold">
                            <i class="bi bi-star-fill"></i> ${course.rating}
                        </small>
                    </div>
                    <h5 class="card-title fw-bold fs-6">${course.title}</h5>
                    <p class="card-text text-muted small mb-2">GV: ${course.instructor}</p>
                    
                    <div class="mt-auto pt-2 border-top">
                        <div class="d-flex align-items-baseline gap-2 mb-3">
                            <strong class="text-danger fs-5">${formatCurrencyVND(course.salePrice)}</strong>
                            <del class="text-muted small">${formatCurrencyVND(course.originalPrice)}</del>
                        </div>
                        <div class="d-grid gap-2">
                            <button type="button" class="btn btn-primary btn-sm btn-add-cart" data-id="${course.id}">
                                <i class="bi bi-cart-plus me-1"></i> Thêm vào giỏ
                            </button>
                            <a href="course-detail.html?id=${course.id}" class="btn btn-outline-secondary btn-sm">
                                Xem chi tiết
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    container.innerHTML = htmlContent;

    // Gắn sự kiện click cho tất cả nút "Thêm vào giỏ" vừa được render
    attachAddToCartEvents(container);
}

/**
 * Hàm lắng nghe sự kiện click nút "Thêm vào giỏ"
 * @param {HTMLElement} parentContainer - Phần tử bao bọc danh sách card
 */
function attachAddToCartEvents(parentContainer) {
    const addButtons = parentContainer.querySelectorAll('.btn-add-cart');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const courseId = button.getAttribute('data-id');
            const result = addToCart(courseId, 1);
            alert(result.message);
        });
    });
}