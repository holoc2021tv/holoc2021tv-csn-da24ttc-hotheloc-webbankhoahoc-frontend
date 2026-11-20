/**
 * FILE: src/js/checkout.js
 * NHIEM VU: Tinh toan gia tri don hang tu danh muc khoa hoc moi nhat, rang buoc tai khoan dang nhap,
 * xu ly thanh toan mo phong an toan (chong don hang do dang / trung lap khi thu lai) va hien thi ma QR minh hoa.
 */

var maVoucherDangApDung = '';
var soTienGiamDangApDung = 0;
var dangXuLyThanhToan = false;
var khoaChongTrungDonCuoi = '';

document.addEventListener('DOMContentLoaded', function() {
    capNhatHuyHieuGioHang();
    dienSanThongTinNguoiDung();
    hienThiTomTatDonHang();
    ganSuKienChonThanhToan();
    ganSuKienVoucherThanhToan();
    ganSuKienBieuMauThanhToan();
});

/**
 * Lay tai khoan dang dang nhap da doi chieu voi EDU_USERS (CK-03)
 */
function layTaiKhoanThanhToanHopLe() {
    var phienHienTai = layNguoiDungHienTai();
    if (!phienHienTai || !phienHienTai.email) {
        return null;
    }

    var emailChuan = String(phienHienTai.email).trim().toLowerCase();
    var danhSachNguoiDung = docDuLieuJSON('EDU_USERS', []);
    for (var i = 0; i < danhSachNguoiDung.length; i++) {
        var u = danhSachNguoiDung[i];
        if (u && u.email && String(u.email).trim().toLowerCase() === emailChuan) {
            return u;
        }
    }
    return phienHienTai;
}

function dienSanThongTinNguoiDung() {
    var thongTinDayDu = layTaiKhoanThanhToanHopLe();
    if (!thongTinDayDu) {
        return;
    }

    var oHoTen = document.getElementById('ho-ten-thanh-toan');
    var oEmail = document.getElementById('email-thanh-toan');
    var oSoDienThoai = document.getElementById('so-dien-thoai-thanh-toan');
    var oDiaChi = document.getElementById('dia-chi-thanh-toan');
    var nhanTrangThai = document.getElementById('nhan-trang-thai-dang-nhap');

    if (oHoTen && thongTinDayDu.fullName) {
        oHoTen.value = thongTinDayDu.fullName;
    }
    if (oEmail && thongTinDayDu.email) {
        oEmail.value = thongTinDayDu.email;
        oEmail.readOnly = true;
    }
    if (oSoDienThoai && thongTinDayDu.phone) {
        oSoDienThoai.value = thongTinDayDu.phone;
    }
    if (oDiaChi && thongTinDayDu.address) {
        oDiaChi.value = thongTinDayDu.address;
    }
    if (nhanTrangThai) {
        nhanTrangThai.classList.remove('d-none');
    }
}

function ganSuKienChonThanhToan() {
    var hopChonDiaChiKhac = document.getElementById('nut-chon-dia-chi-khac');
    var khungDiaChiKhac = document.getElementById('hop-nhap-dia-chi-khac');

    if (hopChonDiaChiKhac && khungDiaChiKhac) {
        hopChonDiaChiKhac.addEventListener('change', function() {
            if (hopChonDiaChiKhac.checked) {
                khungDiaChiKhac.classList.remove('d-none');
            } else {
                khungDiaChiKhac.classList.add('d-none');
            }
        });
    }

    var cacNutPhuongThuc = document.querySelectorAll('input[name="paymentMethod"]');
    var khungMaQR = document.getElementById('khung-thanh-toan-qr');
    var nutChonQR = document.getElementById('phuong-thuc-ma-qr');

    for (var i = 0; i < cacNutPhuongThuc.length; i++) {
        cacNutPhuongThuc[i].addEventListener('change', function() {
            if (khungMaQR && nutChonQR) {
                var ketQuaTinh = tinhToanGiaTriDonHang(layGioHang(), maVoucherDangApDung);
                if (nutChonQR.checked && ketQuaTinh.hopLe && ketQuaTinh.tongThanhToan > 0) {
                    khungMaQR.classList.remove('d-none');
                } else {
                    khungMaQR.classList.add('d-none');
                }
            }
        });
    }
}

/**
 * Ham tinh toan tap trung duy nhat cho ca hien thi tom tat va tao don hang (EC-01 & CK-02)
 * Luon doc gia moi nhat tu EDU_COURSES, kiem tra so huu han khong am va phat hien thay doi gia.
 */
function tinhToanGiaTriDonHang(danhSachGioHang, maVoucher) {
    if (!Array.isArray(danhSachGioHang) || danhSachGioHang.length === 0) {
        return {
            hopLe: false,
            lyDo: 'Giỏ hàng của bạn đang trống.',
            tongTamTinh: 0,
            soTienGiam: 0,
            tongThanhToan: 0,
            maVoucherHopLe: '',
            coThayDoiGia: false,
            danhSachMonHopLe: []
        };
    }

    var tongTamTinh = 0;
    var coThayDoiGia = false;
    var danhSachMonHopLe = [];

    for (var i = 0; i < danhSachGioHang.length; i++) {
        var mucGio = danhSachGioHang[i];
        if (!mucGio || !mucGio.id) {
            return { hopLe: false, lyDo: 'Có sản phẩm không hợp lệ trong giỏ hàng.' };
        }

        var khoaHocHienHanh = timKhoaHocTheoMa(mucGio.id);
        if (!khoaHocHienHanh) {
            return {
                hopLe: false,
                lyDo: 'Khóa học "' + (mucGio.title || mucGio.id) + '" không còn tồn tại trong danh mục. Vui lòng xóa khỏi giỏ hàng.'
            };
        }

        if (kiemTraDaMuaKhoaHoc(khoaHocHienHanh.id)) {
            return {
                hopLe: false,
                lyDo: 'Bạn đã sở hữu khóa học "' + khoaHocHienHanh.title + '". Vui lòng xóa khỏi giỏ hàng trước khi thanh toán.'
            };
        }

        var donGiaMoiNhat = Number(khoaHocHienHanh.salePrice);
        var soLuong = Number(mucGio.quantity || 1);

        if (!isFinite(donGiaMoiNhat) || isNaN(donGiaMoiNhat) || donGiaMoiNhat < 0 || !isFinite(soLuong) || isNaN(soLuong) || soLuong <= 0) {
            return {
                hopLe: false,
                lyDo: 'Giá hoặc số lượng của khóa học "' + khoaHocHienHanh.title + '" không hợp lệ.'
            };
        }

        var giaCuTrongGio = mucGio.salePrice !== undefined ? Number(mucGio.salePrice) : donGiaMoiNhat;
        if (isFinite(giaCuTrongGio) && giaCuTrongGio !== donGiaMoiNhat) {
            coThayDoiGia = true;
        }

        var thanhTien = donGiaMoiNhat * soLuong;
        tongTamTinh = tongTamTinh + thanhTien;

        danhSachMonHopLe.push({
            id: khoaHocHienHanh.id,
            title: khoaHocHienHanh.title,
            instructor: khoaHocHienHanh.instructor || 'Giảng viên EduCourses',
            image: khoaHocHienHanh.image || '',
            salePrice: donGiaMoiNhat,
            quantity: soLuong,
            thanhTien: thanhTien,
            itemStatus: 'Chờ xác nhận mô phỏng'
        });
    }

    if (!isFinite(tongTamTinh) || isNaN(tongTamTinh) || tongTamTinh < 0) {
        return { hopLe: false, lyDo: 'Tổng tiền tạm tính không hợp lệ.' };
    }

    var ketQuaGiam = (maVoucher && maVoucher !== '') ? tinhGiamGiaVoucher(maVoucher, tongTamTinh) : { hopLe: false, ma: '', soTienGiam: 0 };
    var soTienGiam = ketQuaGiam.hopLe ? Number(ketQuaGiam.soTienGiam || 0) : 0;
    if (!isFinite(soTienGiam) || isNaN(soTienGiam) || soTienGiam < 0) {
        soTienGiam = 0;
    }

    var tongThanhToan = tongTamTinh - soTienGiam;
    if (tongThanhToan < 0) {
        tongThanhToan = 0;
    }

    return {
        hopLe: true,
        lyDo: '',
        tongTamTinh: tongTamTinh,
        soTienGiam: soTienGiam,
        tongThanhToan: tongThanhToan,
        maVoucherHopLe: ketQuaGiam.hopLe ? ketQuaGiam.ma : '',
        coThayDoiGia: coThayDoiGia,
        danhSachMonHopLe: danhSachMonHopLe
    };
}

function hienThiTomTatDonHang() {
    var khungTomTat = document.getElementById('tom-tat-don-hang-thanh-toan');
    var phanTuTongTien = document.getElementById('tong-tien-thanh-toan');

    if (!khungTomTat) {
        return;
    }

    var danhSachGioHang = layGioHang();
    if (danhSachGioHang.length === 0) {
        khungTomTat.innerHTML = '<div class="text-muted text-center py-3">Không có sản phẩm nào để thanh toán.</div>';
        if (phanTuTongTien) {
            phanTuTongTien.textContent = '0đ';
        }
        return;
    }

    var ketQuaTinh = tinhToanGiaTriDonHang(danhSachGioHang, maVoucherDangApDung);
    if (!ketQuaTinh.hopLe) {
        khungTomTat.innerHTML = '<div class="alert alert-warning small mb-0">' + maHoaHTML(ketQuaTinh.lyDo) + '</div>';
        if (phanTuTongTien) {
            phanTuTongTien.textContent = '0đ';
        }
        return;
    }

    var maHTML = '';
    if (ketQuaTinh.coThayDoiGia) {
        maHTML += '<div class="alert alert-warning py-2 px-3 small mb-3"><i class="bi bi-exclamation-triangle-fill me-1"></i>Học phí một số khóa học đã được cập nhật theo bảng giá mới nhất. Vui lòng kiểm tra kỹ trước khi xác nhận.</div>';
    }

    for (var i = 0; i < ketQuaTinh.danhSachMonHopLe.length; i++) {
        var sanPham = ketQuaTinh.danhSachMonHopLe[i];
        var anhAnToan = kiemTraDuongDanAnToan(sanPham.image, '');
        var tieuDeAnToan = maHoaHTML(sanPham.title || 'Không có tên');

        maHTML += '<div class="d-flex justify-content-between align-items-center mb-3">';
        maHTML += '  <div class="d-flex align-items-center gap-3">';
        maHTML += '    <div class="position-relative">';
        maHTML += '      <img src="' + maHoaHTML(anhAnToan) + '" alt="' + tieuDeAnToan + '" class="rounded anh-san-pham-thanh-toan">';
        maHTML += '      <div class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">' + sanPham.quantity + '</div>';
        maHTML += '    </div>';
        maHTML += '    <div>';
        maHTML += '      <div class="fw-semibold text-truncate ten-san-pham-thanh-toan" title="' + tieuDeAnToan + '">' + tieuDeAnToan + '</div>';
        maHTML += '      <div class="text-muted fs-6">' + maHoaHTML(dinhDangTienVND(sanPham.salePrice)) + '</div>';
        maHTML += '    </div>';
        maHTML += '  </div>';
        maHTML += '  <div class="fw-bold text-dark">' + maHoaHTML(dinhDangTienVND(sanPham.thanhTien)) + '</div>';
        maHTML += '</div>';
    }

    khungTomTat.innerHTML = maHTML;

    soTienGiamDangApDung = ketQuaTinh.soTienGiam;
    var tongSauGiam = ketQuaTinh.tongThanhToan;

    var dongGiam = document.getElementById('dong-giam-gia-thanh-toan');
    var oTienGiam = document.getElementById('so-tien-giam-thanh-toan');
    if (dongGiam && oTienGiam) {
        if (soTienGiamDangApDung > 0) {
            dongGiam.classList.remove('d-none');
            oTienGiam.textContent = '-' + dinhDangTienVND(soTienGiamDangApDung);
        } else {
            dongGiam.classList.add('d-none');
        }
    }

    if (phanTuTongTien) {
        phanTuTongTien.textContent = dinhDangTienVND(tongSauGiam);
    }

    var ghiChuQR = document.getElementById('noi-dung-chuyen-khoan-qr');
    if (ghiChuQR) {
        ghiChuQR.textContent = 'MÔ PHỎNG – Mã giao dịch minh họa: EDU-' + tongSauGiam + 'VND (không chuyển tiền thật)';
    }

    var khungMaQR = document.getElementById('khung-thanh-toan-qr');
    var nutChonQR = document.getElementById('phuong-thuc-ma-qr');
    var nutHoanTat = document.querySelector('#bieu-mau-thanh-toan button[type="submit"]');
    if (tongSauGiam <= 0) {
        if (khungMaQR) khungMaQR.classList.add('d-none');
        if (nutHoanTat) nutHoanTat.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Kích hoạt khóa học miễn phí (0đ - Mô phỏng)';
    } else {
        if (khungMaQR && nutChonQR && nutChonQR.checked) {
            khungMaQR.classList.remove('d-none');
        }
        if (nutHoanTat) nutHoanTat.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Hoàn Tất Thanh Toán (Mô Phỏng)';
    }
}

function kiemTraDuLieuThanhToan(oSoDienThoai) {
    // Bat buoc dang nhap va gan chat don hang voi tai khoan hien tai (CK-03)
    var taiKhoanHopLe = layTaiKhoanThanhToanHopLe();
    if (!taiKhoanHopLe || !taiKhoanHopLe.email) {
        luuThongBaoChoChuyenTrang('Vui lòng đăng nhập tài khoản trước khi xác nhận thanh toán!', 'warning');
        window.location.href = 'login.html';
        return null;
    }

    var hoTen = document.getElementById('ho-ten-thanh-toan').value.trim();
    var emailForm = document.getElementById('email-thanh-toan').value.trim().toLowerCase();
    var emailTaiKhoan = String(taiKhoanHopLe.email).trim().toLowerCase();
    var soDienThoai = oSoDienThoai ? oSoDienThoai.value.trim() : '';

    if (hoTen === '') {
        hienThiThongBao('Vui lòng nhập họ và tên học viên!', 'danger');
        document.getElementById('ho-ten-thanh-toan').focus();
        return null;
    }

    if (emailForm !== emailTaiKhoan) {
        hienThiThongBao('Email nhận khóa học phải trùng khớp với tài khoản đang đăng nhập (' + taiKhoanHopLe.email + ')!', 'danger');
        document.getElementById('email-thanh-toan').value = taiKhoanHopLe.email;
        return null;
    }

    if (soDienThoai.length !== 10) {
        hienThiThongBao('Số điện thoại không hợp lệ! Vui lòng nhập chính xác 10 chữ số.', 'danger');
        if (oSoDienThoai) oSoDienThoai.focus();
        return null;
    }

    var danhSachGioHang = layGioHang();
    if (danhSachGioHang.length === 0) {
        hienThiThongBao('Giỏ hàng của bạn đang trống, không thể thanh toán!', 'warning');
        window.location.href = 'courses.html';
        return null;
    }

    return {
        userId: taiKhoanHopLe.id || '',
        hoTen: hoTen,
        email: taiKhoanHopLe.email,
        soDienThoai: soDienThoai,
        danhSachGioHang: danhSachGioHang
    };
}

/**
 * Thuc hien commit co kiem soat voi snapshot/rollback va chong tao don trung lap (CK-01, EC-01, CK-02, CK-03)
 */
function taoVaLuuDonHangMoPhong(thongTinNguoiMua, boQuaXacNhan) {
    if (dangXuLyThanhToan) {
        return { success: false, message: 'Đơn hàng đang được xử lý, vui lòng không bấm lặp lại.' };
    }

    var ketQuaTinh = tinhToanGiaTriDonHang(thongTinNguoiMua.danhSachGioHang, maVoucherDangApDung);
    if (!ketQuaTinh.hopLe) {
        hienThiThongBao(ketQuaTinh.lyDo, 'danger');
        hienThiTomTatDonHang();
        return { success: false, message: ketQuaTinh.lyDo };
    }

    // Neu gia da doi so voi luc them vao gio, dong bo lai gia trong gio va yeu cau xac nhan ro
    if (ketQuaTinh.coThayDoiGia) {
        var gioCapNhat = [];
        for (var g = 0; g < ketQuaTinh.danhSachMonHopLe.length; g++) {
            var monMoi = ketQuaTinh.danhSachMonHopLe[g];
            gioCapNhat.push({
                id: monMoi.id,
                title: monMoi.title,
                instructor: monMoi.instructor,
                image: monMoi.image,
                salePrice: monMoi.salePrice,
                quantity: monMoi.quantity
            });
        }
        luuGioHang(gioCapNhat);
        hienThiTomTatDonHang();
    }

    var danhSachMaMon = [];
    for (var im = 0; im < ketQuaTinh.danhSachMonHopLe.length; im++) {
        danhSachMaMon.push(ketQuaTinh.danhSachMonHopLe[im].id);
    }
    var chuoiKhoaChongTrung = thongTinNguoiMua.email.toLowerCase() + '|' + ketQuaTinh.tongThanhToan + '|' + danhSachMaMon.join(',');
    if (khoaChongTrungDonCuoi === chuoiKhoaChongTrung) {
        hienThiThongBao('Đơn hàng này vừa được xác nhận thành công trước đó.', 'info');
        return { success: false, message: 'Đơn hàng trùng lặp.' };
    }

    var hopDiaChiKhac = document.getElementById('nut-chon-dia-chi-khac');
    var oDiaChi = document.getElementById('dia-chi-thanh-toan');
    var oDiaChiKhac = document.getElementById('o-nhap-dia-chi-khac');
    var diaChiMacDinh = oDiaChi ? oDiaChi.value.trim() : '';
    var diaChiKhac = oDiaChiKhac ? oDiaChiKhac.value.trim() : '';

    var diaChiCuoi = diaChiMacDinh || 'Kích hoạt trực tuyến qua tài khoản (không giao hàng vật lý)';
    if (hopDiaChiKhac && hopDiaChiKhac.checked && diaChiKhac !== '') {
        diaChiCuoi = diaChiKhac;
    }

    var phuongThucDangChon = document.querySelector('input[name="paymentMethod"]:checked');
    var phuongThucThanhToan = ketQuaTinh.tongThanhToan === 0
        ? 'Kích hoạt khóa học miễn phí (0đ - Mô phỏng)'
        : (phuongThucDangChon ? phuongThucDangChon.value : 'Quét mã QR minh họa (Mô phỏng)');

    if (!boQuaXacNhan) {
        var canhBaoDoiGia = ketQuaTinh.coThayDoiGia ? 'Lưu ý: Giá khóa học vừa được cập nhật theo bảng giá mới nhất.\n' : '';
        var thongDiepXacNhan = canhBaoDoiGia + 'Xác nhận đặt hàng với tổng số tiền ' + dinhDangTienVND(ketQuaTinh.tongThanhToan) + '.\n\n' +
            'MÔ PHỎNG: Đây là quy trình thanh toán mô phỏng trên trình duyệt (không kết nối ngân hàng thật).\n' +
            'Nhấn OK để kích hoạt khóa học mô phỏng. Nhấn Cancel để hủy và giữ nguyên giỏ hàng.';

        if (!confirm(thongDiepXacNhan)) {
            hienThiThongBao('Bạn đã hủy xác nhận thanh toán mô phỏng. Giỏ hàng của bạn vẫn được giữ nguyên.', 'warning');
            return { success: false, message: 'Người dùng đã hủy.' };
        }
    }

    var kiemTraDonHang = docDuLieuJSONCoTrangThai(KHOA_LUU_DON_HANG, true);
    if (kiemTraDonHang.tonTai && !kiemTraDonHang.hopLe) {
        hienThiThongBao('Dữ liệu lịch sử đơn hàng trong LocalStorage đang gặp lỗi. Giỏ hàng được giữ nguyên để tránh mất dữ liệu.', 'danger');
        return { success: false, message: 'EDU_PURCHASES bị lỗi JSON.' };
    }

    // Chup ban sao truoc khi ghi de rollback neu co loi giua chung (CK-01)
    var banSaoDonHangGoc = kiemTraDonHang.duLieu.slice();
    var kiemTraKhoaHoc = docDuLieuJSONCoTrangThai(KHOA_LUU_KHOA_HOC, true);
    if (kiemTraKhoaHoc.tonTai && !kiemTraKhoaHoc.hopLe) {
        hienThiThongBao('Dữ liệu khóa học trong LocalStorage đang gặp lỗi, chưa thể hoàn tất thanh toán.', 'danger');
        return { success: false, message: 'EDU_COURSES bị lỗi JSON.' };
    }
    var banSaoKhoaHocGoc = JSON.parse(JSON.stringify(kiemTraKhoaHoc.duLieu));
    var kiemTraNhatKy = docDuLieuJSONCoTrangThai('EDU_ANALYTICS_LOGS', true);
    var banSaoNhatKyGoc = kiemTraNhatKy.hopLe ? kiemTraNhatKy.duLieu.slice() : null;

    dangXuLyThanhToan = true;
    var daGhiDon = false;
    var daGhiKhoaHoc = false;
    var daGhiNhatKy = false;

    try {
        var thoiDiemHienTai = new Date();
        var cacMonLuu = [];
        for (var m = 0; m < ketQuaTinh.danhSachMonHopLe.length; m++) {
            var mon = ketQuaTinh.danhSachMonHopLe[m];
            cacMonLuu.push({
                id: mon.id,
                title: mon.title,
                instructor: mon.instructor,
                image: mon.image,
                salePrice: mon.salePrice,
                quantity: mon.quantity,
                itemStatus: 'Đã kích hoạt (mô phỏng)'
            });
        }

        var donHangMoi = {
            orderId: taoMaDuyNhat('ORD', banSaoDonHangGoc, 'orderId'),
            idempotencyKey: chuoiKhoaChongTrung,
            userId: thongTinNguoiMua.userId || '',
            customerName: thongTinNguoiMua.hoTen,
            customerEmail: thongTinNguoiMua.email,
            customerPhone: thongTinNguoiMua.soDienThoai,
            billingNote: diaChiCuoi,
            paymentMethod: phuongThucThanhToan,
            paymentSimulation: true,
            orderStatus: 'paid_simulated',
            status: 'Thanh toán mô phỏng thành công - Đã kích hoạt khóa học',
            dateISO: layChuoiNgayHomNay(),
            createdAt: thoiDiemHienTai.toLocaleString('vi-VN'),
            subtotalAmount: ketQuaTinh.tongTamTinh,
            discountCode: ketQuaTinh.maVoucherHopLe,
            discountAmount: ketQuaTinh.soTienGiam,
            totalAmount: ketQuaTinh.tongThanhToan,
            items: cacMonLuu
        };

        var danhSachDonMoi = banSaoDonHangGoc.slice();
        danhSachDonMoi.unshift(donHangMoi);
        if (!luuTatCaDonHang(danhSachDonMoi)) {
            throw new Error('Khong the luu EDU_PURCHASES.');
        }
        daGhiDon = true;

        var tatCaKhoaHocCapNhat = JSON.parse(JSON.stringify(banSaoKhoaHocGoc));
        for (var c = 0; c < cacMonLuu.length; c++) {
            var soLuongMua = Number(cacMonLuu[c].quantity || 1);
            for (var k = 0; k < tatCaKhoaHocCapNhat.length; k++) {
                if (tatCaKhoaHocCapNhat[k].id === cacMonLuu[c].id) {
                    tatCaKhoaHocCapNhat[k].purchases = Number(tatCaKhoaHocCapNhat[k].purchases || 0) + soLuongMua;
                    break;
                }
            }
        }
        if (!luuTatCaKhoaHoc(tatCaKhoaHocCapNhat)) {
            throw new Error('Khong the cap nhat EDU_COURSES.');
        }
        daGhiKhoaHoc = true;

        for (var n = 0; n < cacMonLuu.length; n++) {
            var ghiLogOk = ghiNhatKyTuongTac('PURCHASE', cacMonLuu[n].id, cacMonLuu[n].salePrice * cacMonLuu[n].quantity);
            if (ghiLogOk === false) {
                throw new Error('Khong the ghi EDU_ANALYTICS_LOGS.');
            }
        }
        daGhiNhatKy = true;

        if (!xoaSachGioHang()) {
            throw new Error('Khong the xoa gio hang EDU_CART_ITEMS.');
        }

        khoaChongTrungDonCuoi = chuoiKhoaChongTrung;
        dangXuLyThanhToan = false;
        luuThongBaoChoChuyenTrang('Thanh toán mô phỏng đơn hàng ' + donHangMoi.orderId + ' thành công! Khóa học đã được kích hoạt.', 'success');
        if (!boQuaXacNhan) {
            window.location.href = 'my-courses.html';
        }
        return { success: true, order: donHangMoi };
    } catch (loi) {
        // Hoan tac (rollback) cac khoa da ghi de tranh trang thai nua thanh cong
        if (daGhiNhatKy && banSaoNhatKyGoc !== null) {
            luuDuLieuJSON('EDU_ANALYTICS_LOGS', banSaoNhatKyGoc);
        }
        if (daGhiKhoaHoc) {
            luuTatCaKhoaHoc(banSaoKhoaHocGoc);
        }
        if (daGhiDon) {
            luuTatCaDonHang(banSaoDonHangGoc);
        }
        dangXuLyThanhToan = false;
        console.error('Loi xu ly don hang mo phong (da rollback):', loi);
        hienThiThongBao('Xảy ra lỗi khi lưu đơn hàng. Hệ thống đã hoàn tác và giữ nguyên giỏ hàng của bạn.', 'danger');
        return { success: false, message: loi.message };
    }
}

function ganSuKienBieuMauThanhToan() {
    var bieuMauThanhToan = document.getElementById('bieu-mau-thanh-toan');
    var oSoDienThoai = document.getElementById('so-dien-thoai-thanh-toan');

    if (!bieuMauThanhToan) {
        return;
    }

    ganChiChoNhapSo(oSoDienThoai);

    bieuMauThanhToan.addEventListener('submit', function(e) {
        e.preventDefault();
        var thongTinHopLe = kiemTraDuLieuThanhToan(oSoDienThoai);
        if (thongTinHopLe) {
            taoVaLuuDonHangMoPhong(thongTinHopLe, false);
        }
    });
}

function ganSuKienVoucherThanhToan() {
    var nutApDung = document.getElementById('nut-ap-dung-ma-giam-gia');
    var oNhap = document.getElementById('o-nhap-ma-giam-gia');
    var thongBaoEl = document.getElementById('thong-bao-ma-giam-gia');
    if (!nutApDung || !oNhap) {
        return;
    }

    nutApDung.addEventListener('click', function() {
        var ketQuaTinh = tinhToanGiaTriDonHang(layGioHang(), '');
        var tamTinh = ketQuaTinh.hopLe ? ketQuaTinh.tongTamTinh : 0;
        var ketQua = tinhGiamGiaVoucher(oNhap.value, tamTinh);
        if (ketQua.hopLe) {
            maVoucherDangApDung = ketQua.ma;
            if (thongBaoEl) {
                thongBaoEl.className = 'small text-success mt-1';
                thongBaoEl.textContent = ketQua.thongBao;
            }
            hienThiThongBao(ketQua.thongBao, 'success');
        } else {
            maVoucherDangApDung = '';
            if (thongBaoEl) {
                thongBaoEl.className = 'small text-danger mt-1';
                thongBaoEl.textContent = ketQua.thongBao;
            }
            hienThiThongBao(ketQua.thongBao, 'warning');
        }
        hienThiTomTatDonHang();
    });
}
