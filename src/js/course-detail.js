/**
 * FILE: src/js/course-detail.js
 * NHIỆM VỤ: Đọc tham số ID từ URL, truy xuất thông tin khóa học từ LocalStorage và hiển thị chi tiết lên giao diện.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cập nhật số lượng giỏ hàng trên Navbar
    updateCartBadgeUI();

    // 2. Tải và hiển thị thông tin chi tiết khóa học
    loadCourseDetail();
});

/**
 * Lấy ID khóa học từ thanh địa chỉ URL và kiểm tra dữ liệu
 */
function loadCourseDetail() {
    const params = new URLSearchParams(window.location.search);
    const courseId = params.get('id');

    if (!courseId) {
        renderErrorState("Không tìm thấy mã khóa học trên đường dẫn.");
        return;
    }

    const course = typeof getCourseById === 'function' 
        ? getCourseById(courseId) 
        : getAllCourses().find(item => item.id === courseId);

    if (!course) {
        renderErrorState("Khóa học không tồn tại hoặc đã bị xóa khỏi hệ thống.");
        return;
    }

    renderCourseDetailUI(course);
}

/**
 * Đổ dữ liệu khóa học vào các phần tử HTML
 */
function renderCourseDetailUI(course) {
    document.title = `${course.title} - EduCourses`;

    const imgEl = document.getElementById('detail-image');
    imgEl.src = course.image;
    imgEl.alt = course.title;

    document.getElementById('breadcrumb-course-title').textContent = course.title;
    document.getElementById('detail-category').textContent = course.category;
    document.getElementById('detail-title').textContent = course.title;
    document.getElementById('detail-instructor').textContent = course.instructor;
    document.getElementById('detail-rating').innerHTML = `<i class="bi bi-star-fill text-warning me-1"></i>${course.rating}`;
    document.getElementById('detail-sale-price').textContent = formatCurrencyVND(course.salePrice);
    document.getElementById('detail-original-price').textContent = formatCurrencyVND(course.originalPrice);

    const descEl = document.getElementById('detail-description');
    if (course.description) {
        descEl.textContent = course.description;
    }

    // Gắn sự kiện cho nút Thêm vào giỏ hàng
    const btnAddCart = document.getElementById('btn-detail-add-cart');
    btnAddCart.addEventListener('click', () => {
        const result = addToCart(course.id, 1);
        alert(result.message);
    });
}

/**
 * Hiển thị thông báo lỗi khi ID không hợp lệ
*/
function renderErrorState(message) {
    const container = document.getElementById('course-detail-container');
    if (container) {
        container.innerHTML = `
            <div class="container py-5">
                <div class="alert alert-danger text-center p-4 shadow-sm">
                    <h4 class="fw-bold mb-2"><i class="bi bi-exclamation-triangle-fill me-2"></i>Lỗi truy xuất dữ liệu</h4>
                    <p class="mb-3">${message}</p>
                    <a href="courses.html" class="btn btn-primary fw-semibold">Quay lại danh sách khóa học</a>
                </div>
            </div>
        `;
    }
}