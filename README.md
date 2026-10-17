# Đồ Án Cơ Sở Ngành - Thiết kế Front-end Website Bán Khóa Học

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
csn-da24ttc-hotheloc-webbankhoahoc-frontend/
├── README.md               # Tập tin hướng dẫn và thông tin liên lạc của tác giả
├── setup/                  # Chứa tập tin cài đặt, dữ liệu thử nghiệm của đồ án
├── src/                    # Chứa mã nguồn (source code) và dữ liệu thử nghiệm giao diện
├── progress-report/        # [Bắt buộc] Chứa các báo cáo tiến độ thực hiện hằng tuần
├── thesis/                 # [Bắt buộc] Chứa tài liệu văn bản của Đồ án
│   ├── doc/                # Chứa tài liệu dạng .DOC
│   ├── pdf/                # Chứa tài liệu dạng .PDF
│   ├── html/               # Chứa tài liệu dạng web
│   └── abs/                # Chứa báo cáo Đồ án gồm báo cáo dạng .PPT, .AVI, ...
├── refs/                   # Chứa các tài liệu, văn bản dùng để tham khảo khi thực hiện Đồ án
├── soft/                   # Chứa các phần mềm liên quan trong quá trình thực hiện Đồ án (nếu có)
└── docker/                 # Chứa các tập tin liên quan đến triển khai ứng dụng trên docker (nếu có)