/**
 * TỆP XỬ LÝ SỰ KIỆN & GIỎ HÀNG TRƯỢT - ĐẶC SẢN TÂY NGUYÊN (BẢN CHUẨN ĐỒNG BỘ)
 */

const products = productsData; 

let cart = [];

document.addEventListener("DOMContentLoaded", function () {
  injectCartDrawerMarkup(); // Tự động chèn HTML giỏ hàng trượt vào cuối trang [1]
  initCart();               // Tải dữ liệu giỏ hàng và đồng bộ các nút hiển thị
  initProductPage();        // Xử lý logic hiển thị sản phẩm, tìm kiếm và bộ lọc danh mục
  setupCartTriggers();      // Thiết lập sự kiện đóng/mở giỏ hàng
  initValidation();         // Khởi chạy kiểm tra form đặt hàng/liên hệ
  renderProductDetailPage(); // Hiển thị chi tiết sản phẩm dựa trên tham số URL 
});

// Tự động chèn khung HTML Giỏ hàng trượt vào cuối body của các trang [1]
function injectCartDrawerMarkup() {
  const cartContainer = document.createElement("div");
  cartContainer.innerHTML = `
    <div class="cart-backdrop" id="cart-backdrop"></div>
    <div class="cart-drawer" id="cart-drawer">
      <div class="cart-drawer-header">
        <h2>Giỏ hàng của bạn</h2>
        <button type="button" class="close-cart-btn" id="close-cart-btn">&times;</button>
      </div>
      <div class="cart-drawer-body" id="cart-drawer-items">
        <!-- Sản phẩm được render động ở đây -->
      </div>
      <div class="cart-drawer-footer">
        <div class="cart-subtotal">
          <span>Tổng cộng:</span>
          <span class="cart-total-price" id="cart-total-price">0đ</span>
        </div>
        <a href="contact.html" class="btn checkout-btn">Tiến hành đặt hàng</a>
      </div>
    </div>
  `;
  document.body.appendChild(cartContainer);
}

function setupCartTriggers() {
  const backdrop = document.getElementById("cart-backdrop");
  const drawer = document.getElementById("cart-drawer");
  const closeBtn = document.getElementById("close-cart-btn");
  
  const cartTriggers = document.querySelectorAll("#cart-nav-item, .cart-link");

  cartTriggers.forEach(trigger => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault(); 
      openCart();
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeCart);
  if (backdrop) backdrop.addEventListener("click", closeCart);
}

function openCart() {
  const backdrop = document.getElementById("cart-backdrop");
  const drawer = document.getElementById("cart-drawer");
  if (backdrop) backdrop.classList.add("open");
  if (drawer) drawer.classList.add("open");
  renderCartItems(); 
}

function closeCart() {
  const backdrop = document.getElementById("cart-backdrop");
  const drawer = document.getElementById("cart-drawer");
  if (backdrop) backdrop.classList.remove("open");
  if (drawer) drawer.classList.remove("open");
}

// ==========================================================================
// HIỂN THỊ DANH SÁCH SẢN PHẨM (Tự động nhận diện ID mới hoặc cũ để tránh lỗi)
// ==========================================================================
function renderProductCard(productsToRender) {
  // Nhận diện thông minh: lấy ID mới (#product-list) hoặc ID cũ (#products-container) [2]
  const container = document.getElementById("product-list") || document.getElementById("products-container");
  if (!container) return;

  container.innerHTML = "";

  if (productsToRender.length === 0) {
    container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 48px 0;">Không tìm thấy sản phẩm phù hợp.</p>`;
    return;
  }

  productsToRender.forEach(product => {
    const card = document.createElement("article");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-content">
        <span class="badge">${product.categoryLabel}</span>
        <h3>${product.name}</h3>
        <p><strong>Xuất xứ:</strong> ${product.origin}</p>
        <p><strong>Quy cách:</strong> ${product.stock} sản phẩm</p>
        <p><strong>Số lượng còn:</strong> ${product.stock} sản phẩm</p>
        <p style="margin-bottom: 12px; color: var(--color-muted); font-size: 0.9rem;">${product.desc}</p>
        <p class="price">${product.price.toLocaleString("vi-VN")}đ</p>
        <div class="card-actions" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: auto;">
          <a class="btn btn-small" href="product-detail.html?id=${product.id}">Xem chi tiết</a>
          <button class="btn btn-small btn-secondary btn-add-to-cart" data-id="${product.id}" type="button">Thêm giỏ</button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  attachAddToCartEvents();
}

function initProductPage() {
  const searchInput = document.getElementById("search-input");
  const categoryFilter = document.getElementById("category-filter");

  // Kiểm tra thông minh cả 2 ID vùng chứa
  if (!document.getElementById("product-list") && !document.getElementById("products-container")) return;

  renderProductCard(products);

  if (searchInput) searchInput.addEventListener("input", filterAndRender);
  if (categoryFilter) categoryFilter.addEventListener("change", filterAndRender);

  function filterAndRender() {
    const keyword = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const selectedCategory = categoryFilter ? categoryFilter.value : "all";

    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(keyword) || 
                            product.desc.toLowerCase().includes(keyword);
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    renderProductCard(filtered);
  }
}

function initCart() {
  const storedCart = localStorage.getItem("tay_nguyen_cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
  }
  updateCartBadge();
  attachAddToCartEvents();
}

function updateCartBadge() {
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  
  const badgeNav = document.getElementById("cart-count");
  const badgeHeader = document.querySelector(".cart-count");

  if (badgeNav) badgeNav.textContent = totalItems;
  if (badgeHeader) badgeHeader.textContent = totalItems;
}

function attachAddToCartEvents() {
  const addButtons = document.querySelectorAll(".btn-add-to-cart");
  addButtons.forEach(btn => {
    btn.removeEventListener("click", handleAddToCartClick);
    btn.addEventListener("click", handleAddToCartClick);
  });
}

function handleAddToCartClick(e) {
  const productId = parseInt(e.target.getAttribute("data-id"));
  addToCart(productId);
}

function addToCart(id) {
  const productData = products.find(p => p.id === id);
  if (!productData) return;

  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ 
      id: id, 
      name: productData.name, 
      price: productData.price, 
      image: productData.image,
      quantity: 1 
    });
  }

  localStorage.setItem("tay_nguyen_cart", JSON.stringify(cart));
  updateCartBadge();
  openCart(); 
}

function renderCartItems() {
  const itemsContainer = document.getElementById("cart-drawer-items");
  const totalPriceElement = document.getElementById("cart-total-price");
  
  if (!itemsContainer) return;

  itemsContainer.innerHTML = "";

  if (cart.length === 0) {
    itemsContainer.innerHTML = `<p style="text-align: center; color: var(--color-muted); margin-top: 48px;">Giỏ hàng của bạn đang trống.</p>`;
    if (totalPriceElement) totalPriceElement.textContent = "0đ";
    return;
  }

  let totalMoney = 0;

  cart.forEach(item => {
    totalMoney += item.price * item.quantity;
    
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item";
    cartItemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-img">
      <div class="cart-item-info">
        <h4 class="cart-item-title">${item.name}</h4>
        <span class="cart-item-price">${(item.price * item.quantity).toLocaleString("vi-VN")}đ</span>
        <div class="cart-item-qty">
          <button type="button" class="qty-btn" onclick="updateItemQuantity(${item.id}, -1)">-</button>
          <span class="qty-val">${item.quantity}</span>
          <button type="button" class="qty-btn" onclick="updateItemQuantity(${item.id}, 1)">+</button>
          <button type="button" class="remove-item-btn" onclick="removeCartItem(${item.id})" style="margin-left: auto;">Xóa</button>
        </div>
      </div>
    `;
    itemsContainer.appendChild(cartItemDiv);
  });

  if (totalPriceElement) {
    totalPriceElement.textContent = totalMoney.toLocaleString("vi-VN") + "đ";
  }
}

window.updateItemQuantity = function(id, change) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += change;

  if (item.quantity <= 0) {
    removeCartItem(id);
  } else {
    localStorage.setItem("tay_nguyen_cart", JSON.stringify(cart));
    updateCartBadge();
    renderCartItems();
  }
};

window.removeCartItem = function(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("tay_nguyen_cart", JSON.stringify(cart));
  updateCartBadge();
  renderCartItems();
};

// ==========================================================================
// KIỂM TRA DỮ LIỆU BIỂU MẪU (Bắt cả ID cũ và mới để tránh lỗi trắng màn hình)
// ==========================================================================
function initValidation() {
  const form = document.getElementById("order-form") || document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    
    // Nhận diện thông minh cả ID cũ và ID mới theo đề bài [2]
    const fullname = document.getElementById("customer-name") || document.getElementById("fullname");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");

    // 1. Kiểm tra Họ và Tên (Không rỗng, tối thiểu 3 ký tự) [2]
    if (fullname) {
      const val = fullname.value.trim();
      if (val === "" || val.length < 3) {
        fullname.classList.add("invalid");
        alert("Họ tên không được để trống và phải có ít nhất 3 ký tự.");
        isValid = false;
        return;
      } else {
        fullname.classList.remove("invalid");
      }
    }

    // 2. Kiểm tra Số điện thoại (Không rỗng, phải gồm 10 chữ số) [2]
    if (phone) {
      const val = phone.value.trim();
      if (!/^[0-9]{10}$/.test(val)) {
        phone.classList.add("invalid");
        alert("Số điện thoại không được để trống và phải gồm đúng 10 chữ số.");
        isValid = false;
        return;
      } else {
        phone.classList.remove("invalid");
      }
    }

    // 3. Kiểm tra Địa chỉ (Không rỗng, tối thiểu 10 ký tự) [2]
    if (address) {
      const val = address.value.trim();
      if (val === "" || val.length < 10) {
        address.classList.add("invalid");
        alert("Địa chỉ nhận hàng không được để trống và phải có ít nhất 10 ký tự.");
        isValid = false;
        return;
      } else {
        address.classList.remove("invalid");
      }
    }

    // 4. Kiểm tra Giỏ hàng phải có ít nhất 1 sản phẩm [2]
    if (cart.length === 0) {
      alert("Giỏ hàng chưa có sản phẩm. Hãy chọn mua ít nhất 1 sản phẩm trước khi thanh toán!");
      isValid = false;
      return;
    }

    if (isValid) {
      alert("Gửi đơn đặt hàng thành công! Chúng tôi sẽ sớm liên hệ xác nhận.");
      form.reset();
      cart = [];
      localStorage.removeItem("tay_nguyen_cart");
      updateCartBadge();
      closeCart();
    }
  });
}
// ==========================================================================
// TỰ ĐỘNG ĐỌC THAM SỐ URL VÀ HIỂN THỊ CHI TIẾT SẢN PHẨM TƯƠNG ỨNG (Yêu cầu mới)
// ==========================================================================
function renderProductDetailPage() {
  const detailTitle = document.getElementById("detail-title");
  if (!detailTitle) return; // Chỉ chạy nếu đang ở trang product-detail.html

  // 1. Đọc tham số 'id' từ thanh địa chỉ URL (ví dụ: ?id=3) [2]
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"), 10);

  // Nếu không tìm thấy tham số ID trên thanh địa chỉ, mặc định hiển thị sản phẩm đầu tiên (id: 1)
  const idToFind = isNaN(productId) ? 1 : productId;

  // 2. Tìm sản phẩm tương ứng trong danh sách dữ liệu productsData
  const product = products.find(p => p.id === idToFind);
  if (!product) return;

  // 3. Sử dụng DOM để ghi đè dữ liệu động lên giao diện [2]
  const detailImg = document.getElementById("detail-img");
  const detailPrice = document.getElementById("detail-price");
  const detailDesc = document.getElementById("detail-description");
  const detailOrigin = document.getElementById("detail-origin");
  const detailUnit = document.getElementById("detail-unit");
  const detailStock = document.getElementById("detail-stock");
  const detailCategory = document.getElementById("detail-category");
  const addToCartBtn = document.querySelector(".detail-info .btn-add-to-cart");

  if (detailTitle) detailTitle.textContent = product.name;
  if (detailImg) {
    detailImg.src = product.image;
    detailImg.alt = product.name;
  }
  if (detailPrice) detailPrice.textContent = product.price.toLocaleString("vi-VN") + "đ";
  if (detailDesc) detailDesc.textContent = product.desc;
  if (detailOrigin) detailOrigin.textContent = product.origin;
  if (detailUnit) detailUnit.textContent = product.unit;
  if (detailStock) detailStock.textContent = `Còn lại ${product.stock} sản phẩm`;
  if (detailCategory) detailCategory.textContent = product.categoryLabel;
  
  // Cập nhật data-id cho nút Thêm vào giỏ hàng để giỏ hàng nhận dạng đúng sản phẩm đang xem
  if (addToCartBtn) {
    addToCartBtn.setAttribute("data-id", product.id);
  }
  renderRelatedProducts(product);
}
// ==========================================================================
// TỰ ĐỘNG HIỂN THỊ SẢN PHẨM LIÊN QUAN CÙNG DANH MỤC (Yêu cầu mới)
// ==========================================================================
function renderRelatedProducts(currentProduct) {
  const relatedContainer = document.getElementById("related-products-container");
  if (!relatedContainer) return; // Chỉ chạy nếu có thẻ chứa trên giao diện

  // 1. Lọc sản phẩm cùng danh mục nhưng loại bỏ chính sản phẩm hiện tại đang xem [2]
  let related = products.filter(function (p) {
    return p.category === currentProduct.category && p.id !== currentProduct.id;
  });

  // 2. Dự phòng: Nếu sản phẩm cùng danh mục không đủ 3 cái để lấp đầy khung hiển thị
  if (related.length < 3) {
    // Lấy các sản phẩm thuộc danh mục khác (nhưng vẫn loại bỏ sản phẩm hiện tại)
    const otherProducts = products.filter(function (p) {
      return p.category !== currentProduct.category && p.id !== currentProduct.id;
    });

    // Trộn ngẫu nhiên (random) các sản phẩm khác này
    otherProducts.sort(function () {
      return 0.5 - Math.random();
    });

    // Lấy sản phẩm khác gộp chung (bù vào) cho đủ tối đa 3 sản phẩm liên quan
    related = related.concat(otherProducts).slice(0, 3);
  } else {
    // Nếu có dư sản phẩm cùng danh mục, tiến hành trộn ngẫu nhiên chính chúng và lấy ra 3 sản phẩm
    related.sort(function () {
      return 0.5 - Math.random();
    });
    related = related.slice(0, 3);
  }

  // 3. Sử dụng DOM để vẽ lại giao diện sản phẩm liên quan [2]
  relatedContainer.innerHTML = related.map(function (p) {
    return `
      <article class="product-card">
        <img src="${p.image}" alt="${p.name}">
        <div class="product-content">
          <span class="badge">${p.categoryLabel}</span>
          <h3>${p.name}</h3>
          <p class="price">${p.price.toLocaleString("vi-VN")}đ</p>
          <!-- Đường dẫn xem chi tiết có truyền kèm ID động -->
          <a href="product-detail.html?id=${p.id}" class="btn btn-small" style="text-align: center; margin-top: auto;">Xem chi tiết</a>
        </div>
      </article>
    `;
  }).join("");
}