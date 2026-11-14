/**
 * FILE: src/js/cart.js
 * NHIỆM VỤ: Đọc giỏ hàng từ LocalStorage (EDU_CART_ITEMS) và hiển thị lên bảng bằng vòng lặp for.
 */

document.addEventListener('DOMContentLoaded', function() {
    updateCartBadgeUI();
    renderCartTable();
});

function renderCartTable() {
    var cartContainer = document.getElementById('cart-table-body');
    var emptyContainer = document.getElementById('cart-empty-state');
    var contentContainer = document.getElementById('cart-content-container');
    var totalElement = document.getElementById('cart-total-amount');

    if (!cartContainer) {
        return;
    }

    var storedCart = localStorage.getItem('EDU_CART_ITEMS');
    var cartItems = storedCart ? JSON.parse(storedCart) : [];

    // Nếu giỏ hàng trống thì hiện thông báo trống, ẩn bảng
    if (!cartItems || cartItems.length === 0) {
        if (emptyContainer) {
            emptyContainer.classList.remove('d-none');
        }
        if (contentContainer) {
            contentContainer.classList.add('d-none');
        }
        return;
    }

    if (emptyContainer) {
        emptyContainer.classList.add('d-none');
    }
    if (contentContainer) {
        contentContainer.classList.remove('d-none');
    }

    var html = '';
    var totalAmount = 0;

    // Duyệt mảng giỏ hàng bằng vòng lặp for cơ bản
    for (var i = 0; i < cartItems.length; i++) {
        var item = cartItems[i];
        var price = item.salePrice !== undefined ? Number(item.salePrice) : Number(item.price || 0);
        var quantity = Number(item.quantity || 1);
        var itemTotal = price * quantity;
        totalAmount = totalAmount + itemTotal;

        html += '<tr>';
        html += '  <td>';
        html += '    <div class="d-flex align-items-center gap-3">';
        html += '      <img src="' + (item.image || '') + '" alt="' + (item.title || 'Khóa học') + '" class="rounded cart-item-img">';
        html += '      <div>';
        html += '        <h6 class="fw-bold mb-0">' + (item.title || 'Không có tên') + '</h6>';
        html += '        <small class="text-muted">Giảng viên: ' + (item.instructor || 'Đang cập nhật') + '</small>';
        html += '      </div>';
        html += '    </div>';
        html += '  </td>';
        html += '  <td class="align-middle text-danger fw-semibold">' + formatCurrencyVND(price) + '</td>';
        html += '  <td class="align-middle text-center">';
        html += '    <div class="badge bg-light text-dark border px-3 py-2 fs-6">' + quantity + '</div>';
        html += '  </td>';
        html += '  <td class="align-middle fw-bold text-dark">' + formatCurrencyVND(itemTotal) + '</td>';
        html += '  <td class="align-middle text-end">';
        html += '    <button class="btn btn-outline-danger btn-sm" onclick="handleRemoveCartItem(\'' + item.id + '\')">';
        html += '      <i class="bi bi-trash"></i>';
        html += '    </button>';
        html += '  </td>';
        html += '</tr>';
    }

    cartContainer.innerHTML = html;

    if (totalElement) {
        totalElement.innerHTML = formatCurrencyVND(totalAmount);
    }
}

/**
 * Xóa sản phẩm khỏi giỏ hàng bằng vòng lặp for cơ bản
 */
function handleRemoveCartItem(courseId) {
    var isConfirm = confirm('Bạn có chắc chắn muốn xóa khóa học này khỏi giỏ hàng?');
    if (isConfirm) {
        var storedCart = localStorage.getItem('EDU_CART_ITEMS');
        var cartItems = storedCart ? JSON.parse(storedCart) : [];
        var newCart = [];

        for (var i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id !== courseId) {
                newCart.push(cartItems[i]);
            }
        }

        localStorage.setItem('EDU_CART_ITEMS', JSON.stringify(newCart));
        updateCartBadgeUI();
        renderCartTable();
    }
}

