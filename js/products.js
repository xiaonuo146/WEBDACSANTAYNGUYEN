/**
 * DANH SÁCH 10 SẢN PHẨM ĐẶC SẢN TÂY NGUYÊN 
 */
const productsData = [
  {
    id: 1,
    name: "Cà phê Buôn Ma Thuột Robusta",
    category: "ca-phe",
    price: 180000,
    unit: "Gói 500g",
    origin: "Đắk Lắk",
    image: "images/ca-phe-buon-ma-thuot.jpg",
    stock: 20,
    description: "Hạt Robusta thượng hạng từ thủ phủ cà phê, rang mộc giữ trọn hương vị đậm đà nguyên bản.",
    featured: true
  },
  {
    id: 2,
    name: "Mật ong rừng Tây Nguyên",
    category: "mat-ong",
    price: 220000,
    unit: "Chai 500ml",
    origin: "Kon Tum",
    image: "images/mat-ong-rung-tay-nguyen.jpg",
    stock: 15,
    description: "Mật ong tự nhiên thu hoạch từ những tổ ong hoang dã sâu trong rừng già nguyên sinh.",
    featured: true
  },
  {
    id: 3,
    name: "Mắc ca Tây Nguyên sấy nứt",
    category: "mac-ca",
    price: 160000,
    unit: "Hộp 500g",
    origin: "Lâm Đồng",
    image: "images/mac-ca-tay-nguyen.jpg",
    stock: 12,
    description: "Hạt mắc ca sấy giòn bùi, nứt vỏ tự nhiên, dồi dào dưỡng chất tốt cho tim mạch.",
    featured: true
  },
  {
    id: 4,
    name: "Tiêu hạt đen Đắk Nông",
    category: "gia-vi",
    price: 140000,
    unit: "Hũ 500g",
    origin: "Đắk Nông",
    image: "images/tieu-dak-nong.jpg",
    stock: 18,
    description: "Hạt tiêu mẩy tròn đều, vị cay nồng đặc trưng, thơm đậm vị núi rừng đất đỏ bazan.",
    featured: true
  },
  {
    id: 5,
    name: "Bơ sáp dẻo Đắk Lắk",
    category: "trai-cay",
    price: 85000,
    unit: "Kg",
    origin: "Đắk Lắk",
    image: "images/bo-sap-dak-lak.jpg",
    stock: 25,
    description: "Bơ sáp già quả dẻo quánh, cơm vàng ươm mịn màng không xơ, vị béo thơm đặc sản.",
    featured: false
  },
  {
    id: 6,
    name: "Thổ cẩm dệt tay Ê-đê",
    category: "luu-niem",
    price: 290000,
    unit: "Tấm",
    origin: "Gia Lai",
    image: "images/tho-cam-tay-nguyen.jpg",
    stock: 10,
    description: "Tấm vải dệt thổ cẩm thủ công với các đường nét họa tiết hoa văn truyền thống tinh xảo.",
    featured: false
  },
  {
    id: 7,
    name: "Sầu riêng Dona Krông Pắc",
    category: "trai-cay",
    price: 135000,
    unit: "Kg",
    origin: "Đắk Lắk",
    image: "images/sau-rieng-dak-lak.jpg", 
    stock: 30,
    description: "Cơm sầu riêng vàng đậm, hạt lép, vị ngọt đậm đà béo ngậy chuẩn chất lượng xuất khẩu.",
    featured: false
  },
  {
    id: 8,
    name: "Muối kiến vàng Gia Lai",
    category: "gia-vi",
    price: 95000,
    unit: "Hũ 200g",
    origin: "Gia Lai",
    image: "images/muoi-kien-vang.jpg",
    stock: 40,
    description: "Sự kết hợp độc đáo từ kiến rừng, muối hột và ớt cay, tạo nên vị chua cay đặc sản vùng cao.",
    featured: false
  },
  {
    id: 9,
    name: "Trà ô long Cầu Đất",
    category: "trai-cay",
    price: 250000,
    unit: "Gói 250g",
    origin: "Lâm Đồng",
    image: "images/tra-o-long-cau-dat.jpg", 
    stock: 16,
    description: "Hương vị trà ô long nhẹ nhàng thơm mát, kết tinh từ vùng đất Cầu Đất cao ráo mờ sương.",
    featured: false
  },
  {
    id: 10,
    name: "Rượu cần Y Miên",
    category: "gia-vi",
    price: 320000,
    unit: "Ché 6 Lít",
    origin: "Đắk Lắk",
    image: "images/ruou-can-y-mien.jpg", 
    stock: 8,
    description: "Rượu cần men lá cây rừng truyền thống, hương vị nồng ấm đậm bản sắc Tây Nguyên.",
    featured: false
  }
];