/**
 * FILE: src/js/cart.js
 * NHIỆM VỤ: Đọc trực tiếp giỏ hàng từ LocalStorage (key: EDU_CART_ITEMS) và hiển thị lên bảng.
 */

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadgeUI();
    renderCartTable();
});

function renderCartTable() {
    const cartContainer = document.getElementById('cart-table-body');
    const emptyContainer = document.getElementById('cart-empty-state');
    const contentContainer = document.getElementById('cart-content-container');
    const totalElement = document.getElementById('cart-total-amount');

    if (!cartContainer) return;

    // Đọc trực tiếp từ key EDU_CART_ITEMS trong LocalStorage
    let cartItems = [];
    try {
        const storedCart = localStorage.getItem('EDU_CART_ITEMS');
        cartItems = storedCart ? JSON.parse(storedCart) : [];
    } catch (e) {
        cartItems = [];
    }

    if (!cartItems || cartItems.length === 0) {
        if (emptyContainer) emptyContainer.classList.remove('d-none');
        if (contentContainer) contentContainer.classList.add('d-none');
        return;
    }

    if (emptyContainer) emptyContainer.classList.add('d-none');
    if (contentContainer) contentContainer.classList.remove('d-none');

    let html = '';
    let totalAmount = 0;

    cartItems.forEach((item) => {
        // Hỗ trợ linh hoạt các tên trường thuộc tính giá (salePrice hoặc price)
        const price = item.salePrice !== undefined ? item.salePrice : (item.price || 0);
        const quantity = item.quantity || 1;
        const itemTotal = price * quantity;
        totalAmount += itemTotal;

        html += `
            <tr>
                <td>
                    <div class="d-flex align-items-center gap-3">
                        <img src="${item.image || ''}" alt="${item.title || 'Khóa học'}" class="rounded object-fit-cover" style="width: 70px; height: 50px;">
                        <div>
                            <h6 class="fw-bold mb-0">${item.title || 'Không có tên'}</h6>
                            <small class="text-muted">Giảng viên: ${item.instructor || 'Đang cập nhật'}</small>
                        </div>
                    </div>
                </td>
                <td class="align-middle text-danger fw-semibold">${formatCurrencyVND(price)}</td>
                <td class="align-middle text-center">
                    <div class="badge bg-light text-dark border px-3 py-2 fs-6">${quantity}</div>
                </td>
                <td class="align-middle fw-bold text-dark">${formatCurrencyVND(itemTotal)}</td>
                <td class="align-middle text-end">
                    <button class="btn btn-outline-danger btn-sm" onclick="handleRemoveCartItem('${item.id}')">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    cartContainer.innerHTML = html;

    if (totalElement) {
        totalElement.textContent = formatCurrencyVND(totalAmount);
    }
}

function handleRemoveCartItem(courseId) {
    if (confirm("Bạn có chắc chắn muốn xóa khóa học này khỏi giỏ hàng?")) {
        let cartItems = [];
        try {
            const storedCart = localStorage.getItem('EDU_CART_ITEMS');
            cartItems = storedCart ? JSON.parse(storedCart) : [];
        } catch (e) {
            cartItems = [];
        }

        // Lọc bỏ sản phẩm có ID trùng khớp
        cartItems = cartItems.filter(item => item.id !== courseId);
        
        // Lưu lại vào LocalStorage
        localStorage.setItem('EDU_CART_ITEMS', JSON.stringify(cartItems));

        // Cập nhật lại giao diện
        if (typeof updateCartBadgeUI === 'function') {
            updateCartBadgeUI();
        }
        renderCartTable();
    }
}