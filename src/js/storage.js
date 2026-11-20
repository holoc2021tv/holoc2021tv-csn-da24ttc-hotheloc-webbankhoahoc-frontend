/**
 * FILE: src/js/storage.js
 * NHIEM VU: Lop luu tru dung chung an toan cho LocalStorage/SessionStorage, chong XSS,
 * sinh ma duy nhat, kiem tra quyen so huu theo trang thai don hang, quan ly Gio hang,
 * Don hang, Danh gia (chi nguoi da mua hop le), Yeu thich, Da xem, Lien he, Voucher va Tien do hoc.
 */

var KHOA_LUU_GIO_HANG = 'EDU_CART_ITEMS';
var KHOA_LUU_DON_HANG = 'EDU_PURCHASES';
var KHOA_LUU_YEU_THICH = 'EDU_FAVORITES';
var KHOA_LUU_DA_XEM = 'EDU_RECENT_VIEWED';
var KHOA_LUU_DANH_GIA = 'EDU_REVIEWS';
var KHOA_LUU_LIEN_HE = 'EDU_CONTACTS';
var KHOA_LUU_TIEN_DO_HOC = 'EDU_LEARNING_PROGRESS';
var KHOA_LUU_PHIEN_DANG_NHAP = 'EDU_CURRENT_USER';
var boDemSinhMa = 0;

/**
 * 0.1. Ma hoa ky tu HTML dac biet de phong chong XSS khi ghep chuoi HTML
 */
function maHoaHTML(chuoi) {
    var ketQua = String(chuoi == null ? '' : chuoi);

    ketQua = ketQua.replace(/&/g, '&amp;');
    ketQua = ketQua.replace(/</g, '&lt;');
    ketQua = ketQua.replace(/>/g, '&gt;');
    ketQua = ketQua.replace(/"/g, '&quot;');
    ketQua = ketQua.replace(/'/g, '&#039;');

    return ketQua;
}

/**
 * 0.2. Kiem tra URL hinh anh / video an toan (chan javascript:, data:, vbscript:)
 */
function kiemTraDuongDanAnToan(duongDan, duongDanDuPhong) {
    var macDinh = duongDanDuPhong || '';
    if (!duongDan || typeof duongDan !== 'string') {
        return macDinh;
    }

    var chuoiSach = duongDan.trim();
    if (chuoiSach === '') {
        return macDinh;
    }

    var chuoiThuong = chuoiSach.toLowerCase();
    if (chuoiThuong.indexOf('http://') === 0 || chuoiThuong.indexOf('https://') === 0) {
        return chuoiSach;
    }

    if (chuoiThuong.indexOf('javascript:') === -1 &&
        chuoiThuong.indexOf('data:') === -1 &&
        chuoiThuong.indexOf('vbscript:') === -1 &&
        chuoiSach.indexOf('//') !== 0 &&
        chuoiSach.indexOf(':') === -1) {
        return chuoiSach;
    }

    return macDinh;
}

/**
 * 0.3. Doc du lieu JSON an toan tu LocalStorage (khong tu dong xoa hay ghi de du lieu loi)
 */
function docDuLieuJSON(khoa, giaTriMacDinh) {
    var duLieu = null;
    try {
        duLieu = localStorage.getItem(khoa);
    } catch (loiDoc) {
        console.error('Khong the doc LocalStorage:', khoa, loiDoc);
        return giaTriMacDinh;
    }

    if (duLieu === null) {
        return giaTriMacDinh;
    }

    try {
        var ketQua = JSON.parse(duLieu);
        if (Array.isArray(giaTriMacDinh) && !Array.isArray(ketQua)) {
            console.error('Cau truc du lieu khong dung dinh dang mang:', khoa);
            return giaTriMacDinh;
        }
        return ketQua;
    } catch (loi) {
        console.error('Du lieu JSON khong hop le:', khoa);
        return giaTriMacDinh;
    }
}

/**
 * 0.4. Doc du lieu JSON kem trang thai kiem tra de bao ve du lieu quan trong
 */
function docDuLieuJSONCoTrangThai(khoa, yeuCauMang) {
    var duLieuGoc = null;
    try {
        duLieuGoc = localStorage.getItem(khoa);
    } catch (loiDoc) {
        console.error('Khong the truy cap LocalStorage:', khoa, loiDoc);
        return { tonTai: false, hopLe: false, duLieu: yeuCauMang ? [] : null };
    }

    if (duLieuGoc === null) {
        return { tonTai: false, hopLe: true, duLieu: yeuCauMang ? [] : null };
    }

    try {
        var ketQua = JSON.parse(duLieuGoc);
        if (yeuCauMang && !Array.isArray(ketQua)) {
            console.error('Cau truc du lieu quan trong khong dung mang:', khoa);
            return { tonTai: true, hopLe: false, duLieu: [] };
        }
        if (!yeuCauMang && (ketQua === null || typeof ketQua !== 'object' || Array.isArray(ketQua))) {
            console.error('Cau truc du lieu quan trong khong dung doi tuong:', khoa);
            return { tonTai: true, hopLe: false, duLieu: null };
        }
        return { tonTai: true, hopLe: true, duLieu: ketQua };
    } catch (loi) {
        console.error('Du lieu JSON quan trong bi loi:', khoa);
        return { tonTai: true, hopLe: false, duLieu: yeuCauMang ? [] : null };
    }
}

/**
 * 0.4b. Luu / Xoa du lieu tap trung vao LocalStorage (bat loi QuotaExceededError / quyen ghi)
 */
function luuDuLieuJSON(khoa, giaTri) {
    try {
        localStorage.setItem(khoa, JSON.stringify(giaTri));
        return true;
    } catch (loi) {
        console.error('Khong the luu du lieu vao LocalStorage:', khoa, loi);
        return false;
    }
}

function luuChuoiThoLocal(khoa, chuoi) {
    try {
        localStorage.setItem(khoa, String(chuoi));
        return true;
    } catch (loi) {
        console.error('Khong the luu chuoi vao LocalStorage:', khoa, loi);
        return false;
    }
}

function xoaDuLieuKho(khoa) {
    try {
        localStorage.removeItem(khoa);
        return true;
    } catch (loi) {
        console.error('Khong the xoa khoa LocalStorage:', khoa, loi);
        return false;
    }
}

/**
 * 0.4c. Doc / Luu / Xoa du lieu an toan trong SessionStorage
 */
function docPhienJSON(khoa, giaTriMacDinh) {
    try {
        var duLieu = sessionStorage.getItem(khoa);
        if (duLieu === null) {
            return giaTriMacDinh;
        }
        return JSON.parse(duLieu);
    } catch (loi) {
        console.error('Khong the doc SessionStorage:', khoa, loi);
        return giaTriMacDinh;
    }
}

function luuPhienJSON(khoa, giaTri) {
    try {
        sessionStorage.setItem(khoa, JSON.stringify(giaTri));
        return true;
    } catch (loi) {
        console.error('Khong the luu SessionStorage:', khoa, loi);
        return false;
    }
}

function xoaPhienKho(khoa) {
    try {
        sessionStorage.removeItem(khoa);
        return true;
    } catch (loi) {
        console.error('Khong the xoa SessionStorage:', khoa, loi);
        return false;
    }
}

/**
 * 0.4d. Sinh ma dinh danh duy nhat phia client (tranh trung trong cung mili-giay - ID-01)
 */
function taoMaDuyNhat(tienTo, mangHienCo, tenTruong) {
    var danhSach = Array.isArray(mangHienCo) ? mangHienCo : [];
    var truong = tenTruong || 'id';
    var tapKyTu = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
    var thuLan = 0;

    while (thuLan < 50) {
        boDemSinhMa = (boDemSinhMa + 1) % 10000;
        var ngauNhien = '';
        for (var k = 0; k < 4; k++) {
            ngauNhien = ngauNhien + tapKyTu.charAt(Math.floor(Math.random() * tapKyTu.length));
        }
        var maMoi = String(tienTo || 'ID_') + new Date().getTime() + '_' + boDemSinhMa + '_' + ngauNhien;
        var biTrung = false;
        for (var i = 0; i < danhSach.length; i++) {
            if (danhSach[i] && danhSach[i][truong] === maMoi) {
                biTrung = true;
                break;
            }
        }
        if (!biTrung) {
            return maMoi;
        }
        thuLan = thuLan + 1;
    }
    return String(tienTo || 'ID_') + new Date().getTime() + '_' + Math.floor(Math.random() * 1000000);
}

/**
 * 0.4e. Quan ly phien dang nhap thong nhat (ho tro Ghi nho -> LocalStorage, khong ghi nho -> SessionStorage)
 */
function layNguoiDungHienTai() {
    var ketQuaLocal = docDuLieuJSONCoTrangThai(KHOA_LUU_PHIEN_DANG_NHAP, false);
    if (ketQuaLocal.tonTai && ketQuaLocal.hopLe && ketQuaLocal.duLieu && ketQuaLocal.duLieu.email) {
        return ketQuaLocal.duLieu;
    }
    var phienTam = docPhienJSON(KHOA_LUU_PHIEN_DANG_NHAP, null);
    if (phienTam && typeof phienTam === 'object' && phienTam.email) {
        return phienTam;
    }
    return null;
}

function luuNguoiDungHienTai(nguoiDung, ghiNhoDangNhap) {
    if (!nguoiDung || typeof nguoiDung !== 'object') {
        return false;
    }
    var suDungLocal = (ghiNhoDangNhap !== false);
    if (suDungLocal) {
        var ketQuaLuu = luuDuLieuJSON(KHOA_LUU_PHIEN_DANG_NHAP, nguoiDung);
        if (ketQuaLuu) {
            xoaPhienKho(KHOA_LUU_PHIEN_DANG_NHAP);
        }
        return ketQuaLuu;
    }
    var ketQuaPhien = luuPhienJSON(KHOA_LUU_PHIEN_DANG_NHAP, nguoiDung);
    if (ketQuaPhien) {
        xoaDuLieuKho(KHOA_LUU_PHIEN_DANG_NHAP);
    }
    return ketQuaPhien;
}

function xoaNguoiDungHienTai() {
    var xoaLocal = xoaDuLieuKho(KHOA_LUU_PHIEN_DANG_NHAP);
    var xoaSession = xoaPhienKho(KHOA_LUU_PHIEN_DANG_NHAP);
    return xoaLocal || xoaSession;
}

/**
 * 0.4f. Kiem tra dinh dang email hop le bang bieu thuc chinh quy
 */
function kiemTraEmailHopLe(email) {
    if (!email || typeof email !== 'string') {
        return false;
    }
    var bieuThucEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return bieuThucEmail.test(email.trim());
}

/**
 * 0.4g. Don dep ma khoa hoc da bi xoa khoi Gio hang, Yeu thich va Da xem (KHONG xoa lich su don hang)
 */
function dongBoKhiXoaKhoaHoc(maKhoaHoc) {
    xoaKhoiGio(maKhoaHoc);

    var tatCaYeuThich = docDuLieuJSON(KHOA_LUU_YEU_THICH, []);
    var yeuThichMoi = [];
    for (var i = 0; i < tatCaYeuThich.length; i++) {
        var muc = tatCaYeuThich[i];
        var maMuc = (typeof muc === 'string') ? muc : (muc && muc.courseId ? muc.courseId : '');
        if (maMuc !== maKhoaHoc) {
            yeuThichMoi.push(muc);
        }
    }
    luuDuLieuJSON(KHOA_LUU_YEU_THICH, yeuThichMoi);

    var tatCaDaXem = docDuLieuJSON(KHOA_LUU_DA_XEM, []);
    var daXemMoi = [];
    for (var j = 0; j < tatCaDaXem.length; j++) {
        var mucXem = tatCaDaXem[j];
        var maXem = (typeof mucXem === 'string') ? mucXem : (mucXem && mucXem.courseId ? mucXem.courseId : '');
        if (maXem !== maKhoaHoc) {
            daXemMoi.push(mucXem);
        }
    }
    luuDuLieuJSON(KHOA_LUU_DA_XEM, daXemMoi);
}

/**
 * 0.4h. Ham dung chung: Xoa phan tu trong mang theo thuoc tinh id (hoac ten khoa bat ky)
 */
function xoaPhanTuTrongMangTheoId(mangGoc, maCanXoa, tenTruong) {
    var truong = tenTruong || 'id';
    var mangMoi = [];
    for (var i = 0; i < mangGoc.length; i++) {
        if (mangGoc[i] && mangGoc[i][truong] !== maCanXoa) {
            mangMoi.push(mangGoc[i]);
        }
    }
    return mangMoi;
}

/**
 * 0.4i. Ham dung chung: Tach ma khoa hoc va email tu muc luu trong EDU_FAVORITES / EDU_RECENT_VIEWED
 */
function layThongTinMucTheoTaiKhoan(muc) {
    if (typeof muc === 'string') {
        return { courseId: muc, userEmail: '' };
    }
    if (muc && typeof muc === 'object' && muc.courseId) {
        return { courseId: muc.courseId, userEmail: muc.userEmail || '' };
    }
    return { courseId: '', userEmail: '' };
}

/**
 * 0.4j. Ham dung chung: Sinh ma Captcha ngau nhien (mac dinh 5 ky tu)
 */
function taoMaCaptcha(doDai) {
    var soKyTu = doDai || 5;
    var tapKyTu = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var chuoiMa = '';
    for (var i = 0; i < soKyTu; i++) {
        var viTri = Math.floor(Math.random() * tapKyTu.length);
        chuoiMa = chuoiMa + tapKyTu.charAt(viTri);
    }
    return chuoiMa;
}

/**
 * 0.4k. Ham dung chung: Chi cho phep nhap ky tu so (0-9) vao o input
 */
function ganChiChoNhapSo(phanTuNhap) {
    if (!phanTuNhap) {
        return;
    }
    phanTuNhap.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });
}

/**
 * 0.4l. Ham dung chung: Bat/tat nut Yeu thich, doi bieu tuong tim va hien thi Toast
 */
function xuLyNutYeuThichChung(maKhoaHoc, phanTuNut) {
    var ketQua = batTatKhoaHocYeuThich(maKhoaHoc);
    if (!ketQua.success) {
        hienThiThongBao(ketQua.message || 'Không thể lưu danh sách Yêu thích vào trình duyệt.', 'danger');
        return false;
    }
    var daThem = ketQua.daThem;
    var bieuTuong = phanTuNut ? phanTuNut.querySelector('i') : null;
    if (bieuTuong) {
        bieuTuong.className = daThem ? 'bi bi-heart-fill text-danger' : 'bi bi-heart text-secondary';
    }
    if (daThem) {
        hienThiThongBao('Đã lưu khóa học vào danh sách Yêu thích!', 'success');
    } else {
        hienThiThongBao('Đã xóa khóa học khỏi danh sách Yêu thích.', 'info');
    }
    return daThem;
}

/**
 * 0.5. Lay email nguoi dung dang dang nhap (tra ve '' neu la khach vang lai)
 */
function layEmailNguoiDungDangNhap() {
    var nguoiDung = layNguoiDungHienTai();
    if (nguoiDung && nguoiDung.email) {
        return String(nguoiDung.email).trim().toLowerCase();
    }
    return '';
}

/**
 * 0.5b. Kiem tra trang thai don hang co du dieu kien cap quyen hoc hay khong (OWN-01)
 * Chi cac don thanh toan mo phong thanh cong / da kich hoat moi duoc cap quyen.
 */
function kiemTraTrangThaiDonHopLe(donHang) {
    if (!donHang || typeof donHang !== 'object') {
        return false;
    }
    if (donHang.orderStatus) {
        var maTrangThai = String(donHang.orderStatus).trim().toLowerCase();
        return (maTrangThai === 'paid_simulated' || maTrangThai === 'activated');
    }
    var chuoiTrangThai = String(donHang.status || '').trim().toLowerCase();
    if (chuoiTrangThai === '') {
        return false;
    }
    if (chuoiTrangThai.indexOf('hủy') > -1 ||
        chuoiTrangThai.indexOf('cancelled') > -1 ||
        chuoiTrangThai.indexOf('failed') > -1 ||
        chuoiTrangThai.indexOf('thất bại') > -1 ||
        chuoiTrangThai.indexOf('pending') > -1 ||
        chuoiTrangThai.indexOf('chờ') > -1 ||
        chuoiTrangThai.indexOf('void') > -1) {
        return false;
    }
    return (chuoiTrangThai.indexOf('paid_simulated') > -1 ||
        chuoiTrangThai.indexOf('đã kích hoạt') > -1 ||
        chuoiTrangThai.indexOf('thành công') > -1);
}

/**
 * 0.6. Kiem tra nguoi dung hien tai da mua khoa hoc voi don hang hop le trong EDU_PURCHASES chua
 */
function kiemTraDaMuaKhoaHoc(maKhoaHoc, emailChiDinh) {
    var emailHienTai = emailChiDinh ? String(emailChiDinh).trim().toLowerCase() : layEmailNguoiDungDangNhap();
    if (emailHienTai === '') {
        return false;
    }

    var danhSachDonHang = layTatCaDonHang();
    for (var i = 0; i < danhSachDonHang.length; i++) {
        var don = danhSachDonHang[i];
        if (!kiemTraTrangThaiDonHopLe(don)) {
            continue;
        }
        var emailDon = don.customerEmail ? String(don.customerEmail).trim().toLowerCase() : '';
        if (emailDon === emailHienTai && don.items && Array.isArray(don.items)) {
            for (var j = 0; j < don.items.length; j++) {
                if (don.items[j] && don.items[j].id === maKhoaHoc) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * 0.7. Hop nhat gio khach vao tai khoan vua dang nhap & loc bo cac khoa hoc da so huu (F-02)
 */
function locBoKhoaHocDaSoHuuKhoiGio() {
    var emailHienTai = layEmailNguoiDungDangNhap();
    if (emailHienTai === '') {
        return 0;
    }
    var tatCaGio = docDuLieuJSON(KHOA_LUU_GIO_HANG, []);
    var gioTaiKhoan = [];
    var gioKhac = [];
    var gioKhach = [];

    for (var i = 0; i < tatCaGio.length; i++) {
        var muc = tatCaGio[i];
        if (!muc || !muc.id) {
            continue;
        }
        var emailMuc = muc.userEmail ? String(muc.userEmail).trim().toLowerCase() : '';
        if (emailMuc === emailHienTai) {
            gioTaiKhoan.push(muc);
        } else if (emailMuc === '') {
            gioKhach.push(muc);
        } else {
            gioKhac.push(muc);
        }
    }

    // Hop nhat gio khach vao gio tai khoan (khong trung ma khoa hoc)
    for (var g = 0; g < gioKhach.length; g++) {
        var daCo = false;
        for (var k = 0; k < gioTaiKhoan.length; k++) {
            if (gioTaiKhoan[k].id === gioKhach[g].id) {
                daCo = true;
                break;
            }
        }
        if (!daCo) {
            gioKhach[g].userEmail = emailHienTai;
            gioTaiKhoan.push(gioKhach[g]);
        }
    }

    // Loc bo khoa hoc da so huu khoi gio tai khoan
    var gioCuoiCung = [];
    var soLuongDaLoc = 0;
    for (var j = 0; j < gioTaiKhoan.length; j++) {
        if (kiemTraDaMuaKhoaHoc(gioTaiKhoan[j].id, emailHienTai)) {
            soLuongDaLoc = soLuongDaLoc + 1;
        } else {
            gioCuoiCung.push(gioTaiKhoan[j]);
        }
    }

    if (gioKhach.length > 0 || soLuongDaLoc > 0) {
        luuDuLieuJSON(KHOA_LUU_GIO_HANG, gioCuoiCung.concat(gioKhac));
        capNhatHuyHieuGioHang();
    }
    return soLuongDaLoc;
}

/**
 * 1. Lay danh sach san pham trong gio hang theo dung tai khoan dang dang nhap (hoac gio khach - F-02)
 */
function layGioHang() {
    var tatCaGio = docDuLieuJSON(KHOA_LUU_GIO_HANG, []);
    var emailHienTai = layEmailNguoiDungDangNhap();
    var ketQua = [];
    for (var i = 0; i < tatCaGio.length; i++) {
        var muc = tatCaGio[i];
        if (!muc || !muc.id) {
            continue;
        }
        var emailMuc = muc.userEmail ? String(muc.userEmail).trim().toLowerCase() : '';
        if (emailMuc === emailHienTai) {
            ketQua.push(muc);
        }
    }
    return ketQua;
}

/**
 * 2. Luu mang gio hang cua tai khoan hien tai vao LocalStorage (bao toan gio cua tai khoan khac - F-02)
 */
function luuGioHang(mangGioHang) {
    var emailHienTai = layEmailNguoiDungDangNhap();
    var tatCaGio = docDuLieuJSON(KHOA_LUU_GIO_HANG, []);
    var gioTaiKhoanKhac = [];

    for (var i = 0; i < tatCaGio.length; i++) {
        var muc = tatCaGio[i];
        if (!muc || !muc.id) {
            continue;
        }
        var emailMuc = muc.userEmail ? String(muc.userEmail).trim().toLowerCase() : '';
        if (emailMuc !== emailHienTai) {
            gioTaiKhoanKhac.push(muc);
        }
    }

    var mangGanEmail = [];
    for (var j = 0; j < mangGioHang.length; j++) {
        var mon = mangGioHang[j];
        if (mon && mon.id) {
            mon.userEmail = emailHienTai;
            mangGanEmail.push(mon);
        }
    }

    var daLuu = luuDuLieuJSON(KHOA_LUU_GIO_HANG, mangGanEmail.concat(gioTaiKhoanKhac));
    if (daLuu) {
        capNhatHuyHieuGioHang();
    }
    return daLuu;
}

/**
 * 3. Them khoa hoc vao gio hang (chan mua trung khoa hoc da so huu va kiem tra ket qua luu)
 */
function themVaoGio(maKhoaHoc, soLuong) {
    var thongTinKhoaHoc = timKhoaHocTheoMa(maKhoaHoc);

    if (!thongTinKhoaHoc) {
        return { success: false, message: 'Không tìm thấy thông tin khóa học!' };
    }

    if (kiemTraDaMuaKhoaHoc(maKhoaHoc)) {
        return {
            success: false,
            message: 'Bạn đã sở hữu khóa học "' + thongTinKhoaHoc.title + '"! Vui lòng vào mục Khóa học của tôi để học.'
        };
    }

    var danhSachGio = layGioHang();
    for (var i = 0; i < danhSachGio.length; i++) {
        if (danhSachGio[i].id === maKhoaHoc) {
            return {
                success: false,
                message: 'Khóa học "' + thongTinKhoaHoc.title + '" đã có trong giỏ hàng của bạn!'
            };
        }
    }

    danhSachGio.push({
        id: thongTinKhoaHoc.id,
        title: thongTinKhoaHoc.title,
        category: thongTinKhoaHoc.category,
        instructor: thongTinKhoaHoc.instructor,
        salePrice: Number(thongTinKhoaHoc.salePrice || 0),
        originalPrice: Number(thongTinKhoaHoc.originalPrice || 0),
        image: thongTinKhoaHoc.image,
        quantity: 1
    });

    if (!luuGioHang(danhSachGio)) {
        return {
            success: false,
            message: 'Không thể lưu giỏ hàng vào trình duyệt (bộ nhớ LocalStorage đầy hoặc bị chặn).'
        };
    }
    return { success: true, message: 'Đã thêm khóa học "' + thongTinKhoaHoc.title + '" vào giỏ hàng!' };
}

/**
 * 4. Cap nhat so luong cua mot khoa hoc trong gio hang (toi da 1 cho khoa hoc so)
 */
function capNhatSoLuongGioHang(maKhoaHoc, soLuongMoi) {
    var danhSachGio = layGioHang();
    for (var i = 0; i < danhSachGio.length; i++) {
        if (danhSachGio[i].id === maKhoaHoc) {
            var giaTriSoLuong = Number(soLuongMoi);
            if (giaTriSoLuong <= 0) {
                danhSachGio.splice(i, 1);
            } else {
                danhSachGio[i].quantity = 1;
            }
            break;
        }
    }
    return luuGioHang(danhSachGio);
}

/**
 * 5. Xoa mot khoa hoc khoi gio hang bang vong lap for
 */
function xoaKhoiGio(maKhoaHoc) {
    return luuGioHang(xoaPhanTuTrongMangTheoId(layGioHang(), maKhoaHoc));
}

/**
 * 6. Xoa sach toan bo gio hang
 */
function xoaSachGioHang() {
    return luuGioHang([]);
}

/**
 * 7. Tinh tong so luong khoa hoc trong gio bang vong lap for
 */
function demTongSoLuongGioHang() {
    var danhSachGio = layGioHang();
    var tongSoLuong = 0;
    for (var i = 0; i < danhSachGio.length; i++) {
        tongSoLuong = tongSoLuong + Number(danhSachGio[i].quantity || 1);
    }
    return tongSoLuong;
}

/**
 * 8. Tinh tong so tien thanh toan cua gio hang bang vong lap for (uu tien gia moi nhat trong catalog)
 */
function tinhTongTienGioHang() {
    var danhSachGio = layGioHang();
    var tongTien = 0;
    for (var i = 0; i < danhSachGio.length; i++) {
        var khoaHocHienHanh = typeof timKhoaHocTheoMa === 'function' ? timKhoaHocTheoMa(danhSachGio[i].id) : null;
        var donGia = khoaHocHienHanh ? Number(khoaHocHienHanh.salePrice) : Number(danhSachGio[i].salePrice || danhSachGio[i].price || 0);
        if (isNaN(donGia) || donGia < 0) donGia = 0;
        var soLuong = Number(danhSachGio[i].quantity || 1);
        tongTien = tongTien + (donGia * soLuong);
    }
    return tongTien;
}

/**
 * 9. Cap nhat so hien thi tren icon Gio hang o thanh Navbar
 */
function capNhatHuyHieuGioHang() {
    var phanTuHuyHieu = document.getElementById('so-luong-gio-hang');
    if (phanTuHuyHieu) {
        phanTuHuyHieu.textContent = String(demTongSoLuongGioHang());
    }
}

/**
 * 10. Quan ly danh sach Khoa hoc Yeu thich (EDU_FAVORITES) tach theo tai khoan dang dang nhap
 */
function layDanhSachMaYeuThich() {
    var tatCa = docDuLieuJSON(KHOA_LUU_YEU_THICH, []);
    var emailHienTai = layEmailNguoiDungDangNhap();
    var ketQua = [];
    for (var i = 0; i < tatCa.length; i++) {
        var thongTin = layThongTinMucTheoTaiKhoan(tatCa[i]);
        if (thongTin.courseId !== '' && thongTin.userEmail === emailHienTai) {
            ketQua.push(thongTin.courseId);
        }
    }
    return ketQua;
}

function kiemTraKhoaHocYeuThich(maKhoaHoc) {
    var danhSachYeuThich = layDanhSachMaYeuThich();
    for (var i = 0; i < danhSachYeuThich.length; i++) {
        if (danhSachYeuThich[i] === maKhoaHoc) {
            return true;
        }
    }
    return false;
}

function batTatKhoaHocYeuThich(maKhoaHoc) {
    var tatCa = docDuLieuJSON(KHOA_LUU_YEU_THICH, []);
    var emailHienTai = layEmailNguoiDungDangNhap();
    var danhSachMoi = [];
    var daTimThay = false;

    for (var i = 0; i < tatCa.length; i++) {
        var thongTin = layThongTinMucTheoTaiKhoan(tatCa[i]);
        if (thongTin.courseId === maKhoaHoc && thongTin.userEmail === emailHienTai) {
            daTimThay = true;
        } else {
            danhSachMoi.push(tatCa[i]);
        }
    }

    var daThem = false;
    if (!daTimThay) {
        danhSachMoi.unshift({ courseId: maKhoaHoc, userEmail: emailHienTai });
        daThem = true;
    }

    var daLuu = luuDuLieuJSON(KHOA_LUU_YEU_THICH, danhSachMoi);
    return {
        success: daLuu,
        daThem: daThem,
        message: daLuu ? '' : 'Không thể lưu danh sách Yêu thích vào LocalStorage.'
    };
}

function layDanhSachKhoaHocYeuThich() {
    var danhSachMa = layDanhSachMaYeuThich();
    var ketQua = [];
    for (var i = 0; i < danhSachMa.length; i++) {
        var khoaHoc = timKhoaHocTheoMa(danhSachMa[i]);
        if (khoaHoc) {
            ketQua.push(khoaHoc);
        }
    }
    return ketQua;
}

/**
 * 11. Quan ly danh sach Khoa hoc Da xem gan day (EDU_RECENT_VIEWED) tach theo tai khoan
 */
function layDanhSachMaDaXem() {
    var tatCa = docDuLieuJSON(KHOA_LUU_DA_XEM, []);
    var emailHienTai = layEmailNguoiDungDangNhap();
    var ketQua = [];
    for (var i = 0; i < tatCa.length; i++) {
        var thongTin = layThongTinMucTheoTaiKhoan(tatCa[i]);
        if (thongTin.courseId !== '' && thongTin.userEmail === emailHienTai) {
            ketQua.push(thongTin.courseId);
        }
    }
    return ketQua;
}

function themKhoaHocVuaXem(maKhoaHoc) {
    if (!maKhoaHoc) {
        return false;
    }
    var tatCa = docDuLieuJSON(KHOA_LUU_DA_XEM, []);
    var emailHienTai = layEmailNguoiDungDangNhap();
    var danhSachKhac = [];
    var danhSachCuaToi = [{ courseId: maKhoaHoc, userEmail: emailHienTai }];

    for (var i = 0; i < tatCa.length; i++) {
        var thongTin = layThongTinMucTheoTaiKhoan(tatCa[i]);
        if (thongTin.userEmail === emailHienTai) {
            if (thongTin.courseId !== maKhoaHoc && danhSachCuaToi.length < 8) {
                danhSachCuaToi.push({ courseId: thongTin.courseId, userEmail: emailHienTai });
            }
        } else {
            danhSachKhac.push(tatCa[i]);
        }
    }

    return luuDuLieuJSON(KHOA_LUU_DA_XEM, danhSachCuaToi.concat(danhSachKhac));
}

function layDanhSachKhoaHocVuaXem() {
    var danhSachMa = layDanhSachMaDaXem();
    var ketQua = [];
    for (var i = 0; i < danhSachMa.length; i++) {
        var khoaHoc = timKhoaHocTheoMa(danhSachMa[i]);
        if (khoaHoc) {
            ketQua.push(khoaHoc);
        }
    }
    return ketQua;
}

/**
 * 12. Quan ly Lich su Don hang / Giao dich mo phong (EDU_PURCHASES)
 */
function layTatCaDonHang() {
    var kiemTra = docDuLieuJSONCoTrangThai(KHOA_LUU_DON_HANG, true);
    return kiemTra.duLieu;
}

function luuTatCaDonHang(mangDonHang) {
    return luuDuLieuJSON(KHOA_LUU_DON_HANG, mangDonHang);
}

/**
 * 13. Quan ly Danh gia sao cho tung khoa hoc (EDU_REVIEWS)
 * Rang buoc nhat quan (ADM-06): Chi tai khoan da mua khoa hoc voi don hang hop le moi duoc danh gia (1 lan/khoa hoc).
 */
function layTatCaDanhGia() {
    var kiemTra = docDuLieuJSONCoTrangThai(KHOA_LUU_DANH_GIA, true);
    return kiemTra.duLieu;
}

function luuTatCaDanhGia(mangDanhGia) {
    return luuDuLieuJSON(KHOA_LUU_DANH_GIA, mangDanhGia);
}

function layDanhGiaCuaKhoaHoc(maKhoaHoc) {
    var tatCaDanhGia = layTatCaDanhGia();
    var danhSach = [];
    for (var i = 0; i < tatCaDanhGia.length; i++) {
        if (tatCaDanhGia[i].courseId === maKhoaHoc) {
            danhSach.push(tatCaDanhGia[i]);
        }
    }
    return danhSach;
}

function tinhLaiDiemDanhGiaKhoaHoc(maKhoaHoc) {
    var danhGiaKhoaHoc = layDanhGiaCuaKhoaHoc(maKhoaHoc);
    var tongSoSao = 0;
    for (var i = 0; i < danhGiaKhoaHoc.length; i++) {
        tongSoSao = tongSoSao + Number(danhGiaKhoaHoc[i].stars || 0);
    }

    var diemTrungBinh = 0;
    if (danhGiaKhoaHoc.length > 0) {
        diemTrungBinh = Math.round((tongSoSao / danhGiaKhoaHoc.length) * 10) / 10;
    }

    var tatCaKhoaHoc = layTatCaKhoaHoc();
    for (var j = 0; j < tatCaKhoaHoc.length; j++) {
        if (tatCaKhoaHoc[j].id === maKhoaHoc) {
            tatCaKhoaHoc[j].rating = diemTrungBinh;
            tatCaKhoaHoc[j].ratingCount = danhGiaKhoaHoc.length;
            break;
        }
    }
    return luuTatCaKhoaHoc(tatCaKhoaHoc);
}

function themDanhGiaKhoaHoc(maKhoaHoc, soSaoNhap, noiDungBinhLuan, tenNguoiDanhGia, emailNguoiDanhGia) {
    var soSao = Number(soSaoNhap);
    if (isNaN(soSao) || soSao < 1 || soSao > 5) {
        return { success: false, message: 'Vui lòng chọn số sao từ 1 đến 5!' };
    }

    var nguoiDungHienTai = layNguoiDungHienTai();
    if (!nguoiDungHienTai || !nguoiDungHienTai.email) {
        return { success: false, message: 'Vui lòng đăng nhập tài khoản trước khi gửi đánh giá sao!' };
    }

    var emailDangNhap = String(nguoiDungHienTai.email).trim().toLowerCase();

    if (!kiemTraDaMuaKhoaHoc(maKhoaHoc, emailDangNhap)) {
        return { success: false, message: 'Chỉ học viên đã đăng ký mua khóa học này (đơn hợp lệ) mới có thể gửi đánh giá!' };
    }

    var kiemTraDanhGia = docDuLieuJSONCoTrangThai(KHOA_LUU_DANH_GIA, true);
    if (kiemTraDanhGia.tonTai && !kiemTraDanhGia.hopLe) {
        return { success: false, message: 'Dữ liệu đánh giá đang gặp lỗi định dạng, không thể ghi đè.' };
    }

    var tatCaDanhGia = kiemTraDanhGia.duLieu;
    for (var i = 0; i < tatCaDanhGia.length; i++) {
        var emailCu = tatCaDanhGia[i].userEmail ? String(tatCaDanhGia[i].userEmail).trim().toLowerCase() : '';
        if (tatCaDanhGia[i].courseId === maKhoaHoc && emailCu === emailDangNhap) {
            return { success: false, message: 'Bạn đã gửi đánh giá cho khóa học này rồi (mỗi tài khoản chỉ đánh giá 1 lần)!' };
        }
    }

    var thoiDiemHienTai = new Date();
    var chuoiNgay = typeof layChuoiNgayHomNay === 'function' ? layChuoiNgayHomNay() : '2026-11-19';

    var danhGiaMoi = {
        id: taoMaDuyNhat('REV_', tatCaDanhGia, 'id'),
        courseId: maKhoaHoc,
        stars: soSao,
        comment: noiDungBinhLuan,
        userName: tenNguoiDanhGia || nguoiDungHienTai.fullName || 'Học viên EduCourses',
        userEmail: nguoiDungHienTai.email,
        dateISO: chuoiNgay,
        createdAt: thoiDiemHienTai.toLocaleString('vi-VN')
    };

    var banSaoDanhGia = tatCaDanhGia.slice();
    banSaoDanhGia.unshift(danhGiaMoi);
    if (!luuTatCaDanhGia(banSaoDanhGia)) {
        return { success: false, message: 'Không thể lưu đánh giá vào LocalStorage (bộ nhớ đầy hoặc bị chặn).' };
    }

    tinhLaiDiemDanhGiaKhoaHoc(maKhoaHoc);

    if (typeof ghiNhatKyTuongTac === 'function') {
        ghiNhatKyTuongTac('REVIEW', maKhoaHoc, soSao);
    }

    return { success: true, message: 'Đánh giá khóa học (' + soSao + ' sao) thành công!' };
}

/**
 * 14. Quan ly tin nhan Lien he luu tru mo phong (EDU_CONTACTS)
 */
function layTatCaLienHe() {
    var kiemTra = docDuLieuJSONCoTrangThai(KHOA_LUU_LIEN_HE, true);
    return kiemTra.duLieu;
}

function luuTatCaLienHe(mangLienHe) {
    return luuDuLieuJSON(KHOA_LUU_LIEN_HE, mangLienHe);
}

function luuLienHeMoi(hoTen, email, tieuDe, noiDung) {
    var kiemTra = docDuLieuJSONCoTrangThai(KHOA_LUU_LIEN_HE, true);
    if (kiemTra.tonTai && !kiemTra.hopLe) {
        return { success: false, message: 'Dữ liệu liên hệ hiện không hợp lệ trong LocalStorage, chưa thể lưu mới.' };
    }

    var danhSachLienHe = kiemTra.duLieu.slice();
    var thoiDiemHienTai = new Date();
    var chuoiNgay = typeof layChuoiNgayHomNay === 'function' ? layChuoiNgayHomNay() : '2026-11-19';

    var banGhiMoi = {
        id: taoMaDuyNhat('LH_', danhSachLienHe, 'id'),
        fullName: hoTen,
        email: email,
        subject: tieuDe,
        message: noiDung,
        status: 'Đã lưu cục bộ (mô phỏng)',
        dateISO: chuoiNgay,
        createdAt: thoiDiemHienTai.toLocaleString('vi-VN')
    };

    danhSachLienHe.unshift(banGhiMoi);
    if (!luuTatCaLienHe(danhSachLienHe)) {
        return { success: false, message: 'Không thể lưu nội dung liên hệ vào LocalStorage (bộ nhớ đầy hoặc bị chặn).' };
    }
    return {
        success: true,
        data: banGhiMoi,
        message: 'Đã lưu nội dung liên hệ cục bộ trên trình duyệt (chế độ mô phỏng frontend - mã ' + banGhiMoi.id + ', chưa gửi email/Zalo thật).'
    };
}

/**
 * 15. Ham dung chung tao HTML the khoa hoc (giam trung lap code giua home.js va courses.js)
 */
function taoMaHTMLTheKhoaHoc(khoaHoc, tienToLop) {
    var nhomLop = tienToLop || 'trang-chu';
    var daYeuThich = kiemTraKhoaHocYeuThich(khoaHoc.id);
    var lopBieuTuongTim = daYeuThich ? 'bi-heart-fill text-danger' : 'bi-heart text-secondary';
    var soLuotXem = Number(khoaHoc.views || 0);
    var soLuotClick = Number(khoaHoc.clicks || 0);
    var chuoiDiemSao = dinhDangDiemDanhGia(khoaHoc);
    var anhAnToan = kiemTraDuongDanAnToan(khoaHoc.image, '');
    var maAnToan = maHoaHTML(khoaHoc.id);
    var maUrl = encodeURIComponent(khoaHoc.id || '');
    var tieuDeAnToan = maHoaHTML(khoaHoc.title);
    var nhanClick = (nhomLop === 'danh-sach') ? ' lượt click' : ' click';

    var maHTML = '';
    maHTML += '<article class="card shadow-sm border-0 the-khoa-hoc">';
    maHTML += '  <div class="position-relative">';
    maHTML += '    <a href="course-detail.html?id=' + maUrl + '" class="lien-ket-dem-click-' + nhomLop + '" data-ma-khoa-hoc="' + maAnToan + '">';
    maHTML += '      <img src="' + maHoaHTML(anhAnToan) + '" class="card-img-top" alt="' + tieuDeAnToan + '">';
    maHTML += '    </a>';
    maHTML += '    <button type="button" class="btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle shadow-sm nut-yeu-thich-' + nhomLop + '" data-ma-khoa-hoc="' + maAnToan + '" title="Lưu yêu thích">';
    maHTML += '      <i class="bi ' + lopBieuTuongTim + '"></i>';
    maHTML += '    </button>';
    maHTML += '  </div>';
    maHTML += '  <div class="than-the-khoa-hoc">';
    maHTML += '    <div class="thong-tin-phu-khoa-hoc">';
    maHTML += '      <div class="d-flex flex-wrap gap-1"><small class="badge bg-primary-subtle text-primary fw-semibold">' + maHoaHTML(khoaHoc.category) + '</small><small class="badge bg-light text-secondary border fw-semibold">' + maHoaHTML(khoaHoc.level || 'Cơ bản') + '</small></div>';
    maHTML += '      <small class="text-warning fw-bold"><i class="bi bi-star-fill me-1"></i>' + maHoaHTML(chuoiDiemSao) + '</small>';
    maHTML += '    </div>';
    maHTML += '    <h5 class="card-title fw-bold fs-6 mb-1">';
    maHTML += '      <a href="course-detail.html?id=' + maUrl + '" class="text-dark text-decoration-none lien-ket-dem-click-' + nhomLop + '" data-ma-khoa-hoc="' + maAnToan + '">' + tieuDeAnToan + '</a>';
    maHTML += '    </h5>';
    maHTML += '    <p class="card-text text-muted small mb-1">GV: ' + maHoaHTML(khoaHoc.instructor) + '</p>';
    maHTML += '    <div class="text-secondary small mb-1"><i class="bi bi-clock me-1 text-info"></i>' + maHoaHTML(khoaHoc.duration || '12 giờ học') + ' (' + Number(khoaHoc.lessonsCount || 20) + ' bài)</div>';
    maHTML += '    <div class="thong-tin-phu-khoa-hoc text-muted small">';
    maHTML += '      <small><i class="bi bi-eye me-1 text-primary"></i>' + soLuotXem + ' lượt xem</small>';
    maHTML += '      <small><i class="bi bi-hand-index-thumb me-1 text-success"></i>' + soLuotClick + nhanClick + '</small>';
    maHTML += '    </div>';
    maHTML += '    <div class="chan-the-khoa-hoc">';
    var giaGocSo = Number(khoaHoc.originalPrice || 0);
    var giaBanSo = Number(khoaHoc.salePrice || 0);
    var phanTramGiam = (giaGocSo > giaBanSo && giaGocSo > 0) ? Math.round(((giaGocSo - giaBanSo) / giaGocSo) * 100) : 0;

    maHTML += '      <div class="nhom-gia-khoa-hoc">';
    if (giaBanSo === 0) {
        maHTML += '        <strong class="text-success fs-5">Miễn phí</strong>';
        maHTML += '        <small class="badge bg-success-subtle text-success fw-bold">0đ</small>';
    } else {
        maHTML += '        <strong class="text-danger fs-5">' + maHoaHTML(dinhDangTienVND(giaBanSo)) + '</strong>';
        if (giaGocSo > giaBanSo) {
            maHTML += '        <del class="text-muted small">' + maHoaHTML(dinhDangTienVND(giaGocSo)) + '</del>';
        }
        if (phanTramGiam > 0) {
            maHTML += '        <small class="badge bg-danger-subtle text-danger fw-bold">-' + phanTramGiam + '%</small>';
        }
    }
    maHTML += '      </div>';
    maHTML += '      <div class="nhom-nut-khoa-hoc">';
    maHTML += '        <button type="button" class="btn btn-primary btn-sm nut-them-gio-' + nhomLop + '" data-ma-khoa-hoc="' + maAnToan + '">';
    maHTML += '          <i class="bi bi-cart-plus me-1"></i> Thêm vào giỏ';
    maHTML += '        </button>';
    maHTML += '        <a href="course-detail.html?id=' + maUrl + '" class="btn btn-outline-secondary btn-sm lien-ket-dem-click-' + nhomLop + '" data-ma-khoa-hoc="' + maAnToan + '">Xem chi tiết</a>';
    maHTML += '      </div>';
    maHTML += '    </div>';
    maHTML += '  </div>';
    maHTML += '</article>';
    return maHTML;
}

/**
 * 16. Kiem tra quyen gui danh gia sao cua nguoi dung hien tai (nhat quan ADM-06)
 */
function kiemTraQuyenGuiDanhGia(maKhoaHoc) {
    var nguoiDung = layNguoiDungHienTai();
    if (!nguoiDung || !nguoiDung.email) {
        return { duocPhep: false, lyDo: 'Vui lòng đăng nhập và mua khóa học để gửi đánh giá sao.' };
    }

    var emailDangNhap = String(nguoiDung.email).trim().toLowerCase();
    if (!kiemTraDaMuaKhoaHoc(maKhoaHoc, emailDangNhap)) {
        return { duocPhep: false, lyDo: 'Chỉ học viên đã đăng ký mua khóa học này (đơn hợp lệ) mới có thể gửi đánh giá.' };
    }

    var tatCaDanhGia = layTatCaDanhGia();
    for (var i = 0; i < tatCaDanhGia.length; i++) {
        var emailCu = tatCaDanhGia[i].userEmail ? String(tatCaDanhGia[i].userEmail).trim().toLowerCase() : '';
        if (tatCaDanhGia[i].courseId === maKhoaHoc && emailCu === emailDangNhap) {
            return { duocPhep: false, lyDo: 'Bạn đã gửi đánh giá cho khóa học này rồi (mỗi tài khoản 1 lần).' };
        }
    }

    return { duocPhep: true, lyDo: 'Bạn đủ điều kiện đánh giá khóa học này.' };
}

/**
 * 17. Tinh so tien giam theo ma Voucher mo phong (TVU2026: giam 10%, EDU50K: giam 50.000d)
 */
function tinhGiamGiaVoucher(maVoucher, tongTamTinh) {
    var maChuan = String(maVoucher || '').trim().toUpperCase();
    var tamTinh = Number(tongTamTinh || 0);
    if (maChuan === '' || isNaN(tamTinh) || tamTinh <= 0) {
        return { hopLe: false, ma: '', soTienGiam: 0, thongBao: 'Vui lòng nhập mã giảm giá.' };
    }

    if (maChuan === 'TVU2026') {
        var giam10 = Math.round(tamTinh * 0.1);
        return { hopLe: true, ma: 'TVU2026', soTienGiam: giam10, thongBao: 'Áp dụng mã TVU2026 giảm 10% thành công!' };
    }

    if (maChuan === 'EDU50K') {
        var giam50k = tamTinh >= 50000 ? 50000 : tamTinh;
        return { hopLe: true, ma: 'EDU50K', soTienGiam: giam50k, thongBao: 'Áp dụng mã EDU50K giảm 50.000đ thành công!' };
    }

    return { hopLe: false, ma: '', soTienGiam: 0, thongBao: 'Mã giảm giá không tồn tại hoặc đã hết hạn.' };
}

/**
 * 18. Lay tien do hoc tap mo phong (0, 50, 100) theo tai khoan va ma khoa hoc
 */
function layTienDoHocTap(maKhoaHoc) {
    var emailHienTai = layEmailNguoiDungDangNhap();
    if (emailHienTai === '' || !kiemTraDaMuaKhoaHoc(maKhoaHoc, emailHienTai)) {
        return 0;
    }
    var tatCaTienDo = docDuLieuJSON(KHOA_LUU_TIEN_DO_HOC, []);
    for (var i = 0; i < tatCaTienDo.length; i++) {
        var muc = tatCaTienDo[i];
        if (muc && muc.courseId === maKhoaHoc && muc.userEmail === emailHienTai) {
            return Number(muc.percent || 0);
        }
    }
    return 0;
}

/**
 * 19. Cap nhat tien do hoc tap mo phong (chi cap nhat khi da so huu hop le va kiem tra ket qua luu)
 */
function capNhatTienDoHocTap(maKhoaHoc, phanTramMoi) {
    var emailHienTai = layEmailNguoiDungDangNhap();
    if (emailHienTai === '' || !kiemTraDaMuaKhoaHoc(maKhoaHoc, emailHienTai)) {
        return { success: false, percent: 0, message: 'Bạn chưa sở hữu khóa học này nên không thể cập nhật tiến độ.' };
    }
    var mucPhanTram = Number(phanTramMoi || 0);
    if (isNaN(mucPhanTram) || mucPhanTram < 0) mucPhanTram = 0;
    if (mucPhanTram > 100) mucPhanTram = 100;

    var tatCaTienDo = docDuLieuJSON(KHOA_LUU_TIEN_DO_HOC, []).slice();
    var daTimThay = false;
    var ketQuaCuoi = mucPhanTram;

    for (var i = 0; i < tatCaTienDo.length; i++) {
        var muc = tatCaTienDo[i];
        if (muc && muc.courseId === maKhoaHoc && muc.userEmail === emailHienTai) {
            var hienTai = Number(muc.percent || 0);
            ketQuaCuoi = mucPhanTram > hienTai ? mucPhanTram : hienTai;
            tatCaTienDo[i] = {
                courseId: maKhoaHoc,
                userEmail: emailHienTai,
                percent: ketQuaCuoi,
                updatedAt: new Date().toLocaleString('vi-VN')
            };
            daTimThay = true;
            break;
        }
    }

    if (!daTimThay) {
        tatCaTienDo.push({
            courseId: maKhoaHoc,
            userEmail: emailHienTai,
            percent: ketQuaCuoi,
            updatedAt: new Date().toLocaleString('vi-VN')
        });
    }

    var daLuu = luuDuLieuJSON(KHOA_LUU_TIEN_DO_HOC, tatCaTienDo);
    return {
        success: daLuu,
        percent: daLuu ? ketQuaCuoi : 0,
        message: daLuu ? 'Đã cập nhật tiến độ học tập (mô phỏng).' : 'Không thể lưu tiến độ học tập vào LocalStorage.'
    };
}

var KHOA_LUU_CHUNG_NHAN = 'EDU_CERTIFICATES';

/**
 * 20. Lay danh sach chung nhan hoan thanh da luu trong LocalStorage
 */
function layTatCaChungNhan() {
    return docDuLieuJSON(KHOA_LUU_CHUNG_NHAN, []);
}

/**
 * 21. Tim hoac cap moi chung nhan hoan thanh (chi cap 1 lan duy nhat khi du dieu kien)
 */
function layHoacCapChungNhanKhoaHoc(maKhoaHoc) {
    var nguoiDung = layNguoiDungHienTai();
    if (!nguoiDung || !nguoiDung.email) {
        return { hopLe: false, thongBao: 'Vui lòng đăng nhập để xem chứng nhận khóa học.' };
    }
    var emailChuan = String(nguoiDung.email).trim().toLowerCase();
    if (!kiemTraDaMuaKhoaHoc(maKhoaHoc, emailChuan)) {
        return { hopLe: false, thongBao: 'Từ chối cấp chứng nhận: Tài khoản hiện tại chưa sở hữu khóa học này.' };
    }
    if (layTienDoHocTap(maKhoaHoc) < 100) {
        return { hopLe: false, thongBao: 'Bạn cần hoàn thành 100% tiến độ khóa học trước khi xem chứng nhận (mô phỏng).' };
    }

    var danhSach = layTatCaChungNhan();
    for (var i = 0; i < danhSach.length; i++) {
        var cn = danhSach[i];
        if (cn && cn.courseId === maKhoaHoc && cn.userEmail && String(cn.userEmail).toLowerCase() === emailChuan) {
            return { hopLe: true, chungNhan: cn, moiCap: false };
        }
    }

    var namHienTai = String(new Date().getFullYear());
    var banGhiMoi = {
        id: taoMaDuyNhat('CERT', danhSach, 'id'),
        userEmail: emailChuan,
        userName: nguoiDung.fullName || 'Học viên EduCourses',
        courseId: maKhoaHoc,
        certCode: 'CERT-DEMO-' + maKhoaHoc + '-' + namHienTai + '-' + String(danhSach.length + 1),
        issuedAt: new Date().toLocaleDateString('vi-VN'),
        issuedAtISO: new Date().toISOString()
    };

    danhSach.push(banGhiMoi);
    if (!luuDuLieuJSON(KHOA_LUU_CHUNG_NHAN, danhSach)) {
        return { hopLe: false, thongBao: 'Không thể lưu bản ghi chứng nhận vào LocalStorage.' };
    }
    return { hopLe: true, chungNhan: banGhiMoi, moiCap: true };
}
