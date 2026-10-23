/**
 * FILE: src/js/data.js
 * NHIỆM VỤ: Quản lý danh sách khóa học tập trung và cung cấp các hàm truy vấn dữ liệu.
 */

// Khóa lưu trữ danh sách khóa học trên LocalStorage (Đặt tiền tố EDU_ để tránh trùng lặp)
const STORAGE_COURSES_KEY = 'EDU_COURSES_DATA';

// Mảng dữ liệu khóa học mẫu (Khởi tạo ban đầu)
const INITIAL_COURSES = [
    {
        id: 'KH01',
        title: 'Lập trình Web chuẩn Responsive với Bootstrap 5',
        category: 'Frontend',
        instructor: 'ThS. Nguyễn Văn A',
        originalPrice: 799000,
        salePrice: 399000,
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&auto=format&fit=crop&q=60',
        isFeatured: true,
        description: 'Làm chủ hệ thống Grid System và các Component của Bootstrap 5 để thiết kế giao diện đa thiết bị.'
    },
    {
        id: 'KH02',
        title: 'JavaScript Thuần (Vanilla JS) và DOM Toàn Diện',
        category: 'JavaScript',
        instructor: 'ThS. Trần Thị B',
        originalPrice: 990000,
        salePrice: 499000,
        rating: 5.0,
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&auto=format&fit=crop&q=60',
        isFeatured: true,
        description: 'Nắm vững cách thao tác DOM, xử lý sự kiện và quản lý dữ liệu trình duyệt với LocalStorage.'
    },
    {
        id: 'KH03',
        title: 'CSS3 Hiện Đại: Flexbox và CSS Grid Thực Chiến',
        category: 'Frontend',
        instructor: 'Lê Hoàng C',
        originalPrice: 550000,
        salePrice: 299000,
        rating: 4.5,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=60',
        isFeatured: true,
        description: 'Xây dựng bố cục website phức tạp, linh hoạt bằng các kỹ thuật CSS3 mới nhất.'
    },
    {
        id: 'KH04',
        title: 'Quản Lý Mã Nguồn Chuyên Nghiệp Với Git & GitHub',
        category: 'Công cụ',
        instructor: 'Phạm Minh D',
        originalPrice: 350000,
        salePrice: 199000,
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60',
        isFeatured: true,
        description: 'Thành thạo quy trình quản lý phiên bản, phân nhánh và làm việc nhóm trên GitHub.'
    },
    {
        id: 'KH05',
        title: 'Thiết Kế Cơ Sở Dữ Liệu Quan Hệ Và Truy Vấn SQL',
        category: 'Database',
        instructor: 'ThS. Hoàng Văn E',
        originalPrice: 650000,
        salePrice: 349000,
        rating: 4.6,
        image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=60',
        isFeatured: false,
        description: 'Phân tích, chuẩn hóa cơ sở dữ liệu và tối ưu hóa các câu lệnh truy vấn SQL.'
    },
    {
        id: 'KH06',
        title: 'Phân Tích Và Thiết Kế Hệ Thống Thông Tin Hiện Đại',
        category: 'Phân tích hệ thống',
        instructor: 'ThS. Nguyễn Văn A',
        originalPrice: 700000,
        salePrice: 390000,
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60',
        isFeatured: false,
        description: 'Phương pháp khảo sát nghiệp vụ, xây dựng mô hình dữ liệu và thiết kế kiến trúc hệ thống.'
    }
];

/**
 * Khởi tạo dữ liệu khóa học vào LocalStorage nếu chưa tồn tại
 */
function initCoursesData() {
    try {
        const existingData = localStorage.getItem(STORAGE_COURSES_KEY);
        if (!existingData) {
            localStorage.setItem(STORAGE_COURSES_KEY, JSON.stringify(INITIAL_COURSES));
        }
    } catch (error) {
        console.error('Lỗi khi khởi tạo dữ liệu khóa học:', error);
    }
}

/**
 * Lấy toàn bộ danh sách khóa học
 * @returns {Array} Mảng các đối tượng khóa học
 */
function getAllCourses() {
    try {
        const data = localStorage.getItem(STORAGE_COURSES_KEY);
        return data ? JSON.parse(data) : INITIAL_COURSES;
    } catch (error) {
        console.error('Lỗi khi đọc dữ liệu khóa học:', error);
        return INITIAL_COURSES;
    }
}

/**
 * Lấy danh sách các khóa học nổi bật (hiển thị ở Trang chủ)
 * @returns {Array} Mảng các khóa học có isFeatured = true
 */
function getFeaturedCourses() {
    const courses = getAllCourses();
    return courses.filter(course => course.isFeatured === true);
}

/**
 * Tìm kiếm một khóa học cụ thể theo mã ID
 * @param {string} courseId - Mã khóa học cần tìm (VD: 'KH01')
 * @returns {Object|null} Đối tượng khóa học hoặc null nếu không tìm thấy
 */
function getCourseById(courseId) {
    const courses = getAllCourses();
    return courses.find(course => course.id === courseId) || null;
}

/**
 * Hàm tiện ích định dạng số tiền sang chuẩn VNĐ (VD: 399000 -> "399.000đ")
 * @param {number} amount - Số tiền cần định dạng
 * @returns {string} Chuỗi tiền tệ đã định dạng
 */
function formatCurrencyVND(amount) {
    return Number(amount).toLocaleString('vi-VN') + 'đ';
}

// Tự động kiểm tra và nạp dữ liệu mẫu ngay khi file data.js được tải
initCoursesData();