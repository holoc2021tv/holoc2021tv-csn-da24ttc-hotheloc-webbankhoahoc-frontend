/**
 * FILE: src/js/data.js
 * NHIỆM VỤ: Quản lý danh sách 51 khóa học (EDU_COURSES) bằng các hàm JavaScript cơ bản.
 */

var STORAGE_COURSES_KEY = 'EDU_COURSES';
var LEGACY_COURSES_KEY = 'EDU_COURSES_DATA';

// Mảng 51 khóa học mẫu
var INITIAL_COURSES = [
    {
        "id": "KH01",
        "title": "Lập trình Web chuẩn Responsive với Bootstrap 5",
        "category": "Frontend",
        "instructor": "ThS. Nguyễn Văn A",
        "originalPrice": 799000,
        "salePrice": 399000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": true,
        "stock": 35,
        "clicks": 1420,
        "duration": "13 giờ học",
        "lessonsCount": 25,
        "description": "Làm chủ hệ thống Grid System và các Component của Bootstrap 5.3 để thiết kế giao diện đa thiết bị chuẩn doanh nghiệp."
    },
    {
        "id": "KH02",
        "title": "CSS3 Hiện Đại: Flexbox và CSS Grid Thực Chiến",
        "category": "Frontend",
        "instructor": "ThS. Lê Hoàng C",
        "originalPrice": 550000,
        "salePrice": 299000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": false,
        "stock": 28,
        "clicks": 980,
        "duration": "14 giờ học",
        "lessonsCount": 26,
        "description": "Xây dựng bố cục website phức tạp, linh hoạt bằng các kỹ thuật CSS3, CSS Variables và Animation mới nhất."
    },
    {
        "id": "KH03",
        "title": "HTML5 Ngữ Nghĩa & Tối Ưu SEO On-Page Chuẩn W3C",
        "category": "Frontend",
        "instructor": "ThS. Nguyễn Văn A",
        "originalPrice": 450000,
        "salePrice": 249000,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "stock": 40,
        "clicks": 620,
        "duration": "15 giờ học",
        "lessonsCount": 27,
        "description": "Sử dụng đúng cấu trúc thẻ ngữ nghĩa HTML5 giúp tăng điểm khả năng tiếp cận và thứ hạng tìm kiếm Google."
    },
    {
        "id": "KH04",
        "title": "Thiết Kế Giao Diện UI/UX Trên Figma Cho Web Developer",
        "category": "Frontend",
        "instructor": "ThS. Trần Thị B",
        "originalPrice": 850000,
        "salePrice": 449000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": false,
        "stock": 22,
        "clicks": 1150,
        "duration": "16 giờ học",
        "lessonsCount": 28,
        "description": "Chuyển đổi bản vẽ Wireframe và Prototype từ Figma sang mã nguồn HTML/CSS chuẩn xác từng pixel."
    },
    {
        "id": "KH05",
        "title": "Xây Dựng Landing Page Chuyển Đổi Cao Với Bootstrap 5",
        "category": "Frontend",
        "instructor": "KS. Đỗ Minh Khoa",
        "originalPrice": 500000,
        "salePrice": 279000,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": false,
        "stock": 18,
        "clicks": 740,
        "duration": "17 giờ học",
        "lessonsCount": 29,
        "description": "Thực hành thiết kế 5 mẫu Landing Page thương mại điện tử và khóa học trực tuyến tốc độ tải nhanh."
    },
    {
        "id": "KH06",
        "title": "Kiến Trúc CSS Variables & Hệ Thống Design Token",
        "category": "Frontend",
        "instructor": "ThS. Lê Hoàng C",
        "originalPrice": 600000,
        "salePrice": 329000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "stock": 30,
        "clicks": 530,
        "duration": "18 giờ học",
        "lessonsCount": 30,
        "description": "Tổ chức hệ thống biến màu sắc, khoảng cách và chữ viết giúp đổi giao diện toàn trang chỉ với một dòng code."
    },
    {
        "id": "KH07",
        "title": "Lập Trình Giao Diện ReactJS Cơ Bản Cho Người Mới",
        "category": "Frontend",
        "instructor": "ThS. Phạm Quốc Tuấn",
        "originalPrice": 950000,
        "salePrice": 499000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": false,
        "stock": 25,
        "clicks": 1340,
        "duration": "19 giờ học",
        "lessonsCount": 31,
        "description": "Làm quen với tư duy Component, Props, State và Hooks để phát triển ứng dụng Single Page Application."
    },
    {
        "id": "KH08",
        "title": "Phát Triển Ứng Dụng Web Với Vue.js 3 Toàn Tập",
        "category": "Frontend",
        "instructor": "KS. Đỗ Minh Khoa",
        "originalPrice": 890000,
        "salePrice": 459000,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "stock": 20,
        "clicks": 490,
        "duration": "20 giờ học",
        "lessonsCount": 32,
        "description": "Xây dựng giao diện tương tác thời gian thực với Composition API và Vue Router."
    },
    {
        "id": "KH09",
        "title": "Tối Ưu Hóa Tốc Độ Tải Trang & Core Web Vitals",
        "category": "Frontend",
        "instructor": "ThS. Nguyễn Văn A",
        "originalPrice": 620000,
        "salePrice": 349000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "stock": 15,
        "clicks": 410,
        "duration": "21 giờ học",
        "lessonsCount": 33,
        "description": "Phân tích hiệu năng bằng Google Lighthouse, tối ưu hình ảnh, lazy loading và giảm thiểu điểm nghẽn render."
    },
    {
        "id": "KH10",
        "title": "Thiết Kế Web Đa Thiết Bị Mobile-First Thực Chiến",
        "category": "Frontend",
        "instructor": "ThS. Lê Hoàng C",
        "originalPrice": 580000,
        "salePrice": 299000,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "stock": 0,
        "clicks": 890,
        "duration": "22 giờ học",
        "lessonsCount": 34,
        "description": "Áp dụng chiến lược Mobile-First và Media Queries để hiển thị mượt mà trên điện thoại, máy tính bảng và PC."
    },
    {
        "id": "KH11",
        "title": "Lập Trình Giao Diện Thương Mại Điện Tử Chuẩn Doanh Nghiệp",
        "category": "Frontend",
        "instructor": "ThS. Nguyễn Văn A",
        "originalPrice": 820000,
        "salePrice": 420000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "stock": 32,
        "clicks": 1080,
        "duration": "23 giờ học",
        "lessonsCount": 35,
        "description": "Xây dựng trọn bộ giao diện trang chủ, bộ lọc sản phẩm, giỏ hàng và thanh toán trực tuyến."
    },
    {
        "id": "KH12",
        "title": "JavaScript Thuần (Vanilla JS) và DOM Toàn Diện",
        "category": "JavaScript",
        "instructor": "ThS. Trần Thị B",
        "originalPrice": 990000,
        "salePrice": 499000,
        "rating": 5.0,
        "image": "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": true,
        "stock": 40,
        "clicks": 1850,
        "duration": "24 giờ học",
        "lessonsCount": 36,
        "description": "Nắm vững cách thao tác DOM, xử lý sự kiện, Regex validation và quản lý dữ liệu trình duyệt với LocalStorage."
    },
    {
        "id": "KH13",
        "title": "Làm Chủ ES6+ Và Lập Trình Bất Đồng Bộ Async/Await",
        "category": "JavaScript",
        "instructor": "ThS. Trần Thị B",
        "originalPrice": 750000,
        "salePrice": 389000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": false,
        "stock": 28,
        "clicks": 1210,
        "duration": "25 giờ học",
        "lessonsCount": 37,
        "description": "Hiểu sâu về Arrow Function, Destructuring, Modules, Promise, Fetch API và cơ chế Event Loop."
    },
    {
        "id": "KH14",
        "title": "Quản Lý Trạng Thái Ứng Dụng Với Web Storage API",
        "category": "JavaScript",
        "instructor": "KS. Vũ Thành Nam",
        "originalPrice": 480000,
        "salePrice": 259000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "stock": 35,
        "clicks": 920,
        "duration": "26 giờ học",
        "lessonsCount": 38,
        "description": "Ứng dụng LocalStorage và SessionStorage để xây dựng giỏ hàng, lịch sử đơn hàng và phiên đăng nhập."
    },
    {
        "id": "KH15",
        "title": "Cấu Trúc Dữ Liệu Và Giải Thuật Trên JavaScript",
        "category": "JavaScript",
        "instructor": "TS. Đặng Quốc Huy",
        "originalPrice": 890000,
        "salePrice": 449000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "stock": 25,
        "clicks": 780,
        "duration": "27 giờ học",
        "lessonsCount": 39,
        "description": "Rèn luyện tư duy thuật toán tìm kiếm, sắp xếp, đệ quy và xử lý mảng đối tượng lớn trên Front-end."
    },
    {
        "id": "KH16",
        "title": "Xử Lý Biểu Thức Chính Quy (Regex) & Kiểm Duyệt Form",
        "category": "JavaScript",
        "instructor": "ThS. Trần Thị B",
        "originalPrice": 420000,
        "salePrice": 219000,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "stock": 30,
        "clicks": 640,
        "duration": "28 giờ học",
        "lessonsCount": 40,
        "description": "Thiết lập các bộ lọc kiểm tra số điện thoại 10 số, email, mật khẩu mạnh và mã Captcha chống spam."
    },
    {
        "id": "KH17",
        "title": "Lập Trình Hướng Đối Tượng (OOP) Trong JavaScript",
        "category": "JavaScript",
        "instructor": "KS. Vũ Thành Nam",
        "originalPrice": 680000,
        "salePrice": 359000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "stock": 22,
        "clicks": 560,
        "duration": "29 giờ học",
        "lessonsCount": 41,
        "description": "Áp dụng Class, Prototype, Kế thừa và Đóng gói để tổ chức mã nguồn JavaScript rõ ràng, dễ mở rộng."
    },
    {
        "id": "KH18",
        "title": "Lập Trình TypeScript Thực Chiến Cho Dự Án Lớn",
        "category": "JavaScript",
        "instructor": "ThS. Phạm Quốc Tuấn",
        "originalPrice": 850000,
        "salePrice": 439000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "stock": 26,
        "clicks": 990,
        "duration": "12 giờ học",
        "lessonsCount": 42,
        "description": "Kiểm soát kiểu dữ liệu chặt chẽ, Interface và Generics giúp hạn chế tối đa lỗi runtime khi chạy ứng dụng."
    },
    {
        "id": "KH19",
        "title": "Xây Dựng RESTful API Client Với Fetch & Axios",
        "category": "JavaScript",
        "instructor": "KS. Vũ Thành Nam",
        "originalPrice": 540000,
        "salePrice": 289000,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "stock": 19,
        "clicks": 510,
        "duration": "13 giờ học",
        "lessonsCount": 43,
        "description": "Giao tiếp dữ liệu JSON với máy chủ, xử lý mã lỗi HTTP, phân trang và tìm kiếm trực tiếp."
    },
    {
        "id": "KH20",
        "title": "Tối Ưu Hóa Bộ Nhớ & Hiệu Năng DOM Trong Vanilla JS",
        "category": "JavaScript",
        "instructor": "ThS. Trần Thị B",
        "originalPrice": 640000,
        "salePrice": 339000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "stock": 15,
        "clicks": 470,
        "duration": "14 giờ học",
        "lessonsCount": 44,
        "description": "Sử dụng Event Delegation, Debounce, Throttle và DocumentFragment để tăng tốc độ phản hồi giao diện."
    },
    {
        "id": "KH21",
        "title": "Thực Hành 15 Dự Án Mini Bằng JavaScript Thuần",
        "category": "JavaScript",
        "instructor": "KS. Vũ Thành Nam",
        "originalPrice": 720000,
        "salePrice": 379000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "stock": 33,
        "clicks": 1290,
        "duration": "15 giờ học",
        "lessonsCount": 45,
        "description": "Tự tay lập trình ứng dụng Todo List, Giỏ hàng, Máy tính, Đồng hồ bấm giờ, Trình phát video và Quiz."
    },
    {
        "id": "KH22",
        "title": "Thiết Kế Cơ Sở Dữ Liệu Quan Hệ Và Truy Vấn SQL",
        "category": "Database",
        "instructor": "ThS. Hoàng Văn E",
        "originalPrice": 650000,
        "salePrice": 349000,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": false,
        "stock": 30,
        "clicks": 860,
        "duration": "16 giờ học",
        "lessonsCount": 46,
        "description": "Phân tích, chuẩn hóa cơ sở dữ liệu 3NF và tối ưu hóa các câu lệnh truy vấn SELECT, JOIN, GROUP BY."
    },
    {
        "id": "KH23",
        "title": "Hệ Quản Trị Cơ Sở Dữ Liệu MySQL Từ Cơ Bản Đến Nâng Cao",
        "category": "Database",
        "instructor": "ThS. Hoàng Văn E",
        "originalPrice": 720000,
        "salePrice": 379000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": false,
        "stock": 24,
        "clicks": 940,
        "duration": "17 giờ học",
        "lessonsCount": 47,
        "description": "Thiết lập bảng, khóa ngoại, Index, View, Stored Procedure và Trigger cho website thương mại điện tử."
    },
    {
        "id": "KH24",
        "title": "Lập Trình T-SQL & Quản Trị Microsoft SQL Server",
        "category": "Database",
        "instructor": "TS. Nguyễn Hữu Phước",
        "originalPrice": 840000,
        "salePrice": 429000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "stock": 20,
        "clicks": 680,
        "duration": "18 giờ học",
        "lessonsCount": 48,
        "description": "Quản lý giao dịch (Transaction), phân quyền bảo mật, sao lưu phục hồi và tối ưu hóa truy vấn SQL Server."
    },
    {
        "id": "KH25",
        "title": "Cơ Sở Dữ Liệu NoSQL Với MongoDB Cho Ứng Dụng Web",
        "category": "Database",
        "instructor": "KS. Trần Minh Quân",
        "originalPrice": 690000,
        "salePrice": 359000,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "stock": 25,
        "clicks": 720,
        "duration": "19 giờ học",
        "lessonsCount": 49,
        "description": "Lưu trữ tài liệu dạng JSON/BSON, thiết kế Schema linh hoạt và thực hiện Aggregation Pipeline."
    },
    {
        "id": "KH26",
        "title": "Quản Trị PostgreSQL & Tối Ưu Hóa Chỉ Mục (Indexing)",
        "category": "Database",
        "instructor": "TS. Nguyễn Hữu Phước",
        "originalPrice": 880000,
        "salePrice": 459000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "stock": 18,
        "clicks": 540,
        "duration": "20 giờ học",
        "lessonsCount": 50,
        "description": "Khai thác sức mạnh của PostgreSQL cho các hệ thống dữ liệu lớn, phân tích Execution Plan."
    },
    {
        "id": "KH27",
        "title": "Thiết Kế Cấu Trúc JSON & Đồng Bộ LocalStorage Hiệu Quả",
        "category": "Database",
        "instructor": "ThS. Hoàng Văn E",
        "originalPrice": 420000,
        "salePrice": 229000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "stock": 40,
        "clicks": 830,
        "duration": "21 giờ học",
        "lessonsCount": 51,
        "description": "Mô hình hóa các bảng Khóa học, Người dùng, Giỏ hàng và Đơn hàng ngay trên trình duyệt bằng JSON."
    },
    {
        "id": "KH28",
        "title": "Phân Tích Dữ Liệu Kinh Doanh Với SQL Thực Chiến",
        "category": "Database",
        "instructor": "ThS. Hoàng Văn E",
        "originalPrice": 660000,
        "salePrice": 349000,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "stock": 22,
        "clicks": 490,
        "duration": "22 giờ học",
        "lessonsCount": 52,
        "description": "Viết truy vấn thống kê doanh thu theo tháng, sản phẩm bán chạy và tỷ lệ giữ chân khách hàng."
    },
    {
        "id": "KH29",
        "title": "Cơ Sở Dữ Liệu Đám Mây Firebase Realtime & Firestore",
        "category": "Database",
        "instructor": "KS. Trần Minh Quân",
        "originalPrice": 620000,
        "salePrice": 329000,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "stock": 27,
        "clicks": 610,
        "duration": "23 giờ học",
        "lessonsCount": 53,
        "description": "Tích hợp cơ sở dữ liệu đám mây thời gian thực và xác thực người dùng cho ứng dụng Front-end."
    },
    {
        "id": "KH30",
        "title": "Bảo Mật Cơ Sở Dữ Liệu & Phòng Chống SQL Injection",
        "category": "Database",
        "instructor": "TS. Nguyễn Hữu Phước",
        "originalPrice": 740000,
        "salePrice": 389000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "stock": 15,
        "clicks": 430,
        "duration": "24 giờ học",
        "lessonsCount": 24,
        "description": "Nhận diện lỗ hổng bảo mật trong truy vấn dữ liệu và áp dụng Prepared Statements an toàn."
    },
    {
        "id": "KH31",
        "title": "Tối Ưu Bộ Nhớ Đệm Với Redis Cho Hệ Thống Lớn",
        "category": "Database",
        "instructor": "KS. Trần Minh Quân",
        "originalPrice": 790000,
        "salePrice": 419000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "stock": 0,
        "clicks": 520,
        "duration": "25 giờ học",
        "lessonsCount": 25,
        "description": "Tăng tốc độ đọc dữ liệu gấp 10 lần bằng cơ chế Caching Key-Value trên bộ nhớ RAM."
    },
    {
        "id": "KH32",
        "title": "Quản Lý Mã Nguồn Chuyên Nghiệp Với Git & GitHub",
        "category": "Công cụ",
        "instructor": "ThS. Phạm Minh D",
        "originalPrice": 350000,
        "salePrice": 199000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": false,
        "stock": 50,
        "clicks": 1680,
        "duration": "26 giờ học",
        "lessonsCount": 26,
        "description": "Thành thạo quy trình quản lý phiên bản, phân nhánh (Branching), Pull Request và làm việc nhóm trên GitHub."
    },
    {
        "id": "KH33",
        "title": "Làm Chủ Visual Studio Code & Bộ Phím Tắt Tăng Tốc Code",
        "category": "Công cụ",
        "instructor": "ThS. Phạm Minh D",
        "originalPrice": 320000,
        "salePrice": 169000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": false,
        "stock": 45,
        "clicks": 1120,
        "duration": "27 giờ học",
        "lessonsCount": 27,
        "description": "Cấu hình Extensions, Prettier, ESLint, Live Server và kỹ thuật Debug JavaScript trực tiếp trên VS Code."
    },
    {
        "id": "KH34",
        "title": "Triển Khai Website Tĩnh Lên GitHub Pages, Vercel & Netlify",
        "category": "Công cụ",
        "instructor": "KS. Lâm Gia Bảo",
        "originalPrice": 380000,
        "salePrice": 199000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "stock": 40,
        "clicks": 1040,
        "duration": "28 giờ học",
        "lessonsCount": 28,
        "description": "Đưa đồ án website Front-end lên môi trường Internet miễn phí kèm tên miền tùy chỉnh và chứng chỉ HTTPS."
    },
    {
        "id": "KH35",
        "title": "Kiểm Thử Giao Diện & Gỡ Lỗi Với Chrome DevTools",
        "category": "Công cụ",
        "instructor": "ThS. Phạm Minh D",
        "originalPrice": 450000,
        "salePrice": 239000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "stock": 30,
        "clicks": 870,
        "duration": "29 giờ học",
        "lessonsCount": 29,
        "description": "Sử dụng tab Elements, Console, Network và Application để kiểm tra LocalStorage và sửa lỗi CSS/JS."
    },
    {
        "id": "KH36",
        "title": "Đóng Gói Ứng Dụng Web Với Docker Cơ Bản",
        "category": "Công cụ",
        "instructor": "KS. Lâm Gia Bảo",
        "originalPrice": 680000,
        "salePrice": 359000,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "stock": 20,
        "clicks": 590,
        "duration": "12 giờ học",
        "lessonsCount": 30,
        "description": "Viết Dockerfile và docker-compose để đóng gói môi trường chạy web đồng nhất trên mọi máy tính."
    },
    {
        "id": "KH37",
        "title": "Kiểm Thử API Tự Động Với Postman Cho Lập Trình Viên",
        "category": "Công cụ",
        "instructor": "KS. Lâm Gia Bảo",
        "originalPrice": 490000,
        "salePrice": 259000,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "stock": 25,
        "clicks": 630,
        "duration": "13 giờ học",
        "lessonsCount": 31,
        "description": "Xây dựng bộ Collection kiểm thử API, biến môi trường và viết kịch bản kiểm tra phản hồi JSON."
    },
    {
        "id": "KH38",
        "title": "Quản Lý Gói NPM & Công Cụ Đóng Gói Vite Hiện Đại",
        "category": "Công cụ",
        "instructor": "ThS. Phạm Quốc Tuấn",
        "originalPrice": 520000,
        "salePrice": 279000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "stock": 28,
        "clicks": 540,
        "duration": "14 giờ học",
        "lessonsCount": 32,
        "description": "Tối ưu hóa quy trình build, nén file CSS/JS và quản lý thư viện bên thứ ba trong dự án Front-end."
    },
    {
        "id": "KH39",
        "title": "Tự Động Hóa Quy Trình Kiểm Thử Với GitHub Actions",
        "category": "Công cụ",
        "instructor": "KS. Lâm Gia Bảo",
        "originalPrice": 640000,
        "salePrice": 339000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "stock": 18,
        "clicks": 460,
        "duration": "15 giờ học",
        "lessonsCount": 33,
        "description": "Thiết lập đường ống CI/CD tự động kiểm tra lỗi cú pháp HTML/CSS/JS mỗi khi đẩy code lên GitHub."
    },
    {
        "id": "KH40",
        "title": "Sử Dụng Linux Terminal & Bash Shell Cho Sinh Viên CNTT",
        "category": "Công cụ",
        "instructor": "ThS. Phạm Minh D",
        "originalPrice": 440000,
        "salePrice": 229000,
        "rating": 4.6,
        "image": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "stock": 30,
        "clicks": 510,
        "duration": "16 giờ học",
        "lessonsCount": 34,
        "description": "Thành thạo các câu lệnh dòng lệnh quản lý thư mục, phân quyền file và thao tác máy chủ từ xa."
    },
    {
        "id": "KH41",
        "title": "Kỹ Năng Viết Tài Liệu Kỹ Thuật & Báo Cáo Đồ Án Bằng Markdown/Word",
        "category": "Công cụ",
        "instructor": "ThS. Phạm Minh D",
        "originalPrice": 350000,
        "salePrice": 179000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "stock": 45,
        "clicks": 950,
        "duration": "17 giờ học",
        "lessonsCount": 35,
        "description": "Chuẩn hóa file README.md chuyên nghiệp và trình bày quyển báo cáo đồ án cơ sở ngành chuẩn ISO."
    },
    {
        "id": "KH42",
        "title": "Phân Tích Và Thiết Kế Hệ Thống Thông Tin Hiện Đại",
        "category": "Phân tích hệ thống",
        "instructor": "ThS. Nguyễn Văn A",
        "originalPrice": 700000,
        "salePrice": 390000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60",
        "isFeatured": true,
        "isBestSeller": true,
        "isNew": false,
        "stock": 32,
        "clicks": 1180,
        "duration": "18 giờ học",
        "lessonsCount": 36,
        "description": "Phương pháp khảo sát nghiệp vụ, xây dựng mô hình dữ liệu và thiết kế kiến trúc hệ thống phần mềm."
    },
    {
        "id": "KH43",
        "title": "Đặc Tả Yêu Cầu Phần Mềm (SRS) & Phân Tích Nghiệp Vụ BA",
        "category": "Phân tích hệ thống",
        "instructor": "ThS. Lê Thị Ngọc Hân",
        "originalPrice": 780000,
        "salePrice": 419000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "stock": 25,
        "clicks": 890,
        "duration": "19 giờ học",
        "lessonsCount": 37,
        "description": "Kỹ năng thu thập yêu cầu khách hàng, phân loại yêu cầu chức năng - phi chức năng và viết tài liệu SRS."
    },
    {
        "id": "KH44",
        "title": "Thiết Kế Sơ Đồ UML: Use Case, Activity & Sequence Diagram",
        "category": "Phân tích hệ thống",
        "instructor": "ThS. Lê Thị Ngọc Hân",
        "originalPrice": 640000,
        "salePrice": 339000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": false,
        "stock": 35,
        "clicks": 1020,
        "duration": "20 giờ học",
        "lessonsCount": 38,
        "description": "Thực hành vẽ các lược đồ UML chuẩn xác bằng Draw.io và StarUML cho chương 3 báo cáo đồ án."
    },
    {
        "id": "KH45",
        "title": "Quản Lý Dự Án Phần Mềm Theo Mô Hình Agile & Scrum",
        "category": "Phân tích hệ thống",
        "instructor": "TS. Đặng Quốc Huy",
        "originalPrice": 690000,
        "salePrice": 369000,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "stock": 24,
        "clicks": 610,
        "duration": "21 giờ học",
        "lessonsCount": 39,
        "description": "Tổ chức Product Backlog, lập kế hoạch Sprint hàng tuần và theo dõi tiến độ đồ án hiệu quả."
    },
    {
        "id": "KH46",
        "title": "Kiểm Thử Phần Mềm Toàn Diện: Viết Test Case & End-to-End Testing",
        "category": "Phân tích hệ thống",
        "instructor": "ThS. Lê Thị Ngọc Hân",
        "originalPrice": 620000,
        "salePrice": 329000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "stock": 30,
        "clicks": 840,
        "duration": "22 giờ học",
        "lessonsCount": 40,
        "description": "Thiết kế kịch bản kiểm thử hộp đen, kiểm thử luồng Giỏ hàng - Thanh toán - Quản trị và ghi nhận lỗi."
    },
    {
        "id": "KH47",
        "title": "Thiết Kế Kiến Trúc Front-end Phân Lớp (Layered Architecture)",
        "category": "Phân tích hệ thống",
        "instructor": "TS. Đặng Quốc Huy",
        "originalPrice": 820000,
        "salePrice": 439000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": true,
        "stock": 20,
        "clicks": 730,
        "duration": "23 giờ học",
        "lessonsCount": 41,
        "description": "Tách biệt tầng dữ liệu (data.js), tầng lưu trữ (storage.js) và tầng điều khiển giao diện giúp dễ bảo trì."
    },
    {
        "id": "KH48",
        "title": "Phân Tích Trải Nghiệm Người Dùng (UX Research) Cho Web Giáo Dục",
        "category": "Phân tích hệ thống",
        "instructor": "ThS. Lê Thị Ngọc Hân",
        "originalPrice": 580000,
        "salePrice": 299000,
        "rating": 4.7,
        "image": "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "stock": 22,
        "clicks": 480,
        "duration": "24 giờ học",
        "lessonsCount": 42,
        "description": "Xây dựng chân dung học viên (User Persona), bản đồ hành trình mua khóa học và tối ưu tỷ lệ hoàn thành."
    },
    {
        "id": "KH49",
        "title": "Đánh Giá Bảo Mật Ứng Dụng Web Theo Chuẩn OWASP Top 10",
        "category": "Phân tích hệ thống",
        "instructor": "TS. Đặng Quốc Huy",
        "originalPrice": 860000,
        "salePrice": 459000,
        "rating": 4.8,
        "image": "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": false,
        "isNew": false,
        "stock": 16,
        "clicks": 550,
        "duration": "25 giờ học",
        "lessonsCount": 43,
        "description": "Phòng chống tấn công XSS trên Front-end, kiểm soát dữ liệu đầu vào và bảo vệ thông tin phiên người dùng."
    },
    {
        "id": "KH50",
        "title": "Thiết Kế Hệ Thống Quản Trị (Admin Dashboard) & Báo Cáo Thống Kê",
        "category": "Phân tích hệ thống",
        "instructor": "ThS. Nguyễn Văn A",
        "originalPrice": 750000,
        "salePrice": 399000,
        "rating": 4.9,
        "image": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "stock": 28,
        "clicks": 910,
        "duration": "26 giờ học",
        "lessonsCount": 44,
        "description": "Xây dựng bảng điều khiển thống kê doanh thu, quản lý danh mục khóa học, tài khoản và lịch sử giao dịch."
    },
    {
        "id": "KH51",
        "title": "Phương Pháp Trình Bày & Phản Biện Bảo Vệ Đồ Án Ngành CNTT",
        "category": "Phân tích hệ thống",
        "instructor": "ThS. Phạm Minh D",
        "originalPrice": 400000,
        "salePrice": 199000,
        "rating": 5.0,
        "image": "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=60",
        "isFeatured": false,
        "isBestSeller": true,
        "isNew": true,
        "stock": 45,
        "clicks": 1360,
        "duration": "27 giờ học",
        "lessonsCount": 45,
        "description": "Tổng hợp các câu hỏi hội đồng thường hỏi về HTML5, CSS Variables, DOM, LocalStorage và cách trả lời điểm A."
    }
];

/**
 * 1. Khởi tạo dữ liệu khóa học vào LocalStorage nếu chưa có
 */
function initCoursesData() {
    var existingData = localStorage.getItem(STORAGE_COURSES_KEY);
    if (!existingData) {
        existingData = localStorage.getItem(LEGACY_COURSES_KEY);
    }

    var needInit = true;
    if (existingData) {
        var parsed = JSON.parse(existingData);
        if (parsed && parsed.length >= 50) {
            needInit = false;
            localStorage.setItem(STORAGE_COURSES_KEY, JSON.stringify(parsed));
            localStorage.setItem(LEGACY_COURSES_KEY, JSON.stringify(parsed));
        }
    }

    if (needInit) {
        var jsonString = JSON.stringify(INITIAL_COURSES);
        localStorage.setItem(STORAGE_COURSES_KEY, jsonString);
        localStorage.setItem(LEGACY_COURSES_KEY, jsonString);
    }
}

/**
 * 2. Lưu danh sách khóa học mới vào LocalStorage
 */
function saveAllCourses(coursesArray) {
    var jsonString = JSON.stringify(coursesArray);
    localStorage.setItem(STORAGE_COURSES_KEY, jsonString);
    localStorage.setItem(LEGACY_COURSES_KEY, jsonString);
}

/**
 * 3. Lấy toàn bộ danh sách khóa học từ LocalStorage
 */
function getAllCourses() {
    var data = localStorage.getItem(STORAGE_COURSES_KEY);
    if (!data) {
        data = localStorage.getItem(LEGACY_COURSES_KEY);
    }
    if (data) {
        return JSON.parse(data);
    }
    return INITIAL_COURSES;
}

/**
 * 4. Lấy các khóa học còn suất đăng ký (stock > 0) bằng vòng lặp for cơ bản
 */
function getAvailableCourses() {
    var allCourses = getAllCourses();
    var result = [];
    for (var i = 0; i < allCourses.length; i++) {
        var stockCount = allCourses[i].stock !== undefined ? Number(allCourses[i].stock) : 20;
        if (stockCount > 0) {
            result.push(allCourses[i]);
        }
    }
    return result;
}

/**
 * 5. Lấy danh sách khóa học nổi bật (isFeatured == true) hiển thị ở Trang chủ
 */
function getFeaturedCourses() {
    var available = getAvailableCourses();
    var result = [];
    for (var i = 0; i < available.length; i++) {
        if (available[i].isFeatured === true && result.length < 8) {
            result.push(available[i]);
        }
    }
    return result;
}

/**
 * 6. Lấy danh sách khóa học bán chạy (isBestSeller == true)
 */
function getBestSellerCourses() {
    var available = getAvailableCourses();
    var result = [];
    for (var i = 0; i < available.length; i++) {
        if (available[i].isBestSeller === true && result.length < 8) {
            result.push(available[i]);
        }
    }
    return result;
}

/**
 * 7. Lấy danh sách khóa học mới (isNew == true)
 */
function getNewCourses() {
    var available = getAvailableCourses();
    var result = [];
    for (var i = 0; i < available.length; i++) {
        if (available[i].isNew === true && result.length < 8) {
            result.push(available[i]);
        }
    }
    return result;
}

/**
 * 8. Thống kê số lượng khóa học và tổng lượt xem theo từng Danh mục (Danh mục Hot)
 */
function getCategoryStats() {
    var allCourses = getAllCourses();
    var categoryNames = ['Frontend', 'JavaScript', 'Database', 'Công cụ', 'Phân tích hệ thống'];
    var stats = [];

    for (var i = 0; i < categoryNames.length; i++) {
        var catName = categoryNames[i];
        var count = 0;
        var totalClicks = 0;

        for (var j = 0; j < allCourses.length; j++) {
            if (allCourses[j].category === catName) {
                count = count + 1;
                totalClicks = totalClicks + Number(allCourses[j].clicks || 0);
            }
        }

        stats.push({
            category: catName,
            count: count,
            totalClicks: totalClicks
        });
    }
    return stats;
}

/**
 * 9. Tìm kiếm khóa học theo mã ID bằng vòng lặp for
 */
function getCourseById(courseId) {
    var courses = getAllCourses();
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].id === courseId) {
            return courses[i];
        }
    }
    return null;
}

/**
 * 10. Tăng lượt xem (click) khi học viên mở trang Chi tiết khóa học
 */
function incrementCourseClick(courseId) {
    var courses = getAllCourses();
    for (var i = 0; i < courses.length; i++) {
        if (courses[i].id === courseId) {
            courses[i].clicks = Number(courses[i].clicks || 0) + 1;
            saveAllCourses(courses);
            return courses[i];
        }
    }
    return null;
}

/**
 * 11. Định dạng số tiền sang chuẩn VNĐ (VD: 399000 -> "399.000đ")
 */
function formatCurrencyVND(amount) {
    var num = Number(amount || 0);
    return num.toLocaleString('vi-VN') + 'đ';
}

// Tự động khởi tạo dữ liệu khi tải file data.js
initCoursesData();
