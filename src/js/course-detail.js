/**
 * FILE: src/js/course-detail.js
 * NHIEM VU: Doc ID khoa hoc tu URL, tang luot xem/click, hien thi chi tiet khoa hoc an toan
 * (chong XSS, kiem tra URL) va xu ly chuc nang Danh gia 1 den 5 sao.
 */

var maKhoaHocDangXem = '';
var soSaoDangChon = 5;

document.addEventListener('DOMContentLoaded', function() {
    capNhatHuyHieuGioHang();
    taiChiTietKhoaHoc();
});

function taiChiTietKhoaHoc() {
    var thamSoUrl = new URLSearchParams(window.location.search);
    var maKhoaHoc = thamSoUrl.get('id');

    if (!maKhoaHoc) {
        hienThiTrangThaiLoi('Không tìm thấy mã khóa học trên đường dẫn.');
        return;
    }

    maKhoaHocDangXem = maKhoaHoc;

    var khoaHoc = tangLuotXemKhoaHoc(maKhoaHoc);
    if (!khoaHoc) {
        khoaHoc = timKhoaHocTheoMa(maKhoaHoc);
    }

    if (!khoaHoc) {
        hienThiTrangThaiLoi('Khóa học không tồn tại hoặc đã bị xóa khỏi hệ thống.');
        return;
    }

    themKhoaHocVuaXem(khoaHoc.id);
    hienThiGiaoDienChiTiet(khoaHoc);
    ganSuKienChonSaoDanhGia(khoaHoc.id);
    hienThiDanhSachBinhLuan(khoaHoc.id);
    hienThiKhoaHocLienQuan(khoaHoc);
}

function hienThiGiaoDienChiTiet(khoaHoc) {
    document.title = (khoaHoc.title || 'Chi tiết khóa học') + ' - EduCourses';

    var duongDanAnhAnToan = kiemTraDuongDanAnToan(khoaHoc.image, '');
    var phanTuAnh = document.getElementById('anh-chi-tiet-khoa-hoc');
    if (phanTuAnh) {
        phanTuAnh.src = duongDanAnhAnToan;
        phanTuAnh.alt = khoaHoc.title || 'Khóa học';
    }

    var phanTuVideo = document.getElementById('video-chi-tiet-khoa-hoc');
    if (phanTuVideo) {
        phanTuVideo.poster = duongDanAnhAnToan;
        if (khoaHoc.videoUrl) {
            var duongDanVideoAnToan = kiemTraDuongDanAnToan(khoaHoc.videoUrl, '');
            if (duongDanVideoAnToan !== '') {
                phanTuVideo.src = duongDanVideoAnToan;
            }
        }
    }

    var oDuongDan = document.getElementById('duong-dan-ten-khoa-hoc');
    var oDanhMuc = document.getElementById('danh-muc-chi-tiet');
    var oTieuDe = document.getElementById('tieu-de-chi-tiet');
    var oGiangVien = document.getElementById('giang-vien-chi-tiet');
    var oGiaBan = document.getElementById('gia-ban-chi-tiet');
    var oGiaGoc = document.getElementById('gia-goc-chi-tiet');

    if (oDuongDan) oDuongDan.textContent = khoaHoc.title || '';
    var oTrinhDo = document.getElementById('trinh-do-chi-tiet');
    if (oDanhMuc) oDanhMuc.textContent = khoaHoc.category || '';
    if (oTrinhDo) oTrinhDo.textContent = khoaHoc.level || 'Cơ bản';
    if (oTieuDe) oTieuDe.textContent = khoaHoc.title || '';
    if (oGiangVien) oGiangVien.textContent = khoaHoc.instructor || '';
    if (oGiaBan) {
        if (Number(khoaHoc.salePrice || 0) === 0) {
            oGiaBan.textContent = 'Miễn phí (0đ)';
            oGiaBan.className = 'text-success fw-bold fs-2';
        } else {
            oGiaBan.textContent = dinhDangTienVND(khoaHoc.salePrice);
        }
    }
    if (oGiaGoc) {
        if (Number(khoaHoc.originalPrice || 0) > Number(khoaHoc.salePrice || 0)) {
            oGiaGoc.textContent = dinhDangTienVND(khoaHoc.originalPrice);
        } else {
            oGiaGoc.textContent = '';
        }
    }

    var oThoiLuong = document.getElementById('thoi-luong-chi-tiet');
    var oSoBaiHoc = document.getElementById('so-bai-hoc-chi-tiet');
    if (oThoiLuong) oThoiLuong.innerHTML = '<i class="bi bi-clock-fill text-info me-1"></i>' + maHoaHTML(khoaHoc.duration || '12 giờ học');
    if (oSoBaiHoc) oSoBaiHoc.innerHTML = '<i class="bi bi-journal-text text-warning me-1"></i>' + Number(khoaHoc.lessonsCount || 20) + ' bài học';

    capNhatSoLieuChiTiet(khoaHoc);

    var phanTuMoTa = document.getElementById('mo-ta-chi-tiet-khoa-hoc');
    if (phanTuMoTa && khoaHoc.description) {
        phanTuMoTa.textContent = khoaHoc.description;
    }
    hienThiLoTrinhKhoaHoc(khoaHoc);
    ganSuKienHocThuKhoaHoc(khoaHoc);

    var nutMuaNgay = document.getElementById('nut-mua-ngay-chi-tiet');
    if (nutMuaNgay) {
        if (kiemTraDaMuaKhoaHoc(khoaHoc.id)) {
            nutMuaNgay.className = 'btn btn-success btn-lg fw-semibold';
            nutMuaNgay.innerHTML = '<i class="bi bi-play-circle-fill me-2"></i>Vào học ngay';
        }
        nutMuaNgay.addEventListener('click', function() {
            tangLuotClickKhoaHoc(khoaHoc.id);
            if (kiemTraDaMuaKhoaHoc(khoaHoc.id)) {
                luuThongBaoChoChuyenTrang('Bạn đã sở hữu khóa học này! Đang chuyển tới Khóa học của tôi.', 'info');
                window.location.href = 'my-courses.html';
                return;
            }
            var gio = layGioHang();
            var daTrongGio = false;
            for (var i = 0; i < gio.length; i++) {
                if (gio[i].id === khoaHoc.id) {
                    daTrongGio = true;
                    break;
                }
            }
            if (!daTrongGio) {
                themVaoGio(khoaHoc.id, 1);
            }
            window.location.href = 'checkout.html';
        });
    }

    var nutThemGio = document.getElementById('nut-them-gio-chi-tiet');
    if (nutThemGio) {
        nutThemGio.addEventListener('click', function() {
            tangLuotClickKhoaHoc(khoaHoc.id);
            var ketQua = themVaoGio(khoaHoc.id, 1);
            hienThiThongBao(ketQua.message, ketQua.success ? 'success' : 'danger');
            var khoaHocMoi = timKhoaHocTheoMa(khoaHoc.id);
            if (khoaHocMoi) {
                capNhatSoLieuChiTiet(khoaHocMoi);
            }
        });
    }

    var nutYeuThich = document.getElementById('nut-yeu-thich-chi-tiet');
    if (nutYeuThich) {
        capNhatNutYeuThichChiTiet(nutYeuThich, khoaHoc.id);
        nutYeuThich.addEventListener('click', function() {
            var daThem = batTatKhoaHocYeuThich(khoaHoc.id);
            capNhatNutYeuThichChiTiet(nutYeuThich, khoaHoc.id);
            if (daThem) {
                hienThiThongBao('Đã lưu khóa học vào danh sách Yêu thích!', 'success');
            } else {
                hienThiThongBao('Đã xóa khóa học khỏi danh sách Yêu thích.', 'info');
            }
        });
    }
}

function capNhatSoLieuChiTiet(khoaHoc) {
    var phanTuDiemSao = document.getElementById('diem-sao-chi-tiet');
    if (phanTuDiemSao) {
        phanTuDiemSao.innerHTML = '<i class="bi bi-star-fill text-warning me-1"></i>' + maHoaHTML(dinhDangDiemDanhGia(khoaHoc));
    }

    var phanTuLuotXem = document.getElementById('luot-xem-chi-tiet');
    if (phanTuLuotXem) {
        phanTuLuotXem.innerHTML = '<i class="bi bi-eye-fill text-primary me-1"></i>' + Number(khoaHoc.views || 0) + ' lượt xem';
    }

    var phanTuLuotClick = document.getElementById('luot-click-chi-tiet');
    if (phanTuLuotClick) {
        phanTuLuotClick.innerHTML = '<i class="bi bi-hand-index-thumb-fill text-success me-1"></i>' + Number(khoaHoc.clicks || 0) + ' lượt click';
    }

    var oDiemTrungBinh = document.getElementById('diem-trung-binh-danh-gia');
    var oTongLuot = document.getElementById('tong-so-luot-danh-gia');
    if (oDiemTrungBinh) {
        oDiemTrungBinh.textContent = Number(khoaHoc.rating || 0).toFixed(1) + ' / 5.0';
    }
    if (oTongLuot) {
        oTongLuot.textContent = Number(khoaHoc.ratingCount || 0) + ' lượt đánh giá thực tế';
    }
}

function capNhatNutYeuThichChiTiet(nutYeuThich, maKhoaHoc) {
    var daThich = kiemTraKhoaHocYeuThich(maKhoaHoc);
    if (daThich) {
        nutYeuThich.innerHTML = '<i class="bi bi-heart-fill me-2"></i>Đã lưu Yêu thích';
        nutYeuThich.className = 'btn btn-danger fw-semibold';
    } else {
        nutYeuThich.innerHTML = '<i class="bi bi-heart me-2"></i>Lưu vào Yêu thích';
        nutYeuThich.className = 'btn btn-outline-danger fw-semibold';
    }
}

/**
 * Xu ly chon tu 1 den 5 sao va gui danh gia
 */
function ganSuKienChonSaoDanhGia(maKhoaHoc) {
    var nguoiDungHienTai = layNguoiDungHienTai();
    var oNhapTen = document.getElementById('ten-nguoi-danh-gia');

    if (oNhapTen && nguoiDungHienTai && nguoiDungHienTai.fullName) {
        oNhapTen.value = nguoiDungHienTai.fullName;
    }

    chonSoSaoDanhGia(5);
    capNhatTrangThaiQuyenDanhGia(maKhoaHoc);

    var cacNutSao = document.querySelectorAll('.nut-chon-sao-danh-gia');
    for (var i = 0; i < cacNutSao.length; i++) {
        cacNutSao[i].addEventListener('click', function() {
            var giaTriSao = Number(this.getAttribute('data-star'));
            chonSoSaoDanhGia(giaTriSao);
        });
    }

    var bieuMauDanhGia = document.getElementById('bieu-mau-danh-gia-khoa-hoc');
    if (bieuMauDanhGia) {
        bieuMauDanhGia.addEventListener('submit', function(e) {
            e.preventDefault();

            var tenNguoiDanhGia = oNhapTen ? oNhapTen.value.trim() : '';
            var oBinhLuan = document.getElementById('noi-dung-binh-luan');
            var noiDungBinhLuan = oBinhLuan ? oBinhLuan.value.trim() : '';

            if (tenNguoiDanhGia === '') {
                hienThiThongBao('Vui lòng nhập họ tên của bạn trước khi gửi đánh giá!', 'warning');
                if (oNhapTen) {
                    oNhapTen.focus();
                }
                return;
            }

            if (noiDungBinhLuan === '') {
                hienThiThongBao('Vui lòng nhập nội dung nhận xét cho khóa học!', 'warning');
                if (oBinhLuan) {
                    oBinhLuan.focus();
                }
                return;
            }

            var emailNguoiDanhGia = (nguoiDungHienTai && nguoiDungHienTai.email) ? nguoiDungHienTai.email : '';
            var ketQua = themDanhGiaKhoaHoc(maKhoaHoc, soSaoDangChon, noiDungBinhLuan, tenNguoiDanhGia, emailNguoiDanhGia);

            if (ketQua.success) {
                hienThiThongBao(ketQua.message, 'success');
                if (oBinhLuan) {
                    oBinhLuan.value = '';
                }
                var khoaHocCapNhat = timKhoaHocTheoMa(maKhoaHoc);
                if (khoaHocCapNhat) {
                    capNhatSoLieuChiTiet(khoaHocCapNhat);
                }
                hienThiDanhSachBinhLuan(maKhoaHoc);
                capNhatTrangThaiQuyenDanhGia(maKhoaHoc);
            } else {
                hienThiThongBao(ketQua.message, 'danger');
            }
        });
    }
}

function chonSoSaoDanhGia(soSao) {
    soSaoDangChon = Number(soSao);
    var nhanSoSao = {
        1: '1 sao - Cần cải thiện',
        2: '2 sao - Tạm được',
        3: '3 sao - Khá tốt',
        4: '4 sao - Rất tốt',
        5: '5 sao - Tuyệt vời'
    };

    var cacNutSao = document.querySelectorAll('.nut-chon-sao-danh-gia');
    for (var i = 0; i < cacNutSao.length; i++) {
        var soSaoCuaNut = Number(cacNutSao[i].getAttribute('data-star'));
        var bieuTuong = cacNutSao[i].querySelector('i');
        if (bieuTuong) {
            if (soSaoCuaNut <= soSaoDangChon) {
                bieuTuong.className = 'bi bi-star-fill text-warning';
            } else {
                bieuTuong.className = 'bi bi-star text-secondary';
            }
        }
    }

    var phanTuNhan = document.getElementById('nhan-so-sao-da-chon');
    if (phanTuNhan) {
        phanTuNhan.textContent = nhanSoSao[soSaoDangChon] || '5 sao';
    }
}

function hienThiDanhSachBinhLuan(maKhoaHoc) {
    var khungDanhSach = document.getElementById('danh-sach-binh-luan-khoa-hoc');
    if (!khungDanhSach) {
        return;
    }

    var danhSachDanhGia = layDanhGiaCuaKhoaHoc(maKhoaHoc);
    hienThiPhanBoSao(danhSachDanhGia);
    if (danhSachDanhGia.length === 0) {
        var maHTMLRong = '';
        maHTMLRong += '<div class="alert alert-light border text-center text-muted mb-0">';
        maHTMLRong += '  Chưa có đánh giá nào cho khóa học này. Hãy là người đầu tiên đánh giá!';
        maHTMLRong += '</div>';
        khungDanhSach.innerHTML = maHTMLRong;
        return;
    }

    var maHTML = '';
    for (var i = 0; i < danhSachDanhGia.length; i++) {
        var danhGia = danhSachDanhGia[i];
        var maHTMLSao = '';
        for (var s = 1; s <= 5; s++) {
            if (s <= Number(danhGia.stars)) {
                maHTMLSao += '<i class="bi bi-star-fill text-warning me-1"></i>';
            } else {
                maHTMLSao += '<i class="bi bi-star text-secondary me-1"></i>';
            }
        }

        maHTML += '<article class="border rounded p-3 mb-3 bg-light">';
        maHTML += '  <div class="d-flex justify-content-between align-items-center mb-1">';
        maHTML += '    <div class="fw-bold text-dark"><i class="bi bi-person-circle text-primary me-2"></i>' + maHoaHTML(danhGia.userName) + '</div>';
        maHTML += '    <small class="text-muted">' + maHoaHTML(danhGia.createdAt) + '</small>';
        maHTML += '  </div>';
        maHTML += '  <div class="mb-2">' + maHTMLSao + '<strong class="ms-1 small text-dark">(' + Number(danhGia.stars || 0) + '/5 sao)</strong></div>';
        maHTML += '  <div class="text-secondary">' + maHoaHTML(danhGia.comment) + '</div>';
        maHTML += '</article>';
    }

    khungDanhSach.innerHTML = maHTML;
}

function hienThiTrangThaiLoi(thongBaoLoi) {
    var khungChua = document.getElementById('khung-chi-tiet-khoa-hoc');
    if (khungChua) {
        var maHTML = '';
        maHTML += '<div class="container py-5">';
        maHTML += '  <div class="alert alert-danger text-center p-4 shadow-sm">';
        maHTML += '    <h4 class="fw-bold mb-2"><i class="bi bi-exclamation-triangle-fill me-2"></i>Lỗi truy xuất dữ liệu</h4>';
        maHTML += '    <p class="mb-3">' + maHoaHTML(thongBaoLoi) + '</p>';
        maHTML += '    <a href="courses.html" class="btn btn-primary fw-semibold">Quay lại danh sách khóa học</a>';
        maHTML += '  </div>';
        maHTML += '</div>';
        khungChua.innerHTML = maHTML;
    }
}

function capNhatTrangThaiQuyenDanhGia(maKhoaHoc) {
    var bieuMau = document.getElementById('bieu-mau-danh-gia-khoa-hoc');
    if (!bieuMau || typeof kiemTraQuyenGuiDanhGia !== 'function') {
        return;
    }

    var ketQua = kiemTraQuyenGuiDanhGia(maKhoaHoc);
    var thongBaoCu = document.getElementById('ghi-chu-quyen-danh-gia');
    if (!thongBaoCu) {
        thongBaoCu = document.createElement('div');
        thongBaoCu.id = 'ghi-chu-quyen-danh-gia';
        bieuMau.insertBefore(thongBaoCu, bieuMau.firstChild);
    }

    var cacNutSao = bieuMau.querySelectorAll('.nut-chon-sao-danh-gia');
    var oTen = document.getElementById('ten-nguoi-danh-gia');
    var oNoiDung = document.getElementById('noi-dung-binh-luan');
    var nutGui = bieuMau.querySelector('button[type="submit"]');
    var biKhoa = !ketQua.duocPhep;
    var i;

    for (i = 0; i < cacNutSao.length; i++) {
        cacNutSao[i].disabled = biKhoa;
    }
    if (oTen) oTen.disabled = biKhoa;
    if (oNoiDung) oNoiDung.disabled = biKhoa;
    if (nutGui) nutGui.disabled = biKhoa;

    if (ketQua.duocPhep) {
        thongBaoCu.className = 'alert alert-success py-2 small mb-3';
        bieuMau.classList.remove('opacity-75');
    } else {
        thongBaoCu.className = 'alert alert-warning py-2 small mb-3';
        bieuMau.classList.add('opacity-75');
    }
    thongBaoCu.textContent = ketQua.lyDo;
}

function hienThiKhoaHocLienQuan(khoaHocHienTai) {
    var khungLienQuan = document.getElementById('danh-sach-khoa-hoc-lien-quan');
    if (!khungLienQuan) {
        return;
    }

    var tatCa = layTatCaKhoaHoc();
    var lienQuan = [];
    for (var i = 0; i < tatCa.length; i++) {
        if (tatCa[i].category === khoaHocHienTai.category && tatCa[i].id !== khoaHocHienTai.id) {
            lienQuan.push(tatCa[i]);
            if (lienQuan.length >= 4) {
                break;
            }
        }
    }

    if (lienQuan.length === 0) {
        khungLienQuan.innerHTML = '<p class="text-muted">Chưa có khóa học liên quan cùng chuyên ngành.</p>';
        return;
    }

    var maHTML = '';
    for (var j = 0; j < lienQuan.length; j++) {
        maHTML += taoMaHTMLTheKhoaHoc(lienQuan[j], 'chi-tiet');
    }
    khungLienQuan.innerHTML = maHTML;

    khungLienQuan.addEventListener('click', function(e) {
        var nutFav = e.target.closest('.nut-yeu-thich-chi-tiet');
        if (nutFav) {
            xuLyNutYeuThichChung(nutFav.getAttribute('data-ma-khoa-hoc'), nutFav);
            return;
        }
        var nutGio = e.target.closest('.nut-them-gio-chi-tiet');
        if (nutGio) {
            var ma = nutGio.getAttribute('data-ma-khoa-hoc');
            tangLuotClickKhoaHoc(ma);
            var kq = themVaoGio(ma, 1);
            hienThiThongBao(kq.message, kq.success ? 'success' : 'warning');
            return;
        }
        var link = e.target.closest('.lien-ket-dem-click-chi-tiet');
        if (link) {
            tangLuotClickKhoaHoc(link.getAttribute('data-ma-khoa-hoc'));
        }
    });
}

function hienThiLoTrinhKhoaHoc(khoaHoc) {
    var khungLoTrinh = document.getElementById('lo-trinh-hoc-chi-tiet');
    if (!khungLoTrinh) {
        return;
    }

    var cacBuoc = [];
    if (khoaHoc.roadmap && Array.isArray(khoaHoc.roadmap) && khoaHoc.roadmap.length > 0) {
        cacBuoc = khoaHoc.roadmap;
    } else {
        var soBai = Number(khoaHoc.lessonsCount || 20);
        var phan1 = Math.max(1, Math.round(soBai * 0.25));
        var phan2 = Math.max(1, Math.round(soBai * 0.3));
        var phan3 = Math.max(1, Math.round(soBai * 0.25));
        var phan4 = Math.max(1, soBai - phan1 - phan2 - phan3);
        var danhMuc = khoaHoc.category || 'Công nghệ thông tin';

        cacBuoc = [
            'Giai đoạn 1 (' + phan1 + ' bài): Nền tảng tư duy và cài đặt môi trường thực hành ' + danhMuc,
            'Giai đoạn 2 (' + phan2 + ' bài): Kiến thức cốt lõi và kỹ thuật trọng tâm của ' + khoaHoc.title,
            'Giai đoạn 3 (' + phan3 + ' bài): Thực hành bài tập tình huống và tối ưu mã nguồn',
            'Giai đoạn 4 (' + phan4 + ' bài): Hoàn thiện dự án cuối khóa và kiểm thử thực tế'
        ];
    }

    var maHTML = '';
    for (var i = 0; i < cacBuoc.length; i++) {
        maHTML += '<li class="list-group-item">' + maHoaHTML(cacBuoc[i]) + '</li>';
    }
    khungLoTrinh.innerHTML = maHTML;
}

function ganSuKienHocThuKhoaHoc(khoaHoc) {
    var nutHocThu = document.getElementById('nut-hoc-thu-chi-tiet');
    var hopThoai = document.getElementById('hop-thoai-hoc-thu');
    var khungVideo = document.getElementById('khung-video-hoc-thu');
    if (!nutHocThu || !hopThoai) {
        return;
    }

    nutHocThu.addEventListener('click', function() {
        var tieuDe = document.getElementById('tieu-de-video-hoc-thu');
        var giangVien = document.getElementById('giang-vien-video-hoc-thu');
        if (tieuDe) tieuDe.textContent = 'Học thử Bài 1: ' + (khoaHoc.title || '');
        if (giangVien) giangVien.textContent = 'Giảng viên: ' + (khoaHoc.instructor || '');
        if (khungVideo && khoaHoc.videoUrl) {
            var urlAnToan = kiemTraDuongDanAnToan(khoaHoc.videoUrl, '');
            if (urlAnToan) khungVideo.src = urlAnToan;
        }
        if (typeof bootstrap !== 'undefined' && bootstrap.Modal) {
            var modal = bootstrap.Modal.getOrCreateInstance(hopThoai);
            modal.show();
        }
    });

    hopThoai.addEventListener('hidden.bs.modal', function() {
        if (khungVideo && typeof khungVideo.pause === 'function') {
            khungVideo.pause();
        }
    });
}

function hienThiPhanBoSao(danhSachDanhGia) {
    var khungPhanBo = document.getElementById('thong-ke-phan-bo-sao');
    if (!khungPhanBo) {
        return;
    }
    var tong = danhSachDanhGia.length;
    var demSao = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    var i;
    for (i = 0; i < tong; i++) {
        var muc = Math.round(Number(danhSachDanhGia[i].stars || 0));
        if (muc >= 1 && muc <= 5) {
            demSao[muc] += 1;
        }
    }

    var maHTML = '<div class="fw-semibold small text-secondary mb-2">Phân bố đánh giá theo mức sao:</div>';
    for (var sao = 5; sao >= 1; sao--) {
        var soLuot = demSao[sao];
        var phanTram = tong > 0 ? Math.round((soLuot / tong) * 100) : 0;
        maHTML += '<div class="d-flex align-items-center gap-2 mb-1 small">';
        maHTML += '  <div class="text-nowrap fw-semibold text-dark">' + sao + ' ★</div>';
        maHTML += '  <progress class="w-100" max="100" value="' + phanTram + '"></progress>';
        maHTML += '  <div class="text-nowrap text-muted">' + phanTram + '% (' + soLuot + ')</div>';
        maHTML += '</div>';
    }
    khungPhanBo.innerHTML = maHTML;
}
