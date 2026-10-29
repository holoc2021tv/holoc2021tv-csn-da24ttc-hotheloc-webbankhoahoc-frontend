# Đồ Án Cơ Sở Ngành - Thiết kế front-end cho Website bán khóa học

- **Họ và tên:** Hồ Thế Lộc
- **MSSV:** 110124109
- **Lớp:** DA24TTC
- **Điện thoại:** 0372765126
- **Email:** holoc2021.tv@gmail.com
- **Giảng viên hướng dẫn:** ThS. Phạm Minh Đương

---

## 1. Giới thiệu đề tài
Đề tài tập trung xây dựng hệ thống giao diện front-end cho website bán khóa học trực tuyến nhằm cung cấp giao diện trực quan, mạch lạc và dễ sử dụng. Hệ thống hỗ trợ người dùng tìm kiếm khóa học, xem chi tiết, quản lý giỏ hàng và thanh toán giả lập.

## 2. Công nghệ sử dụng
- **Ngôn ngữ nền tảng:** HTML, CSS, JavaScript
- **Lưu trữ dữ liệu:** `localStorage` (quản lý giỏ hàng và thông tin người dùng trực tiếp trên trình duyệt)
- **Công cụ quản lý & Triển khai:** Visual Studio Code, Git, GitHub

## 3. Cấu trúc cây thư mục Repository
```text
├── src/                  # Chứa mã nguồn (source code) và dữ liệu thử nghiệm giao diện
│   ├── css/
│   │   └── style.css     # Định dạng giao diện chung (CSS tùy chỉnh)
│   ├── js/
│   │   ├── cart.js       # Xử lý hiển thị, tính tổng tiền và xóa sản phẩm giỏ hàng
│   │   ├── checkout.js   # Xử lý form thanh toán giả lập và ràng buộc (validate) dữ liệu
│   │   ├── course-detail.js # Đọc ID từ URL và đổ dữ liệu chi tiết khóa học
│   │   ├── courses.js    # Logic bộ lọc, tìm kiếm và sắp xếp danh sách khóa học
│   │   ├── data.js       # Kho dữ liệu mảng đối tượng (Mock data) của hệ thống
│   │   ├── home.js       # Xử lý các chức năng/hiệu ứng riêng của Trang chủ
│   │   └── storage.js    # Các hàm giao tiếp với LocalStorage (thêm/xóa/đọc giỏ hàng)
│   ├── about.html        # Giao diện Trang Giới thiệu
│   ├── cart.html         # Giao diện Trang Giỏ hàng
│   ├── checkout.html     # Giao diện Trang Thanh toán
│   ├── contact.html      # Giao diện Trang Liên hệ
│   ├── course-detail.html# Giao diện Trang Chi tiết khóa học
│   ├── courses.html      # Giao diện Trang Danh sách khóa học
│   ├── index.html        # Giao diện Trang chủ
│   ├── login.html        # Giao diện Trang Đăng nhập
│   └── register.html     # Giao diện Trang Đăng ký