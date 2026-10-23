/**
 * FILE: src/js/storage.js
 * NHIỆM VỤ: Quản lý trạng thái Giỏ hàng và Người dùng trong LocalStorage.
 * YÊU CẦU: Nhúng sau file src/js/data.js
 */

const STORAGE_CART_KEY = 'EDU_CART_ITEMS';

/**
 * 1. Lấy danh sách sản phẩm hiện có trong giỏ hàng
 * @returns {Array} Mảng các item trong giỏ hàng: [{ id, title, salePrice, image, instructor, quantity }]
 */
function getCart() {
    try {
        const cartJson = localStorage.getItem(STORAGE_CART_KEY);
        return cartJson ? JSON.parse(cartJson) : [];
    } catch (error) {
        console.error('Lỗi đọc dữ liệu giỏ hàng từ LocalStorage:', error);
        return [];
    }
}

/**
 * 2. Lưu mảng giỏ hàng mới vào LocalStorage và phát sự kiện cập nhật giao diện
 * @param {Array} cartArray - Mảng giỏ hàng cần lưu
 */
function saveCart(cartArray) {
    try {
        localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cartArray));
        updateCartBadgeUI(); // Tự động cập nhật con số trên thanh Navbar
    } catch (error) {
        console.error('Lỗi lưu dữ liệu giỏ hàng vào LocalStorage:', error);
    }
}

/**
 * 3. Thêm một khóa học vào giỏ hàng
 * @param {string} courseId - Mã khóa học cần thêm
 * @param {number} quantity - Số lượng (mặc định là 1)
 * @returns {Object} Kết quả thực hiện { success: boolean, message: string }
 */
function addToCart(courseId, quantity = 1) {
    const courseInfo = getCourseById(courseId);
    if (!courseInfo) {
        return { success: false, message: 'Không tìm thấy thông tin khóa học!' };
    }

    const cart = getCart();
    const existingItemIndex = cart.findIndex(item => item.id === courseId);

    if (existingItemIndex > -1) {
        // Nếu khóa học đã có trong giỏ -> Tăng số lượng
        cart[existingItemIndex].quantity += Number(quantity);
    } else {
        // Nếu chưa có -> Đẩy bản ghi rút gọn vào giỏ hàng
        cart.push({
            id: courseInfo.id,
            title: courseInfo.title,
            instructor: courseInfo.instructor,
            salePrice: courseInfo.salePrice,
            originalPrice: courseInfo.originalPrice,
            image: courseInfo.image,
            quantity: Number(quantity)
        });
    }

    saveCart(cart);
    return { success: true, message: `Đã thêm "${courseInfo.title}" vào giỏ hàng!` };
}

/**
 * 4. Cập nhật số lượng của một khóa học trong giỏ hàng
 * @param {string} courseId - Mã khóa học
 * @param {number} newQuantity - Số lượng mới
 */
function updateCartQuantity(courseId, newQuantity) {
    let cart = getCart();
    const index = cart.findIndex(item => item.id === courseId);

    if (index > -1) {
        const parsedQty = Number(newQuantity);
        if (parsedQty <= 0) {
            // Nếu số lượng <= 0 thì xóa khỏi giỏ hàng
            cart.splice(index, 1);
        } else {
            cart[index].quantity = parsedQty;
        }
        saveCart(cart);
    }
}

/**
 * 5. Xóa hẳn một khóa học khỏi giỏ hàng
 * @param {string} courseId - Mã khóa học cần xóa
 */
function removeFromCart(courseId) {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.id !== courseId);
    saveCart(updatedCart);
}

/**
 * 6. Xóa sạch toàn bộ giỏ hàng (Dùng sau khi Thanh toán giả lập thành công)
 */
function clearCart() {
    localStorage.removeItem(STORAGE_CART_KEY);
    updateCartBadgeUI();
}

/**
 * 7. Tính tổng số lượng khóa học đang có trong giỏ
 * @returns {number} Tổng số lượng
 */
function getCartTotalCount() {
    const cart = getCart();
    return cart.reduce((total, item) => total + Number(item.quantity), 0);
}

/**
 * 8. Tính tổng số tiền thanh toán của giỏ hàng
 * @returns {number} Tổng thành tiền (VNĐ)
 */
function getCartTotalPrice() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (Number(item.salePrice) * Number(item.quantity)), 0);
}

/**
 * 9. Cập nhật số hiển thị trên icon Giỏ hàng ở thanh điều hướng (Navbar)
 */
function updateCartBadgeUI() {
    const badgeElement = document.getElementById('cart-count-badge');
    if (badgeElement) {
        badgeElement.textContent = getCartTotalCount();
    }
}