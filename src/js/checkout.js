/**
 * FILE: src/js/checkout.js
 * NHIỆM VỤ: Hiển thị tóm tắt đơn hàng, tự động điền thông tin học viên đã đăng nhập,
 * tạo mã QR thanh toán và lưu lịch sử đơn hàng vào LocalStorage (EDU_PURCHASES).
 */

document.addEventListener('DOMContentLoaded', function() {
    updateCartBadgeUI();
    prefillLoggedInUser();
    renderCheckoutSummary();
    setupPaymentMethodToggle();
    setupCheckoutForm();
});

/**
 * 1. Tự động điền thông tin học viên nếu đã đăng nhập (Không bắt nhập lại địa chỉ)
 */
function prefillLoggedInUser() {
    var currentUserRaw = localStorage.getItem('EDU_CURRENT_USER');
    if (!currentUserRaw) {
        return;
    }

    var currentUser = JSON.parse(currentUserRaw);
    if (!currentUser) {
        return;
    }

    // Tìm thông tin đầy đủ trong EDU_USERS bằng vòng lặp for
    var fullUser = currentUser;
    var storedUsers = localStorage.getItem('EDU_USERS');
    var users = storedUsers ? JSON.parse(storedUsers) : [];

    for (var i = 0; i < users.length; i++) {
        if (users[i].email === currentUser.email || users[i].id === currentUser.id) {
            fullUser = users[i];
            break;
        }
    }

    var nameInput = document.getElementById('checkout-name');
    var emailInput = document.getElementById('checkout-email');
    var phoneInput = document.getElementById('checkout-phone');
    var addrInput = document.getElementById('checkout-address');
    var badge = document.getElementById('checkout-auth-badge');

    if (nameInput && fullUser.fullName) {
        nameInput.value = fullUser.fullName;
    }
    if (emailInput && fullUser.email) {
        emailInput.value = fullUser.email;
    }
    if (phoneInput && fullUser.phone) {
        phoneInput.value = fullUser.phone;
    }
    if (addrInput) {
        addrInput.value = fullUser.address || 'Đại học Trà Vinh, 126 Nguyễn Thiện Thành, TP. Trà Vinh';
        addrInput.readOnly = true;
        addrInput.classList.add('bg-light');
    }
    if (badge) {
        badge.classList.remove('d-none');
    }
}

/**
 * 2. Ẩn/hiện ô nhập địa chỉ khác và khung quét mã QR
 */
function setupPaymentMethodToggle() {
    var toggleAddrCheckbox = document.getElementById('toggle-custom-address');
    var customAddrBox = document.getElementById('custom-address-box');

    if (toggleAddrCheckbox && customAddrBox) {
        toggleAddrCheckbox.addEventListener('change', function() {
            if (toggleAddrCheckbox.checked) {
                customAddrBox.classList.remove('d-none');
            } else {
                customAddrBox.classList.add('d-none');
            }
        });
    }

    var radios = document.querySelectorAll('input[name="paymentMethod"]');
    var qrPanel = document.getElementById('qr-payment-panel');
    var payQrRadio = document.getElementById('pay-qr');

    for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', function() {
            if (qrPanel && payQrRadio) {
                if (payQrRadio.checked) {
                    qrPanel.classList.remove('d-none');
                } else {
                    qrPanel.classList.add('d-none');
                }
            }
        });
    }
}

/**
 * 3. Hiển thị danh sách sản phẩm và tính tổng tiền bằng vòng lặp for
 */
function renderCheckoutSummary() {
    var summaryContainer = document.getElementById('checkout-order-summary');
    var totalElement = document.getElementById('checkout-total-amount');

    if (!summaryContainer) {
        return;
    }

    var storedCart = localStorage.getItem('EDU_CART_ITEMS');
    var cartItems = storedCart ? JSON.parse(storedCart) : [];

    if (cartItems.length === 0) {
        summaryContainer.innerHTML = '<div class="text-muted text-center py-3">Không có sản phẩm nào để thanh toán.</div>';
        if (totalElement) {
            totalElement.innerHTML = '0đ';
        }
        return;
    }

    var html = '';
    var totalAmount = 0;

    for (var i = 0; i < cartItems.length; i++) {
        var item = cartItems[i];
        var price = item.salePrice !== undefined ? Number(item.salePrice) : Number(item.price || 0);
        var quantity = Number(item.quantity || 1);
        var itemTotal = price * quantity;
        totalAmount = totalAmount + itemTotal;

        html += '<div class="d-flex justify-content-between align-items-center mb-3">';
        html += '  <div class="d-flex align-items-center gap-3">';
        html += '    <div class="position-relative">';
        html += '      <img src="' + (item.image || '') + '" alt="' + (item.title || 'Khóa học') + '" class="rounded checkout-item-img">';
        html += '      <div class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">' + quantity + '</div>';
        html += '    </div>';
        html += '    <div>';
        html += '      <div class="fw-semibold text-truncate checkout-item-title" title="' + (item.title || '') + '">' + (item.title || 'Không có tên') + '</div>';
        html += '      <div class="text-muted fs-6">' + formatCurrencyVND(price) + '</div>';
        html += '    </div>';
        html += '  </div>';
        html += '  <div class="fw-bold text-dark">' + formatCurrencyVND(itemTotal) + '</div>';
        html += '</div>';
    }

    summaryContainer.innerHTML = html;

    if (totalElement) {
        totalElement.innerHTML = formatCurrencyVND(totalAmount);
    }

    // Cập nhật ảnh mã QR theo số tiền đơn hàng
    var qrImg = document.getElementById('checkout-qr-img');
    var qrNote = document.getElementById('qr-transfer-note');
    if (qrImg) {
        qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=EDUCOURSES_AMOUNT_' + totalAmount;
    }
    if (qrNote) {
        qrNote.innerHTML = 'Nội dung CK: EDU ' + totalAmount + 'VND';
    }
}

/**
 * 4. Kiểm duyệt Form Thanh toán và lưu đơn hàng vào EDU_PURCHASES
 */
function setupCheckoutForm() {
    var checkoutForm = document.getElementById('checkout-form');
    var phoneInput = document.getElementById('checkout-phone');

    if (!checkoutForm) {
        return;
    }

    // Chặn nhập chữ vào ô số điện thoại bằng biểu thức chính quy (Regex)
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();

        if (phoneInput && phoneInput.value.length !== 10) {
            alert('Số điện thoại không hợp lệ! Vui lòng nhập chính xác 10 chữ số.');
            phoneInput.focus();
            return;
        }

        var storedCart = localStorage.getItem('EDU_CART_ITEMS');
        var cartItems = storedCart ? JSON.parse(storedCart) : [];

        if (cartItems.length === 0) {
            alert('Giỏ hàng của bạn đang trống, không thể thanh toán!');
            window.location.href = 'courses.html';
            return;
        }

        var fullName = document.getElementById('checkout-name').value.trim();
        var email = document.getElementById('checkout-email').value.trim();
        var phone = phoneInput.value.trim();

        var toggleCustom = document.getElementById('toggle-custom-address');
        var defaultAddr = document.getElementById('checkout-address').value.trim();
        var customAddr = document.getElementById('checkout-custom-address').value.trim();

        var finalAddress = defaultAddr || 'Nhận mã kích hoạt qua Email';
        if (toggleCustom && toggleCustom.checked && customAddr !== '') {
            finalAddress = customAddr;
        }

        var selectedMethodEl = document.querySelector('input[name="paymentMethod"]:checked');
        var paymentMethod = selectedMethodEl ? selectedMethodEl.value : 'Quét mã VietQR';

        // Tính tổng tiền và tạo danh sách khóa học trong đơn bằng vòng lặp for
        var totalAmount = 0;
        var orderItems = [];

        for (var i = 0; i < cartItems.length; i++) {
            var itemPrice = cartItems[i].salePrice !== undefined ? Number(cartItems[i].salePrice) : Number(cartItems[i].price || 0);
            var itemQty = Number(cartItems[i].quantity || 1);
            totalAmount = totalAmount + (itemPrice * itemQty);

            orderItems.push({
                id: cartItems[i].id,
                title: cartItems[i].title,
                instructor: cartItems[i].instructor,
                image: cartItems[i].image,
                salePrice: itemPrice,
                quantity: itemQty,
                itemStatus: 'Đang học tập'
            });
        }

        // Tạo đối tượng đơn hàng mới
        var newOrder = {
            orderId: 'ORD' + new Date().getTime(),
            customerName: fullName,
            customerEmail: email,
            customerPhone: phone,
            shippingAddress: finalAddress,
            paymentMethod: paymentMethod,
            status: 'Đã kích hoạt khóa học',
            createdAt: new Date().toLocaleString('vi-VN'),
            totalAmount: totalAmount,
            items: orderItems
        };

        // Lưu đơn hàng vào khóa EDU_PURCHASES trong LocalStorage
        var rawPurchases = localStorage.getItem('EDU_PURCHASES');
        var purchases = rawPurchases ? JSON.parse(rawPurchases) : [];
        purchases.unshift(newOrder);
        localStorage.setItem('EDU_PURCHASES', JSON.stringify(purchases));

        // Trừ số lượng suất học (stock) trong EDU_COURSES bằng vòng lặp for
        var allCourses = getAllCourses();
        for (var c = 0; c < cartItems.length; c++) {
            for (var k = 0; k < allCourses.length; k++) {
                if (allCourses[k].id === cartItems[c].id) {
                    var currentStock = allCourses[k].stock !== undefined ? Number(allCourses[k].stock) : 20;
                    var remain = currentStock - Number(cartItems[c].quantity || 1);
                    allCourses[k].stock = remain > 0 ? remain : 0;
                }
            }
        }
        saveAllCourses(allCourses);

        alert('Thanh toán đơn hàng ' + newOrder.orderId + ' thành công! Khóa học đã được kích hoạt trong mục "Khóa học của tôi".');
        localStorage.removeItem('EDU_CART_ITEMS');
        window.location.href = 'my-courses.html';
    });
}

