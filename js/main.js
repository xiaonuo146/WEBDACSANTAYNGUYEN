/**
 * TỆP XỬ LÝ SỰ KIỆN & GIỎ HÀNG TRƯỢT - ĐẶC SẢN TÂY NGUYÊN
 */

const products = [
  {
    id: 1,
    name: "Cà phê Buôn Ma Thuột",
    category: "nong-san-kho",
    categoryLabel: "Nông sản khô & hạt",
    price: 180000,
    image: "images/ca-phe-buon-ma-thuot.jpg",
    desc: "Hương thơm mạnh mẽ, vị đậm đà nguyên bản từ vùng đất đỏ bazan."
  },
  {
    id: 2,
    name: "Mật ong rừng Tây Nguyên",
    category: "mat-tu-nhien",
    categoryLabel: "Sản phẩm từ mật & tự nhiên",
    price: 220000,
    image: "images/mat-ong-rung-tay-nguyen.jpg",
    desc: "Vị ngọt thanh dịu và mùi thơm nhẹ đặc trưng của mùa hoa rừng già."
  },
  {
    id: 3,
    name: "Mắc ca Tây Nguyên",
    category: "nong-san-kho",
    categoryLabel: "Nông sản khô & hạt",
    price: 160000,
    image: "images/mac-ca-tay-nguyen.jpg",
    desc: "Hạt giòn bùi, giàu dinh dưỡng, nứt vỏ tự nhiên dễ bóc tách."
  },
  {
    id: 4,
    name: "Tiêu Đắk Nông",
    category: "nong-san-kho",
    categoryLabel: "Nông sản khô & hạt",
    price: 140000,
    image: "images/tieu-dak-nong.jpg",
    desc: "Hạt mẩy tròn, vị cay nồng và hương thơm đậm vị núi rừng."
  },
  {
    id: 5,
    name: "Bơ sáp Đắk Lắk",
    category: "trai-cay",
    categoryLabel: "Trái cây & nông sản tươi",
    price: 85000,
    image: "images/bo-sap-dak-lak.jpg",
    desc: "Cơm vàng dẻo quánh, vị béo thơm đặc trưng của trái cây Tây Nguyên."
  },
  {
    id: 6,
    name: "Thổ cẩm Tây Nguyên",
    category: "gia-vi",
    categoryLabel: "Gia vị & thực phẩm chế biến",
    price: 290000,
    image: "images/tho-cam-tay-nguyen.jpg",
    desc: "Sản phẩm thủ công độc đáo dệt tay từ bàn tay khéo léo của đồng bào."
  }
];

let cart = [];

document.addEventListener("DOMContentLoaded", () => {
  injectCartDrawerMarkup(); // Tự động chèn HTML giỏ hàng vào trang [1]
  initCart();               // Tải giỏ hàng từ localStorage và đồng bộ badge
  initProductPage();        // Xử lý logic tìm kiếm & lọc trên trang products.html
  setupCartTriggers();      // Thiết lập sự kiện đóng/mở giỏ hàng
  initValidation();         // Khởi chạy kiểm tra form tại contact.html
});

// Chèn giao diện giỏ hàng vào cuối body của tất cả các trang một cách tự động [1]
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
      e.preventDefault(); // Ngăn chuyển hướng trang
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

function renderProductCard(productsToRender) {
  const container = document.getElementById("products-container");
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
        <p>${product.desc}</p>
        <p class="price">${product.price.toLocaleString("vi-VN")}đ</p>
        <div class="card-actions" style="display: flex; gap: 8px; flex-wrap: wrap; margin-top: auto;">
          <a class="btn btn-small" href="product-detail.html">Xem chi tiết</a>
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

  if (!document.getElementById("products-container")) return;

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
  openCart(); // Tự động mở giỏ hàng trượt sau khi thêm
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

function initValidation() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;
    const fullname = document.getElementById("fullname");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const address = document.getElementById("address");

    const errorFullname = document.getElementById("error-fullname");
    const errorEmail = document.getElementById("error-email");
    const errorPhone = document.getElementById("error-phone");
    const errorAddress = document.getElementById("error-address");

    [fullname, email, phone, address].forEach(inp => { if (inp) inp.classList.remove("invalid"); });
    [errorFullname, errorEmail, errorPhone, errorAddress].forEach(span => { if (span) span.textContent = ""; });

    if (fullname && fullname.value.trim() === "") {
      fullname.classList.add("invalid");
      errorFullname.textContent = "Vui lòng nhập họ tên.";
      isValid = false;
    }

    if (email && email.value.trim() === "") {
      email.classList.add("invalid");
      errorEmail.textContent = "Vui lòng nhập địa chỉ email.";
      isValid = false;
    }

    if (phone && phone.value.trim() === "") {
      phone.classList.add("invalid");
      errorPhone.textContent = "Vui lòng nhập số điện thoại.";
      isValid = false;
    }

    if (address && address.value.trim() === "") {
      address.classList.add("invalid");
      errorAddress.textContent = "Vui lòng nhập địa chỉ giao hàng.";
      isValid = false;
    }

    if (isValid) {
      alert("Đã gửi thông tin đặt hàng thành công!");
      form.reset();
      cart = [];
      localStorage.removeItem("tay_nguyen_cart");
      updateCartBadge();
      closeCart();
    }
  });
}