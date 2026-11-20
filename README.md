# Đồ Án Cơ Sở Ngành - Thiết kế front-end cho Website bán khóa học (EduCourses)

- **Họ và tên:** Hồ Thế Lộc
- **MSSV:** 110124109
- **Lớp:** DA24TTC
- **Giảng viên hướng dẫn:** ThS. Phạm Minh Đương
- **Email liên hệ đồ án:** holoc2021.tv@gmail.com *(Lưu ý: Rà soát và ẩn thông tin liên hệ cá nhân nếu công khai kho lưu trữ rộng rãi)*

---

## 1. Giới thiệu dự án
**EduCourses** là ứng dụng web **frontend** phục vụ Đồ án Cơ sở ngành Công nghệ thông tin với đề tài *“Thiết kế front-end cho Website bán khóa học”*. Website cung cấp đầy đủ các màn hình giao diện và luồng tương tác phía trình duyệt (client-side) gồm: Trang chủ, Danh sách khóa học, Chi tiết khóa học, Đánh giá 1–5 sao, Giỏ hàng, Thanh toán mô phỏng, Đăng ký/Đăng nhập có Captcha, Hồ sơ cá nhân, Khóa học của tôi, Liên hệ và Trang Quản trị (Admin Dashboard).

## 2. Mục tiêu đề tài
- Nghiên cứu và ứng dụng HTML5 ngữ nghĩa, CSS3 (biến `:root`, Flexbox, CSS Grid, Media Queries) kết hợp Bootstrap 5.3.3 để xây dựng giao diện web bán khóa học hiện đại, đáp ứng đa thiết bị (Desktop, Tablet, Mobile).
- Ứng dụng JavaScript thuần theo phong cách cơ bản, dễ đọc (W3Schools) cùng cơ chế lưu trữ trình duyệt `LocalStorage` và `sessionStorage` để mô phỏng trọn vẹn các luồng nghiệp vụ thương mại điện tử giáo dục.
- Đảm bảo chất lượng mã nguồn: phòng chống XSS cơ bản phía client, xử lý lỗi đọc JSON an toàn và bảo toàn dữ liệu khi thay đổi phiên bản.

## 3. Công nghệ sử dụng
- **Giao diện & Bố cục:** HTML5, CSS3 (`:root` variables, CSS Grid, Flexbox, Media Queries), Bootstrap 5.3.3, Bootstrap Icons 1.11.3.
- **Xử lý nghiệp vụ:** Vanilla JavaScript (hàm cơ bản `function`, vòng lặp `for`, `if/else`, tên hàm/biến tiếng Việt không dấu).
- **Lưu trữ phía trình duyệt:** Web Storage API (`localStorage` và `sessionStorage`).
- **Quản lý mã nguồn:** Visual Studio Code, Git, GitHub.

## 4. Cấu trúc thư mục
```text
csn-da24ttc-hotheloc-webbankhoahoc-frontend/
├── README.md                         # Tài liệu mô tả dự án, hướng dẫn chạy và giới hạn phạm vi
├── index.html                        # Tệp chuyển hướng vào src/index.html
├── setup/                            # Tập tin cài đặt / dữ liệu thử nghiệm
├── src/                              # Mã nguồn chính (Frontend)
│   ├── assets/images/                # Logo và banner SVG (logo.svg, logo-light.svg, banner-liveshow-1/2.svg)
│   ├── css/style.css                 # Biến :root, bố cục Grid/Flexbox, Toast và responsive
│   ├── js/
│   │   ├── data.js                   # 55 khóa học gốc, sao lưu/chuyển đổi phiên bản, nhật ký tương tác
│   │   ├── storage.js                # maHoaHTML, kiemTraDuongDanAnToan, docDuLieuJSON, Giỏ hàng, Đơn hàng, Đánh giá, Yêu thích, Liên hệ
│   │   ├── auth.js                   # Khởi tạo Admin thử nghiệm, kiểm tra điều hướng admin.html, Navbar & Toast
│   │   ├── home.js                   # Trang chủ: Danh mục, Khóa học nổi bật, Quan tâm nhất, Mới ra mắt, Cá nhân hóa
│   │   ├── courses.js                # Tìm kiếm, lọc theo danh mục/giá và sắp xếp 55 khóa học
│   │   ├── course-detail.js          # Chi tiết khóa học, đếm lượt xem/click, video học thử và đánh giá 1–5 sao
│   │   ├── cart.js                   # Hiển thị bảng giỏ hàng, tính tổng tiền và xóa sản phẩm
│   │   ├── checkout.js               # Quy trình thanh toán mô phỏng và kích hoạt khóa học
│   │   ├── my-courses.js             # Hiển thị khóa học đã kích hoạt, xem video bài giảng và lịch sử đơn hàng
│   │   ├── profile.js                # Cập nhật hồ sơ cá nhân, đổi mật khẩu và danh sách yêu thích
│   │   ├── login.js                  # Đăng nhập có mã Captcha
│   │   ├── register.js               # Đăng ký học viên có kiểm tra dữ liệu và Captcha
│   │   └── admin.js                  # Trang quản trị: lọc thống kê Ngày/Tháng/Năm, CRUD Khóa học, User, Đơn hàng, Đánh giá
│   ├── index.html, about.html, courses.html, course-detail.html
│   ├── cart.html, checkout.html, my-courses.html, profile.html
│   └── login.html, register.html, contact.html, admin.html
├── progress-report/                  # Báo cáo tiến độ hằng tuần
├── thesis/                           # Đề cương và quyển báo cáo đồ án
├── refs/                             # Tài liệu tham khảo
├── soft/                             # Phần mềm liên quan (nếu có)
└── docker/                           # Tập tin Docker (nếu có)
```

## 5. Chức năng từng module
- **Module Hiển thị & Tìm kiếm (`home.js`, `courses.js`, `course-detail.js`):** Hiển thị 55 khóa học, tìm kiếm theo tên/giảng viên, lọc danh mục/mức giá, sắp xếp, xem video học thử, lưu Yêu thích, lưu Đã xem gần đây và đánh giá 1–5 sao.
- **Module Tài khoản (`auth.js`, `register.js`, `login.js`, `profile.js`):** Đăng ký/đăng nhập kèm mã Captcha, duy trì phiên đăng nhập trên Navbar, cập nhật hồ sơ và đổi mật khẩu.
- **Module Giỏ hàng & Thanh toán mô phỏng (`cart.js`, `checkout.js`, `my-courses.js`):** Thêm/xóa khóa học trong giỏ, tự động điền thông tin người dùng đã đăng nhập, hiển thị mã QR minh họa, xác nhận thanh toán mô phỏng, lưu đơn hàng và mở khóa xem video bài giảng.
- **Module Liên hệ (`contact.html`, `storage.js`):** Kiểm duyệt họ tên, email, tiêu đề, nội dung và lưu bản ghi liên hệ mô phỏng vào `EDU_CONTACTS`, `EDU_CERTIFICATES`.
- **Module Quản trị (`admin.js`, `admin.html`):** Thống kê doanh thu, đơn hàng, lượt xem, lượt click, đánh giá theo Ngày/Tháng/Năm; thêm/sửa/xóa khóa học; quản lý tài khoản, đơn hàng và đánh giá.

## 6. Hướng dẫn chạy website
1. Giải nén thư mục dự án `csn-da24ttc-hotheloc-webbankhoahoc-frontend`.
2. Mở bằng **Visual Studio Code** và chạy qua tiện ích **Live Server** (hoặc mở trực tiếp tệp `src/index.html` bằng trình duyệt Chrome/Edge).
3. Khuyến nghị chạy qua máy chủ cục bộ (`Live Server` hoặc `python -m http.server`) để đảm bảo đường dẫn và `LocalStorage` hoạt động ổn định.

## 7. Tài khoản thử nghiệm
> **Lưu ý:** Tài khoản dưới đây chỉ là **tài khoản thử nghiệm (demo)** dùng cho mục đích kiểm thử và bảo vệ đồ án trên trình duyệt cục bộ.
- **Tài khoản Admin thử nghiệm:**
  - Email: `admin@gmail.com`
  - Mật khẩu mặc định khởi tạo lần đầu: `123123123` *(Mật khẩu không bị ghi đè lại nếu Admin đổi mật khẩu trong mục Hồ sơ cá nhân).*
- **Tài khoản Học viên:** Đăng ký trực tiếp tại trang `src/register.html`.

## 8. Hướng dẫn sử dụng Admin
1. Truy cập `src/login.html`, đăng nhập bằng tài khoản Admin thử nghiệm và nhập đúng mã Captcha.
2. Hệ thống chuyển hướng tới `src/admin.html` (hoặc chọn **Trang quản trị (Admin)** trong menu người dùng trên Navbar).
3. Sử dụng bộ lọc **Tất cả / Ngày / Tháng / Năm** để xem thống kê và chuyển đổi giữa 5 tab: **Khóa học**, **Tài khoản**, **Đơn hàng**, **Đánh giá sao**, **Liên hệ khách hàng**.

## 9. Cơ chế LocalStorage
Website lưu trữ dữ liệu trực tiếp trên trình duyệt qua các khóa chuẩn:
- `EDU_COURSES`: Danh sách 55 khóa học và các chỉ số tương tác (`views`, `clicks`, `purchases`, `rating`, `ratingCount`).
- `EDU_DATA_SCHEMA_VERSION` & `EDU_COURSES_BACKUP`: Quản lý phiên bản dữ liệu và bản sao lưu tự động trước khi chuyển đổi cấu trúc dữ liệu.
- `EDU_USERS` & `EDU_CURRENT_USER`: Danh sách tài khoản và phiên đăng nhập hiện tại.
- `EDU_CART_ITEMS` & `EDU_PURCHASES`: Giỏ hàng và lịch sử đơn hàng mô phỏng.
- `EDU_REVIEWS`: Danh sách đánh giá 1–5 sao và nhận xét của học viên.
- `EDU_FAVORITES` & `EDU_RECENT_VIEWED`: Khóa học yêu thích và khóa học đã xem gần đây.
- `EDU_ANALYTICS_LOGS`: Nhật ký tương tác (`VIEW`, `CLICK`, `PURCHASE`, `REVIEW`) phục vụ bộ lọc thống kê theo thời gian.
- `EDU_CONTACTS`: Lưu trữ mô phỏng các tin nhắn gửi từ trang Liên hệ.
- `EDU_PENDING_TOAST` (`sessionStorage`): Lưu thông báo nổi chờ hiển thị sau khi chuyển trang.

## 10. Quy trình thanh toán mô phỏng
Luồng thanh toán trên `src/checkout.html` là **quy trình mô phỏng phía frontend**:
1. Người dùng kiểm tra thông tin học viên, chọn phương thức thanh toán (mã QR hiển thị chỉ nhằm mục đích minh họa, **không** có chức năng đối soát giao dịch ngân hàng thật).
2. Khi nhấn nút đặt hàng, hệ thống hiển thị hộp thoại xác nhận thanh toán mô phỏng. Nếu người dùng hủy, giỏ hàng được giữ nguyên và không tạo đơn.
3. Sau khi người dùng xác nhận đồng ý, đơn hàng được tạo, chuyển sang trạng thái **“Thanh toán mô phỏng thành công - Đã kích hoạt khóa học”**, lưu vào `EDU_PURCHASES`, cập nhật lượt mua và cuối cùng mới xóa giỏ hàng.

## 11. Giới hạn bảo mật của frontend
- Dự án được xây dựng thuần **frontend** và sử dụng `LocalStorage`, không có máy chủ (Backend) và cơ sở dữ liệu tập trung.
- Do dữ liệu trong `LocalStorage` có thể bị người dùng xem hoặc chỉnh sửa trực tiếp bằng công cụ nhà phát triển của trình duyệt (DevTools), **cơ chế ẩn menu và kiểm tra điều hướng `admin.html` chỉ có tác dụng ở tầng giao diện (client-side), không phải bảo mật tuyệt đối**.
- Mật khẩu trong `EDU_USERS` được lưu ở dạng văn bản để minh họa nghiệp vụ đồ án frontend; hệ thống thực tế bắt buộc phải băm mật khẩu (bcrypt/Argon2) và xác thực phiên (JWT/Session) ở máy chủ backend.

## 12. Các chức năng chưa triển khai thực tế
- Xác thực, phân quyền và lưu trữ cơ sở dữ liệu tập trung phía máy chủ (Backend API & Database).
- Tích hợp cổng thanh toán trực tuyến và Webhook xác minh chuyển khoản ngân hàng tự động (VietQR/VNPay/MoMo).
- Gửi email kích hoạt khóa học, khôi phục mật khẩu (Quên mật khẩu) và gửi email phản hồi từ biểu mẫu Liên hệ qua máy chủ SMTP.
- Lưu trữ video bài giảng có bảo vệ bản quyền (DRM/Streaming Server).


## Cập nhật đối chiếu kỹ thuật (v1.8.0)

- **Cấu trúc mã nguồn:** `12` trang HTML (`src/*.html`), `15` tệp JavaScript (`src/js/*.js`), `1` tệp CSS (`src/css/style.css`), `5` tài nguyên SVG (`src/assets/images/*.svg`).
- **Dữ liệu khóa học seed:** `55` khóa học thuộc **6 danh mục** (*Frontend, JavaScript, Database, Công cụ, Phân tích hệ thống, Kỹ năng mềm*), **3 cấp độ** (*Cơ bản, Trung cấp, Nâng cao*), trong đó có `2` khóa học miễn phí (`0đ`).
- **Trang Quản trị (Admin):** Gồm **5 tab** (*Khóa học, Người dùng, Đơn hàng, Đánh giá, Liên hệ khách hàng*), bộ lọc thống kê đồng bộ theo Ngày/Tháng/Năm cho cả KPI, biểu đồ danh mục và Top 5 khóa học.
- **Danh mục 14 khóa `localStorage` + 1 khóa `sessionStorage`:**
  - `localStorage`: `EDU_COURSES`, `EDU_DATA_SCHEMA_VERSION`, `EDU_COURSES_BACKUP`, `EDU_USERS`, `EDU_CURRENT_USER`, `EDU_CART_ITEMS`, `EDU_PURCHASES`, `EDU_LEARNING_PROGRESS`, `EDU_REVIEWS`, `EDU_FAVORITES`, `EDU_RECENT_VIEWED`, `EDU_ANALYTICS_LOGS`, `EDU_CONTACTS`, `EDU_CERTIFICATES`.
  - `sessionStorage`: `EDU_PENDING_TOAST` (và `EDU_CURRENT_USER` khi người dùng bỏ chọn *Ghi nhớ phiên đăng nhập*).
- **Giới hạn mô phỏng Front-end:** Mọi chức năng thanh toán QR/Chuyển khoản, gửi liên hệ, quên mật khẩu, tiến độ học tập, cấp chứng nhận và kiểm tra quyền Admin đều chạy cục bộ phía trình duyệt (LocalStorage/SessionStorage), không kết nối máy chủ backend, ngân hàng thật hoặc email/OTP thật.
