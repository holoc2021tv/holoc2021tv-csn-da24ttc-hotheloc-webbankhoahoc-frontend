/**
 * FILE: src/js/my-courses.js
 * NHIEM VU: Doc du lieu an toan tu EDU_PURCHASES theo dung tai khoan dang dang nhap
 * va chi cap quyen hoc cho cac don hang co trang thai hop le (OWN-01),
 * theo doi tien do mo phong va xac minh dieu kien cap chung nhan ngay trong ham (CERT-01..03).
 */

var daGanSuKienInChungNhan = false;

document.addEventListener('DOMContentLoaded', function() {
    capNhatHuyHieuGioHang();
    hienThiKhoaHocVaDonHangCuaToi();
    ganSuKienMoVideoBaiGiang();
});

function ganSuKienMoVideoBaiGiang() {
    var khungLuoi = document.getElementById('luoi-khoa-hoc-da-mua');
    if (khungLuoi) {
        khungLuoi.addEventListener('click', function(e) {
            var nutXemVideo = e.target.closest('.nut-xem-video-bai-giang');
            if (nutXemVideo) {
                var maKhoaHoc = nutXemVideo.getAttribute('data-ma-khoa-hoc');
                if (maKhoaHoc) {
                    moHopThoaiVideoBaiGiang(maKhoaHoc);
                }
                return;
            }
            var nutHoanThanh = e.target.closest('.nut-hoan-thanh-khoa-hoc');
            if (nutHoanThanh) {
                var maHoanThanh = nutHoanThanh.getAttribute('data-ma-khoa-hoc');
                if (maHoanThanh) {
                    var ketQuaTienDo = capNhatTienDoHocTap(maHoanThanh, 100);
                    if (ketQuaTienDo && ketQuaTienDo.success) {
                        hienThiKhoaHocVaDonHangCuaToi();
                        hienThiThongBao('Chúc mừng! Bạn đã đánh dấu hoàn thành 100% khóa học (tiến độ mô phỏng).', 'success');
                    } else {
                        hienThiThongBao((ketQuaTienDo && ketQuaTienDo.message) || 'Không thể lưu tiến độ học tập.', 'danger');
                    }
                }
                return;
            }

            var nutChungNhan = e.target.closest('.nut-xem-chung-nhan');
            if (nutChungNhan) {
                var maChungNhan = nutChungNhan.getAttribute('data-ma-khoa-hoc');
                if (maChungNhan) {
                    moHopThoaiChungNhan(maChungNhan);
                }
            }
        });
    }

    var nutIn = document.getElementById('nut-in-chung-nhan');
    if (nutIn && !daGanSuKienInChungNhan) {
        daGanSuKienInChungNhan = true;
        nutIn.addEventListener('click', function() {
            window.print();
        });
    }
}

function hienThiKhoaHocVaDonHangCuaToi() {
    var khungLuoi = document.getElementById('luoi-khoa-hoc-da-mua');
    var thanBangLichSu = document.getElementById('bang-lich-su-don-hang');

    if (!khungLuoi || !thanBangLichSu) {
        return;
    }

    var danhSachDonHang = layTatCaDonHang();
    var nguoiDungHienTai = layNguoiDungHienTai();

    if (!nguoiDungHienTai || !nguoiDungHienTai.email) {
        var maChuaDangNhap = '';
        maChuaDangNhap += '<article class="card border-0 shadow-sm text-center py-5">';
        maChuaDangNhap += '  <div class="mb-3"><i class="bi bi-lock text-primary bieu-tuong-trang-thai-trong"></i></div>';
        maChuaDangNhap += '  <h5 class="fw-bold text-secondary">Bạn chưa đăng nhập tài khoản</h5>';
        maChuaDangNhap += '  <p class="text-muted mb-3">Vui lòng đăng nhập để xem các khóa học đã kích hoạt và lịch sử đơn hàng của riêng bạn.</p>';
        maChuaDangNhap += '  <div><a href="login.html" class="btn btn-primary px-4 fw-semibold">Đăng nhập ngay</a></div>';
        maChuaDangNhap += '</article>';
        khungLuoi.className = '';
        khungLuoi.innerHTML = maChuaDangNhap;
        thanBangLichSu.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">Vui lòng đăng nhập để xem lịch sử giao dịch.</td></tr>';
        return;
    }

    var emailDangNhapThuong = String(nguoiDungHienTai.email).trim().toLowerCase();

    var donHangCuaToi = [];
    for (var i = 0; i < danhSachDonHang.length; i++) {
        var emailDon = danhSachDonHang[i].customerEmail ? String(danhSachDonHang[i].customerEmail).trim().toLowerCase() : '';
        if (emailDon === emailDangNhapThuong) {
            donHangCuaToi.push(danhSachDonHang[i]);
        }
    }

    // Chi don hang co trang thai hop le (OWN-01) moi duoc cap quyen hoc
    var danhSachKhoaHocDaMua = [];
    for (var m = 0; m < donHangCuaToi.length; m++) {
        var donHang = donHangCuaToi[m];
        if (!kiemTraTrangThaiDonHopLe(donHang)) {
            continue;
        }
        var danhSachMon = donHang.items || [];

        for (var n = 0; n < danhSachMon.length; n++) {
            var mon = danhSachMon[n];
            var daTonTai = false;

            for (var p = 0; p < danhSachKhoaHocDaMua.length; p++) {
                if (danhSachKhoaHocDaMua[p].id === mon.id) {
                    daTonTai = true;
                    break;
                }
            }

            if (!daTonTai) {
                var khoaHocDayDu = timKhoaHocTheoMa(mon.id);
                danhSachKhoaHocDaMua.push({
                    id: mon.id,
                    title: mon.title,
                    instructor: mon.instructor || (khoaHocDayDu ? khoaHocDayDu.instructor : 'Giảng viên EduCourses'),
                    image: mon.image || (khoaHocDayDu ? khoaHocDayDu.image : ''),
                    orderId: donHang.orderId,
                    itemStatus: mon.itemStatus || 'Đã kích hoạt (mô phỏng)'
                });
            }
        }
    }

    if (danhSachKhoaHocDaMua.length === 0) {
        var maHTMLRong = '';
        maHTMLRong += '<article class="card border-0 shadow-sm text-center py-5">';
        maHTMLRong += '  <div class="mb-3"><i class="bi bi-journal-x text-muted bieu-tuong-trang-thai-trong"></i></div>';
        maHTMLRong += '  <h5 class="fw-bold text-secondary">Bạn chưa có khóa học nào được kích hoạt</h5>';
        maHTMLRong += '  <p class="text-muted mb-3">Hãy chọn khóa học yêu thích và hoàn tất thanh toán mô phỏng để mở khóa bài giảng!</p>';
        maHTMLRong += '  <div><a href="courses.html" class="btn btn-primary px-4 fw-semibold">Khám phá khóa học</a></div>';
        maHTMLRong += '</article>';
        khungLuoi.className = '';
        khungLuoi.innerHTML = maHTMLRong;
    } else {
        khungLuoi.className = 'khung-khoa-hoc-3';
        var maHTMLLuoi = '';
        for (var k = 0; k < danhSachKhoaHocDaMua.length; k++) {
            var khoaHoc = danhSachKhoaHocDaMua[k];
            var anhAnToan = kiemTraDuongDanAnToan(khoaHoc.image, '');
            var maAnToan = maHoaHTML(khoaHoc.id);
            var maUrl = encodeURIComponent(khoaHoc.id || '');

            maHTMLLuoi += '<article class="card border-0 shadow-sm the-khoa-hoc">';
            maHTMLLuoi += '  <img src="' + maHoaHTML(anhAnToan) + '" class="card-img-top" alt="' + maHoaHTML(khoaHoc.title) + '">';
            maHTMLLuoi += '  <div class="than-the-khoa-hoc">';
            maHTMLLuoi += '    <div class="thong-tin-phu-khoa-hoc">';
            maHTMLLuoi += '      <small class="badge bg-success-subtle text-success fw-semibold">';
            maHTMLLuoi += '        <i class="bi bi-check-circle-fill me-1"></i>' + maHoaHTML(khoaHoc.itemStatus);
            maHTMLLuoi += '      </small>';
            maHTMLLuoi += '      <small class="text-muted">Mã ĐH: ' + maHoaHTML(khoaHoc.orderId) + '</small>';
            maHTMLLuoi += '    </div>';
            var tienDo = layTienDoHocTap(khoaHoc.id);
            var lopThanhTienDo = tienDo >= 100 ? 'thanh-tien-trinh-100' : (tienDo >= 50 ? 'thanh-tien-trinh-50' : 'thanh-tien-trinh-0');
            var mauThanhTienDo = tienDo >= 100 ? 'bg-success' : 'bg-primary';
            var nhanTienDo = tienDo >= 100 ? 'Hoàn thành 100% (mô phỏng)' : (tienDo >= 50 ? 'Đang học 50% (mô phỏng)' : 'Chưa bắt đầu (0%)');

            maHTMLLuoi += '    <h5 class="card-title fw-bold fs-6 mb-1">' + maHoaHTML(khoaHoc.title) + '</h5>';
            maHTMLLuoi += '    <p class="text-muted small mb-2">Giảng viên: ' + maHoaHTML(khoaHoc.instructor) + '</p>';
            maHTMLLuoi += '    <div class="small fw-semibold text-secondary mb-1">Tiến độ: ' + nhanTienDo + '</div>';
            maHTMLLuoi += '    <div class="progress thanh-tien-trinh-mong bg-light border mb-3">';
            maHTMLLuoi += '      <div class="progress-bar ' + mauThanhTienDo + ' ' + lopThanhTienDo + '" role="progressbar"></div>';
            maHTMLLuoi += '    </div>';
            maHTMLLuoi += '    <div class="chan-the-khoa-hoc">';
            maHTMLLuoi += '      <div class="nhom-nut-khoa-hoc">';
            maHTMLLuoi += '        <button type="button" class="btn btn-primary btn-sm fw-semibold nut-xem-video-bai-giang" data-ma-khoa-hoc="' + maAnToan + '">';
            maHTMLLuoi += '          <i class="bi bi-play-circle-fill me-1"></i> Vào học ngay (Xem Video)';
            maHTMLLuoi += '        </button>';
            if (tienDo < 100) {
                maHTMLLuoi += '        <button type="button" class="btn btn-outline-success btn-sm fw-semibold nut-hoan-thanh-khoa-hoc" data-ma-khoa-hoc="' + maAnToan + '">';
                maHTMLLuoi += '          <i class="bi bi-check2-circle me-1"></i> Đánh dấu hoàn thành';
                maHTMLLuoi += '        </button>';
            } else {
                maHTMLLuoi += '        <button type="button" class="btn btn-warning btn-sm fw-semibold text-dark nut-xem-chung-nhan" data-ma-khoa-hoc="' + maAnToan + '">';
                maHTMLLuoi += '          <i class="bi bi-award-fill me-1"></i> Xem chứng nhận (Mô phỏng)';
                maHTMLLuoi += '        </button>';
            }
            maHTMLLuoi += '        <a href="course-detail.html?id=' + maUrl + '" class="btn btn-outline-secondary btn-sm">Xem chi tiết & Đánh giá sao</a>';
            maHTMLLuoi += '      </div>';
            maHTMLLuoi += '    </div>';
            maHTMLLuoi += '  </div>';
            maHTMLLuoi += '</article>';
        }
        khungLuoi.innerHTML = maHTMLLuoi;
    }

    if (donHangCuaToi.length === 0) {
        thanBangLichSu.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">Chưa có giao dịch thanh toán mô phỏng nào.</td></tr>';
    } else {
        var maHTMLBang = '';
        for (var r = 0; r < donHangCuaToi.length; r++) {
            var don = donHangCuaToi[r];
            var cacMon = don.items || [];
            var danhSachTenMon = '';

            for (var s = 0; s < cacMon.length; s++) {
                if (s > 0) {
                    danhSachTenMon += ', ';
                }
                danhSachTenMon += (cacMon[s].title || '') + ' (x' + (cacMon[s].quantity || 1) + ')';
            }

            var hopLeDon = kiemTraTrangThaiDonHopLe(don);
            var lopBadge = hopLeDon ? 'bg-success' : 'bg-secondary';

            maHTMLBang += '<tr>';
            maHTMLBang += '  <td class="fw-bold text-primary">' + maHoaHTML(don.orderId) + '</td>';
            maHTMLBang += '  <td class="text-secondary small">' + maHoaHTML(don.createdAt) + '</td>';
            maHTMLBang += '  <td><div class="fw-semibold">' + maHoaHTML(danhSachTenMon) + '</div></td>';
            maHTMLBang += '  <td><div class="badge bg-info-subtle text-dark border">' + maHoaHTML(don.paymentMethod || 'Mô phỏng') + '</div></td>';
            maHTMLBang += '  <td class="fw-bold text-danger">' + maHoaHTML(dinhDangTienVND(don.totalAmount)) + '</td>';
            maHTMLBang += '  <td><div class="badge ' + lopBadge + '">' + maHoaHTML(don.status || 'Không xác định') + '</div></td>';
            maHTMLBang += '</tr>';
        }
        thanBangLichSu.innerHTML = maHTMLBang;
    }
}

function moHopThoaiVideoBaiGiang(maKhoaHoc) {
    if (!kiemTraDaMuaKhoaHoc(maKhoaHoc)) {
        hienThiThongBao('Bạn chưa có quyền truy cập khóa học này (cần đơn hàng hợp lệ).', 'danger');
        return false;
    }
    var khoaHoc = timKhoaHocTheoMa(maKhoaHoc);
    var tieuDe = khoaHoc ? khoaHoc.title : 'Bài giảng khóa học';
    var giangVien = khoaHoc ? khoaHoc.instructor : 'Giảng viên EduCourses';
    var duongDanVideo = (khoaHoc && khoaHoc.videoUrl)
        ? kiemTraDuongDanAnToan(khoaHoc.videoUrl, 'https://www.w3schools.com/html/mov_bbb.mp4')
        : 'https://www.w3schools.com/html/mov_bbb.mp4';

    var oTieuDe = document.getElementById('tieu-de-video-bai-giang');
    var oGiangVien = document.getElementById('giang-vien-video-bai-giang');
    if (oTieuDe) oTieuDe.textContent = tieuDe;
    if (oGiangVien) oGiangVien.textContent = 'Giảng viên hướng dẫn: ' + giangVien;

    var phanTuVideo = document.getElementById('khung-video-bai-giang');
    if (phanTuVideo) {
        phanTuVideo.src = duongDanVideo;
    }

    capNhatTienDoHocTap(maKhoaHoc, 50);
    hienThiKhoaHocVaDonHangCuaToi();

    var phanTuHopThoai = document.getElementById('hop-thoai-video-bai-giang');
    if (phanTuHopThoai && typeof bootstrap !== 'undefined') {
        var hopThoai = bootstrap.Modal.getOrCreateInstance(phanTuHopThoai);
        hopThoai.show();
    }
    return true;
}

/**
 * Xac minh quyen so huu va tien do >= 100% ngay trong ham truoc khi cap chung nhan mo phong (CERT-01..03)
 */
function moHopThoaiChungNhan(maKhoaHoc) {
    var ketQua = layHoacCapChungNhanKhoaHoc(maKhoaHoc);
    if (!ketQua.hopLe) {
        hienThiThongBao(ketQua.thongBao || 'Không đủ điều kiện xem chứng nhận.', 'warning');
        return false;
    }

    var khoaHoc = timKhoaHocTheoMa(maKhoaHoc);
    var hopThoai = document.getElementById('hop-thoai-chung-nhan');
    if (!khoaHoc) {
        return false;
    }

    var chungNhan = ketQua.chungNhan;
    var oTenHV = document.getElementById('chung-nhan-ten-hoc-vien');
    var oTenKH = document.getElementById('chung-nhan-ten-khoa-hoc');
    var oGV = document.getElementById('chung-nhan-giang-vien');
    var oNgay = document.getElementById('chung-nhan-ngay-cap');
    var oMa = document.getElementById('chung-nhan-ma-so');

    if (oTenHV) oTenHV.textContent = chungNhan.userName || 'Học viên EduCourses';
    if (oTenKH) oTenKH.textContent = khoaHoc.title || '';
    if (oGV) oGV.textContent = khoaHoc.instructor || 'Đội ngũ EduCourses';
    if (oNgay) oNgay.textContent = chungNhan.issuedAt || new Date().toLocaleDateString('vi-VN');
    if (oMa) oMa.textContent = chungNhan.certCode || ('CERT-DEMO-' + (khoaHoc.id || 'EDU'));

    if (hopThoai && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        var modal = bootstrap.Modal.getOrCreateInstance(hopThoai);
        modal.show();
    }
    return true;
}
