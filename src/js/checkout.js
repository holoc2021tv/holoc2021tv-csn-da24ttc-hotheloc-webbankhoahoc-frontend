/**
 * FILE: src/js/checkout.js
 * NHIỆM VỤ: Hiển thị tóm tắt đơn hàng và xử lý logic thanh toán giả lập (ràng buộc 10 chữ số).
 */

document.addEventListener('DOMContentLoaded', () => {
    if (typeof updateCartBadgeUI === 'function') {
        updateCartBadgeUI();
    }
    renderCheckoutSummary();
    setupCheckoutForm();
});

function renderCheckoutSummary() {
    const summaryContainer = document.getElementById('checkout-order-summary');
    const totalElement = document.getElementById('checkout-total-amount');

    if (!summaryContainer) return;

    let cartItems = [];
    try {
        const storedCart = localStorage.getItem('EDU_CART_ITEMS');
        cartItems = storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
        cartItems = [];
    }

    if (cartItems.length === 0) {
        summaryContainer.innerHTML = '<div class="text-muted text-center py-3">Không có sản phẩm nào để thanh toán.</div>';
        if (totalElement) totalElement.textContent = '0đ';
        return;
    }

    let html = '';
    let totalAmount = 0;

    cartItems.forEach((item) => {
        const price = item.salePrice !== undefined ? item.salePrice : (item.price || 0);
        const quantity = item.quantity || 1;
        const itemTotal = price * quantity;
        totalAmount += itemTotal;

        html += `
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="d-flex align-items-center gap-3">
                    <div class="position-relative">
                        <img src="${item.image || ''}" alt="${item.title || 'Khóa học'}" class="rounded object-fit-cover" style="width: 60px; height: 45px;">
                        <div class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary">${quantity}</div>
                    </div>
                    <div>
                        <div class="fw-semibold text-truncate" style="max-width: 180px;" title="${item.title || ''}">${item.title || 'Không có tên'}</div>
                        <div class="text-muted fs-6">${formatCurrencyVND(price)}</div>
                    </div>
                </div>
                <div class="fw-bold text-dark">${formatCurrencyVND(itemTotal)}</div>
            </div>
        `;
    });

    summaryContainer.innerHTML = html;

    if (totalElement) {
        totalElement.textContent = formatCurrencyVND(totalAmount);
    }
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    const phoneInput = document.getElementById('checkout-phone');

    if (!checkoutForm) return;

    // Ràng buộc 1: Tự động loại bỏ mọi ký tự không phải là số (0-9)
    if (phoneInput) {
        phoneInput.addEventListener('input', function () {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault(); 

        // Ràng buộc 2: Chặn form và hiển thị cảnh báo nếu không nhập đúng 10 số
        if (phoneInput && phoneInput.value.length !== 10) {
            alert("Số điện thoại không hợp lệ! Vui lòng nhập chính xác 10 chữ số.");
            phoneInput.focus(); // Trỏ chuột lại ô nhập số điện thoại
            return;
        }

        let cartItems = [];
        try {
            const storedCart = localStorage.getItem('EDU_CART_ITEMS');
            cartItems = storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            cartItems = [];
        }

        if (cartItems.length === 0) {
            alert("Giỏ hàng của bạn đang trống, không thể thanh toán!");
            window.location.href = 'courses.html';
            return;
        }

        // Xử lý thanh toán thành công giả lập
        alert("Thanh toán giả lập thành công! Cảm ơn bạn đã đăng ký khóa học.");
        localStorage.removeItem('EDU_CART_ITEMS');
        window.location.href = 'index.html';
    });
}