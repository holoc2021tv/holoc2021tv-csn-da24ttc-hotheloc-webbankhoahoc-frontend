/**
 * FILE: src/js/profile.js
 * NHIEM VU: Doc va cap nhat thong tin Ho so ca nhan an toan tu LocalStorage/SessionStorage
 * (kiem tra trang thai luu va hoan tac neu ghi phien that bai).
 */

document.addEventListener('DOMContentLoaded', function() {
    capNhatHuyHieuGioHang();
    var nguoiDungHienTai = layNguoiDungDangDangNhap();
    if (!nguoiDungHienTai) {
        luuThongBaoChoChuyenTrang('Vui lòng đăng nhập để xem và cập nhật Hồ sơ cá nhân!', 'warning');
        window.location.href = 'login.html';
        return;
    }
    taiHoSoNguoiDung();
    ganSuKienCapNhatHoSo();
    hienThiKhoaHocYeuThichHoSo();
});

function layNguoiDungDangDangNhap() {
    return layNguoiDungHienTai();
}

function taiHoSoNguoiDung() {
    var nguoiDungHienTai = layNguoiDungDangDangNhap();
    if (!nguoiDungHienTai) {
        return;
    }

    var danhSachNguoiDung = docDuLieuJSON('EDU_USERS', []);
    var thongTinKhop = nguoiDungHienTai;

    for (var i = 0; i < danhSachNguoiDung.length; i++) {
        if (danhSachNguoiDung[i].email === nguoiDungHienTai.email || danhSachNguoiDung[i].id === nguoiDungHienTai.id) {
            thongTinKhop = danhSachNguoiDung[i];
            break;
        }
    }

    var chuoiHoTen = thongTinKhop.fullName || 'Học Viên';
    var mangTu = chuoiHoTen.trim().split(' ');
    var chuCaiDau = 'HV';
    if (mangTu.length > 1) {
        chuCaiDau = (mangTu[0].charAt(0) + mangTu[mangTu.length - 1].charAt(0)).toUpperCase();
    } else if (mangTu[0].length > 0) {
        chuCaiDau = mangTu[0].substring(0, 2).toUpperCase();
    }

    document.getElementById('chu-anh-dai-dien-ho-so').textContent = chuCaiDau;
    document.getElementById('ten-hien-thi-ho-so').textContent = thongTinKhop.fullName || '';
    document.getElementById('email-hien-thi-ho-so').textContent = thongTinKhop.email || '';
    document.getElementById('nhan-vai-tro-ho-so').textContent =
        (thongTinKhop.role === 'admin' && thongTinKhop.email === EMAIL_QUAN_TRI_MAC_DINH) ? 'Quản trị viên (Admin)' : 'Học viên chính thức';

    document.getElementById('ho-ten-ho-so').value = thongTinKhop.fullName || '';
    document.getElementById('email-ho-so').value = thongTinKhop.email || '';
    document.getElementById('so-dien-thoai-ho-so').value = thongTinKhop.phone || '';
    document.getElementById('dia-chi-ho-so').value = thongTinKhop.address || '';

    var tatCaDonHang = layTatCaDonHang();
    var soDonCuaToi = 0;
    var tongSoKhoaHoc = 0;

    for (var j = 0; j < tatCaDonHang.length; j++) {
        var don = tatCaDonHang[j];
        if (!kiemTraTrangThaiDonHopLe(don)) {
            continue;
        }
        if (don.customerEmail && thongTinKhop.email && don.customerEmail.toLowerCase() === thongTinKhop.email.toLowerCase()) {
            soDonCuaToi = soDonCuaToi + 1;
            if (don.items) {
                tongSoKhoaHoc = tongSoKhoaHoc + don.items.length;
            }
        }
    }

    var soYeuThich = layDanhSachMaYeuThich().length;

    document.getElementById('thong-ke-don-hang-ho-so').textContent = String(soDonCuaToi);
    document.getElementById('thong-ke-khoa-hoc-ho-so').textContent = String(tongSoKhoaHoc);
    document.getElementById('thong-ke-yeu-thich-ho-so').textContent = String(soYeuThich);
}

function ganSuKienCapNhatHoSo() {
    var bieuMauHoSo = document.getElementById('bieu-mau-cap-nhat-ho-so');
    var oSoDienThoai = document.getElementById('so-dien-thoai-ho-so');

    if (!bieuMauHoSo) {
        return;
    }

    ganChiChoNhapSo(oSoDienThoai);

    bieuMauHoSo.addEventListener('submit', function(e) {
        e.preventDefault();

        var hoTen = document.getElementById('ho-ten-ho-so').value.trim();
        var email = document.getElementById('email-ho-so').value.trim();
        var soDienThoai = oSoDienThoai.value.trim();
        var diaChi = document.getElementById('dia-chi-ho-so').value.trim();
        var matKhauMoi = document.getElementById('mat-khau-moi-ho-so').value;
        var xacNhanMatKhau = document.getElementById('xac-nhan-mat-khau-moi-ho-so').value;

        if (hoTen === '') {
            hienThiThongBao('Họ và tên không được để trống!', 'danger');
            document.getElementById('ho-ten-ho-so').focus();
            return;
        }

        if (soDienThoai.length !== 10) {
            hienThiThongBao('Số điện thoại không hợp lệ! Vui lòng nhập chính xác 10 chữ số.', 'danger');
            oSoDienThoai.focus();
            return;
        }

        if (matKhauMoi !== '') {
            if (matKhauMoi.length < 6) {
                hienThiThongBao('Mật khẩu mới phải có tối thiểu 6 ký tự!', 'danger');
                return;
            }
            if (matKhauMoi !== xacNhanMatKhau) {
                hienThiThongBao('Xác nhận mật khẩu mới không khớp!', 'danger');
                return;
            }
        }

        var ketQuaDoc = docDuLieuJSONCoTrangThai('EDU_USERS', true);
        if (ketQuaDoc.tonTai && !ketQuaDoc.hopLe) {
            hienThiThongBao('Dữ liệu tài khoản trong LocalStorage đang bị lỗi JSON, chưa thể cập nhật.', 'danger');
            return;
        }

        var banSaoUsersGoc = JSON.parse(JSON.stringify(ketQuaDoc.duLieu));
        var danhSachNguoiDung = JSON.parse(JSON.stringify(ketQuaDoc.duLieu));
        var maNguoiDung = 'USR_ACTIVE';
        var vaiTro = 'student';

        for (var i = 0; i < danhSachNguoiDung.length; i++) {
            if (danhSachNguoiDung[i].email && danhSachNguoiDung[i].email.toLowerCase() === email.toLowerCase()) {
                danhSachNguoiDung[i].fullName = hoTen;
                danhSachNguoiDung[i].phone = soDienThoai;
                danhSachNguoiDung[i].address = diaChi;
                if (matKhauMoi !== '') {
                    danhSachNguoiDung[i].password = matKhauMoi;
                }
                maNguoiDung = danhSachNguoiDung[i].id;
                vaiTro = danhSachNguoiDung[i].role || 'student';
                break;
            }
        }

        if (!luuDuLieuJSON('EDU_USERS', danhSachNguoiDung)) {
            hienThiThongBao('Không thể lưu thay đổi hồ sơ vào LocalStorage (bộ nhớ đầy hoặc bị chặn).', 'danger');
            return;
        }

        var phienCapNhat = {
            id: maNguoiDung,
            fullName: hoTen,
            email: email,
            phone: soDienThoai,
            address: diaChi,
            role: vaiTro
        };

        var dangDungLocal = docDuLieuJSONCoTrangThai(KHOA_LUU_PHIEN_DANG_NHAP, false).tonTai;
        if (!luuNguoiDungHienTai(phienCapNhat, dangDungLocal)) {
            // Hoan tac EDU_USERS neu khong cap nhat duoc phien
            luuDuLieuJSON('EDU_USERS', banSaoUsersGoc);
            hienThiThongBao('Không thể đồng bộ phiên đăng nhập. Hệ thống đã giữ nguyên dữ liệu cũ.', 'danger');
            return;
        }

        document.getElementById('mat-khau-moi-ho-so').value = '';
        document.getElementById('xac-nhan-mat-khau-moi-ho-so').value = '';

        hienThiThongBao('Cập nhật thông tin hồ sơ cá nhân thành công!', 'success');
        taiHoSoNguoiDung();
        capNhatThanhMenu();
    });
}

function hienThiKhoaHocYeuThichHoSo() {
    var khungChua = document.getElementById('danh-sach-yeu-thich-ho-so');
    if (!khungChua) {
        return;
    }

    var danhSachYeuThich = layDanhSachKhoaHocYeuThich();
    if (danhSachYeuThich.length === 0) {
        khungChua.className = '';
        var maHTMLRong = '';
        maHTMLRong += '<div class="alert alert-light border text-muted mb-0">';
        maHTMLRong += '  Bạn chưa lưu khóa học yêu thích nào. <a href="courses.html" class="fw-semibold text-decoration-none">Khám phá khóa học ngay</a>';
        maHTMLRong += '</div>';
        khungChua.innerHTML = maHTMLRong;
        return;
    }

    khungChua.className = 'luoi-khoa-hoc-nho';
    var maHTML = '';
    for (var i = 0; i < danhSachYeuThich.length; i++) {
        var khoaHoc = danhSachYeuThich[i];
        var anhAnToan = kiemTraDuongDanAnToan(khoaHoc.image, '');
        var maUrl = encodeURIComponent(khoaHoc.id || '');

        maHTML += '<article class="card border shadow-sm h-100 p-3">';
        maHTML += '  <div class="d-flex align-items-center gap-3">';
        maHTML += '    <img src="' + maHoaHTML(anhAnToan) + '" alt="' + maHoaHTML(khoaHoc.title) + '" class="rounded anh-san-pham-gio-hang">';
        maHTML += '    <div class="overflow-hidden flex-grow-1">';
        maHTML += '      <a href="course-detail.html?id=' + maUrl + '" class="fw-bold text-dark text-decoration-none d-block text-truncate">' + maHoaHTML(khoaHoc.title) + '</a>';
        maHTML += '      <div class="text-muted small">GV: ' + maHoaHTML(khoaHoc.instructor) + '</div>';
        maHTML += '      <div class="text-danger fw-bold">' + maHoaHTML(dinhDangTienVND(khoaHoc.salePrice)) + '</div>';
        maHTML += '    </div>';
        maHTML += '  </div>';
        maHTML += '</article>';
    }
    khungChua.innerHTML = maHTML;
}
