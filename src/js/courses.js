/**
 * FILE: src/js/courses.js
 * NHIEM VU: Hien thi danh sach 55 khoa hoc co phan trang (9 khoa/trang),
 * tim kiem, loc va sap xep bang ham dung chung taoMaHTMLTheKhoaHoc().
 */

var SO_KHOA_HOC_MOI_TRANG = 9;
var trangHienTai = 1;
var danhSachDaLocHienTai = [];

document.addEventListener('DOMContentLoaded', function() {
    capNhatHuyHieuGioHang();
    dongBoDanhMucBoLoc();

    var thamSoUrl = new URLSearchParams(window.location.search);
    var danhMucTuUrl = thamSoUrl.get('category');
    var boLocDanhMuc = document.getElementById('bo-loc-danh-muc');
    if (danhMucTuUrl && boLocDanhMuc) {
        boLocDanhMuc.value = danhMucTuUrl;
    }

    apDungBoLocKhoaHoc();
    ganSuKienBoLocKhoaHoc();
    ganSuKienDanhSachKhoaHoc();
});

function ganSuKienDanhSachKhoaHoc() {
    var khungDanhSach = document.getElementById('danh-sach-khoa-hoc');
    if (khungDanhSach) {
        khungDanhSach.addEventListener('click', function(e) {
            var nutYeuThich = e.target.closest('.nut-yeu-thich-danh-sach');
            if (nutYeuThich) {
                var maKhoaHoc = nutYeuThich.getAttribute('data-ma-khoa-hoc');
                if (maKhoaHoc) {
                    xuLyNutYeuThichChung(maKhoaHoc, nutYeuThich);
                }
                return;
            }

            var nutThemGio = e.target.closest('.nut-them-gio-danh-sach');
            if (nutThemGio) {
                var maThem = nutThemGio.getAttribute('data-ma-khoa-hoc');
                if (maThem) {
                    xuLyThemGioHangDanhSach(maThem);
                }
                return;
            }

            var lienKetChiTiet = e.target.closest('.lien-ket-dem-click-danh-sach');
            if (lienKetChiTiet) {
                var maClick = lienKetChiTiet.getAttribute('data-ma-khoa-hoc');
                if (maClick) {
                    tangLuotClickKhoaHoc(maClick);
                }
            }
        });
    }

    var thanhPhanTrang = document.getElementById('thanh-phan-trang-khoa-hoc');
    if (thanhPhanTrang) {
        thanhPhanTrang.addEventListener('click', function(e) {
            var nutTrang = e.target.closest('.nut-chuyen-trang');
            if (nutTrang) {
                e.preventDefault();
                var soTrang = Number(nutTrang.getAttribute('data-trang'));
                if (soTrang >= 1) {
                    trangHienTai = soTrang;
                    hienThiDanhSachKhoaHoc(danhSachDaLocHienTai);
                }
            }
        });
    }
}

function ganSuKienBoLocKhoaHoc() {
    var oTimKiem = document.getElementById('o-tim-kiem-khoa-hoc');
    var nutTimKiem = document.getElementById('nut-tim-kiem-khoa-hoc');
    var boLocDanhMuc = document.getElementById('bo-loc-danh-muc');
    var boLocTrinhDo = document.getElementById('bo-loc-trinh-do');
    var boLocMucGia = document.getElementById('bo-loc-muc-gia');
    var boLocSapXep = document.getElementById('bo-loc-sap-xep');
    var nutDatLai = document.getElementById('nut-dat-lai-bo-loc');

    if (nutTimKiem) nutTimKiem.addEventListener('click', function() { trangHienTai = 1; apDungBoLocKhoaHoc(); });
    if (oTimKiem) oTimKiem.addEventListener('input', function() { trangHienTai = 1; apDungBoLocKhoaHoc(); });
    if (boLocDanhMuc) boLocDanhMuc.addEventListener('change', function() { trangHienTai = 1; apDungBoLocKhoaHoc(); });
    if (boLocTrinhDo) boLocTrinhDo.addEventListener('change', function() { trangHienTai = 1; apDungBoLocKhoaHoc(); });
    if (boLocMucGia) boLocMucGia.addEventListener('change', function() { trangHienTai = 1; apDungBoLocKhoaHoc(); });
    if (boLocSapXep) boLocSapXep.addEventListener('change', function() { trangHienTai = 1; apDungBoLocKhoaHoc(); });

    if (nutDatLai) {
        nutDatLai.addEventListener('click', function() {
            oTimKiem.value = '';
            boLocDanhMuc.value = 'ALL';
            if (boLocTrinhDo) boLocTrinhDo.value = 'ALL';
            boLocMucGia.value = 'ALL';
            boLocSapXep.value = 'DEFAULT';
            trangHienTai = 1;
            apDungBoLocKhoaHoc();
            hienThiThongBao('Đã đặt lại bộ lọc khóa học!', 'info');
        });
    }
}

function apDungBoLocKhoaHoc() {
    var tuKhoa = document.getElementById('o-tim-kiem-khoa-hoc').value.trim().toLowerCase();
    var danhMuc = document.getElementById('bo-loc-danh-muc').value;
    var boLocTrinhDo = document.getElementById('bo-loc-trinh-do');
    var trinhDo = boLocTrinhDo ? boLocTrinhDo.value : 'ALL';
    var mucGia = document.getElementById('bo-loc-muc-gia').value;
    var kieuSapXep = document.getElementById('bo-loc-sap-xep').value;

    var tatCaKhoaHoc = layTatCaKhoaHoc();
    var danhSachDaLoc = [];

    for (var i = 0; i < tatCaKhoaHoc.length; i++) {
        var khoaHoc = tatCaKhoaHoc[i];
        var tieuDeThuong = (khoaHoc.title || '').toLowerCase();
        var giangVienThuong = (khoaHoc.instructor || '').toLowerCase();

        var khopTuKhoa = (tieuDeThuong.indexOf(tuKhoa) > -1) || (giangVienThuong.indexOf(tuKhoa) > -1);
        var khopDanhMuc = (danhMuc === 'ALL') || (khoaHoc.category === danhMuc);
        var khopTrinhDo = (trinhDo === 'ALL') || ((khoaHoc.level || 'Cơ bản') === trinhDo);

        var khopGia = true;
        if (mucGia === 'FREE') {
            khopGia = Number(khoaHoc.salePrice) === 0;
        } else if (mucGia === 'UNDER_300') {
            khopGia = khoaHoc.salePrice < 300000;
        } else if (mucGia === '300_TO_450') {
            khopGia = (khoaHoc.salePrice >= 300000 && khoaHoc.salePrice <= 450000);
        } else if (mucGia === 'OVER_450') {
            khopGia = khoaHoc.salePrice > 450000;
        }

        if (khopTuKhoa && khopDanhMuc && khopTrinhDo && khopGia) {
            danhSachDaLoc.push(khoaHoc);
        }
    }

    if (kieuSapXep === 'PRICE_ASC') {
        danhSachDaLoc.sort(function(a, b) { return a.salePrice - b.salePrice; });
    } else if (kieuSapXep === 'PRICE_DESC') {
        danhSachDaLoc.sort(function(a, b) { return b.salePrice - a.salePrice; });
    } else if (kieuSapXep === 'RATING_DESC') {
        danhSachDaLoc.sort(function(a, b) { return Number(b.rating || 0) - Number(a.rating || 0); });
    }

    danhSachDaLocHienTai = danhSachDaLoc;
    hienThiDanhSachKhoaHoc(danhSachDaLoc);
}

function hienThiDanhSachKhoaHoc(danhSachKhoaHoc) {
    var khungDanhSach = document.getElementById('danh-sach-khoa-hoc');
    var nhanKetQua = document.getElementById('so-ket-qua-khoa-hoc');
    var thanhPhanTrang = document.getElementById('thanh-phan-trang-khoa-hoc');
    if (!khungDanhSach) {
        return;
    }

    var tongSoTrang = Math.ceil(danhSachKhoaHoc.length / SO_KHOA_HOC_MOI_TRANG);
    if (tongSoTrang < 1) tongSoTrang = 1;
    if (trangHienTai > tongSoTrang) trangHienTai = tongSoTrang;

    if (nhanKetQua) {
        nhanKetQua.textContent = 'Hiển thị ' + danhSachKhoaHoc.length + ' khóa học phù hợp (Trang ' + trangHienTai + '/' + tongSoTrang + ')';
    }

    if (danhSachKhoaHoc.length === 0) {
        var maHTMLRong = '';
        maHTMLRong += '<div class="alert alert-light border text-center py-4 mb-0">';
        maHTMLRong += '  <p class="mb-0 text-muted">Không tìm thấy khóa học nào khớp với bộ lọc của bạn.</p>';
        maHTMLRong += '</div>';
        khungDanhSach.innerHTML = maHTMLRong;
        if (thanhPhanTrang) thanhPhanTrang.innerHTML = '';
        return;
    }

    var viTriBatDau = (trangHienTai - 1) * SO_KHOA_HOC_MOI_TRANG;
    var viTriKetThuc = viTriBatDau + SO_KHOA_HOC_MOI_TRANG;
    var danhSachTrang = danhSachKhoaHoc.slice(viTriBatDau, viTriKetThuc);

    var maHTML = '';
    for (var i = 0; i < danhSachTrang.length; i++) {
        maHTML += taoMaHTMLTheKhoaHoc(danhSachTrang[i], 'danh-sach');
    }
    khungDanhSach.innerHTML = maHTML;

    if (thanhPhanTrang) {
        if (tongSoTrang <= 1) {
            thanhPhanTrang.innerHTML = '';
        } else {
            var maTrang = '';
            for (var p = 1; p <= tongSoTrang; p++) {
                var lopActive = (p === trangHienTai) ? ' active' : '';
                maTrang += '<li class="page-item' + lopActive + '"><a class="page-link nut-chuyen-trang" href="#" data-trang="' + p + '">' + p + '</a></li>';
            }
            thanhPhanTrang.innerHTML = maTrang;
        }
    }
}

function xuLyThemGioHangDanhSach(maKhoaHoc) {
    tangLuotClickKhoaHoc(maKhoaHoc);
    var ketQua = themVaoGio(maKhoaHoc, 1);
    hienThiThongBao(ketQua.message, ketQua.success ? 'success' : 'warning');
    apDungBoLocKhoaHoc();
}

function dongBoDanhMucBoLoc() {
    var boLocDanhMuc = document.getElementById('bo-loc-danh-muc');
    if (!boLocDanhMuc) {
        return;
    }
    var tatCaKhoaHoc = layTatCaKhoaHoc();
    var danhMucDaCo = {};
    var i;
    for (i = 0; i < boLocDanhMuc.options.length; i++) {
        danhMucDaCo[boLocDanhMuc.options[i].value] = true;
    }
    for (i = 0; i < tatCaKhoaHoc.length; i++) {
        var dm = tatCaKhoaHoc[i].category;
        if (dm && !danhMucDaCo[dm]) {
            danhMucDaCo[dm] = true;
            var tuyChon = document.createElement('option');
            tuyChon.value = dm;
            tuyChon.textContent = dm;
            boLocDanhMuc.appendChild(tuyChon);
        }
    }
}
