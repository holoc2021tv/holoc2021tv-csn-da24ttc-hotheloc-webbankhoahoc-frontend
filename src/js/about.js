/**
 * FILE: src/js/about.js
 * NHIEM VU: Dong bo so lieu thong ke thuc te len trang Gioi thieu (about.html).
 */

document.addEventListener('DOMContentLoaded', function() {
    capNhatHuyHieuGioHang();
    hienThiThongKeGioiThieu();
});

function hienThiThongKeGioiThieu() {
    var danhSachKhoaHoc = layTatCaKhoaHoc();
    var danhSachDanhGia = layTatCaDanhGia();
    var tongLuotXem = 0;
    var tongLuotClick = 0;

    for (var i = 0; i < danhSachKhoaHoc.length; i++) {
        tongLuotXem = tongLuotXem + Number(danhSachKhoaHoc[i].views || 0);
        tongLuotClick = tongLuotClick + Number(danhSachKhoaHoc[i].clicks || 0);
    }

    document.getElementById('thong-ke-gioi-thieu-khoa-hoc').textContent = String(danhSachKhoaHoc.length);
    document.getElementById('thong-ke-gioi-thieu-luot-xem').textContent = String(tongLuotXem);
    document.getElementById('thong-ke-gioi-thieu-luot-click').textContent = String(tongLuotClick);
    document.getElementById('thong-ke-gioi-thieu-danh-gia').textContent = String(danhSachDanhGia.length);
}
