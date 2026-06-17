export interface Product {
  slug: string;
  name: string;
  originalPrice?: number;
  savings?: number;
  description: string;
  price: string;
  priceNumber: number;
  image: string;
  badge?: string;
  badgeType?: "bestseller" | "new";
  category?: string;
  recipient?: string[];
  imageContain?: boolean;
  occasions?: string[]; // e.g. ["tet", "valentine", "giang-sinh"]
  topics?: string[];    // e.g. ["doanh-nghiep", "doi-tuong"]
}


import type { DesignDraft } from "@/types/design";

export interface ProductCartItem {
  kind: "product";
  product: Product;
  quantity: number;
}

export interface DesignCartItem {
  kind: "design";
  design: DesignDraft;
  quantity: number;
}

export type CartItem = ProductCartItem | DesignCartItem;

export function getCartItemKey(item: CartItem): string {
  return item.kind === "product" ? item.product.slug : item.design.id;
}

export function getCartItemName(item: CartItem): string {
  return item.kind === "product" ? item.product.name : item.design.name;
}

export function getCartItemImage(item: CartItem): string {
  return item.kind === "product" ? item.product.image : item.design.previewDataUrl;
}

export function getCartItemDescription(item: CartItem): string {
  if (item.kind === "product") return item.product.description;
  const count = item.design.items.length;
  return `Thiết kế tự do · ${count} phụ kiện · ${item.design.frames.length} frame replay`;
}

export function getCartItemUnitPrice(item: CartItem): number {
  return item.kind === "product" ? item.product.priceNumber : item.design.totalPrice;
}

export function getCartItemTotal(item: CartItem): number {
  return getCartItemUnitPrice(item) * item.quantity;
}

export interface Review {
  name: string;
  title: string;
  avatar: string;
  rating: number;
  comment: string;
}

// === HOMEPAGE BESTSELLERS ===
export const bestsellers: Product[] = [
  {
    slug: "hop-qua-loc-xuan",
    name: "Hộp Quà Lộc Xuân",
    description: "Trà Ô Long, Hạt Điều, Mứt Sen",
    price: "1.250.000₫",
    priceNumber: 1250000,
    image: "/images/product-loc-xuan.jpg",
    badge: "Bestseller",
    badgeType: "bestseller",
    occasions: ["tet"],
  },
  {
    slug: "vang-vi-ngot",
    name: "Vang & Vị Ngọt",
    description: "Vang Đỏ Chile, Socola Artisan",
    price: "2.100.000₫",
    priceNumber: 2100000,
    image: "/images/product-vang-ngot.jpg",
    badge: "New Arrival",
    badgeType: "new",
    occasions: ["valentine", "giang-sinh"],
  },
  {
    slug: "gio-tre-truyen-thong",
    name: "Giỏ Tre Truyền Thống",
    description: "Đặc sản vùng miền thủ công",
    price: "850.000₫",
    priceNumber: 850000,
    image: "/images/product-gio-tre.jpg",
    occasions: ["tet", "trung-thu"],
  },
  {
    slug: "hop-tra-thuong-xuan",
    name: "Hộp Trà Thưởng Xuân",
    description: "Trà Sen Tây Hồ đặc biệt",
    price: "550.000₫",
    priceNumber: 550000,
    image: "/images/product-tra-xuan.jpg",
    occasions: ["tet", "20-11"],
  },
];


// === PRODUCT LISTING ===
export const allProducts: Product[] = [
  {
    "slug": "qua-tang-trung-thu-1",
    "name": "Fusion Moon 1",
    "description": "Hộp Quà Bánh Trung Thu Trái Cây Sang Trọng",
    "price": "793.000₫",
    "priceNumber": 793000,
    "originalPrice": 950000,
    "savings": 157000,
    "image": "/images/trung-thu1.png",
    "category": "Hộp Quà Tặng",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp",
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-trung-thu-2",
    "name": "Fusion Moon 2",
    "description": "Hộp Quà Bánh Trung Thu Trái Cây",
    "price": "1.350.000₫",
    "priceNumber": 1350000,
    "originalPrice": 1459000,
    "savings": 109000,
    "image": "/images/trung-thu2.png",
    "category": "Hộp Quà Tặng",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp", "Gia Đình"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },

  {
    "slug": "qua-tang-20-11-5",
    "name": "Deluxe Venture 1",
    "description": "Hộp Quà Vang Đặt Cát & Hồng Sâm Thượng Hạng",
    "price": "694.000₫",
    "priceNumber": 694000,
    "originalPrice": 750000,
    "savings": 56000,
    "image": "/images/qua-tet1.png",
    "category": "Xanh Dương Thượng Hạng",
    "recipient": [
      "Đối tác chiến lược & VIP", "Gia Đình"
    ],
    "occasions": [
      "tet"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-trung-thu-6",
    "name": "Fusion Moon 3",
    "description": "Hộp Quà Bánh Trung Thu Trái Cây Truyền Thống",
    "price": "674.000₫",
    "priceNumber": 674000,
    "originalPrice": 742000,
    "savings": 68000,
    "image": "/images/trung-thu3.png",
    "category": "Hộp Quà Tặng",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  
  {
    "slug": "qua-tang-trung-thu-8",
    "name": "Fusion Moon 4",
    "description": "Giỏ Quà Bánh Trung Thu Trái Cây Cổ Điển",
    "price": "949.000₫",
    "priceNumber": 949000,
    "originalPrice": 1099000,
    "savings": 150000,
    "image": "/images/trung-thu4.png",
    "category": "Giỏ Quà Tặng",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
 
  {
    "slug": "qua-tang-20-11-10",
    "name": "Gratitude Grace 1",
    "description": "Giỏ Quà Trái Cây - Lê, Kiwi, Cam, Hoa Tươi",
    "price": "674.000₫",
    "priceNumber": 674000,
    "originalPrice": 742000,
    "savings": 68000,
    "image": "/images/hoa1.png",
    "category": "Giỏ Quà Tặng",
    "recipient": ["Cô giáo", "Người Yêu", "Bạn Bè", "Mẹ & Bà", "Bạn Gái", "Đồng Nghiệp Nữ", "Gia Đình"],
    "occasions": ["20-11","valentine","8-3"],
    "topics": []
  },
    
  {
    "slug": "qua-tang-trung-thu-12",
    "name": "Fusion Moon 5",
    "description": "Giỏ Quà Bánh Trung Thu Trái Cây Tinh Tế",
    "price": "1.088.000₫",
    "priceNumber": 1088000,
    "originalPrice": 1265000,
    "savings": 177000,
    "image": "/images/trung-thu5.png",
    "category": "Giỏ Quà Tặng",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
 
  {
    "slug": "qua-tang-20-11-23",
    "name": "Gratitude Grace 2",
    "description": "Hộp Vali Quà Trái Cây Cam Vàng, Kiwi, Táo Đỏ",
    "price": "1.370.000₫",
    "priceNumber": 1370000,
    "originalPrice": 1507000,
    "savings": 137000,
    "image": "/images/hoa2.png",
    "category": "Hộp Quà Tặng",
    "recipient": [
      "Cô giáo", "Người Yêu", "Bạn Gái"
    ],
    "occasions": [
      "20-11","valentine","8-3"
    ],
    "topics": []
  },
 
  {
    "slug": "qua-tang-20-11-27",
    "name": "Gratitude Grace 3",
    "description": "Hộp Quà Tròn Trái Cây– Cherry đỏ, Dâu Hàn",
    "price": "1.176.000₫",
    "priceNumber": 1176000,
    "originalPrice": 1294000,
    "savings": 118000,
    "image": "/images/hoa3.png",
    "category": "Hộp Quà Tặng",
    "recipient": [
      "Thầy giáo", "Người Yêu", "Mẹ & Bà", "Bạn Gái", "Gia Đình"
    ],
    "occasions": [
      "20-11","valentine","8-3"
    ],
    "topics": []
  },
 
  {
    "slug": "qua-tang-20-11-29",
    "name": "Gratitude Grace 4",
    "description": "Hộp Quà Trái Cây Dâu Hàn, Kiwi Vàng & Sữa Hạt",
    "price": "919.000₫",
    "priceNumber": 919000,
    "originalPrice": 1011000,
    "savings": 92000,
    "image": "/images/hoa4.png",
    "category": "Hộp Quà Tặng",
    "recipient": [
      "Thầy giáo", "Bạn Bè", "Mẹ & Bà", "Đồng Nghiệp Nữ", "Gia Đình"
    ],
    "occasions": [
      "20-11","valentine","8-3"
    ],
    "topics": []
  },
 
  {
    "slug": "qua-tang-20-11-31",
    "name": "Gratitude Grace 5",
    "description": "Giỏ Quà Trái Cây Nho Xanh, Táo Đỏ, Lê Hàn",
    "price": "1.766.000₫",
    "priceNumber": 1766000,
    "originalPrice": 1943000,
    "savings": 177000,
    "image": "/images/hoa5.png",
    "category": "Giỏ Quà Tặng",
    "recipient": [
      "Cô giáo", "Người Yêu", "Mẹ & Bà", "Bạn Gái"
    ],
    "occasions": [
      "20-11","valentine","8-3"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-32",
    "name": "Duyên Định Trăm Năm",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "450.000₫",
    "priceNumber": 450000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Cha Mẹ",
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": []
  },
  
  {
    "slug": "qua-tang-giang-sinh-53",
    "name": "Món Quà Giáng Sinh #53",
    "description": "Bánh Gừng Thủ Công, Vang Nóng Glühwein, Đồ Decor Giáng Sinh",
    "price": "3.100.000₫",
    "priceNumber": 3100000,
    "image": "/images/list-an-khang.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp",
      "Người Yêu"
    ],
    "occasions": [
      "giang-sinh"
    ],
    "topics": []
  },
 
  {
    "slug": "qua-tang-giang-sinh-70",
    "name": "Đêm Đông Ấm Áp #70",
    "description": "Bánh Gừng Thủ Công, Vang Nóng Glühwein, Đồ Decor Giáng Sinh",
    "price": "1.500.000₫",
    "priceNumber": 1500000,
    "image": "/images/product-vang-ngot.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Người Yêu",
      "Người Yêu"
    ],
    "occasions": [
      "giang-sinh"
    ],
    "topics": []
  },
 
  {
    "slug": "qua-tang-valentine-99",
    "name": "Deluxe Venture 2",
    "description": "Hộp Quà Vang Thượng Hạng & Bánh Kẹo Nhập Khẩu",
    "price": "918.000₫",
    "priceNumber": 918000,
    "originalPrice": 980000,
    "savings": 62000,
    "image": "/images/qua-tet2.png",
    "category": "Đỏ Thịnh Vượng",
    "recipient": [
      "Đối tác chiến lược & VIP", "Gia Đình"
    ],
    "occasions": [
      "tet"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  
  {
    "slug": "qua-tang-valentine-101",
    "name": "Nhịp Đập Trái Tim",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "700.000₫",
    "priceNumber": 700000,
    "image": "/images/product-vang-ngot.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Người Yêu"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": []
  },
 
  {
    "slug": "qua-tang-trung-thu-106",
    "name": "Deluxe Venture 3",
    "description": "Hộp Quà Vang Nổ, Trà Anh Quốc & Hạt Dinh Dưỡng",
    "price": "1.085.000₫",
    "priceNumber": 1085000,
    "originalPrice": 1200000,
    "savings": 115000,
    "image": "/images/qua-tet3.png",
    "category": "Xanh Dương Thượng Hạng",
    "recipient": [
      "Cán bộ & Nhân viên",
      "Đại lý & Nhà phân phối", "Gia Đình"
    ],
    "occasions": [
      "tet"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },

  {
    "slug": "qua-tang-valentine-110",
    "name": "Deluxe Venture 4",
    "description": "Hộp Quà Vang Pháp, Bánh Thiếc Ý & Trà Cao Cấp",
    "price": "1.122.000₫",
    "priceNumber": 1122000,
    "originalPrice": 1200000,
    "savings": 78000,
    "image": "/images/qua-tet4.png",
    "category": "Đỏ Thịnh Vượng",
    "recipient": [
      "Cán bộ & Nhân viên",
      "Đại lý & Nhà phân phối", "Gia Đình"
    ],
    "occasions": [
      "tet"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
 
  {
    "slug": "qua-tang-doanh-nghiep-112",
    "name": "Deluxe Venture 5",
    "description": "Hộp Quà Vang Thượng Hạng, Cà Phê UCC & Súp Sò Điệp",
    "price": "2.803.000₫",
    "priceNumber": 2803000,
    "originalPrice": 3000000,
    "savings": 197000,
    "image": "/images/qua-tet5.png",
    "category": "Xanh Lục Bảo",
    "recipient": [
      "Đối tác chiến lược & VIP", "Gia Đình"
    ],
    "occasions": [
      "tet"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  // THÊM VÀO allProducts:
{
  slug: "gio-qua-sum-vay",
  name: "Giỏ Quà Sum Vầy",
  description: "Ngũ cốc óc chó, nấm sấy Úc, kẹo Đức và trà chanh mật ong Hàn.",
  price: "1.015.000đ",
  priceNumber: 1015000,
  image: "/images/bestseller-sum-vay.png",
  imageContain: true,
  category: "Giỏ Quà Tặng",
  recipient: ["Gia Đình", "Bạn Bè & Đồng Nghiệp"],
  occasions: ["tet"],
  topics: [],
},
{
  slug: "hop-qua-tron-ven",
  name: "Hộp Quà Trọn Vẹn",
  description: "Cà phê Starbucks, sô-cô-la hạnh nhân tiramisu và ly thủy tinh bọc da.",
  price: "300.000đ",
  priceNumber: 300000,
  image: "/images/bestseller-tron-ven.png",
  imageContain: true,
  category: "Hộp Quà Tặng",
  recipient: ["Người Yêu", "Bạn Bè & Đồng Nghiệp"],
  occasions: ["valentine", "8-3"],
  topics: [],
},
{
  slug: "gio-qua-dong-day",
  name: "Giỏ Quà Đong Đầy",
  description: "Nước ép táo hữu cơ Mỹ, bánh quy Nhật và mật ong Miele nguyên chất.",
  price: "762.000đ",
  priceNumber: 762000,
  image: "/images/bestseller-dong-day.png",
  imageContain: true,
  category: "Giỏ Quà Tặng",
  recipient: ["Gia Đình", "Đối Tác Kinh Doanh"],
  occasions: ["tet", "trung-thu"],
  topics: [],
},
 
  {
    "slug": "mut-trai-cay-say-deo-dan-d-pak-nho-vang",
    "name": "Mứt Trái Cây Sấy Dẻo Dan-D Pak Hộp Tròn Nho Vàng 150g",
    "description": "Mứt nho vàng sấy dẻo Dan-D Pak, hộp tròn 150g",
    "price": "75.000₫",
    "priceNumber": 75000,
    "image": "/images/product-mut-trai-cay-say-deo-dan-d-pak-nho-vang.jpg",
    "category": "Hạt & Trái Cây Sấy",
    "recipient": [],
    "occasions": ["tet"],
    "topics": []
  },
  {
    "slug": "tac-chanh-day-mat-ong-say-deo-123-farm",
    "name": "Tắc Chanh Dây Mật Ong Sấy Dẻo 123 Farm Hộp 85g",
    "description": "Tắc chanh dây sấy dẻo mật ong, 123 Farm 85g",
    "price": "75.000₫",
    "priceNumber": 75000,
    "image": "/images/product-tac-chanh-day-mat-ong-say-deo-123-farm.jpg",
    "category": "Hạt & Trái Cây Sấy",
    "recipient": [],
    "occasions": ["tet"],
    "topics": []
  },
  {
    "slug": "gung-nuong-mat-hoa-thot-not-say-deo-123-farm",
    "name": "Gừng Nướng Mật Hoa Thốt Nốt Sấy Dẻo 123 Farm Hộp 85g",
    "description": "Gừng nướng mật hoa thốt nốt sấy dẻo, 123 Farm 85g",
    "price": "85.000₫",
    "priceNumber": 85000,
    "image": "/images/product-gung-nuong-mat-hoa-thot-not-say-deo-123-farm.jpg",
    "category": "Hạt & Trái Cây Sấy",
    "recipient": [],
    "occasions": ["tet"],
    "topics": []
  },
  {
    "slug": "hat-dieu-rang-muoi-garden-farm",
    "name": "Hạt Điều Rang Muối Garden Farm Hộp 200g",
    "description": "Hạt điều rang muối Garden Farm, hộp 200g",
    "price": "90.000₫",
    "priceNumber": 90000,
    "image": "/images/product-hat-dieu-rang-muoi-garden-farm.jpg",
    "category": "Hạt & Trái Cây Sấy",
    "recipient": [],
    "occasions": ["tet"],
    "topics": []
  },
  {
    "slug": "hat-hon-hop-tam-vi-savanna-my",
    "name": "Hạt Hỗn Hợp Tẩm Vị Savanna Mỹ 850g",
    "description": "Hỗn hợp hạt tẩm vị Savanna nhập Mỹ, hộp 850g",
    "price": "520.000₫",
    "priceNumber": 520000,
    "image": "/images/product-hat-hon-hop-tam-vi-savanna-my.jpg",
    "category": "Hạt & Trái Cây Sấy",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": ["tet"],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "bot-nhan-sam-great-mountain",
    "name": "Bột Nhân Sâm Cao Cấp Great Mountain Hũ 114g",
    "description": "Bột nhân sâm cao cấp Great Mountain, hũ 114g",
    "price": "1.080.000₫",
    "priceNumber": 1080000,
    "image": "/images/product-bot-nhan-sam-great-mountain.jpg",
    "category": "Trà & Coffee",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": ["tet", "20-11"],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "mat-ong-nhan-sam-great-mountain",
    "name": "Mật Ong Nhân Sâm Great Mountain Canada Hộp 350g",
    "description": "Mật ong nhân sâm Great Mountain Canada, hộp 350g",
    "price": "600.000₫",
    "priceNumber": 600000,
    "image": "/images/product-mat-ong-nhan-sam-great-mountain.jpg",
    "category": "Trà & Coffee",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": ["tet", "20-11"],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "ca-phe-hoa-tan-nescafe-gold-blend",
    "name": "Cà Phê Hòa Tan Nescafé Gold Blend 100g",
    "description": "Cà phê hòa tan Nescafé Gold Blend, lọ 100g",
    "price": "150.000₫",
    "priceNumber": 150000,
    "image": "/images/product-ca-phe-hoa-tan-nescafe-gold-blend.jpg",
    "category": "Trà & Coffee",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": ["20-11"],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "ca-phe-hoa-tan-nescafe-gold-origins-colombia",
    "name": "Cà Phê Hòa Tan Nescafé Gold Origins Cap Colombia 100g",
    "description": "Cà phê hòa tan Nescafé Gold Origins Colombia, lọ 100g",
    "price": "205.000₫",
    "priceNumber": 205000,
    "image": "/images/product-ca-phe-hoa-tan-nescafe-gold-origins-colombia.jpg",
    "category": "Trà & Coffee",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": ["20-11"],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "tra-chanh-mat-ong-citron-tea-nonghyup",
    "name": "Trà Chanh Mật Ong Citron Tea NongHyup HQ 550g",
    "description": "Trà chanh mật ong Citron Tea NongHyup Hàn Quốc, hũ 550g",
    "price": "100.000₫",
    "priceNumber": 100000,
    "image": "/images/product-tra-chanh-mat-ong-citron-tea-nonghyup.jpg",
    "category": "Trà & Coffee",
    "recipient": [],
    "occasions": ["tet", "20-11"],
    "topics": []
  }
]
;
// === PRODUCT DETAIL ===
export const featuredProduct = {
  slug: "phuong-hoang-cat-tuong",
  name: "Phượng Hoàng Cát Tường",
  collection: "Sưu Tập Hoàng Gia 2024",
  price: "2.850.000",
  currency: "VNĐ",
  rating: 5,
  reviewCount: 48,
  description:
    "Lấy cảm hứng từ hình tượng Phượng Hoàng quyền quý, hộp quà là sự kết tinh của nghệ thuật sơn mài truyền thống và các đặc sản thượng hạng được tuyển chọn khắt khe.",
  badge: "Mẫu Độc Bản",
  images: {
    main: "/images/detail-main.jpg",
    thumbnails: [
      "/images/detail-thumb1.jpg",
      "/images/detail-thumb2.jpg",
      "/images/detail-thumb3.jpg",
      "/images/detail-thumb4.jpg",
    ],
  },
  contents: [
    { name: "Rượu Vang Chateau Heritage Premium", amount: "750ml" },
    { name: "Trà Ô Long Cổ Thụ (Hộp Thiếc Nghệ Thuật)", amount: "150g" },
    { name: "Hạt Điều Rang Củi Đặc Sản Bình Phước", amount: "200g" },
    { name: "Mứt Vỏ Bưởi Sấy Dẻo Thượng Hạng", amount: "180g" },
    { name: "Hạnh Nhân Rang Bơ Mỹ", amount: "220g" },
  ],
  dimensions: "35x28x12 CM",
  weight: "3.2 KG",
};

export const reviews: Review[] = [
  {
    name: "Anh Tuấn Nguyễn",
    title: "CEO, Tech Innovate",
    avatar: "/images/avatar-tuan.jpg",
    rating: 5,
    comment:
      '"Hộp quà rất sang trọng, các chi tiết thêu trên nắp hộp cực kỳ tỉ mỉ. Các món bên trong đều là hàng cao cấp, xứng đáng làm quà biếu đối tác."',
  },
  {
    name: "Chị Minh Hằng",
    title: "Khách hàng thân thiết",
    avatar: "/images/avatar-hang.jpg",
    rating: 5,
    comment:
      '"Giao hàng nhanh dù sát Tết. Đóng gói rất cẩn thận, không một vết trầy xước. Rượu vang rất ngon, ba mẹ mình rất thích trà Ô Long."',
  },
  {
    name: "Bác Hùng Lê",
    title: "Khách hàng Hà Nội",
    avatar: "/images/avatar-hung.jpg",
    rating: 4,
    comment:
      '"Màu đỏ của hộp quà rất đẹp, đúng chất Tết cổ truyền nhưng vẫn rất hiện đại. Đã đặt thêm 5 hộp cho gia đình hai bên nội ngoại."',
  },
];

export const relatedProducts: Product[] = [
  {
    slug: "hop-qua-kim-mai",
    name: "Hộp Quà Kim Mai",
    description: "Truyền thống & Tinh tế",
    price: "1.450.000₫",
    priceNumber: 1450000,
    image: "/images/related-kim-mai.jpg",
  },
  {
    slug: "dai-cat-dai-loi-premium",
    name: "Đại Cát Đại Lợi - Premium",
    description: "Phiên bản giới hạn",
    price: "4.200.000₫",
    priceNumber: 4200000,
    image: "/images/related-dai-cat.jpg",
  },
  {
    slug: "tra-dao-an-nhien",
    name: "Trà Đạo An Nhiên",
    description: "Mộc mạc & Ấm cúng",
    price: "850.000₫",
    priceNumber: 850000,
    image: "/images/related-tra-dao.jpg",
  },
];
