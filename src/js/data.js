/**
 * FILE: src/js/data.js
 * NHIEM VU: Quan ly danh sach 55 khoa hoc (EDU_COURSES) va ghi nhan luot xem, luot click, danh gia thuc te.
 */

var KHOA_LUU_KHOA_HOC = 'EDU_COURSES';
var KHOA_LUU_PHIEN_BAN_DU_LIEU = 'EDU_DATA_SCHEMA_VERSION';
var PHIEN_BAN_DU_LIEU_HIEN_TAI = 'REAL_DATA_V4';

// Danh sach 55 khoa hoc voi chi so ban dau bang 0 (chi tang theo tuong tac thuc te)
var DANH_SACH_KHOA_HOC_GOC = [
    {
        "id": "KH01",
        "title": "Lập trình Web chuẩn Responsive với Bootstrap 5",
        "category": "Frontend",
        "instructor": "ThS. Nguyễn Văn A",
        "originalPrice": 799000,
        "salePrice": 399000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": true,
        "duration": "13 giờ học",
        "lessonsCount": 25,
        "description": "Làm chủ hệ thống Grid System và các Component của Bootstrap 5.3 để thiết kế giao diện đa thiết bị chuẩn doanh nghiệp.",
        "level": "Cơ bản"
    },
    {
        "id": "KH02",
        "title": "CSS3 Hiện Đại: Flexbox và CSS Grid Thực Chiến",
        "category": "Frontend",
        "instructor": "ThS. Lê Hoàng C",
        "originalPrice": 550000,
        "salePrice": 299000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": false,
        "duration": "14 giờ học",
        "lessonsCount": 26,
        "description": "Xây dựng bố cục website phức tạp, linh hoạt bằng các kỹ thuật CSS3, CSS Variables và Animation mới nhất.",
        "level": "Trung cấp"
    },
    {
        "id": "KH03",
        "title": "HTML5 Ngữ Nghĩa & Tối Ưu SEO On-Page Chuẩn W3C",
        "category": "Frontend",
        "instructor": "ThS. Nguyễn Văn A",
        "originalPrice": 450000,
        "salePrice": 249000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "duration": "15 giờ học",
        "lessonsCount": 27,
        "description": "Sử dụng đúng cấu trúc thẻ ngữ nghĩa HTML5 giúp tăng điểm khả năng tiếp cận và thứ hạng tìm kiếm Google.",
        "level": "Nâng cao"
    },
    {
        "id": "KH04",
        "title": "Thiết Kế Giao Diện UI/UX Trên Figma Cho Web Developer",
        "category": "Frontend",
        "instructor": "ThS. Trần Thị B",
        "originalPrice": 850000,
        "salePrice": 449000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": false,
        "duration": "16 giờ học",
        "lessonsCount": 28,
        "description": "Chuyển đổi bản vẽ Wireframe và Prototype từ Figma sang mã nguồn HTML/CSS chuẩn xác từng pixel.",
        "level": "Cơ bản"
    },
    {
        "id": "KH05",
        "title": "Xây Dựng Landing Page Chuyển Đổi Cao Với Bootstrap 5",
        "category": "Frontend",
        "instructor": "ThS. Lê Hoàng C",
        "originalPrice": 500000,
        "salePrice": 279000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": false,
        "duration": "17 giờ học",
        "lessonsCount": 29,
        "description": "Thực hành thiết kế 5 mẫu Landing Page thương mại điện tử và khóa học trực tuyến tốc độ tải nhanh.",
        "level": "Cơ bản"
    },
    {
        "id": "KH06",
        "title": "Kiến Trúc CSS Variables & Hệ Thống Design Token",
        "category": "Frontend",
        "instructor": "ThS. Lê Hoàng C",
        "originalPrice": 600000,
        "salePrice": 329000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "duration": "18 giờ học",
        "lessonsCount": 30,
        "description": "Tổ chức hệ thống biến màu sắc, khoảng cách và chữ viết giúp đổi giao diện toàn trang chỉ với một dòng code.",
        "level": "Nâng cao"
    },
    {
        "id": "KH07",
        "title": "Lập Trình Giao Diện ReactJS Cơ Bản Cho Người Mới",
        "category": "Frontend",
        "instructor": "ThS. Phạm Quốc Tuấn",
        "originalPrice": 950000,
        "salePrice": 499000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": false,
        "duration": "19 giờ học",
        "lessonsCount": 31,
        "description": "Làm quen với tư duy Component, Props, State và Hooks để phát triển ứng dụng Single Page Application.",
        "level": "Trung cấp"
    },
    {
        "id": "KH08",
        "title": "Phát Triển Ứng Dụng Web Với Vue.js 3 Toàn Tập",
        "category": "Frontend",
        "instructor": "ThS. Lê Hoàng C",
        "originalPrice": 890000,
        "salePrice": 459000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "duration": "20 giờ học",
        "lessonsCount": 32,
        "description": "Xây dựng giao diện tương tác thời gian thực với Composition API và Vue Router.",
        "level": "Trung cấp"
    },
    {
        "id": "KH09",
        "title": "Tối Ưu Hóa Tốc Độ Tải Trang & Core Web Vitals",
        "category": "Frontend",
        "instructor": "ThS. Nguyễn Văn A",
        "originalPrice": 620000,
        "salePrice": 349000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "duration": "21 giờ học",
        "lessonsCount": 33,
        "description": "Phân tích hiệu năng bằng Google Lighthouse, tối ưu hình ảnh, lazy loading và giảm thiểu điểm nghẽn render.",
        "level": "Nâng cao"
    },
    {
        "id": "KH10",
        "title": "Thiết Kế Web Đa Thiết Bị Mobile-First Thực Chiến",
        "category": "Frontend",
        "instructor": "ThS. Lê Hoàng C",
        "originalPrice": 580000,
        "salePrice": 299000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "duration": "22 giờ học",
        "lessonsCount": 34,
        "description": "Áp dụng chiến lược Mobile-First và Media Queries để hiển thị mượt mà trên điện thoại, máy tính bảng và PC.",
        "level": "Trung cấp"
    },
    {
        "id": "KH11",
        "title": "Lập Trình Giao Diện Thương Mại Điện Tử Chuẩn Doanh Nghiệp",
        "category": "Frontend",
        "instructor": "ThS. Nguyễn Văn A",
        "originalPrice": 820000,
        "salePrice": 420000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "duration": "23 giờ học",
        "lessonsCount": 35,
        "description": "Xây dựng trọn bộ giao diện trang chủ, bộ lọc sản phẩm, giỏ hàng và thanh toán trực tuyến.",
        "level": "Cơ bản"
    },
    {
        "id": "KH12",
        "title": "JavaScript Thuần (Vanilla JS) và DOM Toàn Diện",
        "category": "JavaScript",
        "instructor": "ThS. Trần Thị B",
        "originalPrice": 990000,
        "salePrice": 499000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": true,
        "duration": "24 giờ học",
        "lessonsCount": 36,
        "description": "Nắm vững cách thao tác DOM, xử lý sự kiện, Regex validation và quản lý dữ liệu trình duyệt với LocalStorage.",
        "level": "Cơ bản"
    },
    {
        "id": "KH13",
        "title": "Làm Chủ ES6+ Và Lập Trình Bất Đồng Bộ Async/Await",
        "category": "JavaScript",
        "instructor": "ThS. Trần Thị B",
        "originalPrice": 750000,
        "salePrice": 389000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": false,
        "duration": "25 giờ học",
        "lessonsCount": 37,
        "description": "Hiểu sâu về Arrow Function, Destructuring, Modules, Promise, Fetch API và cơ chế Event Loop.",
        "level": "Trung cấp"
    },
    {
        "id": "KH14",
        "title": "Quản Lý Trạng Thái Ứng Dụng Với Web Storage API",
        "category": "JavaScript",
        "instructor": "ThS. Vũ Thành Nam",
        "originalPrice": 480000,
        "salePrice": 259000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "duration": "26 giờ học",
        "lessonsCount": 38,
        "description": "Ứng dụng LocalStorage và SessionStorage để xây dựng giỏ hàng, lịch sử đơn hàng và phiên đăng nhập.",
        "level": "Cơ bản"
    },
    {
        "id": "KH15",
        "title": "Cấu Trúc Dữ Liệu Và Giải Thuật Trên JavaScript",
        "category": "JavaScript",
        "instructor": "TS. Đặng Quốc Huy",
        "originalPrice": 890000,
        "salePrice": 449000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "duration": "27 giờ học",
        "lessonsCount": 39,
        "description": "Rèn luyện tư duy thuật toán tìm kiếm, sắp xếp, đệ quy và xử lý mảng đối tượng lớn trên Front-end.",
        "level": "Cơ bản"
    },
    {
        "id": "KH16",
        "title": "Xử Lý Biểu Thức Chính Quy (Regex) & Kiểm Duyệt Form",
        "category": "JavaScript",
        "instructor": "ThS. Trần Thị B",
        "originalPrice": 420000,
        "salePrice": 219000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "duration": "28 giờ học",
        "lessonsCount": 40,
        "description": "Thiết lập các bộ lọc kiểm tra số điện thoại 10 số, email, mật khẩu mạnh và mã Captcha chống spam.",
        "level": "Cơ bản"
    },
    {
        "id": "KH17",
        "title": "Lập Trình Hướng Đối Tượng (OOP) Trong JavaScript",
        "category": "JavaScript",
        "instructor": "ThS. Vũ Thành Nam",
        "originalPrice": 680000,
        "salePrice": 359000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "duration": "29 giờ học",
        "lessonsCount": 41,
        "description": "Áp dụng Class, Prototype, Kế thừa và Đóng gói để tổ chức mã nguồn JavaScript rõ ràng, dễ mở rộng.",
        "level": "Cơ bản"
    },
    {
        "id": "KH18",
        "title": "Lập Trình TypeScript Thực Chiến Cho Dự Án Lớn",
        "category": "JavaScript",
        "instructor": "ThS. Phạm Quốc Tuấn",
        "originalPrice": 850000,
        "salePrice": 439000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "duration": "12 giờ học",
        "lessonsCount": 42,
        "description": "Kiểm soát kiểu dữ liệu chặt chẽ, Interface và Generics giúp hạn chế tối đa lỗi runtime khi chạy ứng dụng.",
        "level": "Nâng cao"
    },
    {
        "id": "KH19",
        "title": "Xây Dựng RESTful API Client Với Fetch & Axios",
        "category": "JavaScript",
        "instructor": "ThS. Vũ Thành Nam",
        "originalPrice": 540000,
        "salePrice": 289000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "duration": "13 giờ học",
        "lessonsCount": 43,
        "description": "Giao tiếp dữ liệu JSON với máy chủ, xử lý mã lỗi HTTP, phân trang và tìm kiếm trực tiếp.",
        "level": "Cơ bản"
    },
    {
        "id": "KH20",
        "title": "Tối Ưu Hóa Bộ Nhớ & Hiệu Năng DOM Trong Vanilla JS",
        "category": "JavaScript",
        "instructor": "ThS. Trần Thị B",
        "originalPrice": 640000,
        "salePrice": 339000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "duration": "14 giờ học",
        "lessonsCount": 44,
        "description": "Sử dụng Event Delegation, Debounce, Throttle và DocumentFragment để tăng tốc độ phản hồi giao diện.",
        "level": "Nâng cao"
    },
    {
        "id": "KH21",
        "title": "Thực Hành 15 Dự Án Mini Bằng JavaScript Thuần",
        "category": "JavaScript",
        "instructor": "ThS. Vũ Thành Nam",
        "originalPrice": 720000,
        "salePrice": 379000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "duration": "15 giờ học",
        "lessonsCount": 45,
        "description": "Tự tay lập trình ứng dụng Todo List, Giỏ hàng, Máy tính, Đồng hồ bấm giờ, Trình phát video và Quiz.",
        "level": "Cơ bản"
    },
    {
        "id": "KH22",
        "title": "Thiết Kế Cơ Sở Dữ Liệu Quan Hệ Và Truy Vấn SQL",
        "category": "Database",
        "instructor": "ThS. Hoàng Văn E",
        "originalPrice": 650000,
        "salePrice": 349000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": false,
        "duration": "16 giờ học",
        "lessonsCount": 46,
        "description": "Phân tích, chuẩn hóa cơ sở dữ liệu 3NF và tối ưu hóa các câu lệnh truy vấn SELECT, JOIN, GROUP BY.",
        "level": "Cơ bản"
    },
    {
        "id": "KH23",
        "title": "Hệ Quản Trị Cơ Sở Dữ Liệu MySQL Từ Cơ Bản Đến Nâng Cao",
        "category": "Database",
        "instructor": "ThS. Hoàng Văn E",
        "originalPrice": 720000,
        "salePrice": 379000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": false,
        "duration": "17 giờ học",
        "lessonsCount": 47,
        "description": "Thiết lập bảng, khóa ngoại, Index, View, Stored Procedure và Trigger cho website thương mại điện tử.",
        "level": "Nâng cao"
    },
    {
        "id": "KH24",
        "title": "Lập Trình T-SQL & Quản Trị Microsoft SQL Server",
        "category": "Database",
        "instructor": "TS. Nguyễn Hữu Phước",
        "originalPrice": 840000,
        "salePrice": 429000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "duration": "18 giờ học",
        "lessonsCount": 48,
        "description": "Quản lý giao dịch (Transaction), phân quyền bảo mật, sao lưu phục hồi và tối ưu hóa truy vấn SQL Server.",
        "level": "Cơ bản"
    },
    {
        "id": "KH25",
        "title": "Cơ Sở Dữ Liệu NoSQL Với MongoDB Cho Ứng Dụng Web",
        "category": "Database",
        "instructor": "ThS. Trần Minh Quân",
        "originalPrice": 690000,
        "salePrice": 359000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "duration": "19 giờ học",
        "lessonsCount": 49,
        "description": "Lưu trữ tài liệu dạng JSON/BSON, thiết kế Schema linh hoạt và thực hiện Aggregation Pipeline.",
        "level": "Trung cấp"
    },
    {
        "id": "KH26",
        "title": "Quản Trị PostgreSQL & Tối Ưu Hóa Chỉ Mục (Indexing)",
        "category": "Database",
        "instructor": "TS. Nguyễn Hữu Phước",
        "originalPrice": 880000,
        "salePrice": 459000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "duration": "20 giờ học",
        "lessonsCount": 50,
        "description": "Khai thác sức mạnh của PostgreSQL cho các hệ thống dữ liệu lớn, phân tích Execution Plan.",
        "level": "Nâng cao"
    },
    {
        "id": "KH27",
        "title": "Thiết Kế Cấu Trúc JSON & Đồng Bộ LocalStorage Hiệu Quả",
        "category": "Database",
        "instructor": "ThS. Hoàng Văn E",
        "originalPrice": 420000,
        "salePrice": 229000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "duration": "21 giờ học",
        "lessonsCount": 51,
        "description": "Mô hình hóa các bảng Khóa học, Người dùng, Giỏ hàng và Đơn hàng ngay trên trình duyệt bằng JSON.",
        "level": "Cơ bản"
    },
    {
        "id": "KH28",
        "title": "Phân Tích Dữ Liệu Kinh Doanh Với SQL Thực Chiến",
        "category": "Database",
        "instructor": "ThS. Hoàng Văn E",
        "originalPrice": 660000,
        "salePrice": 349000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "duration": "22 giờ học",
        "lessonsCount": 52,
        "description": "Viết truy vấn thống kê doanh thu theo tháng, sản phẩm bán chạy và tỷ lệ giữ chân khách hàng.",
        "level": "Trung cấp"
    },
    {
        "id": "KH29",
        "title": "Cơ Sở Dữ Liệu Đám Mây Firebase Realtime & Firestore",
        "category": "Database",
        "instructor": "ThS. Trần Minh Quân",
        "originalPrice": 620000,
        "salePrice": 329000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "duration": "23 giờ học",
        "lessonsCount": 53,
        "description": "Tích hợp cơ sở dữ liệu đám mây thời gian thực và xác thực người dùng cho ứng dụng Front-end.",
        "level": "Cơ bản"
    },
    {
        "id": "KH30",
        "title": "Bảo Mật Cơ Sở Dữ Liệu & Phòng Chống SQL Injection",
        "category": "Database",
        "instructor": "TS. Nguyễn Hữu Phước",
        "originalPrice": 740000,
        "salePrice": 389000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "duration": "24 giờ học",
        "lessonsCount": 24,
        "description": "Nhận diện lỗ hổng bảo mật trong truy vấn dữ liệu và áp dụng Prepared Statements an toàn.",
        "level": "Nâng cao"
    },
    {
        "id": "KH31",
        "title": "Tối Ưu Bộ Nhớ Đệm Với Redis Cho Hệ Thống Lớn",
        "category": "Database",
        "instructor": "ThS. Trần Minh Quân",
        "originalPrice": 790000,
        "salePrice": 419000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "duration": "25 giờ học",
        "lessonsCount": 25,
        "description": "Tăng tốc độ đọc dữ liệu gấp 10 lần bằng cơ chế Caching Key-Value trên bộ nhớ RAM.",
        "level": "Nâng cao"
    },
    {
        "id": "KH32",
        "title": "Quản Lý Mã Nguồn Chuyên Nghiệp Với Git & GitHub",
        "category": "Công cụ",
        "instructor": "ThS. Phạm Minh D",
        "originalPrice": 350000,
        "salePrice": 199000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": false,
        "duration": "26 giờ học",
        "lessonsCount": 26,
        "description": "Thành thạo quy trình quản lý phiên bản, phân nhánh (Branching), Pull Request và làm việc nhóm trên GitHub.",
        "level": "Cơ bản"
    },
    {
        "id": "KH33",
        "title": "Làm Chủ Visual Studio Code & Bộ Phím Tắt Tăng Tốc Code",
        "category": "Công cụ",
        "instructor": "ThS. Phạm Minh D",
        "originalPrice": 320000,
        "salePrice": 169000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": false,
        "duration": "27 giờ học",
        "lessonsCount": 27,
        "description": "Cấu hình Extensions, Prettier, ESLint, Live Server và kỹ thuật Debug JavaScript trực tiếp trên VS Code.",
        "level": "Cơ bản"
    },
    {
        "id": "KH34",
        "title": "Triển Khai Website Tĩnh Lên GitHub Pages, Vercel & Netlify",
        "category": "Công cụ",
        "instructor": "ThS. Lâm Gia Bảo",
        "originalPrice": 380000,
        "salePrice": 199000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "duration": "28 giờ học",
        "lessonsCount": 28,
        "description": "Đưa đồ án website Front-end lên môi trường Internet miễn phí kèm tên miền tùy chỉnh và chứng chỉ HTTPS.",
        "level": "Cơ bản"
    },
    {
        "id": "KH35",
        "title": "Kiểm Thử Giao Diện & Gỡ Lỗi Với Chrome DevTools",
        "category": "Công cụ",
        "instructor": "ThS. Phạm Minh D",
        "originalPrice": 450000,
        "salePrice": 239000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "duration": "29 giờ học",
        "lessonsCount": 29,
        "description": "Sử dụng tab Elements, Console, Network và Application để kiểm tra LocalStorage và sửa lỗi CSS/JS.",
        "level": "Cơ bản"
    },
    {
        "id": "KH36",
        "title": "Đóng Gói Ứng Dụng Web Với Docker Cơ Bản",
        "category": "Công cụ",
        "instructor": "ThS. Lâm Gia Bảo",
        "originalPrice": 680000,
        "salePrice": 359000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "duration": "12 giờ học",
        "lessonsCount": 30,
        "description": "Viết Dockerfile và docker-compose để đóng gói môi trường chạy web đồng nhất trên mọi máy tính.",
        "level": "Trung cấp"
    },
    {
        "id": "KH37",
        "title": "Kiểm Thử API Tự Động Với Postman Cho Lập Trình Viên",
        "category": "Công cụ",
        "instructor": "ThS. Lâm Gia Bảo",
        "originalPrice": 490000,
        "salePrice": 259000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "duration": "13 giờ học",
        "lessonsCount": 31,
        "description": "Xây dựng bộ Collection kiểm thử API, biến môi trường và viết kịch bản kiểm tra phản hồi JSON.",
        "level": "Cơ bản"
    },
    {
        "id": "KH38",
        "title": "Quản Lý Gói NPM & Công Cụ Đóng Gói Vite Hiện Đại",
        "category": "Công cụ",
        "instructor": "ThS. Phạm Quốc Tuấn",
        "originalPrice": 520000,
        "salePrice": 279000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "duration": "14 giờ học",
        "lessonsCount": 32,
        "description": "Tối ưu hóa quy trình build, nén file CSS/JS và quản lý thư viện bên thứ ba trong dự án Front-end.",
        "level": "Cơ bản"
    },
    {
        "id": "KH39",
        "title": "Tự Động Hóa Quy Trình Kiểm Thử Với GitHub Actions",
        "category": "Công cụ",
        "instructor": "ThS. Lâm Gia Bảo",
        "originalPrice": 640000,
        "salePrice": 339000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "duration": "15 giờ học",
        "lessonsCount": 33,
        "description": "Thiết lập đường ống CI/CD tự động kiểm tra lỗi cú pháp HTML/CSS/JS mỗi khi đẩy code lên GitHub.",
        "level": "Cơ bản"
    },
    {
        "id": "KH40",
        "title": "Sử Dụng Linux Terminal & Bash Shell Cho Sinh Viên CNTT",
        "category": "Công cụ",
        "instructor": "ThS. Phạm Minh D",
        "originalPrice": 440000,
        "salePrice": 229000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "duration": "16 giờ học",
        "lessonsCount": 34,
        "description": "Thành thạo các câu lệnh dòng lệnh quản lý thư mục, phân quyền file và thao tác máy chủ từ xa.",
        "level": "Cơ bản"
    },
    {
        "id": "KH41",
        "title": "Kỹ Năng Viết Tài Liệu Kỹ Thuật & Báo Cáo Đồ Án Bằng Markdown/Word",
        "category": "Công cụ",
        "instructor": "ThS. Phạm Minh D",
        "originalPrice": 350000,
        "salePrice": 179000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "duration": "17 giờ học",
        "lessonsCount": 35,
        "description": "Chuẩn hóa file README.md chuyên nghiệp và trình bày quyển báo cáo đồ án cơ sở ngành chuẩn ISO.",
        "level": "Cơ bản"
    },
    {
        "id": "KH42",
        "title": "Phân Tích Và Thiết Kế Hệ Thống Thông Tin Hiện Đại",
        "category": "Phân tích hệ thống",
        "instructor": "ThS. Nguyễn Văn A",
        "originalPrice": 700000,
        "salePrice": 390000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": false,
        "duration": "18 giờ học",
        "lessonsCount": 36,
        "description": "Phương pháp khảo sát nghiệp vụ, xây dựng mô hình dữ liệu và thiết kế kiến trúc hệ thống phần mềm.",
        "level": "Cơ bản"
    },
    {
        "id": "KH43",
        "title": "Đặc Tả Yêu Cầu Phần Mềm (SRS) & Phân Tích Nghiệp Vụ BA",
        "category": "Phân tích hệ thống",
        "instructor": "ThS. Lê Thị Ngọc Hân",
        "originalPrice": 780000,
        "salePrice": 419000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "duration": "19 giờ học",
        "lessonsCount": 37,
        "description": "Kỹ năng thu thập yêu cầu khách hàng, phân loại yêu cầu chức năng - phi chức năng và viết tài liệu SRS.",
        "level": "Cơ bản"
    },
    {
        "id": "KH44",
        "title": "Thiết Kế Sơ Đồ UML: Use Case, Activity & Sequence Diagram",
        "category": "Phân tích hệ thống",
        "instructor": "ThS. Lê Thị Ngọc Hân",
        "originalPrice": 640000,
        "salePrice": 339000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": false,
        "duration": "20 giờ học",
        "lessonsCount": 38,
        "description": "Thực hành vẽ các lược đồ UML chuẩn xác bằng Draw.io và StarUML cho chương 3 báo cáo đồ án.",
        "level": "Cơ bản"
    },
    {
        "id": "KH45",
        "title": "Quản Lý Dự Án Phần Mềm Theo Mô Hình Agile & Scrum",
        "category": "Phân tích hệ thống",
        "instructor": "TS. Đặng Quốc Huy",
        "originalPrice": 690000,
        "salePrice": 369000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "duration": "21 giờ học",
        "lessonsCount": 39,
        "description": "Tổ chức Product Backlog, lập kế hoạch Sprint hàng tuần và theo dõi tiến độ đồ án hiệu quả.",
        "level": "Cơ bản"
    },
    {
        "id": "KH46",
        "title": "Nhập Môn Lập Trình Web HTML5 & CSS3 Cho Người Mới (Miễn phí)",
        "category": "Frontend",
        "instructor": "ThS. Lê Hoàng C",
        "originalPrice": 0,
        "salePrice": 0,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "duration": "8 giờ học",
        "lessonsCount": 16,
        "description": "Khóa học miễn phí giúp người mới bắt đầu nắm vững cấu trúc trang web HTML5, bố cục CSS3 và tự tay xây dựng trang giới thiệu cá nhân.",
        "level": "Cơ bản"
    },
    {
        "id": "KH47",
        "title": "Phân Tích Yêu Cầu & Thiết Kế Biểu Đồ UML Thực Chiến",
        "category": "Phân tích hệ thống",
        "instructor": "ThS. Trần Thị B",
        "originalPrice": 499000,
        "salePrice": 249000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "duration": "10 giờ học",
        "lessonsCount": 20,
        "description": "Thực hành vẽ Use Case, Activity, Sequence và Class Diagram chuẩn quy trình phân tích thiết kế hệ thống thông tin.",
        "level": "Trung cấp"
    },
    {
        "id": "KH48",
        "title": "Kỹ Năng Phỏng Vấn IT & Xây Dựng Portfolio Chuyên Nghiệp",
        "category": "Kỹ năng mềm",
        "instructor": "ThS. Lê Hoàng Phúc",
        "originalPrice": 699000,
        "salePrice": 349000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "duration": "12 giờ học",
        "lessonsCount": 22,
        "description": "Hướng dẫn viết CV chuẩn kỹ thuật, trình bày dự án GitHub nổi bật và trả lời câu hỏi phỏng vấn thực tập/fresher tự tin.",
        "level": "Nâng cao"
    },
    {
        "id": "KH49",
        "title": "Kỹ Năng Tự Học & Quản Lý Thời Gian Cho Sinh Viên IT (Miễn phí)",
        "category": "Kỹ năng mềm",
        "instructor": "ThS. Lê Hoàng Phúc",
        "originalPrice": 0,
        "salePrice": 0,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "duration": "6 giờ học",
        "lessonsCount": 14,
        "description": "Khóa học miễn phí hướng dẫn phương pháp Pomodoro, ghi chú kiến thức lập trình và phân bổ thời gian làm đồ án hiệu quả.",
        "level": "Cơ bản"
    },
    {
        "id": "KH50",
        "title": "Kỹ Năng Thuyết Trình & Bảo Vệ Đồ Án Chuyên Ngành",
        "category": "Kỹ năng mềm",
        "instructor": "ThS. Lê Hoàng Phúc",
        "originalPrice": 450000,
        "salePrice": 199000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "duration": "9 giờ học",
        "lessonsCount": 18,
        "description": "Xây dựng slide báo cáo mạch lạc, demo sản phẩm trực tiếp tự tin và xử lý các câu hỏi phản biện từ hội đồng chấm đồ án.",
        "level": "Trung cấp"
    },
    {
        "id": "KH51",
        "title": "Làm Việc Nhóm Agile/Scrum & Giao Tiếp Trong Dự Án Phần Mềm",
        "category": "Kỹ năng mềm",
        "instructor": "ThS. Phạm Văn Hùng",
        "originalPrice": 599000,
        "salePrice": 299000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "duration": "11 giờ học",
        "lessonsCount": 20,
        "description": "Thực hành quy trình Sprint Planning, Daily Meeting, Review & Retrospective cùng kỹ năng xử lý xung đột trong nhóm phát triển phần mềm.",
        "level": "Nâng cao"
    },
    {
        "id": "KH52",
        "title": "Thiết Kế Giao Diện UI/UX Thực Chiến Với Figma",
        "category": "Frontend",
        "instructor": "ThS. Lê Hoàng C",
        "originalPrice": 699000,
        "salePrice": 349000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": false,
        "isNew": true,
        "duration": "14 giờ học",
        "lessonsCount": 26,
        "level": "Cơ bản",
        "description": "Làm chủ Auto Layout, Component, Design System và tạo Prototype tương tác hoàn chỉnh trên Figma cho Website & Mobile App."
    },
    {
        "id": "KH53",
        "title": "Lập Trình Backend Với Node.js & Express.js Cơ Bản",
        "category": "JavaScript",
        "instructor": "ThS. Nguyễn Văn A",
        "originalPrice": 799000,
        "salePrice": 399000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": true,
        "duration": "16 giờ học",
        "lessonsCount": 30,
        "level": "Trung cấp",
        "description": "Xây dựng RESTful API chuẩn cấu trúc MVC, xử lý Middleware, xác thực JWT và kết nối cơ sở dữ liệu với Node.js & Express.js."
    },
    {
        "id": "KH54",
        "title": "Tối Ưu Hóa Hiệu Năng Website & SEO Kỹ Thuật",
        "category": "Công cụ",
        "instructor": "ThS. Phạm Minh D",
        "originalPrice": 599000,
        "salePrice": 289000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "duration": "10 giờ học",
        "lessonsCount": 18,
        "level": "Trung cấp",
        "description": "Cải thiện Core Web Vitals, tối ưu hình ảnh, lazy loading, cấu trúc thẻ ngữ nghĩa HTML5 và tăng điểm Lighthouse toàn diện."
    },
    {
        "id": "KH55",
        "title": "Bảo Mật Ứng Dụng Web Cơ Bản Theo Chuẩn OWASP Top 10",
        "category": "Phân tích hệ thống",
        "instructor": "TS. Đặng Quốc Huy",
        "originalPrice": 850000,
        "salePrice": 429000,
        "rating": 0,
        "ratingCount": 0,
        "views": 0,
        "clicks": 0,
        "purchases": 0,
        "image": "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": false,
        "isNew": true,
        "duration": "15 giờ học",
        "lessonsCount": 28,
        "level": "Nâng cao",
        "description": "Nhận diện và phòng chống XSS, CSRF, SQL Injection, rò rỉ dữ liệu người dùng và kiểm thử an toàn ứng dụng web hiện đại."
    }
];

var KHOA_SAO_LUU_KHOA_HOC = 'EDU_COURSES_BACKUP';


/**
 * 1. Lay chuoi ngay hien tai dinh dang YYYY-MM-DD bang ham co ban
 */
function layChuoiNgayHomNay() {
    var thoiDiemHienTai = new Date();
    var nam = thoiDiemHienTai.getFullYear();
    var thang = thoiDiemHienTai.getMonth() + 1;
    var ngay = thoiDiemHienTai.getDate();

    var chuoiThang = thang < 10 ? '0' + thang : '' + thang;
    var chuoiNgay = ngay < 10 ? '0' + ngay : '' + ngay;
    return nam + '-' + chuoiThang + '-' + chuoiNgay;
}

/**
 * 2. Ghi nhat ky tuong tac (VIEW, CLICK, PURCHASE, REVIEW) phuc vu thong ke Ngay/Thang/Nam
 */
function ghiNhatKyTuongTac(loaiSuKien, maKhoaHoc, giaTriSoTien) {
    var ketQuaDoc = docDuLieuJSONCoTrangThai('EDU_ANALYTICS_LOGS', true);
    if (ketQuaDoc.tonTai && !ketQuaDoc.hopLe) {
        console.error('Bo qua ghi nhat ky vi EDU_ANALYTICS_LOGS dang bi loi JSON.');
        return false;
    }

    var danhSachNhatKy = ketQuaDoc.duLieu.slice();
    var thoiDiemHienTai = new Date();
    var maNhatKy = typeof taoMaDuyNhat === 'function'
        ? taoMaDuyNhat('LOG_', danhSachNhatKy, 'id')
        : ('LOG_' + thoiDiemHienTai.getTime() + '_' + Math.floor(Math.random() * 1000));

    var nhatKyMoi = {
        id: maNhatKy,
        type: loaiSuKien,
        courseId: maKhoaHoc || '',
        amount: Number(giaTriSoTien || 0),
        dateISO: layChuoiNgayHomNay(),
        createdAt: thoiDiemHienTai.toLocaleString('vi-VN')
    };

    danhSachNhatKy.push(nhatKyMoi);
    return luuDuLieuJSON('EDU_ANALYTICS_LOGS', danhSachNhatKy);
}

/**
 * 3.1. Sao luu du lieu khoa hoc hien co truoc khi chuyen doi phien ban hoac dat lai
 */
function saoLuuDuLieuKhoaHoc(danhSachCu, phienBanCu) {
    var banSaoLuu = {
        version: phienBanCu || 'KHONG_XAC_DINH',
        backedUpAt: new Date().toLocaleString('vi-VN'),
        courses: danhSachCu
    };
    return luuDuLieuJSON(KHOA_SAO_LUU_KHOA_HOC, banSaoLuu);
}

/**
 * 3.2. Chuyen doi danh sach khoa hoc cu sang cau truc phien ban moi (bao toan ca truong level - DT-01)
 */
function chuyenDoiDuLieuKhoaHoc(danhSachCu) {
    if (!Array.isArray(danhSachCu)) {
        return null;
    }

    var danhSachDaChuyenDoi = [];
    for (var i = 0; i < danhSachCu.length; i++) {
        var banGhiCu = danhSachCu[i];
        if (!banGhiCu || typeof banGhiCu !== 'object' || !banGhiCu.id || !banGhiCu.title) {
            continue;
        }

        var banGhiMoi = {
            id: String(banGhiCu.id),
            title: String(banGhiCu.title),
            category: banGhiCu.category || 'Frontend',
            level: banGhiCu.level || 'Cơ bản',
            instructor: banGhiCu.instructor || 'Giảng viên EduCourses',
            originalPrice: Number(banGhiCu.originalPrice || 0),
            salePrice: Number(banGhiCu.salePrice || 0),
            rating: Number(banGhiCu.rating || 0),
            ratingCount: Number(banGhiCu.ratingCount || 0),
            views: Number(banGhiCu.views || 0),
            clicks: Number(banGhiCu.clicks || 0),
            purchases: Number(banGhiCu.purchases || 0),
            image: banGhiCu.image || '',
            isFeatured: Boolean(banGhiCu.isFeatured),
            isBestSeller: Boolean(banGhiCu.isBestSeller),
            isNew: Boolean(banGhiCu.isNew),
            duration: banGhiCu.duration || '12 giờ học',
            lessonsCount: Number(banGhiCu.lessonsCount || 20),
            description: banGhiCu.description || ''
        };

        if (banGhiCu.videoUrl) {
            banGhiMoi.videoUrl = banGhiCu.videoUrl;
        }
        danhSachDaChuyenDoi.push(banGhiMoi);
    }

    return danhSachDaChuyenDoi;
}

/**
 * 3.3. Khoi phuc du lieu khoa hoc tu ban sao luu khi chuyen doi that bai hoac can phuc hoi
 */
function khoiPhucDuLieuKhoaHocTuSaoLuu() {
    var ketQuaSaoLuu = docDuLieuJSONCoTrangThai(KHOA_SAO_LUU_KHOA_HOC, false);
    if (!ketQuaSaoLuu.tonTai || !ketQuaSaoLuu.hopLe || !ketQuaSaoLuu.duLieu || !Array.isArray(ketQuaSaoLuu.duLieu.courses)) {
        return false;
    }

    var luuKhoaHocOk = luuDuLieuJSON(KHOA_LUU_KHOA_HOC, ketQuaSaoLuu.duLieu.courses);
    if (!luuKhoaHocOk) {
        return false;
    }
    if (ketQuaSaoLuu.duLieu.version) {
        luuChuoiThoLocal(KHOA_LUU_PHIEN_BAN_DU_LIEU, ketQuaSaoLuu.duLieu.version);
    }
    return true;
}

/**
 * 3.4. Khoi tao va bao ve du lieu khoa hoc (phan biet ro: chua ton tai / mang rong hop le / JSON loi - DT-02)
 */
function khoiTaoDuLieuKhoaHoc() {
    var phienBanDaLuu = null;
    try {
        phienBanDaLuu = localStorage.getItem(KHOA_LUU_PHIEN_BAN_DU_LIEU);
    } catch (loiDocVer) {
        phienBanDaLuu = null;
    }
    var ketQuaDoc = docDuLieuJSONCoTrangThai(KHOA_LUU_KHOA_HOC, true);

    // Truong hop 1: Du lieu dang bi loi JSON -> khong ghi de, giu nguyen chuoi goc de kiem tra/khoi phuc
    if (ketQuaDoc.tonTai && !ketQuaDoc.hopLe) {
        console.error('EDU_COURSES dang chua JSON khong hop le. He thong giu nguyen du lieu goc va khoa ghi de.');
        return false;
    }

    // Truong hop 2: Khoa chua ton tai lan dau -> khoi tao 55 khoa hoc goc
    if (!ketQuaDoc.tonTai) {
        if (luuDuLieuJSON(KHOA_LUU_KHOA_HOC, DANH_SACH_KHOA_HOC_GOC)) {
            luuChuoiThoLocal(KHOA_LUU_PHIEN_BAN_DU_LIEU, PHIEN_BAN_DU_LIEU_HIEN_TAI);
            return true;
        }
        return false;
    }

    // Truong hop 3: Mang rong [] hop le do Admin chu dong xoa het -> giu nguyen khong tu seed lai
    if (ketQuaDoc.duLieu.length === 0) {
        if (phienBanDaLuu !== PHIEN_BAN_DU_LIEU_HIEN_TAI) {
            luuChuoiThoLocal(KHOA_LUU_PHIEN_BAN_DU_LIEU, PHIEN_BAN_DU_LIEU_HIEN_TAI);
        }
        return true;
    }

    // Truong hop 4: Da co du lieu va dung phien ban -> giu nguyen toan bo
    if (phienBanDaLuu === PHIEN_BAN_DU_LIEU_HIEN_TAI) {
        return true;
    }

    // Truong hop 5: Co thay doi phien ban -> sao luu, chuyen doi an toan (giu level), kiem tra roi moi luu
    var danhSachHienTai = ketQuaDoc.duLieu;
    saoLuuDuLieuKhoaHoc(danhSachHienTai, phienBanDaLuu);

    try {
        var danhSachDaChuyenDoi = chuyenDoiDuLieuKhoaHoc(danhSachHienTai);
        if (!Array.isArray(danhSachDaChuyenDoi) || danhSachDaChuyenDoi.length === 0) {
            throw new Error('Ket qua chuyen doi khoa hoc khong hop le.');
        }

        if (!luuDuLieuJSON(KHOA_LUU_KHOA_HOC, danhSachDaChuyenDoi)) {
            throw new Error('Khong the luu danh sach khoa hoc sau khi chuyen doi.');
        }
        luuChuoiThoLocal(KHOA_LUU_PHIEN_BAN_DU_LIEU, PHIEN_BAN_DU_LIEU_HIEN_TAI);
        return true;
    } catch (loi) {
        console.error('Chuyen doi phien ban khoa hoc that bai, khoi phuc tu ban sao luu:', loi);
        khoiPhucDuLieuKhoaHocTuSaoLuu();
        return false;
    }
}

/**
 * 4. Lay toan bo danh sach khoa hoc tu LocalStorage (khong tra seed de ghi de neu JSON dang hong)
 */
function layTatCaKhoaHoc() {
    var ketQuaDoc = docDuLieuJSONCoTrangThai(KHOA_LUU_KHOA_HOC, true);
    if (ketQuaDoc.tonTai && !ketQuaDoc.hopLe) {
        return [];
    }
    if (ketQuaDoc.tonTai && ketQuaDoc.hopLe) {
        return ketQuaDoc.duLieu;
    }
    return DANH_SACH_KHOA_HOC_GOC;
}

/**
 * 5. Luu mang khoa hoc vao LocalStorage (tra ve boolean, chan ghi de neu JSON hien tai bi hong)
 */
function luuTatCaKhoaHoc(mangKhoaHoc) {
    if (!Array.isArray(mangKhoaHoc)) {
        return false;
    }
    var ketQuaHienTai = docDuLieuJSONCoTrangThai(KHOA_LUU_KHOA_HOC, true);
    if (ketQuaHienTai.tonTai && !ketQuaHienTai.hopLe) {
        console.error('Tu choi ghi de EDU_COURSES vi du lieu hien tai dang bi loi JSON.');
        return false;
    }
    return luuDuLieuJSON(KHOA_LUU_KHOA_HOC, mangKhoaHoc);
}

/**
 * 6. Loc danh sach Khoa hoc noi bat bang vong lap for
 */
function layKhoaHocNoiBat() {
    var danhSachKhoaHoc = layTatCaKhoaHoc();
    var ketQua = [];
    for (var i = 0; i < danhSachKhoaHoc.length; i++) {
        if (danhSachKhoaHoc[i].isFeatured === true) {
            ketQua.push(danhSachKhoaHoc[i]);
        }
    }
    return ketQua;
}

/**
 * 7. Lay danh sach Khoa hoc ban chay / xem nhieu
 */
function layKhoaHocBanChay() {
    var danhSachKhoaHoc = layTatCaKhoaHoc();
    var danhSachSaoChep = [];
    for (var i = 0; i < danhSachKhoaHoc.length; i++) {
        danhSachSaoChep.push(danhSachKhoaHoc[i]);
    }

    danhSachSaoChep.sort(function(a, b) {
        var diemA = Number(a.purchases || 0) * 10 + Number(a.views || 0) + Number(a.clicks || 0);
        var diemB = Number(b.purchases || 0) * 10 + Number(b.views || 0) + Number(b.clicks || 0);
        if (diemB !== diemA) {
            return diemB - diemA;
        }
        if (b.isBestSeller && !a.isBestSeller) {
            return 1;
        }
        if (a.isBestSeller && !b.isBestSeller) {
            return -1;
        }
        return 0;
    });

    return danhSachSaoChep;
}

/**
 * 8. Loc danh sach Khoa hoc moi ra mat
 */
function layKhoaHocMoi() {
    var danhSachKhoaHoc = layTatCaKhoaHoc();
    var ketQua = [];
    for (var i = 0; i < danhSachKhoaHoc.length; i++) {
        if (danhSachKhoaHoc[i].isNew === true) {
            ketQua.push(danhSachKhoaHoc[i]);
        }
    }
    return ketQua;
}

/**
 * 9. Thong ke so luong khoa hoc, luot xem va luot click theo tung Danh muc (du 7 nhom + danh muc dong)
 */
function thongKeTheoDanhMuc() {
    var tatCaKhoaHoc = layTatCaKhoaHoc();
    var danhSachDanhMuc = ['Frontend', 'JavaScript', 'Database', 'Công cụ', 'Phân tích hệ thống', 'Kỹ năng mềm'];
    for (var m = 0; m < tatCaKhoaHoc.length; m++) {
        var dmKh = tatCaKhoaHoc[m].category;
        if (dmKh && danhSachDanhMuc.indexOf(dmKh) === -1) {
            danhSachDanhMuc.push(dmKh);
        }
    }
    var danhSachThongKe = [];

    for (var i = 0; i < danhSachDanhMuc.length; i++) {
        var tenDanhMuc = danhSachDanhMuc[i];
        var soLuong = 0;
        var tongLuotXem = 0;
        var tongLuotClick = 0;
        var tongLuotMua = 0;

        for (var j = 0; j < tatCaKhoaHoc.length; j++) {
            if (tatCaKhoaHoc[j].category === tenDanhMuc) {
                soLuong = soLuong + 1;
                tongLuotXem = tongLuotXem + Number(tatCaKhoaHoc[j].views || 0);
                tongLuotClick = tongLuotClick + Number(tatCaKhoaHoc[j].clicks || 0);
                tongLuotMua = tongLuotMua + Number(tatCaKhoaHoc[j].purchases || 0);
            }
        }

        danhSachThongKe.push({
            category: tenDanhMuc,
            count: soLuong,
            totalViews: tongLuotXem,
            totalClicks: tongLuotClick,
            totalPurchases: tongLuotMua
        });
    }
    return danhSachThongKe;
}

/**
 * 10. Tim kiem khoa hoc theo ma ID bang vong lap for
 */
function timKhoaHocTheoMa(maKhoaHoc) {
    var danhSachKhoaHoc = layTatCaKhoaHoc();
    for (var i = 0; i < danhSachKhoaHoc.length; i++) {
        if (danhSachKhoaHoc[i].id === maKhoaHoc) {
            return danhSachKhoaHoc[i];
        }
    }
    return null;
}

/**
 * 11. Ghi nhan luot Click khi nguoi dung bam vao khoa hoc (chi tang clicks, log CLICK - AN-01)
 */
function tangLuotClickKhoaHoc(maKhoaHoc) {
    var ketQuaDoc = docDuLieuJSONCoTrangThai(KHOA_LUU_KHOA_HOC, true);
    if (ketQuaDoc.tonTai && !ketQuaDoc.hopLe) {
        return null;
    }

    var danhSachKhoaHoc = layTatCaKhoaHoc();
    var khoaHocCapNhat = null;

    for (var i = 0; i < danhSachKhoaHoc.length; i++) {
        if (danhSachKhoaHoc[i].id === maKhoaHoc) {
            danhSachKhoaHoc[i].clicks = Number(danhSachKhoaHoc[i].clicks || 0) + 1;
            khoaHocCapNhat = danhSachKhoaHoc[i];
            break;
        }
    }

    if (khoaHocCapNhat) {
        luuTatCaKhoaHoc(danhSachKhoaHoc);
        ghiNhatKyTuongTac('CLICK', maKhoaHoc, 0);
    }
    return khoaHocCapNhat;
}

/**
 * 12. Ghi nhan luot Xem khi nguoi dung mo trang Chi tiet khoa hoc (chi tang views, KHONG tang clicks - AN-01)
 */
function tangLuotXemKhoaHoc(maKhoaHoc) {
    var ketQuaDoc = docDuLieuJSONCoTrangThai(KHOA_LUU_KHOA_HOC, true);
    if (ketQuaDoc.tonTai && !ketQuaDoc.hopLe) {
        return null;
    }

    var danhSachKhoaHoc = layTatCaKhoaHoc();
    var khoaHocCapNhat = null;

    for (var i = 0; i < danhSachKhoaHoc.length; i++) {
        if (danhSachKhoaHoc[i].id === maKhoaHoc) {
            danhSachKhoaHoc[i].views = Number(danhSachKhoaHoc[i].views || 0) + 1;
            khoaHocCapNhat = danhSachKhoaHoc[i];
            break;
        }
    }

    if (khoaHocCapNhat) {
        luuTatCaKhoaHoc(danhSachKhoaHoc);
        ghiNhatKyTuongTac('VIEW', maKhoaHoc, 0);
    }
    return khoaHocCapNhat;
}

/**
 * 13. Dinh dang hien thi diem danh gia sao
 */
function dinhDangDiemDanhGia(khoaHoc) {
    var diemSao = Number(khoaHoc.rating || 0);
    var soLuotDanhGia = Number(khoaHoc.ratingCount || 0);
    if (soLuotDanhGia === 0 || diemSao === 0) {
        return 'Chưa có đánh giá';
    }
    return diemSao.toFixed(1) + ' (' + soLuotDanhGia + ' đánh giá)';
}

/**
 * 14. Dinh dang so tien sang chuan VND (VD: 399000 -> "399.000đ")
 */
function dinhDangTienVND(soTien) {
    var giaTriSo = Number(soTien || 0);
    return giaTriSo.toLocaleString('vi-VN') + 'đ';
}

// Tu dong khoi tao du lieu an toan khi tai file data.js
khoiTaoDuLieuKhoaHoc();
