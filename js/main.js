const products = [
  { id: 1, name: "Cà phê Buôn Ma Thuột", category: "nong-san-kho", categoryLabel: "Nông sản khô & hạt", price: 120000, origin: "Đắk Lắk", stock: 20, image: "images/ca-phe-buon-ma-thuot.jpg", weight: "500 g", shelfLife: "12 tháng", storage: "Để nơi khô ráo, thoáng mát, đậy kín sau khi mở.", description: "Cà phê rang xay đậm vị, hương thơm rõ nét, phù hợp pha phin hoặc máy." },
  { id: 2, name: "Hạt mắc ca Tây Nguyên", category: "nong-san-kho", categoryLabel: "Nông sản khô & hạt", price: 150000, origin: "Đắk Lắk", stock: 18, image: "images/mac-ca.jpg", weight: "500 g", shelfLife: "9 tháng", storage: "Bảo quản kín, tránh ánh nắng trực tiếp.", description: "Hạt mắc ca thơm béo, giòn nhẹ, phù hợp dùng làm món ăn nhẹ hoặc quà tặng." },
  { id: 3, name: "Hạt tiêu Đắk Nông", category: "nong-san-kho", categoryLabel: "Nông sản khô & hạt", price: 90000, origin: "Đắk Nông", stock: 25, image: "images/tieu-dak-nong.jpg", weight: "250 g", shelfLife: "12 tháng", storage: "Đựng trong hũ kín, tránh ẩm.", description: "Hạt tiêu thơm, vị cay rõ, thích hợp dùng trong nhiều món ăn gia đình." },
  { id: 4, name: "Mật ong hoa cà phê", category: "mat-tu-nhien", categoryLabel: "Sản phẩm từ mật & tự nhiên", price: 180000, origin: "Đắk Lắk", stock: 15, image: "images/mat-ong-hoa-ca-phe.jpg", weight: "500 ml", shelfLife: "24 tháng", storage: "Đậy kín nắp, để ở nhiệt độ phòng.", description: "Mật ong có vị ngọt dịu và hương thơm nhẹ đặc trưng của mùa hoa cà phê." },
  { id: 5, name: "Bơ sáp Đắk Lắk", category: "trai-cay", categoryLabel: "Trái cây & nông sản tươi", price: 65000, origin: "Đắk Lắk", stock: 30, image: "images/bo-sap-dak-lak.jpg", weight: "1 kg", shelfLife: "5-7 ngày", storage: "Để nơi thoáng mát; khi chín có thể bảo quản ngăn mát.", description: "Bơ sáp có phần thịt dẻo, vị béo và màu vàng xanh tự nhiên." },
  { id: 6, name: "Sầu riêng Đắk Lắk", category: "trai-cay", categoryLabel: "Trái cây & nông sản tươi", price: 95000, origin: "Đắk Lắk", stock: 12, image: "images/sau-rieng-dak-lak.jpg", weight: "1 kg", shelfLife: "3-5 ngày", storage: "Bảo quản nơi thoáng mát; phần múi đã tách nên giữ lạnh.", description: "Sầu riêng cơm vàng, vị béo và mùi thơm đặc trưng." },
  { id: 7, name: "Muối kiến vàng Gia Lai", category: "gia-vi", categoryLabel: "Gia vị & thực phẩm chế biến", price: 70000, origin: "Gia Lai", stock: 22, image: "images/muoi-kien-vang.jpg", weight: "200 g", shelfLife: "6 tháng", storage: "Đậy kín, tránh ẩm và ánh nắng.", description: "Gia vị đặc trưng của Gia Lai với vị mặn, chua và cay hài hòa." },
  { id: 8, name: "Rượu cần Tây Nguyên", category: "gia-vi", categoryLabel: "Gia vị & thực phẩm chế biến", price: 250000, origin: "Tây Nguyên", stock: 10, image: "images/ruou-can.jpg", weight: "1 ché", shelfLife: "12 tháng", storage: "Để nơi khô ráo, thoáng mát, tránh nhiệt cao.", description: "Thức uống truyền thống gắn với sinh hoạt cộng đồng và văn hóa Tây Nguyên." }
];

let cart = JSON.parse(localStorage.getItem("tayNguyenCart") || "[]");

function formatPrice(price) { return `${price.toLocaleString("vi-VN")} đ`; }
function saveCart() { localStorage.setItem("tayNguyenCart", JSON.stringify(cart)); updateCartCount(); renderCartSummary(); }
function updateCartCount() { document.querySelectorAll("#cart-count").forEach(el => { el.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); }); }
function showToast(message) { const toast = document.querySelector("#toast"); if (!toast) return; toast.textContent = message; toast.classList.add("show"); window.setTimeout(() => toast.classList.remove("show"), 1800); }
function addToCart(productId) { const product = products.find(p => p.id === Number(productId)); if (!product || product.stock <= 0) return; const existing = cart.find(item => item.id === product.id); if (existing) existing.quantity += 1; else cart.push({ id: product.id, quantity: 1 }); saveCart(); showToast(`Đã thêm ${product.name} vào giỏ hàng.`); }

function renderProducts(items) {
  const productList = document.querySelector("#product-list");
  const noResults = document.querySelector("#no-results");
  if (!productList) return;
  if (items.length === 0) { productList.innerHTML = ""; if (noResults) noResults.hidden = false; return; }
  if (noResults) noResults.hidden = true;
  productList.innerHTML = items.map(product => `
    <article class="product-card">
      <img src="${product.image}" alt="${product.name}">
      <div class="product-content">
        <span class="badge">${product.categoryLabel}</span>
        <h3>${product.name}</h3>
        <p>Xuất xứ: ${product.origin}</p>
        <p class="price">${formatPrice(product.price)}</p>
        <p class="stock">${product.stock > 0 ? `Còn hàng: ${product.stock}` : "Hết hàng"}</p>
        <div class="card-actions">
          <a class="text-link" href="product-detail.html?id=${product.id}">Xem chi tiết</a>
          <button type="button" class="btn btn-small add-to-cart" data-id="${product.id}" ${product.stock <= 0 ? "disabled" : ""}>Thêm vào giỏ hàng</button>
        </div>
      </div>
    </article>`).join("");
}

function setupProductPage() {
  const productList = document.querySelector("#product-list");
  if (!productList) return;
  const searchInput = document.querySelector("#search-input");
  const categoryFilter = document.querySelector("#category-filter");
  const queryCategory = new URLSearchParams(window.location.search).get("category");
  if (queryCategory && [...categoryFilter.options].some(o => o.value === queryCategory)) categoryFilter.value = queryCategory;
  function applyFilters() {
    const keyword = searchInput.value.trim().toLowerCase();
    const category = categoryFilter.value;
    const result = products.filter(p => p.name.toLowerCase().includes(keyword) && (category === "all" || p.category === category));
    renderProducts(result);
  }
  searchInput.addEventListener("input", applyFilters);
  categoryFilter.addEventListener("change", applyFilters);
  productList.addEventListener("click", event => { const button = event.target.closest(".add-to-cart"); if (button) addToCart(button.dataset.id); });
  applyFilters();
}

function setupDetailPage() {
  const detail = document.querySelector("#product-detail");
  if (!detail) return;
  const id = Number(new URLSearchParams(window.location.search).get("id")) || 1;
  const product = products.find(p => p.id === id) || products[0];
  document.title = `${product.name} - Đặc Sản Tây Nguyên`;
  detail.innerHTML = `
    <div class="detail-image"><img src="${product.image}" alt="${product.name}"></div>
    <article class="detail-info">
      <span class="badge">${product.categoryLabel}</span>
      <h1>${product.name}</h1>
      <p class="detail-description">${product.description}</p>
      <p class="price detail-price">${formatPrice(product.price)}</p>
      <dl class="product-specs"><div><dt>Xuất xứ</dt><dd>${product.origin}</dd></div><div><dt>Khối lượng</dt><dd>${product.weight}</dd></div><div><dt>Hạn sử dụng</dt><dd>${product.shelfLife}</dd></div><div><dt>Cách bảo quản</dt><dd>${product.storage}</dd></div></dl>
      <div class="action-group"><button type="button" class="btn" id="detail-add" data-id="${product.id}">Thêm vào giỏ hàng</button><a class="btn btn-secondary" href="contact.html">Liên hệ tư vấn</a></div>
    </article>`;
  document.querySelector("#detail-add").addEventListener("click", e => addToCart(e.currentTarget.dataset.id));
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);
  const relatedBox = document.querySelector("#related-products");
  relatedBox.innerHTML = (related.length ? related : products.filter(p => p.id !== product.id).slice(0, 3)).map(p => `<article class="product-card compact-card"><img src="${p.image}" alt="${p.name}"><div class="product-content"><h3>${p.name}</h3><p class="price">${formatPrice(p.price)}</p><a href="product-detail.html?id=${p.id}">Xem chi tiết ${p.name}</a></div></article>`).join("");
}

function renderCartSummary() {
  const box = document.querySelector("#cart-summary");
  if (!box) return;
  if (cart.length === 0) { box.innerHTML = '<p class="empty-message">Giỏ hàng chưa có sản phẩm. <a href="products.html">Chọn sản phẩm</a>.</p>'; return; }
  const rows = cart.map(item => { const p = products.find(product => product.id === item.id); if (!p) return ""; return `<li><span>${p.name} × ${item.quantity}</span><strong>${formatPrice(p.price * item.quantity)}</strong></li>`; }).join("");
  const total = cart.reduce((sum, item) => { const p = products.find(product => product.id === item.id); return sum + (p ? p.price * item.quantity : 0); }, 0);
  box.innerHTML = `<ul>${rows}</ul><p class="cart-total">Tổng tạm tính: <strong>${formatPrice(total)}</strong></p>`;
}

function setupOrderForm() {
  const form = document.querySelector("#order-form");
  if (!form) return;
  renderCartSummary();
  form.addEventListener("submit", event => {
    event.preventDefault();
    const customerName = document.querySelector("#customer-name").value.trim();
    const phone = document.querySelector("#phone").value.trim();
    const address = document.querySelector("#address").value.trim();
    const message = document.querySelector("#order-message");
    if (customerName.length < 3) { message.textContent = "Họ tên phải có ít nhất 3 ký tự."; message.className = "form-message error"; return; }
    if (!/^[0-9]{10}$/.test(phone)) { message.textContent = "Số điện thoại phải gồm đúng 10 chữ số."; message.className = "form-message error"; return; }
    if (address.length < 10) { message.textContent = "Địa chỉ phải có ít nhất 10 ký tự."; message.className = "form-message error"; return; }
    if (cart.length === 0) { message.textContent = "Giỏ hàng chưa có sản phẩm."; message.className = "form-message error"; return; }
    message.textContent = "Đơn hàng đã được ghi nhận."; message.className = "form-message success";
    form.reset(); cart = []; saveCart();
  });
}

function setupContactForm() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  form.addEventListener("submit", event => {
    event.preventDefault();
    const name = document.querySelector("#contact-name").value.trim();
    const email = document.querySelector("#contact-email").value.trim();
    const phone = document.querySelector("#contact-phone").value.trim();
    const content = document.querySelector("#contact-message").value.trim();
    const output = document.querySelector("#contact-message-result");
    if (name.length < 3 || !email || !/^[0-9]{10}$/.test(phone) || !content) { output.textContent = "Vui lòng nhập đầy đủ thông tin hợp lệ (số điện thoại gồm 10 chữ số)."; output.className = "form-message error"; return; }
    output.textContent = "Thông tin liên hệ đã được ghi nhận."; output.className = "form-message success"; form.reset();
  });
}

updateCartCount();
setupProductPage();
setupDetailPage();
setupOrderForm();
setupContactForm();
