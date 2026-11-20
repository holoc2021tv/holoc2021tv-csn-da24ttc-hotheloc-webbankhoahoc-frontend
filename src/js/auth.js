/**
 * FILE: src/js/auth.js
 * NHIEM VU: Khoi tao tai khoan Admin thu nghiem (khong ghi de mat khau da doi),
 * kiem tra dieu huong phia client cho admin.html, cap nhat Navbar, hien thi Toast an toan
 * va dong bo thay doi LocalStorage giua nhieu tab trinh duyet.
 */

// Tai khoan quan tri thu nghiem cho pham vi do an frontend (khong dung cho moi truong thuc te)
var EMAIL_QUAN_TRI_MAC_DINH = 'admin@gmail.com';
var MAT_KHAU_QUAN_TRI_MAC_DINH = '123123123';

// Kiem tra quyen dieu huong vao trang Admin ngay khi tai trang
kiemTraQuyenTruyCapQuanTriNgay();

document.addEventListener('DOMContentLoaded', function() {
    damBaoTaiKhoanQuanTri();
    capNhatThanhMenu();
    kiemTraVaHienThiThongBaoCho();
    ganSuKienDongBoNhieuTab();
});

/**
 * 1. Chan dieu huong truc tiep qua URL vao admin.html neu chua dang nhap tai khoan Admin
 * (Luu y: day la kiem soat phia client cho do an frontend, khong phai bao mat server)
 */
function kiemTraQuyenTruyCapQuanTriNgay() {
    var duongDanHienTai = window.location.pathname.toLowerCase();
    if (duongDanHienTai.indexOf('admin.html') > -1) {
        var nguoiDungHienTai = layNguoiDungHienTai();

        if (!nguoiDungHienTai || nguoiDungHienTai.role !== 'admin' || nguoiDungHienTai.email !== EMAIL_QUAN_TRI_MAC_DINH) {
            luuThongBaoChoChuyenTrang('Từ chối truy cập! Chỉ tài khoản Admin mới được phép vào Trang quản trị.', 'danger');
            window.location.replace('login.html');
        }
    }
}

/**
 * 2. Khoi tao tai khoan Admin thu nghiem neu chua ton tai (KHONG ghi de mat khau Admin hien co)
 */
function damBaoTaiKhoanQuanTri() {
    var ketQuaDoc = docDuLieuJSONCoTrangThai('EDU_USERS', true);
    if (ketQuaDoc.tonTai && !ketQuaDoc.hopLe) {
        console.error('EDU_USERS dang bi loi JSON. He thong khong tu dong xoa hay ghi de du lieu tai khoan.');
        return false;
    }

    var danhSachNguoiDung = ketQuaDoc.duLieu;
    var daCoTaiKhoanQuanTri = false;
    var canLuuLai = false;

    for (var i = 0; i < danhSachNguoiDung.length; i++) {
        var taiKhoan = danhSachNguoiDung[i];
        if (!taiKhoan || typeof taiKhoan !== 'object') {
            continue;
        }
        if (taiKhoan.email === EMAIL_QUAN_TRI_MAC_DINH) {
            daCoTaiKhoanQuanTri = true;
            if (taiKhoan.role !== 'admin') {
                taiKhoan.role = 'admin';
                canLuuLai = true;
            }
        }
    }

    if (!daCoTaiKhoanQuanTri) {
        danhSachNguoiDung.unshift({
            id: 'USR_ADMIN_MAIN',
            fullName: 'Quản Trị Viên (Admin)',
            email: EMAIL_QUAN_TRI_MAC_DINH,
            phone: '0372765126',
            address: 'Trà Vinh, Việt Nam',
            password: MAT_KHAU_QUAN_TRI_MAC_DINH,
            role: 'admin',
            createdAt: '01/10/2026'
        });
        canLuuLai = true;
    }

    if (canLuuLai) {
        return luuDuLieuJSON('EDU_USERS', danhSachNguoiDung);
    }
    return true;
}

/**
 * 3. Kiem tra nguoi dung hien tai co phai Admin hop le hay khong
 */
function kiemTraLaQuanTriVien() {
    var nguoiDungHienTai = layNguoiDungHienTai();
    if (!nguoiDungHienTai) {
        return false;
    }
    return (nguoiDungHienTai.role === 'admin' && nguoiDungHienTai.email === EMAIL_QUAN_TRI_MAC_DINH);
}

/**
 * 4. Cap nhat thanh dieu huong (Navbar): An nut Admin voi tai khoan thuong va chong XSS ten nguoi dung
 */
function capNhatThanhMenu() {
    var nguoiDungHienTai = layNguoiDungHienTai();
    if (!nguoiDungHienTai) {
        return;
    }

    var cacLienKetDangNhap = document.querySelectorAll('a[href="login.html"], a[href="register.html"]');

    if (cacLienKetDangNhap.length > 0) {
        var phanTuCha = cacLienKetDangNhap[0].parentElement;
        var nutGioHang = phanTuCha.querySelector('a[href="cart.html"]');
        var maHTMLGioHang = nutGioHang ? nutGioHang.outerHTML : '';

        var laQuanTri = (nguoiDungHienTai.role === 'admin' && nguoiDungHienTai.email === EMAIL_QUAN_TRI_MAC_DINH);
        var tenHienThiAnToan = maHoaHTML(nguoiDungHienTai.fullName || 'Học viên');

        var maHTMLMenu = '';
        maHTMLMenu += '<div class="dropdown">';
        maHTMLMenu += '  <button class="btn btn-outline-primary dropdown-toggle fw-bold d-flex align-items-center" type="button" data-bs-toggle="dropdown">';
        maHTMLMenu += '    <i class="bi bi-person-circle fs-5 me-2"></i>';
        maHTMLMenu += '    <div class="d-inline-block">' + tenHienThiAnToan + '</div>';
        maHTMLMenu += '  </button>';
        maHTMLMenu += '  <ul class="dropdown-menu dropdown-menu-end shadow-sm border-0 mt-2">';
        maHTMLMenu += '    <li><a class="dropdown-item py-2" href="profile.html"><i class="bi bi-person-vcard me-2 text-primary"></i>Hồ sơ cá nhân</a></li>';
        maHTMLMenu += '    <li><a class="dropdown-item py-2" href="my-courses.html"><i class="bi bi-journal-check me-2 text-success"></i>Khóa học của tôi</a></li>';

        if (laQuanTri) {
            maHTMLMenu += '    <li><a class="dropdown-item py-2 fw-semibold" href="admin.html"><i class="bi bi-speedometer2 me-2 text-warning"></i>Trang quản trị (Admin)</a></li>';
        }

        maHTMLMenu += '    <li><hr class="dropdown-divider"></li>';
        maHTMLMenu += '    <li><a class="dropdown-item text-danger py-2 fw-semibold" href="#" id="nut-dang-xuat"><i class="bi bi-box-arrow-right me-2"></i>Đăng xuất</a></li>';
        maHTMLMenu += '  </ul>';
        maHTMLMenu += '</div>';

        phanTuCha.innerHTML = maHTMLGioHang + maHTMLMenu;

        var nutDangXuat = document.getElementById('nut-dang-xuat');
        if (nutDangXuat) {
            nutDangXuat.addEventListener('click', function(e) {
                e.preventDefault();
                var xacNhan = confirm('Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?');
                if (xacNhan) {
                    xoaNguoiDungHienTai();
                    luuThongBaoChoChuyenTrang('Đã đăng xuất tài khoản thành công!', 'info');
                    window.location.href = 'index.html';
                }
            });
        }
    }
}

/**
 * 5. He thong thong bao Toast truc quan (su dung textContent de chong XSS)
 */
function hienThiThongBao(noiDungThongBao, loaiThongBao) {
    var kieuThongBao = loaiThongBao || 'success';
    var khungChua = document.getElementById('khung-thong-bao-noi');

    if (!khungChua) {
        khungChua = document.createElement('div');
        khungChua.id = 'khung-thong-bao-noi';
        khungChua.className = 'khung-thong-bao-noi';
        document.body.appendChild(khungChua);
    }

    var lopBieuTuong = 'bi-check-circle-fill text-success';
    var tieuDe = 'Thành công';
    var lopHop = 'thong-bao-thanh-cong';

    if (kieuThongBao === 'danger') {
        lopBieuTuong = 'bi-exclamation-octagon-fill text-danger';
        tieuDe = 'Thông báo lỗi';
        lopHop = 'thong-bao-loi';
    } else if (kieuThongBao === 'warning') {
        lopBieuTuong = 'bi-exclamation-triangle-fill text-warning';
        tieuDe = 'Chú ý';
        lopHop = 'thong-bao-canh-bao';
    } else if (kieuThongBao === 'info') {
        lopBieuTuong = 'bi-info-circle-fill text-info';
        tieuDe = 'Thông tin';
        lopHop = 'thong-bao-thong-tin';
    }

    var phanTuThongBao = document.createElement('div');
    phanTuThongBao.className = 'muc-thong-bao-noi ' + lopHop;

    var maHTMLKhung = '';
    maHTMLKhung += '<div class="d-flex justify-content-between align-items-start">';
    maHTMLKhung += '  <div class="d-flex align-items-start">';
    maHTMLKhung += '    <i class="bi ' + lopBieuTuong + ' fs-5 me-2"></i>';
    maHTMLKhung += '    <div>';
    maHTMLKhung += '      <div class="fw-bold text-dark small tieu-de-thong-bao-noi"></div>';
    maHTMLKhung += '      <div class="text-secondary small mt-1 noi-dung-thong-bao-noi"></div>';
    maHTMLKhung += '    </div>';
    maHTMLKhung += '  </div>';
    maHTMLKhung += '  <button type="button" class="btn-close ms-2" aria-label="Đóng"></button>';
    maHTMLKhung += '</div>';

    phanTuThongBao.innerHTML = maHTMLKhung;
    phanTuThongBao.querySelector('.tieu-de-thong-bao-noi').textContent = tieuDe;
    phanTuThongBao.querySelector('.noi-dung-thong-bao-noi').textContent = String(noiDungThongBao == null ? '' : noiDungThongBao);
    khungChua.appendChild(phanTuThongBao);

    var nutDong = phanTuThongBao.querySelector('.btn-close');
    if (nutDong) {
        nutDong.addEventListener('click', function() {
            if (phanTuThongBao.parentNode) {
                phanTuThongBao.parentNode.removeChild(phanTuThongBao);
            }
        });
    }

    setTimeout(function() {
        if (phanTuThongBao.parentNode) {
            phanTuThongBao.parentNode.removeChild(phanTuThongBao);
        }
    }, 3800);
}

function luuThongBaoChoChuyenTrang(noiDungThongBao, loaiThongBao) {
    var duLieuThongBao = {
        message: noiDungThongBao,
        type: loaiThongBao || 'success'
    };
    luuPhienJSON('EDU_PENDING_TOAST', duLieuThongBao);
}

function kiemTraVaHienThiThongBaoCho() {
    var thongBao = docPhienJSON('EDU_PENDING_TOAST', null);
    if (thongBao) {
        xoaPhienKho('EDU_PENDING_TOAST');
        if (thongBao.message) {
            hienThiThongBao(thongBao.message, thongBao.type);
        }
    }
}

function ganSuKienAnHienMatKhau() {
    document.addEventListener('click', function(e) {
        var nut = e.target.closest('.nut-an-hien-mat-khau');
        if (!nut) {
            return;
        }
        var idMucTieu = nut.getAttribute('data-target');
        var oNhap = idMucTieu ? document.getElementById(idMucTieu) : null;
        if (!oNhap) {
            return;
        }
        var icon = nut.querySelector('i');
        if (oNhap.type === 'password') {
            oNhap.type = 'text';
            if (icon) icon.className = 'bi bi-eye-slash';
        } else {
            oNhap.type = 'password';
            if (icon) icon.className = 'bi bi-eye';
        }
    });
}

/**
 * 6. Dong bo thay doi LocalStorage giua nhieu tab trinh duyet (window storage event)
 */
function ganSuKienDongBoNhieuTab() {
    window.addEventListener('storage', function(e) {
        if (!e || !e.key) {
            return;
        }
        if (e.key === KHOA_LUU_GIO_HANG) {
            capNhatHuyHieuGioHang();
            if (typeof hienThiBangGioHang === 'function') hienThiBangGioHang();
            if (typeof hienThiTomTatDonHang === 'function') hienThiTomTatDonHang();
        } else if (e.key === KHOA_LUU_PHIEN_DANG_NHAP) {
            kiemTraQuyenTruyCapQuanTriNgay();
            window.location.reload();
        } else if (e.key === KHOA_LUU_DON_HANG || e.key === KHOA_LUU_TIEN_DO_HOC) {
            if (typeof hienThiKhoaHocVaDonHangCuaToi === 'function') hienThiKhoaHocVaDonHangCuaToi();
            if (typeof lamMoiBangDieuKhienQuanTri === 'function') lamMoiBangDieuKhienQuanTri();
        } else if (e.key === 'EDU_COURSES' || e.key === KHOA_LUU_DANH_GIA) {
            if (typeof hienThiTomTatDonHang === 'function') hienThiTomTatDonHang();
            if (typeof lamMoiBangDieuKhienQuanTri === 'function') lamMoiBangDieuKhienQuanTri();
        }
    });
}
