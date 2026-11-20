/**
 * FILE: src/js/register.js
 * NHIEM VU: Xu ly form dang ky tai khoan hoc vien, kiem tra Captcha, sinh ma duy nhat va luu an toan vao EDU_USERS.
 */

var maXacThucDangKyHienTai = '';

document.addEventListener('DOMContentLoaded', function() {
    var phienHienTai = layNguoiDungHienTai();
    if (phienHienTai && phienHienTai.email) {
        window.location.replace('index.html');
        return;
    }
    damBaoTaiKhoanQuanTri();
    taoMaXacThucDangKy();
    ganSuKienBieuMauDangKy();
});

function taoMaXacThucDangKy() {
    maXacThucDangKyHienTai = taoMaCaptcha(5);
    var phanTuHienThi = document.getElementById('hien-thi-ma-xac-thuc-dang-ky');
    if (phanTuHienThi) {
        phanTuHienThi.textContent = maXacThucDangKyHienTai;
    }
}

function ganSuKienBieuMauDangKy() {
    var bieuMauDangKy = document.getElementById('bieu-mau-dang-ky');
    var oSoDienThoai = document.getElementById('so-dien-thoai-dang-ky');
    var oMatKhau = document.getElementById('mat-khau-dang-ky');
    var oXacNhanMatKhau = document.getElementById('xac-nhan-mat-khau-dang-ky');
    var oNhapMaXacThuc = document.getElementById('o-nhap-ma-xac-thuc-dang-ky');
    var nutDoiMa = document.getElementById('nut-doi-ma-xac-thuc-dang-ky');

    if (nutDoiMa) {
        nutDoiMa.addEventListener('click', taoMaXacThucDangKy);
    }

    if (!bieuMauDangKy) {
        return;
    }

    ganChiChoNhapSo(oSoDienThoai);

    bieuMauDangKy.addEventListener('submit', function(e) {
        e.preventDefault();

        var hoTen = document.getElementById('ho-ten-dang-ky').value.trim();
        var email = document.getElementById('email-dang-ky').value.trim();
        var soDienThoai = oSoDienThoai.value.trim();
        var oDiaChi = document.getElementById('dia-chi-dang-ky');
        var diaChi = (oDiaChi && oDiaChi.value.trim() !== '') ? oDiaChi.value.trim() : '';
        var matKhau = oMatKhau.value;
        var xacNhanMatKhau = oXacNhanMatKhau.value;

        if (hoTen === '') {
            hienThiThongBao('Vui lòng nhập họ và tên!', 'danger');
            document.getElementById('ho-ten-dang-ky').focus();
            return;
        }

        if (!kiemTraEmailHopLe(email)) {
            hienThiThongBao('Địa chỉ email không đúng định dạng!', 'danger');
            document.getElementById('email-dang-ky').focus();
            return;
        }

        if (soDienThoai.length !== 10) {
            hienThiThongBao('Số điện thoại không hợp lệ! Vui lòng nhập chính xác 10 chữ số.', 'danger');
            oSoDienThoai.focus();
            return;
        }

        if (matKhau.length < 6) {
            hienThiThongBao('Mật khẩu quá ngắn! Vui lòng nhập tối thiểu 6 ký tự.', 'danger');
            oMatKhau.focus();
            return;
        }

        if (matKhau !== xacNhanMatKhau) {
            hienThiThongBao('Mật khẩu xác nhận không khớp! Vui lòng nhập lại.', 'danger');
            oXacNhanMatKhau.focus();
            return;
        }

        if (oNhapMaXacThuc && oNhapMaXacThuc.value.trim().toUpperCase() !== maXacThucDangKyHienTai) {
            hienThiThongBao('Mã xác thực Captcha không chính xác! Vui lòng nhập lại.', 'danger');
            taoMaXacThucDangKy();
            oNhapMaXacThuc.value = '';
            oNhapMaXacThuc.focus();
            return;
        }

        var ketQuaDoc = docDuLieuJSONCoTrangThai('EDU_USERS', true);
        if (ketQuaDoc.tonTai && !ketQuaDoc.hopLe) {
            hienThiThongBao('Dữ liệu tài khoản trong LocalStorage đang bị lỗi JSON, chưa thể đăng ký mới.', 'danger');
            return;
        }

        var danhSachNguoiDung = ketQuaDoc.duLieu.slice();
        var emailDaTonTai = false;
        for (var i = 0; i < danhSachNguoiDung.length; i++) {
            if (danhSachNguoiDung[i].email && danhSachNguoiDung[i].email.toLowerCase() === email.toLowerCase()) {
                emailDaTonTai = true;
                break;
            }
        }

        if (emailDaTonTai) {
            hienThiThongBao('Email này đã được đăng ký! Vui lòng sử dụng email khác hoặc đăng nhập.', 'danger');
            document.getElementById('email-dang-ky').focus();
            return;
        }

        var thoiDiemHienTai = new Date();
        var taiKhoanMoi = {
            id: taoMaDuyNhat('USR_', danhSachNguoiDung, 'id'),
            fullName: hoTen,
            email: email,
            phone: soDienThoai,
            address: diaChi,
            password: matKhau,
            role: 'student',
            createdAt: thoiDiemHienTai.toLocaleDateString('vi-VN')
        };

        danhSachNguoiDung.push(taiKhoanMoi);
        if (!luuDuLieuJSON('EDU_USERS', danhSachNguoiDung)) {
            hienThiThongBao('Không thể lưu tài khoản mới vào LocalStorage (bộ nhớ đầy hoặc bị chặn).', 'danger');
            return;
        }

        luuThongBaoChoChuyenTrang('Đăng ký tài khoản thành công! Vui lòng đăng nhập để bắt đầu học tập.', 'success');
        window.location.href = 'login.html';
    });
}
