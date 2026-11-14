/**
 * FILE: src/js/storage.js
 * NHIỆM VỤ: Quản lý Giỏ hàng (EDU_CART_ITEMS), Đơn hàng (EDU_PURCHASES),
 * Khóa học yêu thích (EDU_FAVORITES) và Đã xem gần đây (EDU_RECENT_VIEWED) bằng hàm cơ bản.
 */

var STORAGE_CART_KEY = 'EDU_CART_ITEMS';
var STORAGE_PURCHASES_KEY = 'EDU_PURCHASES';
var STORAGE_FAVORITES_KEY = 'EDU_FAVORITES';
var STORAGE_RECENT_KEY = 'EDU_RECENT_VIEWED';

/**
 * 1. Lấy danh sách sản phẩm trong giỏ hàng từ LocalStorage
 */
function getCart() {
    var cartJson = localStorage.getItem(STORAGE_CART_KEY);
    if (cartJson) {
        return JSON.parse(cartJson);
    }
    return [];
}

/**
 * 2. Lưu mảng giỏ hàng vào LocalStorage và cập nhật số lượng trên Navbar
 */
function saveCart(cartArray) {
    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cartArray));
    updateCartBadgeUI();
}

/**
 * 3. Thêm một khóa học vào giỏ hàng (Sử dụng vòng lặp for cơ bản)
 */
function addToCart(courseId, quantity) {
    var qty = quantity ? Number(quantity) : 1;
    var courseInfo = getCourseById(courseId);

    if (!courseInfo) {
        return { success: false, message: 'Không tìm thấy thông tin khóa học!' };
    }

    var availableStock = courseInfo.stock !== undefined ? Number(courseInfo.stock) : 20;
    if (availableStock <= 0) {
        return { success: false, message: 'Khóa học này hiện đã hết suất đăng ký!' };
    }

    var cart = getCart();
    var existingIndex = -1;

    // Tìm xem khóa học đã có trong giỏ hàng chưa
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === courseId) {
            existingIndex = i;
            break;
        }
    }

    if (existingIndex > -1) {
        var newQty = Number(cart[existingIndex].quantity) + qty;
        if (newQty > availableStock) {
            return { success: false, message: 'Khóa học chỉ còn tối đa ' + availableStock + ' suất đăng ký!' };
        }
        cart[existingIndex].quantity = newQty;
    } else {
        cart.push({
            id: courseInfo.id,
            title: courseInfo.title,
            category: courseInfo.category,
            instructor: courseInfo.instructor,
            salePrice: courseInfo.salePrice,
            originalPrice: courseInfo.originalPrice,
            image: courseInfo.image,
            quantity: qty
        });
    }

    saveCart(cart);
    return { success: true, message: 'Đã thêm "' + courseInfo.title + '" vào giỏ hàng!' };
}

/**
 * 4. Cập nhật số lượng của một khóa học trong giỏ hàng
 */
function updateCartQuantity(courseId, newQuantity) {
    var cart = getCart();
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id === courseId) {
            var parsedQty = Number(newQuantity);
            if (parsedQty <= 0) {
                cart.splice(i, 1);
            } else {
                cart[i].quantity = parsedQty;
            }
            break;
        }
    }
    saveCart(cart);
}

/**
 * 5. Xóa một khóa học khỏi giỏ hàng bằng vòng lặp for
 */
function removeFromCart(courseId) {
    var cart = getCart();
    var updatedCart = [];
    for (var i = 0; i < cart.length; i++) {
        if (cart[i].id !== courseId) {
            updatedCart.push(cart[i]);
        }
    }
    saveCart(updatedCart);
}

/**
 * 6. Xóa sạch toàn bộ giỏ hàng
 */
function clearCart() {
    localStorage.removeItem(STORAGE_CART_KEY);
    updateCartBadgeUI();
}

/**
 * 7. Tính tổng số lượng khóa học trong giỏ bằng vòng lặp for
 */
function getCartTotalCount() {
    var cart = getCart();
    var totalCount = 0;
    for (var i = 0; i < cart.length; i++) {
        totalCount = totalCount + Number(cart[i].quantity || 1);
    }
    return totalCount;
}

/**
 * 8. Tính tổng số tiền thanh toán của giỏ hàng bằng vòng lặp for
 */
function getCartTotalPrice() {
    var cart = getCart();
    var totalPrice = 0;
    for (var i = 0; i < cart.length; i++) {
        var price = Number(cart[i].salePrice || cart[i].price || 0);
        var qty = Number(cart[i].quantity || 1);
        totalPrice = totalPrice + (price * qty);
    }
    return totalPrice;
}

/**
 * 9. Cập nhật số hiển thị trên icon Giỏ hàng ở thanh Navbar
 */
function updateCartBadgeUI() {
    var badgeElement = document.getElementById('cart-count-badge');
    if (badgeElement) {
        badgeElement.innerHTML = getCartTotalCount();
    }
}

/**
 * 10. Quản lý danh sách Khóa học Yêu thích (EDU_FAVORITES)
 */
function getFavoriteIds() {
    var raw = localStorage.getItem(STORAGE_FAVORITES_KEY);
    if (raw) {
        return JSON.parse(raw);
    }
    return [];
}

function isFavoriteCourse(courseId) {
    var favs = getFavoriteIds();
    for (var i = 0; i < favs.length; i++) {
        if (favs[i] === courseId) {
            return true;
        }
    }
    return false;
}

function toggleFavoriteCourse(courseId) {
    var favs = getFavoriteIds();
    var newFavs = [];
    var found = false;

    for (var i = 0; i < favs.length; i++) {
        if (favs[i] === courseId) {
            found = true;
        } else {
            newFavs.push(favs[i]);
        }
    }

    var added = false;
    if (!found) {
        newFavs.unshift(courseId);
        added = true;
    }

    localStorage.setItem(STORAGE_FAVORITES_KEY, JSON.stringify(newFavs));
    return added;
}

function getFavoriteCoursesList() {
    var favIds = getFavoriteIds();
    var result = [];
    for (var i = 0; i < favIds.length; i++) {
        var course = getCourseById(favIds[i]);
        if (course) {
            result.push(course);
        }
    }
    return result;
}

/**
 * 11. Quản lý danh sách Khóa học Đã xem gần đây (EDU_RECENT_VIEWED)
 */
function getRecentViewedIds() {
    var raw = localStorage.getItem(STORAGE_RECENT_KEY);
    if (raw) {
        return JSON.parse(raw);
    }
    return [];
}

function addRecentViewedCourse(courseId) {
    if (!courseId) return;
    var oldList = getRecentViewedIds();
    var newList = [courseId];

    for (var i = 0; i < oldList.length; i++) {
        if (oldList[i] !== courseId && newList.length < 8) {
            newList.push(oldList[i]);
        }
    }
    localStorage.setItem(STORAGE_RECENT_KEY, JSON.stringify(newList));
}

function getRecentViewedCoursesList() {
    var ids = getRecentViewedIds();
    var result = [];
    for (var i = 0; i < ids.length; i++) {
        var course = getCourseById(ids[i]);
        if (course) {
            result.push(course);
        }
    }
    return result;
}

/**
 * 12. Quản lý Lịch sử Đơn hàng / Giao dịch (EDU_PURCHASES)
 */
function getAllPurchases() {
    var raw = localStorage.getItem(STORAGE_PURCHASES_KEY);
    if (raw) {
        return JSON.parse(raw);
    }
    return [];
}

function saveAllPurchases(purchasesArray) {
    localStorage.setItem(STORAGE_PURCHASES_KEY, JSON.stringify(purchasesArray));
}

