/**
 * FILE: src/js/courses.js
 * NHIỆM VỤ: Hiển thị toàn bộ khóa học, xử lý tìm kiếm, lọc theo danh mục/giá và sắp xếp.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cập nhật số lượng giỏ hàng trên Navbar
    updateCartBadgeUI();

    // 2. Hiển thị toàn bộ khóa học khi mới vào trang
    applyCourseFilters();

    // 3. Khởi tạo các sự kiện lắng nghe bộ lọc
    setupFilterEvents();
});

/**
 * Gắn sự kiện cho các ô tìm kiếm, dropdown lọc và nút đặt lại
 */
function setupFilterEvents() {
    const searchInput = document.getElementById('search-input');
    const btnSearch = document.getElementById('btn-search');
    const categoryFilter = document.getElementById('category-filter');
    const priceFilter = document.getElementById('price-filter');
    const sortFilter = document.getElementById('sort-filter');
    const btnReset = document.getElementById('btn-reset-filter');

    if (btnSearch) btnSearch.addEventListener('click', applyCourseFilters);
    if (searchInput) searchInput.addEventListener('input', applyCourseFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyCourseFilters);
    if (priceFilter) priceFilter.addEventListener('change', applyCourseFilters);
    if (sortFilter) sortFilter.addEventListener('change', applyCourseFilters);

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            searchInput.value = '';
            categoryFilter.value = 'ALL';
            priceFilter.value = 'ALL';
            sortFilter.value = 'DEFAULT';
            applyCourseFilters();
        });
    }
}

/**
 * Lọc và sắp xếp mảng khóa học dựa trên lựa chọn của người dùng
 */
function applyCourseFilters() {
    const keyword = document.getElementById('search-input').value.trim().toLowerCase();
    const category = document.getElementById('category-filter').value;
    const priceRange = document.getElementById('price-filter').value;
    const sortBy = document.getElementById('sort-filter').value;

    let filtered = getAllCourses().filter(course => {
        // Điều kiện 1: Từ khóa (tên khóa học hoặc giảng viên)
        const matchKeyword = course.title.toLowerCase().includes(keyword) ||
                             course.instructor.toLowerCase().includes(keyword);

        // Điều kiện 2: Danh mục
        const matchCategory = (category === 'ALL') || (course.category === category);

        // Điều kiện 3: Mức giá
        let matchPrice = true;
        if (priceRange === 'UNDER_300') {
            matchPrice = course.salePrice < 300000;
        } else if (priceRange === '300_TO_450') {
            matchPrice = course.salePrice >= 300000 && course.salePrice <= 450000;
        } else if (priceRange === 'OVER_450') {
            matchPrice = course.salePrice > 450000;
        }

        return matchKeyword && matchCategory && matchPrice;
    });

    // Sắp xếp kết quả
    if (sortBy === 'PRICE_ASC') {
        filtered.sort((a, b) => a.salePrice - b.salePrice);
    } else if (sortBy === 'PRICE_DESC') {
        filtered.sort((a, b) => b.salePrice - a.salePrice);
    } else if (sortBy === 'RATING_DESC') {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    renderCourseList(filtered);
}

/**
 * Render danh sách khóa học ra giao diện
 * @param {Array} courseList - Mảng khóa học sau khi lọc
 */
function renderCourseList(courseList) {
    const container = document.getElementById('all-courses-container');
    const countLabel = document.getElementById('course-result-count');
    if (!container) return;

    if (countLabel) {
        countLabel.textContent = `Hiển thị ${courseList.length} khóa học phù hợp`;
    }

    if (courseList.length === 0) {
        container.innerHTML = `
            <div class="col-12">
                <div class="alert alert-light border text-center py-4">
                    <p class="mb-0 text-muted">Không tìm thấy khóa học nào khớp với bộ lọc của bạn.</p>
                </div>
            </div>
        `;
        return;
    }

    container.innerHTML = courseList.map(course => `
        <div class="col-md-6 col-xl-4">
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

    // Gắn sự kiện click nút "Thêm vào giỏ"
    const addButtons = container.querySelectorAll('.btn-add-cart');
    addButtons.forEach(button => {
        button.addEventListener('click', () => {
            const courseId = button.getAttribute('data-id');
            const result = addToCart(courseId, 1);
            alert(result.message);
        });
    });
}