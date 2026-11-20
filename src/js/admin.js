/**
 * FILE: src/js/admin.js
 * NHIEM VU: Dieu khien Trang Quan tri (Admin Dashboard) voi bo loc thong ke Ngay/Thang/Nam,
 * bieu do truc quan va quan ly Khoa hoc, Tai khoan, Don hang, Danh gia sao (chong XSS, doc JSON an toan).
 */

var doiTuongHopThoaiKhoaHoc = null;

document.addEventListener('DOMContentLoaded', function() {
    if (!kiemTraLaQuanTriVien()) {
        luuThongBaoChoChuyenTrang('Từ chối truy cập! Chỉ tài khoản Admin mới được phép vào Trang quản trị.', 'danger');
        window.location.replace('login.html');
        return;
    }

    var phanTuHopThoai = document.getElementById('hop-thoai-khoa-hoc');
    if (phanTuHopThoai && typeof bootstrap !== 'undefined' && bootstrap.Modal) {
        doiTuongHopThoaiKhoaHoc = new bootstrap.Modal(phanTuHopThoai);
    }

    khoiTaoNgayLocMacDinh();
    khoiTaoDongHoThoiGianThuc();
    lamMoiBangDieuKhienQuanTri();
    ganSuKienTrangQuanTri();
});

function moHopThoaiKhoaHoc() {
    var phanTuHopThoai = document.getElementById('hop-thoai-khoa-hoc');
    if (doiTuongHopThoaiKhoaHoc) {
        doiTuongHopThoaiKhoaHoc.show();
    } else if (phanTuHopThoai) {
        phanTuHopThoai.classList.add('show', 'd-block');
    }
}

function dongHopThoaiKhoaHoc() {
    var phanTuHopThoai = document.getElementById('hop-thoai-khoa-hoc');
    if (doiTuongHopThoaiKhoaHoc) {
        doiTuongHopThoaiKhoaHoc.hide();
    } else if (phanTuHopThoai) {
        phanTuHopThoai.classList.remove('show', 'd-block');
    }
}

function khoiTaoNgayLocMacDinh() {
    var thoiDiemHienTai = new Date();
    var nam = thoiDiemHienTai.getFullYear();
    var thang = thoiDiemHienTai.getMonth() + 1;
    var chuoiThang = thang < 10 ? '0' + thang : '' + thang;
    var ngayHomNay = layChuoiNgayHomNay();

    var oChonNgay = document.getElementById('o-chon-ngay-loc');
    var oChonThang = document.getElementById('o-chon-thang-loc');
    var oChonNam = document.getElementById('o-chon-nam-loc');

    if (oChonNgay) {
        oChonNgay.value = ngayHomNay;
    }
    if (oChonThang) {
        oChonThang.value = chuoiThang;
    }
    if (oChonNam) {
        var coNamHienTai = false;
        for (var i = 0; i < oChonNam.options.length; i++) {
            if (oChonNam.options[i].value === String(nam)) {
                coNamHienTai = true;
                break;
            }
        }
        if (!coNamHienTai) {
            var optNam = document.createElement('option');
            optNam.value = String(nam);
            optNam.textContent = 'Năm ' + nam;
            oChonNam.appendChild(optNam);
        }
        oChonNam.value = '' + nam;
    }

    capNhatHienThiOChonLoc();
}

function capNhatHienThiOChonLoc() {
    var oLoaiLoc = document.getElementById('loai-loc-thoi-gian');
    if (!oLoaiLoc) {
        return;
    }

    var cheDo = oLoaiLoc.value;
    var khungNgay = document.getElementById('khung-chon-ngay-loc');
    var khungThang = document.getElementById('khung-chon-thang-loc');
    var khungNam = document.getElementById('khung-chon-nam-loc');

    if (khungNgay) {
        khungNgay.className = (cheDo === 'DAY') ? 'col-md-3' : 'col-md-3 d-none';
    }
    if (khungThang) {
        khungThang.className = (cheDo === 'MONTH') ? 'col-md-2' : 'col-md-2 d-none';
    }
    if (khungNam) {
        khungNam.className = (cheDo === 'MONTH' || cheDo === 'YEAR') ? 'col-md-2' : 'col-md-2 d-none';
    }
}

function kiemTraNgayKhopBoLoc(ngayBanGhi) {
    var oLoaiLoc = document.getElementById('loai-loc-thoi-gian');
    if (!oLoaiLoc || oLoaiLoc.value === 'ALL') {
        return true;
    }

    if (!ngayBanGhi) {
        return false;
    }

    var cheDo = oLoaiLoc.value;
    if (cheDo === 'DAY') {
        var ngayCanLoc = document.getElementById('o-chon-ngay-loc').value;
        return ngayBanGhi === ngayCanLoc;
    }

    if (cheDo === 'MONTH') {
        var thangCanLoc = document.getElementById('o-chon-thang-loc').value;
        var namCanLocThang = document.getElementById('o-chon-nam-loc').value;
        var tienToThang = namCanLocThang + '-' + thangCanLoc;
        return ngayBanGhi.indexOf(tienToThang) === 0;
    }

    if (cheDo === 'YEAR') {
        var namCanLoc = document.getElementById('o-chon-nam-loc').value;
        return ngayBanGhi.indexOf(namCanLoc) === 0;
    }

    return true;
}

function lamMoiBangDieuKhienQuanTri() {
    hienThiThongKeVaBieuDoQuanTri();
    hienThiBangQuanLyKhoaHoc();
    hienThiBangQuanLyNguoiDung();
    hienThiBangQuanLyDonHang();
    hienThiBangQuanLyDanhGia();
    hienThiBangQuanLyLienHe();
}

function hienThiThongKeVaBieuDoQuanTri() {
    var danhSachKhoaHoc = layTatCaKhoaHoc();
    var danhSachNguoiDung = docDuLieuJSON('EDU_USERS', []);
    var danhSachDonHang = layTatCaDonHang();
    var danhSachDanhGia = layTatCaDanhGia();
    var danhSachNhatKy = docDuLieuJSON('EDU_ANALYTICS_LOGS', []);

    var oLoaiLoc = document.getElementById('loai-loc-thoi-gian');
    var cheDo = oLoaiLoc ? oLoaiLoc.value : 'ALL';

    var soDonHangDaLoc = 0;
    var doanhThuDaLoc = 0;
    var soLuotMuaDaLoc = 0;

    for (var i = 0; i < danhSachDonHang.length; i++) {
        var don = danhSachDonHang[i];
        var ngayDon = don.dateISO || '';
        if (kiemTraNgayKhopBoLoc(ngayDon) && kiemTraTrangThaiDonHopLe(don)) {
            soDonHangDaLoc = soDonHangDaLoc + 1;
            doanhThuDaLoc = doanhThuDaLoc + Number(don.totalAmount || 0);
            var cacMon = don.items || [];
            for (var m = 0; m < cacMon.length; m++) {
                soLuotMuaDaLoc = soLuotMuaDaLoc + Number(cacMon[m].quantity || 1);
            }
        }
    }

    var luotXemDaLoc = 0;
    var luotClickDaLoc = 0;

    if (cheDo === 'ALL') {
        for (var c = 0; c < danhSachKhoaHoc.length; c++) {
            luotXemDaLoc = luotXemDaLoc + Number(danhSachKhoaHoc[c].views || 0);
            luotClickDaLoc = luotClickDaLoc + Number(danhSachKhoaHoc[c].clicks || 0);
        }
    } else {
        for (var l = 0; l < danhSachNhatKy.length; l++) {
            if (kiemTraNgayKhopBoLoc(danhSachNhatKy[l].dateISO)) {
                if (danhSachNhatKy[l].type === 'VIEW') {
                    luotXemDaLoc = luotXemDaLoc + 1;
                } else if (danhSachNhatKy[l].type === 'CLICK') {
                    luotClickDaLoc = luotClickDaLoc + 1;
                }
            }
        }
    }

    var soDanhGiaDaLoc = 0;
    var tongSoSao = 0;
    for (var r = 0; r < danhSachDanhGia.length; r++) {
        if (kiemTraNgayKhopBoLoc(danhSachDanhGia[r].dateISO)) {
            soDanhGiaDaLoc = soDanhGiaDaLoc + 1;
            tongSoSao = tongSoSao + Number(danhSachDanhGia[r].stars || 0);
        }
    }
    var diemTrungBinh = soDanhGiaDaLoc > 0 ? (tongSoSao / soDanhGiaDaLoc).toFixed(1) : '0.0';

    document.getElementById('thong-ke-tong-doanh-thu').textContent = dinhDangTienVND(doanhThuDaLoc);
    document.getElementById('thong-ke-tong-don-hang').textContent = soDonHangDaLoc + ' đơn (' + soLuotMuaDaLoc + ' lượt mua)';
    document.getElementById('thong-ke-tong-luot-xem').textContent = luotXemDaLoc + ' lượt xem';
    document.getElementById('thong-ke-tong-luot-click').textContent = luotClickDaLoc + ' lượt click thực tế';
    document.getElementById('thong-ke-tong-nguoi-dung').textContent = danhSachNguoiDung.length + ' tài khoản (' + danhSachKhoaHoc.length + ' khóa học)';
    document.getElementById('thong-ke-tong-danh-gia').textContent = soDanhGiaDaLoc + ' đánh giá (TB: ' + diemTrungBinh + ' sao)';

    hienThiThanhThongKeDanhMuc(cheDo, danhSachKhoaHoc, danhSachNhatKy, danhSachDonHang);
    hienThiBangTopKhoaHoc(danhSachKhoaHoc, cheDo, danhSachNhatKy, danhSachDonHang);
}

function layLopDoRongThanhTienTrinh(phanTram) {
    var giaTri = Number(phanTram || 0);
    if (giaTri <= 0) return 'thanh-tien-trinh-0';
    if (giaTri <= 15) return 'thanh-tien-trinh-10';
    if (giaTri <= 22) return 'thanh-tien-trinh-20';
    if (giaTri <= 28) return 'thanh-tien-trinh-25';
    if (giaTri <= 35) return 'thanh-tien-trinh-30';
    if (giaTri <= 45) return 'thanh-tien-trinh-40';
    if (giaTri <= 55) return 'thanh-tien-trinh-50';
    if (giaTri <= 65) return 'thanh-tien-trinh-60';
    if (giaTri <= 72) return 'thanh-tien-trinh-70';
    if (giaTri <= 78) return 'thanh-tien-trinh-75';
    if (giaTri <= 85) return 'thanh-tien-trinh-80';
    if (giaTri <= 95) return 'thanh-tien-trinh-90';
    return 'thanh-tien-trinh-100';
}

function hienThiThanhThongKeDanhMuc(cheDoLoc, danhSachKhoaHoc, danhSachNhatKy, danhSachDonHang) {
    var khungChua = document.getElementById('khung-thong-ke-danh-muc-quan-tri');
    if (!khungChua) {
        return;
    }

    var cheDo = cheDoLoc || 'ALL';
    var danhSachThongKe = [];
    if (cheDo === 'ALL') {
        danhSachThongKe = thongKeTheoDanhMuc();
    } else {
        var tatCaKH = danhSachKhoaHoc || layTatCaKhoaHoc();
        var nhatKy = danhSachNhatKy || docDuLieuJSON('EDU_ANALYTICS_LOGS', []);
        var donHang = danhSachDonHang || layTatCaDonHang();
        var danhMucList = [];
        var mapKhDanhMuc = {};
        for (var c = 0; c < tatCaKH.length; c++) {
            var danhMucKhoaHoc = tatCaKH[c].category || 'Frontend';
            mapKhDanhMuc[tatCaKH[c].id] = danhMucKhoaHoc;
            if (danhMucList.indexOf(danhMucKhoaHoc) === -1) {
                danhMucList.push(danhMucKhoaHoc);
            }
        }
        var demDm = {};
        for (var d = 0; d < danhMucList.length; d++) {
            demDm[danhMucList[d]] = { category: danhMucList[d], count: 0, totalViews: 0, totalClicks: 0, totalPurchases: 0 };
        }
        for (var k = 0; k < tatCaKH.length; k++) {
            var dm = tatCaKH[k].category || 'Frontend';
            if (demDm[dm]) demDm[dm].count = demDm[dm].count + 1;
        }
        for (var l = 0; l < nhatKy.length; l++) {
            if (kiemTraNgayKhopBoLoc(nhatKy[l].dateISO)) {
                var dmLog = mapKhDanhMuc[nhatKy[l].courseId];
                if (dmLog && demDm[dmLog]) {
                    if (nhatKy[l].type === 'VIEW') demDm[dmLog].totalViews = demDm[dmLog].totalViews + 1;
                    if (nhatKy[l].type === 'CLICK') demDm[dmLog].totalClicks = demDm[dmLog].totalClicks + 1;
                }
            }
        }
        for (var o = 0; o < donHang.length; o++) {
            if (kiemTraNgayKhopBoLoc(donHang[o].dateISO || '') && kiemTraTrangThaiDonHopLe(donHang[o])) {
                var cacMon = donHang[o].items || [];
                for (var m = 0; m < cacMon.length; m++) {
                    var dmDon = mapKhDanhMuc[cacMon[m].id];
                    if (dmDon && demDm[dmDon]) {
                        demDm[dmDon].totalPurchases = demDm[dmDon].totalPurchases + Number(cacMon[m].quantity || 1);
                    }
                }
            }
        }
        for (var x = 0; x < danhMucList.length; x++) {
            danhSachThongKe.push(demDm[danhMucList[x]]);
        }
    }

    var tuongTacCaoNhat = 1;
    for (var i = 0; i < danhSachThongKe.length; i++) {
        var tongDiem = danhSachThongKe[i].totalViews + danhSachThongKe[i].totalClicks + (danhSachThongKe[i].totalPurchases * 5);
        if (tongDiem > tuongTacCaoNhat) {
            tuongTacCaoNhat = tongDiem;
        }
    }

    var maHTML = '';
    for (var j = 0; j < danhSachThongKe.length; j++) {
        var muc = danhSachThongKe[j];
        var diemMuc = muc.totalViews + muc.totalClicks + (muc.totalPurchases * 5);
        var tyLe = diemMuc > 0 ? Math.round((diemMuc / tuongTacCaoNhat) * 100) : 0;
        var lopDoRong = layLopDoRongThanhTienTrinh(tyLe);

        maHTML += '<div class="mb-3">';
        maHTML += '  <div class="d-flex justify-content-between align-items-center mb-1">';
        maHTML += '    <div class="fw-semibold text-dark">' + maHoaHTML(muc.category) + ' <small class="text-muted">(' + Number(muc.count || 0) + ' khóa)</small></div>';
        maHTML += '    <div class="small text-secondary">';
        maHTML += '      <strong class="text-primary me-2">' + Number(muc.totalViews || 0) + ' xem</strong>';
        maHTML += '      <strong class="text-success me-2">' + Number(muc.totalClicks || 0) + ' click</strong>';
        maHTML += '      <strong class="text-danger">' + Number(muc.totalPurchases || 0) + ' lượt mua</strong>';
        maHTML += '    </div>';
        maHTML += '  </div>';
        maHTML += '  <div class="progress thanh-tien-trinh-mong bg-light border">';
        maHTML += '    <div class="progress-bar bg-primary ' + lopDoRong + '" role="progressbar"></div>';
        maHTML += '  </div>';
        maHTML += '</div>';
    }

    khungChua.innerHTML = maHTML;
}

function hienThiBangTopKhoaHoc(danhSachKhoaHoc, cheDoLoc, danhSachNhatKy, danhSachDonHang) {
    var cheDo = cheDoLoc || 'ALL';
    var danhSachNguon = danhSachKhoaHoc || [];
    if (cheDo !== 'ALL') {
        var nhatKy = danhSachNhatKy || docDuLieuJSON('EDU_ANALYTICS_LOGS', []);
        var donHang = danhSachDonHang || layTatCaDonHang();
        var mapTam = {};
        for (var ti = 0; ti < danhSachNguon.length; ti++) {
            mapTam[danhSachNguon[ti].id] = {
                id: danhSachNguon[ti].id,
                title: danhSachNguon[ti].title,
                category: danhSachNguon[ti].category,
                views: 0,
                clicks: 0,
                purchases: 0,
                rating: danhSachNguon[ti].rating,
                ratingCount: danhSachNguon[ti].ratingCount
            };
        }
        for (var tl = 0; tl < nhatKy.length; tl++) {
            if (kiemTraNgayKhopBoLoc(nhatKy[tl].dateISO) && mapTam[nhatKy[tl].courseId]) {
                if (nhatKy[tl].type === 'VIEW') mapTam[nhatKy[tl].courseId].views += 1;
                if (nhatKy[tl].type === 'CLICK') mapTam[nhatKy[tl].courseId].clicks += 1;
            }
        }
        for (var to = 0; to < donHang.length; to++) {
            if (kiemTraNgayKhopBoLoc(donHang[to].dateISO || '') && kiemTraTrangThaiDonHopLe(donHang[to])) {
                var monDon = donHang[to].items || [];
                for (var tm = 0; tm < monDon.length; tm++) {
                    if (mapTam[monDon[tm].id]) {
                        mapTam[monDon[tm].id].purchases += Number(monDon[tm].quantity || 1);
                    }
                }
            }
        }
        var mangDaLoc = [];
        for (var tk = 0; tk < danhSachNguon.length; tk++) {
            mangDaLoc.push(mapTam[danhSachNguon[tk].id]);
        }
        danhSachKhoaHoc = mangDaLoc;
    }
    var thanBang = document.getElementById('bang-top-khoa-hoc-quan-tri');
    if (!thanBang) {
        return;
    }

    var banSao = [];
    for (var i = 0; i < danhSachKhoaHoc.length; i++) {
        banSao.push(danhSachKhoaHoc[i]);
    }

    banSao.sort(function(a, b) {
        var diemA = Number(a.purchases || 0) * 10 + Number(a.views || 0) * 2 + Number(a.clicks || 0);
        var diemB = Number(b.purchases || 0) * 10 + Number(b.views || 0) * 2 + Number(b.clicks || 0);
        return diemB - diemA;
    });

    var top5KhoaHoc = banSao.slice(0, 5);
    var maHTML = '';

    for (var k = 0; k < top5KhoaHoc.length; k++) {
        var khoaHoc = top5KhoaHoc[k];
        maHTML += '<tr>';
        maHTML += '  <td class="fw-bold text-primary">' + maHoaHTML(khoaHoc.id) + '</td>';
        maHTML += '  <td class="fw-semibold">' + maHoaHTML(khoaHoc.title) + '</td>';
        maHTML += '  <td class="text-center"><div class="badge bg-primary-subtle text-primary">' + Number(khoaHoc.views || 0) + '</div></td>';
        maHTML += '  <td class="text-center"><div class="badge bg-success-subtle text-success">' + Number(khoaHoc.clicks || 0) + '</div></td>';
        maHTML += '  <td class="text-center"><div class="badge bg-danger-subtle text-danger">' + Number(khoaHoc.purchases || 0) + '</div></td>';
        maHTML += '  <td class="text-end fw-bold text-warning"><i class="bi bi-star-fill me-1"></i>' + maHoaHTML(dinhDangDiemDanhGia(khoaHoc)) + '</td>';
        maHTML += '</tr>';
    }

    thanBang.innerHTML = maHTML;
}

function hienThiBangQuanLyKhoaHoc() {
    var thanBang = document.getElementById('bang-quan-ly-khoa-hoc');
    var oTimKiem = document.getElementById('o-tim-khoa-hoc-quan-tri');
    if (!thanBang) {
        return;
    }

    var tuKhoa = oTimKiem ? oTimKiem.value.trim().toLowerCase() : '';
    var tatCaKhoaHoc = layTatCaKhoaHoc();
    var danhSachKhop = [];

    for (var i = 0; i < tatCaKhoaHoc.length; i++) {
        var khoaHoc = tatCaKhoaHoc[i];
        var khopMa = (khoaHoc.id || '').toLowerCase().indexOf(tuKhoa) > -1;
        var khopTen = (khoaHoc.title || '').toLowerCase().indexOf(tuKhoa) > -1;
        var khopDanhMuc = (khoaHoc.category || '').toLowerCase().indexOf(tuKhoa) > -1;
        var khopGiangVien = (khoaHoc.instructor || '').toLowerCase().indexOf(tuKhoa) > -1;

        if (khopMa || khopTen || khopDanhMuc || khopGiangVien) {
            danhSachKhop.push(khoaHoc);
        }
    }

    if (danhSachKhop.length === 0) {
        thanBang.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">Không tìm thấy khóa học nào khớp từ khóa.</td></tr>';
        return;
    }

    var maHTML = '';
    for (var k = 0; k < danhSachKhop.length; k++) {
        var muc = danhSachKhop[k];
        var anhAnToan = kiemTraDuongDanAnToan(muc.image, '');
        var maAnToan = maHoaHTML(muc.id);

        maHTML += '<tr>';
        maHTML += '  <td class="fw-bold text-primary">' + maAnToan + '</td>';
        maHTML += '  <td>';
        maHTML += '    <div class="d-flex align-items-center gap-2">';
        maHTML += '      <img src="' + maHoaHTML(anhAnToan) + '" alt="' + maHoaHTML(muc.title) + '" class="rounded anh-thu-nho-quan-tri">';
        maHTML += '      <div>';
        maHTML += '        <div class="fw-bold text-dark">' + maHoaHTML(muc.title) + '</div>';
        maHTML += '        <small class="text-muted">GV: ' + maHoaHTML(muc.instructor) + '</small>';
        maHTML += '      </div>';
        maHTML += '    </div>';
        maHTML += '  </td>';
        maHTML += '  <td><div class="badge bg-primary-subtle text-primary">' + maHoaHTML(muc.category) + '</div></td>';
        maHTML += '  <td>';
        maHTML += '    <div class="fw-bold text-danger">' + maHoaHTML(dinhDangTienVND(muc.salePrice)) + '</div>';
        maHTML += '    <del class="text-muted small">' + maHoaHTML(dinhDangTienVND(muc.originalPrice)) + '</del>';
        maHTML += '  </td>';
        maHTML += '  <td class="text-center">';
        maHTML += '    <div class="small fw-semibold text-primary">' + Number(muc.views || 0) + ' xem</div>';
        maHTML += '    <div class="small text-success">' + Number(muc.clicks || 0) + ' click | ' + Number(muc.purchases || 0) + ' mua</div>';
        maHTML += '  </td>';
        maHTML += '  <td class="text-center fw-bold text-warning"><i class="bi bi-star-fill me-1"></i>' + maHoaHTML(dinhDangDiemDanhGia(muc)) + '</td>';
        maHTML += '  <td class="text-end">';
        maHTML += '    <button type="button" class="btn btn-outline-primary btn-sm me-1 nut-sua-khoa-hoc-quan-tri" data-ma-khoa-hoc="' + maAnToan + '" title="Chỉnh sửa">';
        maHTML += '      <i class="bi bi-pencil-square"></i>';
        maHTML += '    </button>';
        maHTML += '    <button type="button" class="btn btn-outline-danger btn-sm nut-xoa-khoa-hoc-quan-tri" data-ma-khoa-hoc="' + maAnToan + '" title="Xóa">';
        maHTML += '      <i class="bi bi-trash"></i>';
        maHTML += '    </button>';
        maHTML += '  </td>';
        maHTML += '</tr>';
    }

    thanBang.innerHTML = maHTML;
}

function moHopThoaiSuaKhoaHoc(maKhoaHoc) {
    var khoaHoc = timKhoaHocTheoMa(maKhoaHoc);
    if (!khoaHoc) {
        return;
    }

    document.getElementById('tieu-de-hop-thoai-khoa-hoc').textContent = 'Cập Nhật Khóa Học (' + khoaHoc.id + ')';
    document.getElementById('che-do-sua-khoa-hoc').value = 'EDIT';

    var oNhapMa = document.getElementById('nhap-ma-khoa-hoc');
    oNhapMa.value = khoaHoc.id;
    oNhapMa.readOnly = true;

    document.getElementById('nhap-ten-khoa-hoc').value = khoaHoc.title || '';
    document.getElementById('nhap-danh-muc-khoa-hoc').value = khoaHoc.category || 'Frontend';
    var oTrinhDo = document.getElementById('nhap-trinh-do-khoa-hoc'); if (oTrinhDo) oTrinhDo.value = khoaHoc.level || 'Cơ bản';
    document.getElementById('nhap-giang-vien-khoa-hoc').value = khoaHoc.instructor || '';
    document.getElementById('nhap-gia-goc-khoa-hoc').value = khoaHoc.originalPrice || 0;
    document.getElementById('nhap-gia-ban-khoa-hoc').value = khoaHoc.salePrice || 0;
    document.getElementById('nhap-anh-khoa-hoc').value = khoaHoc.image || '';
    document.getElementById('nhap-mo-ta-khoa-hoc').value = khoaHoc.description || '';
    document.getElementById('chon-khoa-hoc-noi-bat').checked = Boolean(khoaHoc.isFeatured);

    moHopThoaiKhoaHoc();
}

function xuLyXoaKhoaHoc(maKhoaHoc) {
    if (confirm('Bạn có chắc chắn muốn xóa khóa học mã ' + maKhoaHoc + ' khỏi hệ thống EDU_COURSES?')) {
        if (!luuTatCaKhoaHoc(xoaPhanTuTrongMangTheoId(layTatCaKhoaHoc(), maKhoaHoc))) {
            hienThiThongBao('Không thể xóa khóa học trong LocalStorage.', 'danger');
            return;
        }
        dongBoKhiXoaKhoaHoc(maKhoaHoc);
        lamMoiBangDieuKhienQuanTri();
        hienThiThongBao('Đã xóa khóa học ' + maKhoaHoc + ' và đồng bộ giỏ hàng/yêu thích (giữ nguyên lịch sử đơn hàng)!', 'info');
    }
}

function hienThiBangQuanLyNguoiDung() {
    var thanBang = document.getElementById('bang-quan-ly-nguoi-dung');
    if (!thanBang) {
        return;
    }

    var danhSachNguoiDung = docDuLieuJSON('EDU_USERS', []);

    if (danhSachNguoiDung.length === 0) {
        thanBang.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">Chưa có tài khoản người dùng nào.</td></tr>';
        return;
    }

    var maHTML = '';
    for (var i = 0; i < danhSachNguoiDung.length; i++) {
        var taiKhoan = danhSachNguoiDung[i];
        var laQuanTriChinh = (taiKhoan.email === EMAIL_QUAN_TRI_MAC_DINH && taiKhoan.role === 'admin');
        var biKhoa = (taiKhoan.status === 'locked');
        var nhanVaiTro = laQuanTriChinh
            ? '<div class="badge bg-warning text-dark">Quản trị viên (Admin thử nghiệm)</div>'
            : (biKhoa
                ? '<div class="badge bg-danger">Học viên (Đã khóa)</div>'
                : '<div class="badge bg-info-subtle text-dark">Học viên (Hoạt động)</div>');
        var thuocTinhVoHieu = laQuanTriChinh ? 'disabled' : '';
        var lopNutKhoa = biKhoa ? 'btn-outline-success' : 'btn-outline-warning';
        var chuNutKhoa = biKhoa ? 'Mở khóa' : 'Khóa';

        maHTML += '<tr>';
        maHTML += '  <td class="fw-bold text-secondary">' + maHoaHTML(taiKhoan.id) + '</td>';
        maHTML += '  <td class="fw-bold">' + maHoaHTML(taiKhoan.fullName) + '</td>';
        maHTML += '  <td>' + maHoaHTML(taiKhoan.email) + '</td>';
        maHTML += '  <td>' + maHoaHTML(taiKhoan.phone || '') + '</td>';
        maHTML += '  <td>' + nhanVaiTro + '</td>';
        maHTML += '  <td class="text-end">';
        maHTML += '    <button type="button" class="btn ' + lopNutKhoa + ' btn-sm me-1 nut-khoa-nguoi-dung-quan-tri" data-ma-nguoi-dung="' + maHoaHTML(taiKhoan.id) + '" ' + thuocTinhVoHieu + ' title="Khóa/Mở tài khoản">';
        maHTML += '      <i class="bi bi-lock me-1"></i>' + chuNutKhoa;
        maHTML += '    </button>';
        maHTML += '    <button type="button" class="btn btn-outline-danger btn-sm nut-xoa-nguoi-dung-quan-tri" data-ma-nguoi-dung="' + maHoaHTML(taiKhoan.id) + '" ' + thuocTinhVoHieu + ' title="Xóa tài khoản">';
        maHTML += '      <i class="bi bi-trash me-1"></i>Xóa';
        maHTML += '    </button>';
        maHTML += '  </td>';
        maHTML += '</tr>';
    }

    thanBang.innerHTML = maHTML;
}

function xuLyXoaNguoiDung(maNguoiDung) {
    var xacNhan = confirm('Bạn có chắc chắn muốn xóa tài khoản học viên này?');
    if (xacNhan) {
        var ketQuaDoc = docDuLieuJSONCoTrangThai('EDU_USERS', true);
        if (ketQuaDoc.tonTai && !ketQuaDoc.hopLe) {
            hienThiThongBao('Dữ liệu EDU_USERS đang gặp lỗi JSON.', 'danger');
            return;
        }
        var danhSachNguoiDung = ketQuaDoc.duLieu;
        var danhSachCapNhat = [];

        for (var i = 0; i < danhSachNguoiDung.length; i++) {
            if (danhSachNguoiDung[i].id !== maNguoiDung || danhSachNguoiDung[i].email === EMAIL_QUAN_TRI_MAC_DINH) {
                danhSachCapNhat.push(danhSachNguoiDung[i]);
            }
        }

        if (!luuDuLieuJSON('EDU_USERS', danhSachCapNhat)) {
            hienThiThongBao('Không thể lưu thay đổi EDU_USERS vào LocalStorage.', 'danger');
            return;
        }
        lamMoiBangDieuKhienQuanTri();
        hienThiThongBao('Đã xóa tài khoản học viên thành công!', 'info');
    }
}

function hienThiBangQuanLyDonHang() {
    var thanBang = document.getElementById('bang-quan-ly-don-hang');
    if (!thanBang) {
        return;
    }

    var danhSachDonHang = layTatCaDonHang();
    var donHangDaLoc = [];
    for (var f = 0; f < danhSachDonHang.length; f++) {
        if (kiemTraNgayKhopBoLoc(danhSachDonHang[f].dateISO || '')) {
            donHangDaLoc.push(danhSachDonHang[f]);
        }
    }

    if (donHangDaLoc.length === 0) {
        thanBang.innerHTML = '<tr><td colspan="7" class="text-center text-muted py-4">Chưa có giao dịch thanh toán mô phỏng nào trong khoảng thời gian này.</td></tr>';
        return;
    }

    var maHTML = '';
    for (var i = 0; i < donHangDaLoc.length; i++) {
        var don = donHangDaLoc[i];
        var cacMon = don.items || [];
        var chuoiTenMon = '';

        for (var j = 0; j < cacMon.length; j++) {
            if (j > 0) {
                chuoiTenMon += '; ';
            }
            chuoiTenMon += (cacMon[j].title || '') + ' (x' + (cacMon[j].quantity || 1) + ')';
        }

        var chuoiTrangThai = don.status || 'Thanh toán mô phỏng thành công - Đã kích hoạt khóa học';
        var daHoanTat = (chuoiTrangThai.indexOf('Đã kích hoạt') > -1 || chuoiTrangThai.indexOf('Hoàn tất') > -1);
        var nhanTrangThai = daHoanTat
            ? '<div class="badge bg-success">' + maHoaHTML(chuoiTrangThai) + '</div>'
            : '<div class="badge bg-warning text-dark">' + maHoaHTML(chuoiTrangThai) + '</div>';
        var maDonAnToan = maHoaHTML(don.orderId);

        maHTML += '<tr>';
        maHTML += '  <td class="fw-bold text-primary">' + maDonAnToan + '</td>';
        maHTML += '  <td>';
        maHTML += '    <div class="fw-bold">' + maHoaHTML(don.customerName) + '</div>';
        maHTML += '    <small class="text-muted">' + maHoaHTML(don.customerEmail) + ' | ' + maHoaHTML(don.customerPhone) + '</small>';
        maHTML += '  </td>';
        maHTML += '  <td>';
        maHTML += '    <div class="small fw-semibold">' + maHoaHTML(chuoiTenMon) + '</div>';
        maHTML += '    <small class="text-muted">' + maHoaHTML(don.createdAt) + '</small>';
        maHTML += '  </td>';
        maHTML += '  <td><div class="badge bg-light text-dark border">' + maHoaHTML(don.paymentMethod || 'Quét mã VietQR') + '</div></td>';
        maHTML += '  <td class="fw-bold text-danger">' + maHoaHTML(dinhDangTienVND(don.totalAmount)) + '</td>';
        maHTML += '  <td>' + nhanTrangThai + '</td>';
        maHTML += '  <td class="text-end">';
        maHTML += '    <button type="button" class="btn btn-outline-success btn-sm me-1 nut-doi-trang-thai-don-hang" data-ma-don-hang="' + maDonAnToan + '" title="Đổi trạng thái">';
        maHTML += '      <i class="bi bi-arrow-repeat"></i>';
        maHTML += '    </button>';
        maHTML += '    <button type="button" class="btn btn-outline-danger btn-sm nut-xoa-don-hang-quan-tri" data-ma-don-hang="' + maDonAnToan + '" title="Xóa đơn hàng">';
        maHTML += '      <i class="bi bi-trash"></i>';
        maHTML += '    </button>';
        maHTML += '  </td>';
        maHTML += '</tr>';
    }

    thanBang.innerHTML = maHTML;
}

function tinhLaiLuotMuaTatCaKhoaHoc() {
    var tatCaKhoaHoc = layTatCaKhoaHoc();
    var danhSachDon = layTatCaDonHang();
    var demLuotMua = {};
    for (var i = 0; i < danhSachDon.length; i++) {
        if (!kiemTraTrangThaiDonHopLe(danhSachDon[i])) {
            continue;
        }
        var cacMon = danhSachDon[i].items || [];
        for (var j = 0; j < cacMon.length; j++) {
            var idMon = cacMon[j].id;
            demLuotMua[idMon] = (demLuotMua[idMon] || 0) + Number(cacMon[j].quantity || 1);
        }
    }
    for (var k = 0; k < tatCaKhoaHoc.length; k++) {
        tatCaKhoaHoc[k].purchases = demLuotMua[tatCaKhoaHoc[k].id] || 0;
    }
    return luuTatCaKhoaHoc(tatCaKhoaHoc);
}

function xuLyDoiTrangThaiDonHang(maDonHang) {
    var danhSachDonHang = layTatCaDonHang().slice();
    for (var i = 0; i < danhSachDonHang.length; i++) {
        if (danhSachDonHang[i].orderId === maDonHang) {
            if (kiemTraTrangThaiDonHopLe(danhSachDonHang[i])) {
                danhSachDonHang[i].orderStatus = 'cancelled';
                danhSachDonHang[i].status = 'Đã hủy (mô phỏng - thu hồi quyền học)';
            } else {
                danhSachDonHang[i].orderStatus = 'paid_simulated';
                danhSachDonHang[i].status = 'Thanh toán mô phỏng thành công - Đã kích hoạt khóa học';
            }
            break;
        }
    }
    if (!luuTatCaDonHang(danhSachDonHang)) {
        hienThiThongBao('Không thể cập nhật trạng thái đơn hàng vào LocalStorage.', 'danger');
        return;
    }
    tinhLaiLuotMuaTatCaKhoaHoc();
    lamMoiBangDieuKhienQuanTri();
    hienThiThongBao('Đã cập nhật trạng thái đơn hàng ' + maDonHang + ' và đồng bộ lại số liệu lượt mua!', 'success');
}

function xuLyXoaDonHang(maDonHang) {
    if (confirm('Lưu ý: Xóa đơn hàng ' + maDonHang + ' sẽ thu hồi quyền học tương ứng và tính lại số lượt mua khóa học. Bạn có chắc chắn muốn tiếp tục?')) {
        var danhSachMoi = xoaPhanTuTrongMangTheoId(layTatCaDonHang(), maDonHang, 'orderId');
        if (!luuTatCaDonHang(danhSachMoi)) {
            hienThiThongBao('Không thể xóa đơn hàng trong LocalStorage.', 'danger');
            return;
        }
        tinhLaiLuotMuaTatCaKhoaHoc();
        lamMoiBangDieuKhienQuanTri();
        hienThiThongBao('Đã xóa đơn hàng ' + maDonHang + ' và đồng bộ lại lượt mua khóa học!', 'info');
    }
}

function hienThiBangQuanLyDanhGia() {
    var thanBang = document.getElementById('bang-quan-ly-danh-gia');
    if (!thanBang) {
        return;
    }

    var tatCaDanhGia = layTatCaDanhGia();
    var danhGiaDaLoc = [];
    for (var r = 0; r < tatCaDanhGia.length; r++) {
        if (kiemTraNgayKhopBoLoc(tatCaDanhGia[r].dateISO || '')) {
            danhGiaDaLoc.push(tatCaDanhGia[r]);
        }
    }

    if (danhGiaDaLoc.length === 0) {
        thanBang.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">Chưa có đánh giá sao nào từ học viên.</td></tr>';
        return;
    }

    var maHTML = '';
    for (var i = 0; i < danhGiaDaLoc.length; i++) {
        var danhGia = danhGiaDaLoc[i];
        var doiTuongKhoaHoc = timKhoaHocTheoMa(danhGia.courseId);
        var tenKhoaHoc = doiTuongKhoaHoc ? doiTuongKhoaHoc.title : danhGia.courseId;

        maHTML += '<tr>';
        maHTML += '  <td class="fw-bold text-primary">' + maHoaHTML(danhGia.courseId) + '</td>';
        maHTML += '  <td class="fw-semibold">' + maHoaHTML(tenKhoaHoc) + '</td>';
        maHTML += '  <td>' + maHoaHTML(danhGia.userName) + '</td>';
        maHTML += '  <td class="fw-bold text-warning"><i class="bi bi-star-fill me-1"></i>' + Number(danhGia.stars || 0) + ' sao</td>';
        maHTML += '  <td>';
        maHTML += '    <div>' + maHoaHTML(danhGia.comment) + '</div>';
        maHTML += '    <small class="text-muted">' + maHoaHTML(danhGia.createdAt) + '</small>';
        maHTML += '  </td>';
        maHTML += '  <td class="text-end">';
        maHTML += '    <button type="button" class="btn btn-outline-danger btn-sm nut-xoa-danh-gia-quan-tri" data-ma-danh-gia="' + maHoaHTML(danhGia.id) + '" data-ma-khoa-hoc="' + maHoaHTML(danhGia.courseId) + '">';
        maHTML += '      <i class="bi bi-trash"></i>';
        maHTML += '    </button>';
        maHTML += '  </td>';
        maHTML += '</tr>';
    }

    thanBang.innerHTML = maHTML;
}

function xuLyXoaDanhGia(maDanhGia, maKhoaHoc) {
    if (confirm('Bạn có chắc chắn muốn xóa đánh giá này?')) {
        luuTatCaDanhGia(xoaPhanTuTrongMangTheoId(layTatCaDanhGia(), maDanhGia));
        tinhLaiDiemDanhGiaKhoaHoc(maKhoaHoc);
        lamMoiBangDieuKhienQuanTri();
        hienThiThongBao('Đã xóa đánh giá và cập nhật lại điểm trung bình khóa học!', 'info');
    }
}


function hienThiBangQuanLyLienHe() {
    var thanBang = document.getElementById('bang-quan-ly-lien-he');
    if (!thanBang) {
        return;
    }

    var tatCaLienHe = layTatCaLienHe();
    var lienHeDaLoc = [];
    for (var i = 0; i < tatCaLienHe.length; i++) {
        if (kiemTraNgayKhopBoLoc(tatCaLienHe[i].dateISO || '')) {
            lienHeDaLoc.push(tatCaLienHe[i]);
        }
    }

    if (lienHeDaLoc.length === 0) {
        thanBang.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-4">Chưa có tin nhắn liên hệ nào được lưu.</td></tr>';
        return;
    }

    var maHTML = '';
    for (var k = 0; k < lienHeDaLoc.length; k++) {
        var lh = lienHeDaLoc[k];
        maHTML += '<tr>';
        maHTML += '  <td class="fw-bold text-primary">' + maHoaHTML(lh.id) + '</td>';
        maHTML += '  <td>';
        maHTML += '    <div class="fw-bold">' + maHoaHTML(lh.fullName) + '</div>';
        maHTML += '    <small class="text-muted">' + maHoaHTML(lh.email) + '</small>';
        maHTML += '  </td>';
        maHTML += '  <td>';
        maHTML += '    <div class="fw-semibold text-dark">' + maHoaHTML(lh.subject) + '</div>';
        maHTML += '    <div class="small text-secondary">' + maHoaHTML(lh.message) + '</div>';
        maHTML += '    <small class="text-muted">' + maHoaHTML(lh.createdAt) + '</small>';
        maHTML += '  </td>';
        maHTML += '  <td><div class="badge bg-info-subtle text-dark border">' + maHoaHTML(lh.status || 'Đã lưu cục bộ (mô phỏng)') + '</div></td>';
        maHTML += '  <td class="text-end">';
        maHTML += '    <button type="button" class="btn btn-outline-danger btn-sm nut-xoa-lien-he-quan-tri" data-ma-lien-he="' + maHoaHTML(lh.id) + '">';
        maHTML += '      <i class="bi bi-trash"></i>';
        maHTML += '    </button>';
        maHTML += '  </td>';
        maHTML += '</tr>';
    }
    thanBang.innerHTML = maHTML;
}

function xuLyXoaLienHe(maLienHe) {
    if (confirm('Bạn có chắc chắn muốn xóa tin nhắn liên hệ này?')) {
        luuTatCaLienHe(xoaPhanTuTrongMangTheoId(layTatCaLienHe(), maLienHe));
        lamMoiBangDieuKhienQuanTri();
        hienThiThongBao('Đã xóa tin nhắn liên hệ!', 'info');
    }
}

function ganSuKienTrangQuanTri() {
    ganSuKienCacBangQuanTri();
    ganSuKienBoLocVaTabQuanTri();
    ganSuKienHopThoaiKhoaHoc();
}

function ganSuKienCacBangQuanTri() {
    var bangKhoaHoc = document.getElementById('bang-quan-ly-khoa-hoc');
    if (bangKhoaHoc) {
        bangKhoaHoc.addEventListener('click', function(e) {
            var nutSua = e.target.closest('.nut-sua-khoa-hoc-quan-tri');
            if (nutSua) {
                moHopThoaiSuaKhoaHoc(nutSua.getAttribute('data-ma-khoa-hoc'));
                return;
            }
            var nutXoa = e.target.closest('.nut-xoa-khoa-hoc-quan-tri');
            if (nutXoa) {
                xuLyXoaKhoaHoc(nutXoa.getAttribute('data-ma-khoa-hoc'));
            }
        });
    }

    var bangNguoiDung = document.getElementById('bang-quan-ly-nguoi-dung');
    if (bangNguoiDung) {
        bangNguoiDung.addEventListener('click', function(e) {
            var nutKhoa = e.target.closest('.nut-khoa-nguoi-dung-quan-tri');
            if (nutKhoa && !nutKhoa.disabled) {
                xuLyDoiTrangThaiKhoaNguoiDung(nutKhoa.getAttribute('data-ma-nguoi-dung'));
                return;
            }
            var nutXoa = e.target.closest('.nut-xoa-nguoi-dung-quan-tri');
            if (nutXoa && !nutXoa.disabled) {
                xuLyXoaNguoiDung(nutXoa.getAttribute('data-ma-nguoi-dung'));
            }
        });
    }

    var bangDonHang = document.getElementById('bang-quan-ly-don-hang');
    if (bangDonHang) {
        bangDonHang.addEventListener('click', function(e) {
            var nutDoi = e.target.closest('.nut-doi-trang-thai-don-hang');
            if (nutDoi) {
                xuLyDoiTrangThaiDonHang(nutDoi.getAttribute('data-ma-don-hang'));
                return;
            }
            var nutXoa = e.target.closest('.nut-xoa-don-hang-quan-tri');
            if (nutXoa) {
                xuLyXoaDonHang(nutXoa.getAttribute('data-ma-don-hang'));
            }
        });
    }

    var bangDanhGia = document.getElementById('bang-quan-ly-danh-gia');
    if (bangDanhGia) {
        bangDanhGia.addEventListener('click', function(e) {
            var nutXoa = e.target.closest('.nut-xoa-danh-gia-quan-tri');
            if (nutXoa) {
                xuLyXoaDanhGia(nutXoa.getAttribute('data-ma-danh-gia'), nutXoa.getAttribute('data-ma-khoa-hoc'));
            }
        });
    }

    var bangLienHe = document.getElementById('bang-quan-ly-lien-he');
    if (bangLienHe) {
        bangLienHe.addEventListener('click', function(e) {
            var nutXoa = e.target.closest('.nut-xoa-lien-he-quan-tri');
            if (nutXoa) {
                xuLyXoaLienHe(nutXoa.getAttribute('data-ma-lien-he'));
            }
        });
    }
}

function ganSuKienBoLocVaTabQuanTri() {
    var oTimKiem = document.getElementById('o-tim-khoa-hoc-quan-tri');
    if (oTimKiem) {
        oTimKiem.addEventListener('input', hienThiBangQuanLyKhoaHoc);
    }

    var oLoaiLoc = document.getElementById('loai-loc-thoi-gian');
    if (oLoaiLoc) {
        oLoaiLoc.addEventListener('change', function() {
            capNhatHienThiOChonLoc();
            lamMoiBangDieuKhienQuanTri();
        });
    }

    var cacOChonThoiGian = [
        document.getElementById('o-chon-ngay-loc'),
        document.getElementById('o-chon-thang-loc'),
        document.getElementById('o-chon-nam-loc')
    ];
    for (var i = 0; i < cacOChonThoiGian.length; i++) {
        if (cacOChonThoiGian[i]) {
            cacOChonThoiGian[i].addEventListener('change', lamMoiBangDieuKhienQuanTri);
        }
    }

    var nutLocHomNay = document.getElementById('nut-loc-hom-nay-thoi-gian-thuc');
    if (nutLocHomNay) {
        nutLocHomNay.addEventListener('click', function() {
            if (oLoaiLoc) {
                oLoaiLoc.value = 'DAY';
            }
            khoiTaoNgayLocMacDinh();
            lamMoiBangDieuKhienQuanTri();
        });
    }

    var nutApDungLoc = document.getElementById('nut-ap-dung-bo-loc-thong-ke');
    if (nutApDungLoc) {
        nutApDungLoc.addEventListener('click', function() {
            lamMoiBangDieuKhienQuanTri();
            hienThiThongBao('Đã cập nhật số liệu thống kê theo bộ lọc thời gian!', 'success');
        });
    }

    var nutDatLaiLoc = document.getElementById('nut-dat-lai-bo-loc-thong-ke');
    if (nutDatLaiLoc) {
        nutDatLaiLoc.addEventListener('click', function() {
            if (oLoaiLoc) {
                oLoaiLoc.value = 'ALL';
            }
            capNhatHienThiOChonLoc();
            lamMoiBangDieuKhienQuanTri();
            hienThiThongBao('Đã hiển thị toàn bộ số liệu thống kê!', 'info');
        });
    }

    var cacNutTab = document.querySelectorAll('#thanh-chuyen-tab-quan-tri button[data-bs-toggle="pill"]');
    for (var t = 0; t < cacNutTab.length; t++) {
        cacNutTab[t].addEventListener('click', function() {
            for (var b = 0; b < cacNutTab.length; b++) {
                cacNutTab[b].classList.remove('active');
            }
            this.classList.add('active');
            var boChonMucTieu = this.getAttribute('data-bs-target');
            var cacKhungTab = document.querySelectorAll('#noi-dung-tab-quan-tri .tab-pane');
            for (var p = 0; p < cacKhungTab.length; p++) {
                cacKhungTab[p].classList.remove('show', 'active');
            }
            var khungMucTieu = document.querySelector(boChonMucTieu);
            if (khungMucTieu) {
                khungMucTieu.classList.add('show', 'active');
            }
        });
    }
}

function ganSuKienHopThoaiKhoaHoc() {
    var cacNutDongModal = document.querySelectorAll('#hop-thoai-khoa-hoc [data-bs-dismiss="modal"]');
    for (var c = 0; c < cacNutDongModal.length; c++) {
        cacNutDongModal[c].addEventListener('click', dongHopThoaiKhoaHoc);
    }

    var nutMoThem = document.getElementById('nut-mo-them-khoa-hoc');
    if (nutMoThem) {
        nutMoThem.addEventListener('click', function() {
            var danhSachKhoaHoc = layTatCaKhoaHoc();
            var soTiepTheo = danhSachKhoaHoc.length + 1;
            var maMoi = soTiepTheo < 10 ? 'KH0' + soTiepTheo : 'KH' + soTiepTheo;

            document.getElementById('tieu-de-hop-thoai-khoa-hoc').textContent = 'Thêm Khóa Học Mới';
            document.getElementById('che-do-sua-khoa-hoc').value = 'ADD';

            var oNhapMa = document.getElementById('nhap-ma-khoa-hoc');
            oNhapMa.value = maMoi;
            oNhapMa.readOnly = false;

            document.getElementById('nhap-ten-khoa-hoc').value = '';
            document.getElementById('nhap-giang-vien-khoa-hoc').value = 'ThS. Phạm Minh Đương';
            document.getElementById('nhap-gia-goc-khoa-hoc').value = 650000;
            document.getElementById('nhap-gia-ban-khoa-hoc').value = 349000;
            document.getElementById('nhap-anh-khoa-hoc').value = 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=600&auto=format&fit=crop&q=60';
            document.getElementById('nhap-mo-ta-khoa-hoc').value = 'Khóa học thực chiến cung cấp kiến thức nền tảng và kỹ năng xây dựng dự án chuẩn doanh nghiệp.';
            document.getElementById('chon-khoa-hoc-noi-bat').checked = true;

            moHopThoaiKhoaHoc();
        });
    }

    var bieuMauKhoaHoc = document.getElementById('bieu-mau-khoa-hoc-quan-tri');
    if (bieuMauKhoaHoc) {
        bieuMauKhoaHoc.addEventListener('submit', function(e) {
            e.preventDefault();
            xuLyLuuBieuMauKhoaHoc();
        });
    }
}

function xuLyLuuBieuMauKhoaHoc() {
    var cheDo = document.getElementById('che-do-sua-khoa-hoc').value;
    var maKhoaHoc = document.getElementById('nhap-ma-khoa-hoc').value.trim();
    var tenKhoaHoc = document.getElementById('nhap-ten-khoa-hoc').value.trim();
    var danhMuc = document.getElementById('nhap-danh-muc-khoa-hoc').value;
    var oTrinhDo = document.getElementById('nhap-trinh-do-khoa-hoc');
    var trinhDo = oTrinhDo ? oTrinhDo.value : 'Cơ bản';
    var giangVien = document.getElementById('nhap-giang-vien-khoa-hoc').value.trim();
    var giaGoc = Number(document.getElementById('nhap-gia-goc-khoa-hoc').value);
    var giaBan = Number(document.getElementById('nhap-gia-ban-khoa-hoc').value);
    var duongDanAnh = kiemTraDuongDanAnToan(document.getElementById('nhap-anh-khoa-hoc').value.trim(), '');
    var moTa = document.getElementById('nhap-mo-ta-khoa-hoc').value.trim();
    var laNoiBat = document.getElementById('chon-khoa-hoc-noi-bat').checked;

    if (maKhoaHoc === '' || tenKhoaHoc === '' || giangVien === '') {
        hienThiThongBao('Vui lòng nhập đầy đủ mã khóa học, tên khóa học và giảng viên!', 'danger');
        return;
    }

    if (isNaN(giaGoc) || isNaN(giaBan) || giaGoc < 0 || giaBan < 0) {
        hienThiThongBao('Học phí gốc và học phí bán phải là số hợp lệ lớn hơn hoặc bằng 0!', 'danger');
        return;
    }

    if (giaBan > giaGoc) {
        hienThiThongBao('Học phí bán không được lớn hơn học phí gốc (khóa miễn phí phải để cả hai bằng 0)!', 'warning');
        return;
    }

    if (duongDanAnh === '') {
        hienThiThongBao('Đường dẫn ảnh khóa học không hợp lệ (chỉ chấp nhận http/https hoặc đường dẫn nội bộ).', 'danger');
        return;
    }

    var danhSachKhoaHoc = layTatCaKhoaHoc();

    if (cheDo === 'ADD') {
        for (var i = 0; i < danhSachKhoaHoc.length; i++) {
            if (danhSachKhoaHoc[i].id === maKhoaHoc) {
                hienThiThongBao('Mã khóa học đã tồn tại! Vui lòng nhập mã khác.', 'danger');
                return;
            }
        }

        danhSachKhoaHoc.unshift({
            id: maKhoaHoc,
            title: tenKhoaHoc,
            category: danhMuc,
        level: trinhDo,
            instructor: giangVien,
            originalPrice: giaGoc,
            salePrice: giaBan,
            rating: 0,
            ratingCount: 0,
            views: 0,
            clicks: 0,
            purchases: 0,
            image: duongDanAnh,
            isFeatured: laNoiBat,
            isBestSeller: false,
            isNew: true,
            description: moTa
        });
    } else {
        for (var j = 0; j < danhSachKhoaHoc.length; j++) {
            if (danhSachKhoaHoc[j].id === maKhoaHoc) {
                danhSachKhoaHoc[j].title = tenKhoaHoc;
                danhSachKhoaHoc[j].category = danhMuc;
                danhSachKhoaHoc[j].level = trinhDo;
                danhSachKhoaHoc[j].instructor = giangVien;
                danhSachKhoaHoc[j].originalPrice = giaGoc;
                danhSachKhoaHoc[j].salePrice = giaBan;
                danhSachKhoaHoc[j].image = duongDanAnh;
                danhSachKhoaHoc[j].description = moTa;
                danhSachKhoaHoc[j].isFeatured = laNoiBat;
                break;
            }
        }
    }

    if (!luuTatCaKhoaHoc(danhSachKhoaHoc)) {
        hienThiThongBao('Không thể lưu khóa học vào LocalStorage (bộ nhớ đầy hoặc dữ liệu gốc đang lỗi JSON).', 'danger');
        return;
    }
    dongHopThoaiKhoaHoc();
    lamMoiBangDieuKhienQuanTri();
    hienThiThongBao('Đã lưu thông tin khóa học vào EDU_COURSES thành công!', 'success');
}


function xuLyDoiTrangThaiKhoaNguoiDung(maNguoiDung) {
    var ketQuaDoc = docDuLieuJSONCoTrangThai('EDU_USERS', true);
    if (ketQuaDoc.tonTai && !ketQuaDoc.hopLe) {
        hienThiThongBao('Dữ liệu EDU_USERS đang gặp lỗi JSON.', 'danger');
        return false;
    }
    var danhSach = ketQuaDoc.duLieu;
    var daCapNhat = false;
    var trangThaiMoi = 'active';
    for (var i = 0; i < danhSach.length; i++) {
        if (danhSach[i].id === maNguoiDung) {
            if (danhSach[i].email === EMAIL_QUAN_TRI_MAC_DINH && danhSach[i].role === 'admin') {
                hienThiThongBao('Không thể khóa tài khoản Quản trị viên mặc định.', 'warning');
                return false;
            }
            trangThaiMoi = (danhSach[i].status === 'locked') ? 'active' : 'locked';
            danhSach[i].status = trangThaiMoi;
            daCapNhat = true;
            break;
        }
    }
    if (!daCapNhat) {
        return false;
    }
    if (!luuDuLieuJSON('EDU_USERS', danhSach)) {
        hienThiThongBao('Không thể cập nhật trạng thái tài khoản vào LocalStorage.', 'danger');
        return false;
    }
    hienThiBangQuanLyNguoiDung();
    hienThiThongBao(trangThaiMoi === 'locked' ? 'Đã khóa tài khoản học viên!' : 'Đã mở khóa tài khoản học viên!', 'info');
    return true;
}

function khoiTaoDongHoThoiGianThuc() {
    var khungDongHo = document.getElementById('dong-ho-thoi-gian-thuc');
    if (!khungDongHo) {
        return;
    }
    function capNhatDongHo() {
        var lucNay = new Date();
        khungDongHo.textContent = 'Thời gian thực: ' + lucNay.toLocaleString('vi-VN');
    }
    capNhatDongHo();
    if (typeof setInterval === 'function') {
        setInterval(capNhatDongHo, 1000);
    }
}
