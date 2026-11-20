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

## 2. Thông tin đề tài & Phạm vi thực hiện

| Hạng mục | Thông tin |
| :--- | :--- |
| Tên sản phẩm | **EduCourses** – Website bán khóa học trực tuyến |
| Loại đề tài | Đồ án Cơ sở ngành (Khoa Công nghệ thông tin) |
| Giảng viên hướng dẫn | ThS. Phạm Minh Đương |
| Phạm vi triển khai | Ứng dụng Front-end tĩnh, lưu trữ cục bộ bằng Web Storage (`localStorage` và `sessionStorage`) |
| Trạng thái | Bản demo học tập (chưa tích hợp backend, cơ sở dữ liệu máy chủ hay cổng thanh toán thật) |

### Mô tả đề tài được phê duyệt
Hiển thị danh sách khóa học trực tuyến kèm hình ảnh minh họa, giảng viên, thời lượng, lộ trình học và giá bán. Hệ thống cho phép người dùng tìm kiếm khóa học theo tên, lọc theo danh mục, mức giá, xem chi tiết từng khóa học, thêm vào giỏ hàng và thực hiện thanh toán giả lập. Các trang chính bao gồm: Trang chủ, Danh sách khóa học, Chi tiết khóa học, Giỏ hàng, Thanh toán, Đăng nhập/Đăng ký, Giới thiệu và Liên hệ. Giao diện được thiết kế hiện đại, rõ ràng, phù hợp với lĩnh vực giáo dục trực tuyến.

### Ghi chú về công nghệ triển khai
- Trên cổng đăng ký đề tài có liệt kê danh sách công nghệ tham khảo gồm `HTML`, `CSS`, `JavaScript`, `TypeScript`, `React`, `Next.js`, `Tailwind CSS`, `Vite`,... kèm yêu cầu sử dụng `LocalStorage` để lưu trữ dữ liệu trong trình duyệt.
- Trong đồ án này, mã nguồn được triển khai bằng **HTML5, CSS3, JavaScript thuần (Vanilla JS) và Bootstrap 5.3.3**, không sử dụng TypeScript, React, Next.js, Tailwind CSS hay Vite.

## 3. Chức năng chính

### Khách truy cập
- Xem trang chủ (banner Live Show, hướng dẫn mua khóa học) và trang giới thiệu (lộ trình học, câu hỏi thường gặp).
- Tìm kiếm khóa học theo từ khóa; lọc theo danh mục, trình độ và mức giá (bao gồm khóa học miễn phí `0đ`).
- Xem chi tiết khóa học, lộ trình học và nội dung học thử bài 1.
- Thêm khóa học vào giỏ hàng.
- Đăng ký và đăng nhập tài khoản học viên (có mã xác nhận Captcha).
- Gửi biểu mẫu liên hệ.

### Học viên
- Quản lý thông tin hồ sơ cá nhân và đổi mật khẩu.
- Xem danh sách khóa học đã mua trong quy trình thanh toán mô phỏng.
- Theo dõi tiến độ học tập (`0%`, `50%`, `100%`) và xem/in chứng nhận hoàn thành qua chức năng in hoặc lưu PDF của trình duyệt.
- Quản lý danh sách khóa học yêu thích và lịch sử đã xem gần đây.
- Gửi đánh giá sao và bình luận cho khóa học đã mua.
- Áp dụng mã giảm giá mẫu tại bước thanh toán.

### Quản trị viên (mô phỏng)
- Xem bảng điều khiển thống kê theo thời gian (Tất cả, Hôm nay, Ngày, Tháng, Năm), hiệu suất theo danh mục và Top 5 khóa học được quan tâm.
- Quản lý 5 nhóm dữ liệu: Khóa học, Tài khoản (hỗ trợ khóa/mở khóa tài khoản học viên), Đơn hàng, Đánh giá và Liên hệ.

> **Lưu ý:** Toàn bộ chức năng đăng nhập, phân quyền, quản trị và thanh toán chỉ nhằm mô phỏng luồng nghiệp vụ front-end, không thay thế cơ chế bảo mật hay giao dịch trong môi trường vận hành thực tế.

## 4. Công nghệ sử dụng & Quy chuẩn mã nguồn

| Công nghệ | Mục đích |
| :--- | :--- |
| HTML5 | Xây dựng cấu trúc ngữ nghĩa cho `12` trang giao diện |
| CSS3 | Định dạng giao diện, biến `:root`, Grid/Flexbox, Responsive và `@media print` |
| JavaScript thuần (Vanilla JS) | Xử lý tương tác và logic nghiệp vụ trên trình duyệt (`15` tệp) |
| Bootstrap 5.3.3 | Hỗ trợ hệ thống lưới và thành phần giao diện |
| Bootstrap Icons 1.11.3 | Bộ biểu tượng giao diện |
| Web Storage API | Lưu dữ liệu cục bộ bằng `localStorage` và `sessionStorage` |
| VS Code, Live Server, Git | Công cụ phát triển, chạy thử cục bộ và quản lý mã nguồn |

## 5. Cấu trúc mã nguồn

```text
.
├── index.html                   # Chuyển hướng nhanh vào src/index.html
├── README.md                    # Tài liệu tổng quan dự án
├── CHANGELOG.md                 # Nhật ký thay đổi theo phiên bản
└── src/
    ├── index.html               # Trang chủ
    ├── about.html               # Giới thiệu
    ├── courses.html             # Danh sách khóa học
    ├── course-detail.html       # Chi tiết khóa học & học thử
    ├── cart.html                # Giỏ hàng
    ├── checkout.html            # Thanh toán mô phỏng
    ├── my-courses.html          # Khóa học đã mua & chứng nhận
    ├── login.html               # Đăng nhập
    ├── register.html            # Đăng ký
    ├── profile.html             # Hồ sơ cá nhân
    ├── contact.html             # Liên hệ
    ├── admin.html               # Quản trị mô phỏng
    ├── css/
    │   └── style.css            # Tệp CSS dùng chung
    ├── assets/
    │   └── images/              # 5 tệp SVG (logo sáng/tối và 3 banner)
    └── js/
        ├── storage.js           # Quản lý Web Storage tập trung
        ├── data.js              # Bộ dữ liệu 55 khóa học mẫu
        ├── auth.js              # Phiên đăng nhập & phân quyền giao diện
        ├── home.js              # Tương tác trang chủ
        ├── courses.js           # Tìm kiếm, lọc và phân trang khóa học
        ├── course-detail.js     # Chi tiết, học thử và đánh giá
        ├── cart.js              # Quản lý giỏ hàng
        ├── checkout.js          # Voucher và thanh toán mô phỏng
        ├── my-courses.js        # Tiến độ học tập và chứng nhận
        ├── login.js             # Xử lý đăng nhập
        ├── register.js          # Xử lý đăng ký
        ├── profile.js           # Hồ sơ, yêu thích và lịch sử xem
        ├── contact.js           # Biểu mẫu liên hệ
        ├── about.js             # Thống kê trang giới thiệu
        └── admin.js             # Thống kê và quản trị 5 phân hệ
```

Dự án gồm `12` trang HTML trong `src/` (cùng `1` tệp `index.html` chuyển hướng ở thư mục gốc), `15` tệp JavaScript, `1` tệp CSS và `5` tệp đồ họa SVG nội bộ.

## 6. Hướng dẫn chạy dự án

Dự án là website front-end tĩnh, không cần cài đặt backend hay cơ sở dữ liệu.

### Cách 1: Visual Studio Code và Live Server (Khuyên dùng)
1. Tải repository về máy hoặc clone bằng Git.
2. Mở thư mục dự án bằng Visual Studio Code.
3. Cài đặt extension **Live Server** nếu chưa có.
4. Mở `src/index.html` và chọn **Open with Live Server**.
5. Truy cập `http://127.0.0.1:5500/src/index.html` (cổng có thể thay đổi tùy cấu hình Live Server).

### Cách 2: Python HTTP Server
Mở Terminal tại thư mục gốc của dự án và chạy:

```bash
python -m http.server 5500
```

Sau đó mở trình duyệt tại `http://localhost:5500/src/index.html` (nếu máy dùng lệnh `python3`, chạy `python3 -m http.server 5500`).

## 7. Dữ liệu mẫu & Lưu trữ trình duyệt

- **Bộ dữ liệu mẫu:** `55` khóa học (`KH01` – `KH55`, schema `REAL_DATA_V4`) khai báo trong `src/js/data.js`, phân bố theo `6` danh mục (`Frontend`, `JavaScript`, `Công cụ`, `Database`, `Phân tích hệ thống`, `Kỹ năng mềm`) và `3` cấp độ (`Cơ bản`, `Trung cấp`, `Nâng cao`), trong đó có `2` khóa học miễn phí `0đ` (`KH46`, `KH49`).
- **Cơ chế lưu trữ:** Dữ liệu thao tác (tài khoản, giỏ hàng, đơn hàng, tiến độ học, chứng nhận, đánh giá, yêu thích, liên hệ) được lưu cục bộ bằng `14` khóa `localStorage` và `1` khóa `sessionStorage` thông qua `src/js/storage.js`. Dữ liệu không gửi lên máy chủ và không tự đồng bộ giữa các trình duyệt hoặc thiết bị khác nhau.
- **Tài khoản quản trị thử nghiệm:** Thông tin tài khoản Admin mẫu được khai báo trong `src/js/auth.js` để phục vụ kiểm thử giao diện quản trị (không dùng cho môi trường thực tế).
- **Mã giảm giá mẫu tại trang Thanh toán:**

| Mã giảm giá | Mức giảm mô phỏng |
| :--- | ---: |
| `TVU2026` | 10% |
| `EDU50K` | 50.000đ |

## 8. Kiểm tra mã nguồn

Có thể kiểm tra nhanh cú pháp toàn bộ `15` tệp JavaScript bằng Node.js:

**Trên Git Bash / Linux / macOS:**

```bash
for file in src/js/*.js; do
  node --check "$file" || exit 1
done
```

**Trên Windows PowerShell:**

```powershell
Get-ChildItem src/js/*.js | ForEach-Object { node --check $_.FullName }
```

Toàn bộ `15/15` tệp JavaScript đều đạt kiểm tra cú pháp `node --check`. Giao diện các trang đã được kiểm tra hiển thị responsive trên 3 kích thước màn hình phổ biến (`360px`, `768px`, `1366px`).

## 9. Giới hạn mô phỏng & Lưu ý bảo mật

- Hệ thống không có backend và không kết nối cơ sở dữ liệu máy chủ.
- Đăng ký, đăng nhập và phân quyền được xử lý ở phía trình duyệt nên người dùng có thể xem hoặc thay đổi dữ liệu trong DevTools/Web Storage.
- Thanh toán, mã QR, voucher, đơn hàng, biểu mẫu liên hệ và chứng nhận chỉ phục vụ mô phỏng giao diện, không phát sinh giao dịch tiền thật và không gửi email thật.
- Không nhập thông tin nhạy cảm hoặc mật khẩu thật khi dùng thử ứng dụng.

## 10. Hướng phát triển

- Xây dựng backend và REST API để quản lý tài khoản, khóa học và đơn hàng.
- Chuyển lưu trữ từ Web Storage sang cơ sở dữ liệu máy chủ.
- Triển khai xác thực và phân quyền phía máy chủ.
- Tích hợp cổng thanh toán ở môi trường thử nghiệm (sandbox) và gửi email xác nhận tự động.
- Bổ sung bộ kiểm thử tự động cho các luồng nghiệp vụ và khả năng truy cập (accessibility).