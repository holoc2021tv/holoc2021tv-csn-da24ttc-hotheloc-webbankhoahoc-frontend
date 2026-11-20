/**
 * FILE: src/js/contact.js
 * NHIEM VU: Kiem tra hop le bieu mau Lien he va luu mo phong vao EDU_CONTACTS.
 */

document.addEventListener('DOMContentLoaded', function() {
    capNhatHuyHieuGioHang();
    ganSuKienBieuMauLienHe();
});

function ganSuKienBieuMauLienHe() {
    var bieuMauLienHe = document.getElementById('bieu-mau-lien-he');
    if (!bieuMauLienHe) {
        return;
    }

    bieuMauLienHe.setAttribute('novalidate', 'novalidate');
    bieuMauLienHe.addEventListener('submit', function(e) {
        e.preventDefault();
        xuLyGuiLienHe(bieuMauLienHe);
    });
}

function xuLyGuiLienHe(bieuMauLienHe) {
    var oHoTen = document.getElementById('ho-ten-lien-he');
    var oEmail = document.getElementById('email-lien-he');
    var oTieuDe = document.getElementById('tieu-de-lien-he');
    var oNoiDung = document.getElementById('noi-dung-lien-he');

    var hoTen = oHoTen ? oHoTen.value.trim() : '';
    var email = oEmail ? oEmail.value.trim() : '';
    var tieuDe = oTieuDe ? oTieuDe.value.trim() : '';
    var noiDung = oNoiDung ? oNoiDung.value.trim() : '';

    if (hoTen === '') {
        hienThiThongBao('Vui lòng nhập họ và tên!', 'danger');
        if (oHoTen) oHoTen.focus();
        return;
    }

    if (!kiemTraEmailHopLe(email)) {
        hienThiThongBao('Địa chỉ email không đúng định dạng!', 'danger');
        if (oEmail) oEmail.focus();
        return;
    }

    if (tieuDe === '') {
        hienThiThongBao('Vui lòng nhập tiêu đề liên hệ!', 'danger');
        if (oTieuDe) oTieuDe.focus();
        return;
    }

    if (noiDung === '') {
        hienThiThongBao('Vui lòng nhập nội dung tin nhắn!', 'danger');
        if (oNoiDung) oNoiDung.focus();
        return;
    }

    var ketQua = luuLienHeMoi(hoTen, email, tieuDe, noiDung);
    if (ketQua.success) {
        hienThiThongBao(ketQua.message, 'success');
        bieuMauLienHe.reset();
    } else {
        hienThiThongBao(ketQua.message, 'danger');
    }
}
