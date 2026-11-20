/**
 * FILE: src/js/login.js
 * NHIEM VU: Xu ly dang nhap co kiem tra Captcha, ho tro Ghi nho phien dang nhap,
 * tu dong loc khoa hoc da so huu khoi gio hang khi dang nhap va quen mat khau mo phong.
 */

var maXacThucDangNhapHienTai = '';

document.addEventListener('DOMContentLoaded', function() {
    var phienHienTai = layNguoiDungHienTai();
    if (phienHienTai && phienHienTai.email) {
        window.location.replace('index.html');
        return;
    }
    damBaoTaiKhoanQuanTri();
    taoMaXacThucDangNhap();
    ganSuKienBieuMauDangNhap();
    ganSuKienAnHienMatKhau();
    ganSuKienQuenMatKhau();
});

function taoMaXacThucDangNhap() {
    maXacThucDangNhapHienTai = taoMaCaptcha(5);
    var phanTuHienThi = document.getElementById('hien-thi-ma-xac-thuc-dang-nhap');
    if (phanTuHienThi) {
        phanTuHienThi.textContent = maXacThucDangNhapHienTai;
    }
}

function ganSuKienBieuMauDangNhap() {
    var bieuMauDangNhap = document.getElementById('bieu-mau-dang-nhap');
    var nutDoiMa = document.getElementById('nut-doi-ma-xac-thuc-dang-nhap');
    var oNhapMaXacThuc = document.getElementById('o-nhap-ma-xac-thuc-dang-nhap');

    if (nutDoiMa) {
        nutDoiMa.addEventListener('click', function() {
            taoMaXacThucDangNhap();
            if (oNhapMaXacThuc) {
                oNhapMaXacThuc.value = '';
                oNhapMaXacThuc.focus();
            }
        });
    }

    if (!bieuMauDangNhap) {
        return;
    }

    bieuMauDangNhap.addEventListener('submit', function(e) {
        e.preventDefault();

        var email = document.getElementById('email-dang-nhap').value.trim();
        var matKhau = document.getElementById('mat-khau-dang-nhap').value;
        var maDaNhap = oNhapMaXacThuc ? oNhapMaXacThuc.value.trim().toUpperCase() : '';
        var oGhiNho = document.getElementById('ghi-nho-dang-nhap');
        var ghiNhoPhien = oGhiNho ? Boolean(oGhiNho.checked) : true;

        if (maDaNhap !== maXacThucDangNhapHienTai) {
            hienThiThongBao('Mã xác thực Captcha không chính xác! Vui lòng nhập lại.', 'danger');
            taoMaXacThucDangNhap();
            if (oNhapMaXacThuc) {
                oNhapMaXacThuc.value = '';
                oNhapMaXacThuc.focus();
            }
            return;
        }

        damBaoTaiKhoanQuanTri();
        var ketQuaDoc = docDuLieuJSONCoTrangThai('EDU_USERS', true);
        if (ketQuaDoc.tonTai && !ketQuaDoc.hopLe) {
            hienThiThongBao('Dữ liệu tài khoản trong LocalStorage đang bị lỗi định dạng JSON.', 'danger');
            return;
        }

        var danhSachNguoiDung = ketQuaDoc.duLieu;
        var nguoiDungKhop = null;
        for (var i = 0; i < danhSachNguoiDung.length; i++) {
            if (danhSachNguoiDung[i].email && danhSachNguoiDung[i].email.toLowerCase() === email.toLowerCase() && danhSachNguoiDung[i].password === matKhau) {
                nguoiDungKhop = danhSachNguoiDung[i];
                break;
            }
        }

        if (nguoiDungKhop) {
            if (nguoiDungKhop.status === 'locked') {
                hienThiThongBao('Tài khoản này đang bị tạm khóa bởi Quản trị viên. Không thể đăng nhập.', 'danger');
                taoMaXacThucDangNhap();
                return;
            }
            var laVaiTroQuanTri = (nguoiDungKhop.email === EMAIL_QUAN_TRI_MAC_DINH && nguoiDungKhop.role === 'admin');
            var nguoiDungHienTai = {
                id: nguoiDungKhop.id,
                fullName: nguoiDungKhop.fullName,
                email: nguoiDungKhop.email,
                phone: nguoiDungKhop.phone || '0372765126',
                address: nguoiDungKhop.address || 'Trà Vinh, Việt Nam',
                role: laVaiTroQuanTri ? 'admin' : 'student'
            };

            if (!luuNguoiDungHienTai(nguoiDungHienTai, ghiNhoPhien)) {
                hienThiThongBao('Không thể lưu phiên đăng nhập vào trình duyệt (bộ nhớ đầy hoặc bị chặn).', 'danger');
                return;
            }

            // Loc bo ngay cac khoa hoc da so huu khoi gio hang EDU_CART_ITEMS
            var soKhoaDaLoc = locBoKhoaHocDaSoHuuKhoiGio();
            var chuThichLoc = soKhoaDaLoc > 0 ? (' (Đã tự động bỏ ' + soKhoaDaLoc + ' khóa học bạn đã sở hữu khỏi giỏ hàng).') : '';

            if (laVaiTroQuanTri) {
                luuThongBaoChoChuyenTrang('Đăng nhập quyền Quản trị viên (Admin) thành công!' + chuThichLoc, 'success');
                window.location.href = 'admin.html';
            } else {
                luuThongBaoChoChuyenTrang('Đăng nhập thành công! Chào mừng ' + nguoiDungKhop.fullName + ' quay lại.' + chuThichLoc, 'success');
                window.location.href = 'index.html';
            }
        } else {
            hienThiThongBao('Email hoặc mật khẩu không chính xác! Vui lòng kiểm tra lại.', 'danger');
            taoMaXacThucDangNhap();
            if (oNhapMaXacThuc) {
                oNhapMaXacThuc.value = '';
            }
            document.getElementById('mat-khau-dang-nhap').value = '';
            document.getElementById('mat-khau-dang-nhap').focus();
        }
    });
}

var maCaptchaQuenMatKhau = '';

function taoMaCaptchaQuenMatKhau() {
    maCaptchaQuenMatKhau = taoMaCaptcha(5);
    var khung = document.getElementById('hien-thi-captcha-quen-mat-khau');
    if (khung) khung.textContent = maCaptchaQuenMatKhau;
}

function ganSuKienQuenMatKhau() {
    var nutMo = document.getElementById('nut-mo-quen-mat-khau');
    var hopThoai = document.getElementById('hop-thoai-quen-mat-khau');
    var bieuMau = document.getElementById('bieu-mau-quen-mat-khau');
    var nutDoi = document.getElementById('nut-doi-captcha-quen-mat-khau');

    if (nutDoi) {
        nutDoi.addEventListener('click', taoMaCaptchaQuenMatKhau);
    }

    if (nutMo && hopThoai) {
        nutMo.addEventListener('click', function() {
            taoMaCaptchaQuenMatKhau();
            if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
                bootstrap.Modal.getOrCreateInstance(hopThoai).show();
            }
        });
    }

    if (!bieuMau) {
        return;
    }

    bieuMau.addEventListener('submit', function(e) {
        e.preventDefault();
        var email = document.getElementById('email-quen-mat-khau').value.trim().toLowerCase();
        var matKhauMoi = document.getElementById('mat-khau-moi-khoi-phuc').value;
        var maNhap = document.getElementById('o-nhap-captcha-quen-mat-khau').value.trim().toUpperCase();

        if (maNhap !== maCaptchaQuenMatKhau) {
            hienThiThongBao('Mã xác thực Captcha không khớp!', 'danger');
            taoMaCaptchaQuenMatKhau();
            return;
        }
        if (matKhauMoi.length < 6) {
            hienThiThongBao('Mật khẩu mới phải có tối thiểu 6 ký tự.', 'warning');
            return;
        }

        damBaoTaiKhoanQuanTri();
        var ketQuaDoc = docDuLieuJSONCoTrangThai('EDU_USERS', true);
        if (ketQuaDoc.tonTai && !ketQuaDoc.hopLe) {
            hienThiThongBao('Dữ liệu EDU_USERS đang bị lỗi định dạng JSON.', 'danger');
            return;
        }

        var danhSach = ketQuaDoc.duLieu.slice();
        var daTimThay = false;
        for (var i = 0; i < danhSach.length; i++) {
            if (danhSach[i].email && danhSach[i].email.toLowerCase() === email) {
                danhSach[i].password = matKhauMoi;
                daTimThay = true;
                break;
            }
        }

        if (!daTimThay) {
            hienThiThongBao('Không tìm thấy tài khoản với email này!', 'danger');
            taoMaCaptchaQuenMatKhau();
            return;
        }

        if (!luuDuLieuJSON('EDU_USERS', danhSach)) {
            hienThiThongBao('Không thể lưu mật khẩu mới vào LocalStorage.', 'danger');
            return;
        }
        bieuMau.reset();
        if (hopThoai && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            bootstrap.Modal.getOrCreateInstance(hopThoai).hide();
        }
        hienThiThongBao('Đặt lại mật khẩu thành công (mô phỏng cục bộ trên trình duyệt)! Bạn có thể đăng nhập ngay.', 'success');
    });
}
