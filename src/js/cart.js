/**
 * FILE: src/js/cart.js
 * NHIEM VU: Doc gio hang an toan tu LocalStorage (EDU_CART_ITEMS), dong bo gia moi nhat tu catalog va hien thi len bang.
 */

document.addEventListener('DOMContentLoaded', function() {
    capNhatHuyHieuGioHang();
    hienThiBangGioHang();
    ganSuKienBangGioHang();
});

function ganSuKienBangGioHang() {
    var thanBang = document.getElementById('bang-san-pham-gio-hang');
    var nutXoaTatCa = document.getElementById('nut-xoa-tat-ca-gio-hang');
    if (nutXoaTatCa) {
        nutXoaTatCa.addEventListener('click', function() {
            if (layGioHang().length === 0) {
                return;
            }
            if (confirm('Bạn có chắc chắn muốn xóa toàn bộ khóa học trong giỏ hàng?')) {
                if (!xoaSachGioHang()) {
                    hienThiThongBao('Không thể xóa giỏ hàng trong LocalStorage.', 'danger');
                    return;
                }
                hienThiBangGioHang();
                hienThiThongBao('Đã xóa toàn bộ giỏ hàng!', 'info');
            }
        });
    }

    if (!thanBang) {
        return;
    }

    thanBang.addEventListener('click', function(e) {
        var nutXoa = e.target.closest('.nut-xoa-san-pham-gio-hang');
        if (nutXoa) {
            var maKhoaHoc = nutXoa.getAttribute('data-ma-khoa-hoc');
            if (maKhoaHoc) {
                xuLyXoaKhoiGioHang(maKhoaHoc);
            }
        }
    });
}

function hienThiBangGioHang() {
    var thanBang = document.getElementById('bang-san-pham-gio-hang');
    var khungTrong = document.getElementById('trang-thai-gio-hang-trong');
    var khungNoiDung = document.getElementById('khung-noi-dung-gio-hang');
    var phanTuTongTien = document.getElementById('tong-tien-gio-hang');

    if (!thanBang) {
        return;
    }

    var danhSachGioHang = layGioHang();

    if (!danhSachGioHang || danhSachGioHang.length === 0) {
        if (khungTrong) {
            khungTrong.classList.remove('d-none');
        }
        if (khungNoiDung) {
            khungNoiDung.classList.add('d-none');
        }
        return;
    }

    if (khungTrong) {
        khungTrong.classList.add('d-none');
    }
    if (khungNoiDung) {
        khungNoiDung.classList.remove('d-none');
    }

    var maHTML = '';
    var tongTien = 0;

    for (var i = 0; i < danhSachGioHang.length; i++) {
        var sanPham = danhSachGioHang[i];
        var khoaHocHienHanh = typeof timKhoaHocTheoMa === 'function' ? timKhoaHocTheoMa(sanPham.id) : null;
        var donGia = khoaHocHienHanh ? Number(khoaHocHienHanh.salePrice || 0) : (sanPham.salePrice !== undefined ? Number(sanPham.salePrice) : Number(sanPham.price || 0));
        var soLuong = Number(sanPham.quantity || 1);
        var thanhTien = donGia * soLuong;
        tongTien = tongTien + thanhTien;

        var anhAnToan = kiemTraDuongDanAnToan((khoaHocHienHanh && khoaHocHienHanh.image) || sanPham.image, '');
        var tieuDeAnToan = maHoaHTML((khoaHocHienHanh && khoaHocHienHanh.title) || sanPham.title || 'Không có tên');
        var giangVienAnToan = maHoaHTML((khoaHocHienHanh && khoaHocHienHanh.instructor) || sanPham.instructor || 'Đang cập nhật');

        maHTML += '<tr>';
        maHTML += '  <td>';
        maHTML += '    <div class="d-flex align-items-center gap-3">';
        maHTML += '      <img src="' + maHoaHTML(anhAnToan) + '" alt="' + tieuDeAnToan + '" class="rounded anh-san-pham-gio-hang">';
        maHTML += '      <div>';
        maHTML += '        <h6 class="fw-bold mb-0">' + tieuDeAnToan + '</h6>';
        maHTML += '        <small class="text-muted">Giảng viên: ' + giangVienAnToan + '</small>';
        maHTML += '      </div>';
        maHTML += '    </div>';
        maHTML += '  </td>';
        maHTML += '  <td class="align-middle text-danger fw-semibold">' + maHoaHTML(dinhDangTienVND(donGia)) + '</td>';
        maHTML += '  <td class="align-middle text-center">';
        maHTML += '    <div class="badge bg-light text-dark border px-3 py-2 fs-6">' + soLuong + '</div>';
        maHTML += '  </td>';
        maHTML += '  <td class="align-middle fw-bold text-dark">' + maHoaHTML(dinhDangTienVND(thanhTien)) + '</td>';
        maHTML += '  <td class="align-middle text-end">';
        maHTML += '    <button type="button" class="btn btn-outline-danger btn-sm nut-xoa-san-pham-gio-hang" data-ma-khoa-hoc="' + maHoaHTML(sanPham.id) + '">';
        maHTML += '      <i class="bi bi-trash"></i>';
        maHTML += '    </button>';
        maHTML += '  </td>';
        maHTML += '</tr>';
    }

    thanBang.innerHTML = maHTML;

    if (phanTuTongTien) {
        phanTuTongTien.textContent = dinhDangTienVND(tongTien);
    }
}

function xuLyXoaKhoiGioHang(maKhoaHoc) {
    var xacNhan = confirm('Bạn có chắc chắn muốn xóa khóa học này khỏi giỏ hàng?');
    if (xacNhan) {
        if (!xoaKhoiGio(maKhoaHoc)) {
            hienThiThongBao('Không thể cập nhật giỏ hàng trong LocalStorage.', 'danger');
            return;
        }
        hienThiBangGioHang();
        hienThiThongBao('Đã xóa khóa học khỏi giỏ hàng!', 'info');
    }
}
