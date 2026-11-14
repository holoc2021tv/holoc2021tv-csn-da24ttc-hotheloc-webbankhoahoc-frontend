/**
 * FILE: src/js/my-courses.js
 * NHIỆM VỤ: Đọc dữ liệu từ khóa EDU_PURCHASES trong LocalStorage để hiển thị các khóa học đã mua,
 * trình phát video bài giảng và bảng lịch sử đơn hàng bằng vòng lặp for cơ bản.
 */

document.addEventListener('DOMContentLoaded', function() {
    updateCartBadgeUI();
    ensureSamplePurchaseHistory();
    renderMyCoursesAndOrders();
});

/**
 * 1. Khởi tạo 1 đơn hàng mẫu nếu EDU_PURCHASES đang trống
 */
function ensureSamplePurchaseHistory() {
    var raw = localStorage.getItem('EDU_PURCHASES');
    var list = raw ? JSON.parse(raw) : [];

    if (!list || list.length === 0) {
        var sampleOrders = [
            {
                orderId: 'ORD20261101',
                customerName: 'Hồ Thế Lộc',
                customerEmail: 'holoc2021.tv@gmail.com',
                customerPhone: '0372765126',
                shippingAddress: 'Đại học Trà Vinh (Lớp DA24TTC - MSSV: 110124109)',
                paymentMethod: 'Quét mã VietQR',
                status: 'Đã kích hoạt khóa học',
                createdAt: '05/11/2026 09:30:00',
                totalAmount: 898000,
                items: [
                    {
                        id: 'KH01',
                        title: 'Lập trình Web chuẩn Responsive với Bootstrap 5',
                        instructor: 'ThS. Nguyễn Văn A',
                        image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&auto=format&fit=crop&q=60',
                        salePrice: 399000,
                        quantity: 1,
                        itemStatus: 'Đang học tập (75%)'
                    },
                    {
                        id: 'KH12',
                        title: 'JavaScript Thuần (Vanilla JS) và DOM Toàn Diện',
                        instructor: 'ThS. Trần Thị B',
                        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&auto=format&fit=crop&q=60',
                        salePrice: 499000,
                        quantity: 1,
                        itemStatus: 'Đang học tập (50%)'
                    }
                ]
            }
        ];
        localStorage.setItem('EDU_PURCHASES', JSON.stringify(sampleOrders));
    }
}

/**
 * 2. Hiển thị danh sách khóa học đã kích hoạt và bảng lịch sử đơn hàng
 */
function renderMyCoursesAndOrders() {
    var gridContainer = document.getElementById('purchased-courses-grid');
    var tbodyContainer = document.getElementById('purchase-history-tbody');

    if (!gridContainer || !tbodyContainer) {
        return;
    }

    var rawOrders = localStorage.getItem('EDU_PURCHASES');
    var orders = rawOrders ? JSON.parse(rawOrders) : [];

    var rawUser = localStorage.getItem('EDU_CURRENT_USER');
    var currentUser = rawUser ? JSON.parse(rawUser) : null;

    // Lọc đơn hàng của học viên đang đăng nhập bằng vòng lặp for
    var displayOrders = [];
    if (currentUser && currentUser.role !== 'admin') {
        for (var i = 0; i < orders.length; i++) {
            if (orders[i].customerEmail === currentUser.email) {
                displayOrders.push(orders[i]);
            }
        }
    }
    if (displayOrders.length === 0) {
        displayOrders = orders;
    }

    // Gom danh sách khóa học đã mua (tránh trùng lặp) bằng vòng lặp for
    var purchasedCourses = [];
    for (var m = 0; m < displayOrders.length; m++) {
        var order = displayOrders[m];
        var items = order.items || [];

        for (var n = 0; n < items.length; n++) {
            var item = items[n];
            var isExist = false;

            for (var p = 0; p < purchasedCourses.length; p++) {
                if (purchasedCourses[p].id === item.id) {
                    isExist = true;
                    break;
                }
            }

            if (!isExist) {
                var fullCourse = getCourseById(item.id);
                purchasedCourses.push({
                    id: item.id,
                    title: item.title,
                    instructor: item.instructor || (fullCourse ? fullCourse.instructor : 'Giảng viên EduCourses'),
                    image: item.image || (fullCourse ? fullCourse.image : ''),
                    orderId: order.orderId,
                    itemStatus: item.itemStatus || 'Đã kích hoạt - Đang học'
                });
            }
        }
    }

    // Render danh sách thẻ Khóa học của tôi
    if (purchasedCourses.length === 0) {
        var emptyHtml = '';
        emptyHtml += '<div class="col-12">';
        emptyHtml += '  <div class="card border-0 shadow-sm text-center py-5">';
        emptyHtml += '    <div class="mb-3"><i class="bi bi-journal-x text-muted icon-empty-state"></i></div>';
        emptyHtml += '    <h5 class="fw-bold text-secondary">Bạn chưa đăng ký khóa học nào</h5>';
        emptyHtml += '    <p class="text-muted mb-3">Hãy chọn khóa học yêu thích và thanh toán để kích hoạt lộ trình học tập!</p>';
        emptyHtml += '    <div><a href="courses.html" class="btn btn-primary px-4 fw-semibold">Khám phá khóa học</a></div>';
        emptyHtml += '  </div>';
        emptyHtml += '</div>';
        gridContainer.innerHTML = emptyHtml;
    } else {
        var progressClasses = ['progress-bar-75', 'progress-bar-50', 'progress-bar-100', 'progress-bar-25'];
        var gridHtml = '';

        for (var k = 0; k < purchasedCourses.length; k++) {
            var c = purchasedCourses[k];
            var pClass = progressClasses[k % progressClasses.length];

            gridHtml += '<div class="col-md-6 col-lg-4">';
            gridHtml += '  <div class="card h-100 border-0 shadow-sm course-card">';
            gridHtml += '    <img src="' + c.image + '" class="card-img-top" alt="' + c.title + '">';
            gridHtml += '    <div class="card-body d-flex flex-column">';
            gridHtml += '      <div class="d-flex justify-content-between align-items-center mb-2">';
            gridHtml += '        <small class="badge bg-success-subtle text-success fw-semibold">';
            gridHtml += '          <i class="bi bi-check-circle-fill me-1"></i>' + c.itemStatus;
            gridHtml += '        </small>';
            gridHtml += '        <small class="text-muted">Mã ĐH: ' + c.orderId + '</small>';
            gridHtml += '      </div>';
            gridHtml += '      <h5 class="card-title fw-bold fs-6">' + c.title + '</h5>';
            gridHtml += '      <p class="text-muted small mb-2">Giảng viên: ' + c.instructor + '</p>';
            gridHtml += '      <div class="progress progress-thin mb-3">';
            gridHtml += '        <div class="progress-bar bg-success ' + pClass + '" role="progressbar"></div>';
            gridHtml += '      </div>';
            gridHtml += '      <div class="mt-auto d-grid gap-2">';
            gridHtml += '        <button type="button" class="btn btn-primary btn-sm fw-semibold" onclick="openLessonVideoModal(\'' + c.id + '\')">';
            gridHtml += '          <i class="bi bi-play-circle-fill me-1"></i> Vào học ngay (Xem Video)';
            gridHtml += '        </button>';
            gridHtml += '        <a href="course-detail.html?id=' + c.id + '" class="btn btn-outline-secondary btn-sm">Xem đề cương khóa học</a>';
            gridHtml += '      </div>';
            gridHtml += '    </div>';
            gridHtml += '  </div>';
            gridHtml += '</div>';
        }
        gridContainer.innerHTML = gridHtml;
    }

    // Render bảng Lịch sử đơn hàng (EDU_PURCHASES)
    if (displayOrders.length === 0) {
        tbodyContainer.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">Chưa có giao dịch thanh toán nào.</td></tr>';
    } else {
        var tableHtml = '';
        for (var r = 0; r < displayOrders.length; r++) {
            var ord = displayOrders[r];
            var ordItems = ord.items || [];
            var itemNames = '';

            for (var s = 0; s < ordItems.length; s++) {
                if (s > 0) {
                    itemNames += ', ';
                }
                itemNames += ordItems[s].title + ' (x' + (ordItems[s].quantity || 1) + ')';
            }

            tableHtml += '<tr>';
            tableHtml += '  <td class="fw-bold text-primary">' + ord.orderId + '</td>';
            tableHtml += '  <td class="text-secondary small">' + ord.createdAt + '</td>';
            tableHtml += '  <td><div class="fw-semibold">' + itemNames + '</div></td>';
            tableHtml += '  <td><div class="badge bg-info-subtle text-dark border">' + (ord.paymentMethod || 'Quét mã VietQR') + '</div></td>';
            tableHtml += '  <td class="fw-bold text-danger">' + formatCurrencyVND(ord.totalAmount) + '</td>';
            tableHtml += '  <td><div class="badge bg-success">' + (ord.status || 'Đã kích hoạt khóa học') + '</div></td>';
            tableHtml += '</tr>';
        }
        tbodyContainer.innerHTML = tableHtml;
    }
}

/**
 * 3. Mở Modal phát video bài giảng khóa học
 */
function openLessonVideoModal(courseId) {
    var course = getCourseById(courseId);
    var title = course ? course.title : 'Bài giảng khóa học';
    var instructor = course ? course.instructor : 'Giảng viên EduCourses';

    document.getElementById('modal-lesson-title').innerHTML = title;
    document.getElementById('modal-lesson-instructor').innerHTML = 'Giảng viên hướng dẫn: ' + instructor;

    var videoEl = document.getElementById('modal-lesson-video');
    if (videoEl) {
        videoEl.src = videoUrl;
    }

    var modalEl = document.getElementById('lessonVideoModal');
    if (modalEl && typeof bootstrap !== 'undefined') {
        var modal = new bootstrap.Modal(modalEl);
        modal.show();
    }
}