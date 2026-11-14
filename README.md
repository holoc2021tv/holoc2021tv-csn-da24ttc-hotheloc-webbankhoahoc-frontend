# Đồ Án Cơ Sở Ngành - Thiết kế front-end cho Website bán khóa học

- **Họ và tên:** Hồ Thế Lộc
- **MSSV:** 110124109
- **Lớp:** DA24TTC
- **Điện thoại:** 0372765126
- **Email:** holoc2021.tv@gmail.com
- **Giảng viên hướng dẫn:** ThS. Phạm Minh Đương

---

## 1. Giới thiệu đề tài
Đề tài tập trung xây dựng hệ thống giao diện front-end cho website bán khóa học trực tuyến nhằm cung cấp giao diện trực quan, mạch lạc và dễ sử dụng. Hệ thống hỗ trợ người dùng tìm kiếm khóa học, xem chi tiết, quản lý giỏ hàng, thanh toán giả lập, quản lý hồ sơ cá nhân và theo dõi khóa học đã mua.

## 2. Công nghệ sử dụng
- **Ngôn ngữ nền tảng:** HTML, CSS, JavaScript
- **Lưu trữ dữ liệu:** `localStorage` (quản lý giỏ hàng, đơn hàng và thông tin người dùng trực tiếp trên trình duyệt)
- **Công cụ quản lý & Triển khai:** Visual Studio Code, Git, GitHub

## 3. Cấu trúc cây thư mục Repository
```text
csn-da24ttc-hotheloc-webbankhoahoc-frontend/
├── README.md                 # Tập tin hướng dẫn và thông tin liên lạc của tác giả
├── setup/                    # Chứa tập tin cài đặt, dữ liệu thử nghiệm của đồ án
├── src/                      # Chứa mã nguồn (source code) và dữ liệu thử nghiệm giao diện
│   ├── css/
│   │   └── style.css         # Hệ thống Biến CSS (:root) và định dạng giao diện chung
│   ├── js/
│   │   ├── auth.js           # Duy trì phiên đăng nhập và cập nhật thanh Navbar
│   │   ├── cart.js           # Xử lý hiển thị, tính tổng tiền và xóa sản phẩm giỏ hàng
│   │   ├── checkout.js       # Xử lý thanh toán, tạo mã QR và lưu đơn hàng (EDU_PURCHASES)
│   │   ├── course-detail.js  # Đọc ID từ URL và đổ dữ liệu chi tiết khóa học
│   │   ├── courses.js        # Logic bộ lọc, tìm kiếm và sắp xếp danh sách khóa học
│   │   ├── data.js           # Kho dữ liệu mảng đối tượng khóa học của hệ thống
│   │   ├── home.js           # Xử lý hiển thị danh sách khóa học trên Trang chủ
│   │   ├── login.js          # Xử lý xác thực đăng nhập người dùng
│   │   ├── my-courses.js     # Hiển thị khóa học đã mua và lịch sử đơn hàng (Tuần 5)
│   │   ├── profile.js        # Xử lý cập nhật thông tin Hồ sơ cá nhân và đổi mật khẩu (Tuần 5)
│   │   ├── register.js       # Xử lý đăng ký tài khoản và kiểm duyệt dữ liệu
│   │   └── storage.js        # Các hàm giao tiếp với LocalStorage
│   ├── about.html            # Giao diện Trang Giới thiệu
│   ├── cart.html             # Giao diện Trang Giỏ hàng
│   ├── checkout.html         # Giao diện Trang Thanh toán
│   ├── contact.html          # Giao diện Trang Liên hệ
│   ├── course-detail.html    # Giao diện Trang Chi tiết khóa học
│   ├── courses.html          # Giao diện Trang Danh sách khóa học
│   ├── index.html            # Giao diện Trang chủ
│   ├── login.html            # Giao diện Trang Đăng nhập
│   ├── my-courses.html       # Giao diện Trang Khóa học của tôi & Lịch sử đơn hàng (Tuần 5)
│   ├── profile.html          # Giao diện Trang Hồ sơ cá nhân (Tuần 5)
│   └── register.html         # Giao diện Trang Đăng ký
├── progress-report/          # [Bắt buộc] Chứa các báo cáo tiến độ thực hiện hằng tuần
├── thesis/                   # [Bắt buộc] Chứa tài liệu văn bản của Đồ án
│   ├── doc/                  # Chứa tài liệu dạng .DOC
│   ├── pdf/                  # Chứa tài liệu dạng .PDF
│   ├── html/                 # Chứa tài liệu dạng web
│   └── abs/                  # Chứa báo cáo Đồ án gồm báo cáo dạng .PPT, .AVI, ...
├── refs/                     # Chứa các tài liệu, văn bản dùng để tham khảo khi thực hiện Đồ án
├── soft/                     # Chứa các phần mềm liên quan trong quá trình thực hiện Đồ án (nếu có)
└── docker/                   # Chứa các tập tin liên quan đến triển khai ứng dụng trên docker (nếu có)