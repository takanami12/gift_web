export interface Product {
  slug: string;
  name: string;
  description: string;
  price: string;
  priceNumber: number;
  image: string;
  badge?: string;
  badgeType?: "bestseller" | "new";
  category?: string;
  recipient?: string[];
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
    "name": "Đoàn Viên Hội Ngộ #1",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "2.100.000₫",
    "priceNumber": 2100000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Người Yêu",
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-trung-thu-2",
    "name": "Đoàn Viên Hội Ngộ #2",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "2.900.000₫",
    "priceNumber": 2900000,
    "image": "/images/product-gio-tre.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Người Yêu"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-10-3",
    "name": "Tri Ân Phái Đẹp #3",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "2.200.000₫",
    "priceNumber": 2200000,
    "image": "/images/list-sum-vay.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-4",
    "name": "Duyên Định Trăm Năm #4",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "1.300.000₫",
    "priceNumber": 1300000,
    "image": "/images/product-vang-ngot.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Gia Đình & Người Thân",
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-11-5",
    "name": "Tri Ân Thầm Lặng #5",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "600.000₫",
    "priceNumber": 600000,
    "image": "/images/product-tra-xuan.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-trung-thu-6",
    "name": "Thưởng Nguyệt Tinh Hoa #6",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "3.000.000₫",
    "priceNumber": 3000000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-doanh-nghiep-7",
    "name": "Tiên Phong Bứt Phá #7",
    "description": "Sổ Da Thật Cao Cấp, Bút Ký Bọc Vàng, Rượu Whisky 18 Năm",
    "price": "600.000₫",
    "priceNumber": 600000,
    "image": "/images/list-an-khang.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Người Yêu"
    ],
    "occasions": [
      "doanh-nghiep"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-trung-thu-8",
    "name": "Đoàn Viên Hội Ngộ #8",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "2.800.000₫",
    "priceNumber": 2800000,
    "image": "/images/product-gio-tre.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-10-9",
    "name": "Nét Đẹp Vĩnh Hằng #9",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "1.500.000₫",
    "priceNumber": 1500000,
    "image": "/images/list-sum-vay.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-11-10",
    "name": "Vườn Ươm Tài Năng #10",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "1.100.000₫",
    "priceNumber": 1100000,
    "image": "/images/product-tra-xuan.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-doanh-nghiep-11",
    "name": "Vững Bước Thành Công #11",
    "description": "Sổ Da Thật Cao Cấp, Bút Ký Bọc Vàng, Rượu Whisky 18 Năm",
    "price": "800.000₫",
    "priceNumber": 800000,
    "image": "/images/list-phu-quy.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Người Yêu"
    ],
    "occasions": [
      "doanh-nghiep"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-trung-thu-12",
    "name": "Thưởng Nguyệt Tinh Hoa #12",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "900.000₫",
    "priceNumber": 900000,
    "image": "/images/product-gio-tre.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Người Yêu"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-giang-sinh-13",
    "name": "Món Quà Giáng Sinh #13",
    "description": "Bánh Gừng Thủ Công, Vang Nóng Glühwein, Đồ Decor Giáng Sinh",
    "price": "3.000.000₫",
    "priceNumber": 3000000,
    "image": "/images/product-vang-ngot.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Cha Mẹ",
      "Người Yêu"
    ],
    "occasions": [
      "giang-sinh"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-tet-14",
    "name": "Sum Vầy Đoàn Viên #14",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "1.200.000₫",
    "priceNumber": 1200000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Người Yêu"
    ],
    "occasions": [
      "tet"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-20-11-15",
    "name": "Người Lái Đò Tận Tâm #15",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "2.100.000₫",
    "priceNumber": 2100000,
    "image": "/images/list-van-su.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Người Yêu",
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-tet-16",
    "name": "Lộc Xuân Như Ý #16",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "2.200.000₫",
    "priceNumber": 2200000,
    "image": "/images/list-van-su.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Gia Đình & Người Thân",
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "tet"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-17",
    "name": "Duyên Định Trăm Năm #17",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "2.100.000₫",
    "priceNumber": 2100000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-trung-thu-18",
    "name": "Đoàn Viên Hội Ngộ #18",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "3.000.000₫",
    "priceNumber": 3000000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-19",
    "name": "Duyên Định Trăm Năm #19",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "700.000₫",
    "priceNumber": 700000,
    "image": "/images/product-vang-ngot.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Gia Đình & Người Thân",
      "Cha Mẹ"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-10-20",
    "name": "Gửi Trọn Yêu Thương #20",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "1.600.000₫",
    "priceNumber": 1600000,
    "image": "/images/list-sum-vay.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-21",
    "name": "Lời Yêu Ngọt Ngào #21",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "1.800.000₫",
    "priceNumber": 1800000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-22",
    "name": "Tình Nồng Khởi Sắc #22",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "1.300.000₫",
    "priceNumber": 1300000,
    "image": "/images/product-vang-ngot.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-11-23",
    "name": "Vườn Ươm Tài Năng #23",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "2.700.000₫",
    "priceNumber": 2700000,
    "image": "/images/product-tra-xuan.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-tet-24",
    "name": "Giao Xuân Tinh Hoa #24",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "3.400.000₫",
    "priceNumber": 3400000,
    "image": "/images/list-van-su.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "tet"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-giang-sinh-25",
    "name": "Lễ Hội Ánh Sáng #25",
    "description": "Bánh Gừng Thủ Công, Vang Nóng Glühwein, Đồ Decor Giáng Sinh",
    "price": "2.100.000₫",
    "priceNumber": 2100000,
    "image": "/images/list-an-khang.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "giang-sinh"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-trung-thu-26",
    "name": "Trăng Vàng Phố Cổ #26",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "700.000₫",
    "priceNumber": 700000,
    "image": "/images/product-gio-tre.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp",
      "Người Yêu"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-20-11-27",
    "name": "Tri Ân Thầm Lặng #27",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "1.300.000₫",
    "priceNumber": 1300000,
    "image": "/images/list-van-su.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Người Yêu",
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-trung-thu-28",
    "name": "Trăng Vàng Phố Cổ #28",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "1.800.000₫",
    "priceNumber": 1800000,
    "image": "/images/product-gio-tre.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-11-29",
    "name": "Tri Ân Thầm Lặng #29",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "3.000.000₫",
    "priceNumber": 3000000,
    "image": "/images/product-tra-xuan.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Người Yêu"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-doanh-nghiep-30",
    "name": "Vững Bước Thành Công #30",
    "description": "Sổ Da Thật Cao Cấp, Bút Ký Bọc Vàng, Rượu Whisky 18 Năm",
    "price": "2.900.000₫",
    "priceNumber": 2900000,
    "image": "/images/list-phu-quy.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Người Yêu",
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "doanh-nghiep"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-20-11-31",
    "name": "Người Lái Đò Tận Tâm #31",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "2.100.000₫",
    "priceNumber": 2100000,
    "image": "/images/product-tra-xuan.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-32",
    "name": "Duyên Định Trăm Năm #32",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "2.500.000₫",
    "priceNumber": 2500000,
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
    "slug": "qua-tang-trung-thu-33",
    "name": "Lồng Đèn Tỏa Sáng #33",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "3.300.000₫",
    "priceNumber": 3300000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-10-34",
    "name": "Tâm Tình Gửi Chị #34",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "2.900.000₫",
    "priceNumber": 2900000,
    "image": "/images/list-sum-vay.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Gia Đình & Người Thân",
      "Cha Mẹ"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-10-35",
    "name": "Tâm Tình Gửi Chị #35",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "2.000.000₫",
    "priceNumber": 2000000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp",
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-10-36",
    "name": "Nét Đẹp Vĩnh Hằng #36",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "1.300.000₫",
    "priceNumber": 1300000,
    "image": "/images/list-sum-vay.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Gia Đình & Người Thân",
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-20-10-37",
    "name": "Sắc Hồng Kiêu Sa #37",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "500.000₫",
    "priceNumber": 500000,
    "image": "/images/list-sum-vay.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Người Yêu"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-tet-38",
    "name": "An Khang Thịnh Vượng #38",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "1.100.000₫",
    "priceNumber": 1100000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "tet"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-39",
    "name": "Nhịp Đập Trái Tim #39",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "700.000₫",
    "priceNumber": 700000,
    "image": "/images/product-vang-ngot.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp",
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-giang-sinh-40",
    "name": "Đêm Đông Ấm Áp #40",
    "description": "Bánh Gừng Thủ Công, Vang Nóng Glühwein, Đồ Decor Giáng Sinh",
    "price": "2.400.000₫",
    "priceNumber": 2400000,
    "image": "/images/list-an-khang.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Người Yêu",
      "Cha Mẹ"
    ],
    "occasions": [
      "giang-sinh"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-11-41",
    "name": "Ơn Thầy Nghĩa Cô #41",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "500.000₫",
    "priceNumber": 500000,
    "image": "/images/product-tra-xuan.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-giang-sinh-42",
    "name": "Đêm Đông Ấm Áp #42",
    "description": "Bánh Gừng Thủ Công, Vang Nóng Glühwein, Đồ Decor Giáng Sinh",
    "price": "1.500.000₫",
    "priceNumber": 1500000,
    "image": "/images/product-vang-ngot.jpg",
    "category": "Bộ Trà & Rượu",
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
    "slug": "qua-tang-20-11-43",
    "name": "Tri Ân Thầm Lặng #43",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "1.900.000₫",
    "priceNumber": 1900000,
    "image": "/images/list-van-su.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Cha Mẹ",
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-10-44",
    "name": "Sắc Hồng Kiêu Sa #44",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "2.200.000₫",
    "priceNumber": 2200000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Cha Mẹ",
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-doanh-nghiep-45",
    "name": "Đối Tác Chiến Lược #45",
    "description": "Sổ Da Thật Cao Cấp, Bút Ký Bọc Vàng, Rượu Whisky 18 Năm",
    "price": "2.200.000₫",
    "priceNumber": 2200000,
    "image": "/images/list-phu-quy.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Đối Tác Kinh Doanh",
      "Người Yêu"
    ],
    "occasions": [
      "doanh-nghiep"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-doanh-nghiep-46",
    "name": "Đối Tác Chiến Lược #46",
    "description": "Sổ Da Thật Cao Cấp, Bút Ký Bọc Vàng, Rượu Whisky 18 Năm",
    "price": "2.600.000₫",
    "priceNumber": 2600000,
    "image": "/images/list-an-khang.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Gia Đình & Người Thân",
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "doanh-nghiep"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-tet-47",
    "name": "An Khang Thịnh Vượng #47",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "1.100.000₫",
    "priceNumber": 1100000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "tet"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-20-10-48",
    "name": "Sắc Hồng Kiêu Sa #48",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "1.200.000₫",
    "priceNumber": 1200000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Người Yêu"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-tet-49",
    "name": "Sum Vầy Đoàn Viên #49",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "1.100.000₫",
    "priceNumber": 1100000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Người Yêu",
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "tet"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-tet-50",
    "name": "Cát Tường Phú Quý #50",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "3.400.000₫",
    "priceNumber": 3400000,
    "image": "/images/list-sum-vay.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "tet"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-trung-thu-51",
    "name": "Trăng Vàng Phố Cổ #51",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "2.500.000₫",
    "priceNumber": 2500000,
    "image": "/images/product-gio-tre.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-10-52",
    "name": "Gửi Trọn Yêu Thương #52",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "1.500.000₫",
    "priceNumber": 1500000,
    "image": "/images/list-sum-vay.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Người Yêu"
    ],
    "occasions": [
      "20-10"
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
    "slug": "qua-tang-20-11-54",
    "name": "Dấu Ấn Sư Phạm #54",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "3.400.000₫",
    "priceNumber": 3400000,
    "image": "/images/product-tra-xuan.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp",
      "Cha Mẹ"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-55",
    "name": "Duyên Định Trăm Năm #55",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "2.600.000₫",
    "priceNumber": 2600000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-valentine-56",
    "name": "Tình Nồng Khởi Sắc #56",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "3.100.000₫",
    "priceNumber": 3100000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-tet-57",
    "name": "Giao Xuân Tinh Hoa #57",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "2.000.000₫",
    "priceNumber": 2000000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "tet"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-10-58",
    "name": "Tâm Tình Gửi Chị #58",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "1.300.000₫",
    "priceNumber": 1300000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp",
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-trung-thu-59",
    "name": "Thưởng Nguyệt Tinh Hoa #59",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "2.300.000₫",
    "priceNumber": 2300000,
    "image": "/images/product-gio-tre.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-tet-60",
    "name": "Sum Vầy Đoàn Viên #60",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "3.000.000₫",
    "priceNumber": 3000000,
    "image": "/images/list-van-su.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "tet"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-valentine-61",
    "name": "Tri Kỷ Giao Thoa #61",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "3.400.000₫",
    "priceNumber": 3400000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-11-62",
    "name": "Vườn Ươm Tài Năng #62",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "1.800.000₫",
    "priceNumber": 1800000,
    "image": "/images/list-van-su.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Cha Mẹ",
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-11-63",
    "name": "Vườn Ươm Tài Năng #63",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "900.000₫",
    "priceNumber": 900000,
    "image": "/images/list-van-su.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Gia Đình & Người Thân",
      "Người Yêu"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-trung-thu-64",
    "name": "Lồng Đèn Tỏa Sáng #64",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "2.000.000₫",
    "priceNumber": 2000000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-trung-thu-65",
    "name": "Thưởng Nguyệt Tinh Hoa #65",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "1.300.000₫",
    "priceNumber": 1300000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Cha Mẹ",
      "Cha Mẹ"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-66",
    "name": "Tri Kỷ Giao Thoa #66",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "600.000₫",
    "priceNumber": 600000,
    "image": "/images/product-vang-ngot.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Đối Tác Kinh Doanh",
      "Người Yêu"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-tet-67",
    "name": "Lộc Xuân Như Ý #67",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "2.000.000₫",
    "priceNumber": 2000000,
    "image": "/images/list-van-su.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Đối Tác Kinh Doanh",
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "tet"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-11-68",
    "name": "Dấu Ấn Sư Phạm #68",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "2.300.000₫",
    "priceNumber": 2300000,
    "image": "/images/list-van-su.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp",
      "Người Yêu"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-doanh-nghiep-69",
    "name": "Vững Bước Thành Công #69",
    "description": "Sổ Da Thật Cao Cấp, Bút Ký Bọc Vàng, Rượu Whisky 18 Năm",
    "price": "1.000.000₫",
    "priceNumber": 1000000,
    "image": "/images/list-an-khang.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "doanh-nghiep"
    ],
    "topics": [
      "doanh-nghiep"
    ]
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
    "slug": "qua-tang-20-10-71",
    "name": "Nét Đẹp Vĩnh Hằng #71",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "1.000.000₫",
    "priceNumber": 1000000,
    "image": "/images/list-sum-vay.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp",
      "Người Yêu"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-giang-sinh-72",
    "name": "Vũ Điệu Tuyết Trắng #72",
    "description": "Bánh Gừng Thủ Công, Vang Nóng Glühwein, Đồ Decor Giáng Sinh",
    "price": "2.000.000₫",
    "priceNumber": 2000000,
    "image": "/images/list-an-khang.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "giang-sinh"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-tet-73",
    "name": "Sum Vầy Đoàn Viên #73",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "2.700.000₫",
    "priceNumber": 2700000,
    "image": "/images/list-van-su.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "tet"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-doanh-nghiep-74",
    "name": "Tiên Phong Bứt Phá #74",
    "description": "Sổ Da Thật Cao Cấp, Bút Ký Bọc Vàng, Rượu Whisky 18 Năm",
    "price": "1.300.000₫",
    "priceNumber": 1300000,
    "image": "/images/list-an-khang.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Người Yêu"
    ],
    "occasions": [
      "doanh-nghiep"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-trung-thu-75",
    "name": "Thiếu Nhi Vui Tết #75",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "600.000₫",
    "priceNumber": 600000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-76",
    "name": "Lời Yêu Ngọt Ngào #76",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "1.800.000₫",
    "priceNumber": 1800000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-doanh-nghiep-77",
    "name": "Tiên Phong Bứt Phá #77",
    "description": "Sổ Da Thật Cao Cấp, Bút Ký Bọc Vàng, Rượu Whisky 18 Năm",
    "price": "2.800.000₫",
    "priceNumber": 2800000,
    "image": "/images/list-an-khang.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "doanh-nghiep"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-tet-78",
    "name": "Sum Vầy Đoàn Viên #78",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "800.000₫",
    "priceNumber": 800000,
    "image": "/images/list-sum-vay.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Người Yêu"
    ],
    "occasions": [
      "tet"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-trung-thu-79",
    "name": "Thưởng Nguyệt Tinh Hoa #79",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "1.900.000₫",
    "priceNumber": 1900000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-doanh-nghiep-80",
    "name": "Đối Tác Chiến Lược #80",
    "description": "Sổ Da Thật Cao Cấp, Bút Ký Bọc Vàng, Rượu Whisky 18 Năm",
    "price": "2.300.000₫",
    "priceNumber": 2300000,
    "image": "/images/list-an-khang.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "doanh-nghiep"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-tet-81",
    "name": "Sum Vầy Đoàn Viên #81",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "2.400.000₫",
    "priceNumber": 2400000,
    "image": "/images/list-sum-vay.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "tet"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-82",
    "name": "Nhịp Đập Trái Tim #82",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "1.100.000₫",
    "priceNumber": 1100000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-tet-83",
    "name": "An Khang Thịnh Vượng #83",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "900.000₫",
    "priceNumber": 900000,
    "image": "/images/list-van-su.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Người Yêu"
    ],
    "occasions": [
      "tet"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-trung-thu-84",
    "name": "Đoàn Viên Hội Ngộ #84",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "3.000.000₫",
    "priceNumber": 3000000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-giang-sinh-85",
    "name": "Lễ Hội Ánh Sáng #85",
    "description": "Bánh Gừng Thủ Công, Vang Nóng Glühwein, Đồ Decor Giáng Sinh",
    "price": "1.400.000₫",
    "priceNumber": 1400000,
    "image": "/images/product-vang-ngot.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "giang-sinh"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-valentine-86",
    "name": "Tri Kỷ Giao Thoa #86",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "2.000.000₫",
    "priceNumber": 2000000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-tet-87",
    "name": "An Khang Thịnh Vượng #87",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "2.100.000₫",
    "priceNumber": 2100000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp",
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "tet"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-doanh-nghiep-88",
    "name": "Đẳng Cấp Thương Gia #88",
    "description": "Sổ Da Thật Cao Cấp, Bút Ký Bọc Vàng, Rượu Whisky 18 Năm",
    "price": "1.000.000₫",
    "priceNumber": 1000000,
    "image": "/images/list-phu-quy.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "doanh-nghiep"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-giang-sinh-89",
    "name": "Vũ Điệu Tuyết Trắng #89",
    "description": "Bánh Gừng Thủ Công, Vang Nóng Glühwein, Đồ Decor Giáng Sinh",
    "price": "1.000.000₫",
    "priceNumber": 1000000,
    "image": "/images/product-vang-ngot.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "giang-sinh"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-trung-thu-90",
    "name": "Đoàn Viên Hội Ngộ #90",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "2.200.000₫",
    "priceNumber": 2200000,
    "image": "/images/product-gio-tre.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-10-91",
    "name": "Tri Ân Phái Đẹp #91",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "1.200.000₫",
    "priceNumber": 1200000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Gia Đình & Người Thân",
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-trung-thu-92",
    "name": "Đoàn Viên Hội Ngộ #92",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "2.000.000₫",
    "priceNumber": 2000000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp",
      "Cha Mẹ"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-trung-thu-93",
    "name": "Trăng Vàng Phố Cổ #93",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "1.500.000₫",
    "priceNumber": 1500000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-tet-94",
    "name": "Giao Xuân Tinh Hoa #94",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "2.500.000₫",
    "priceNumber": 2500000,
    "image": "/images/list-van-su.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "tet"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-11-95",
    "name": "Vườn Ươm Tài Năng #95",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "1.100.000₫",
    "priceNumber": 1100000,
    "image": "/images/list-van-su.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp",
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-doanh-nghiep-96",
    "name": "Hợp Tác Toàn Diện #96",
    "description": "Sổ Da Thật Cao Cấp, Bút Ký Bọc Vàng, Rượu Whisky 18 Năm",
    "price": "3.200.000₫",
    "priceNumber": 3200000,
    "image": "/images/list-an-khang.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "doanh-nghiep"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-doanh-nghiep-97",
    "name": "Vững Bước Thành Công #97",
    "description": "Sổ Da Thật Cao Cấp, Bút Ký Bọc Vàng, Rượu Whisky 18 Năm",
    "price": "1.100.000₫",
    "priceNumber": 1100000,
    "image": "/images/list-an-khang.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Người Yêu"
    ],
    "occasions": [
      "doanh-nghiep"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-trung-thu-98",
    "name": "Thiếu Nhi Vui Tết #98",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "2.100.000₫",
    "priceNumber": 2100000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Gia Đình & Người Thân",
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-99",
    "name": "Tình Nồng Khởi Sắc #99",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "2.400.000₫",
    "priceNumber": 2400000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp",
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-doanh-nghiep-100",
    "name": "Đối Tác Chiến Lược #100",
    "description": "Sổ Da Thật Cao Cấp, Bút Ký Bọc Vàng, Rượu Whisky 18 Năm",
    "price": "3.100.000₫",
    "priceNumber": 3100000,
    "image": "/images/list-an-khang.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "doanh-nghiep"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-valentine-101",
    "name": "Nhịp Đập Trái Tim #101",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "1.200.000₫",
    "priceNumber": 1200000,
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
    "slug": "qua-tang-trung-thu-102",
    "name": "Trăng Vàng Phố Cổ #102",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "3.100.000₫",
    "priceNumber": 3100000,
    "image": "/images/product-gio-tre.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Người Yêu",
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-tet-103",
    "name": "Cát Tường Phú Quý #103",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "2.500.000₫",
    "priceNumber": 2500000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Đối Tác Kinh Doanh",
      "Người Yêu"
    ],
    "occasions": [
      "tet"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-tet-104",
    "name": "Sum Vầy Đoàn Viên #104",
    "description": "Trà Ô Long Cổ Thụ, Hạt Điều Rang Củi, Mứt Sen Trần",
    "price": "1.700.000₫",
    "priceNumber": 1700000,
    "image": "/images/list-van-su.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "tet"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-10-105",
    "name": "Nét Đẹp Vĩnh Hằng #105",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "2.600.000₫",
    "priceNumber": 2600000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Người Yêu",
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-trung-thu-106",
    "name": "Thưởng Nguyệt Tinh Hoa #106",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "600.000₫",
    "priceNumber": 600000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Người Yêu"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-20-10-107",
    "name": "Tri Ân Phái Đẹp #107",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "1.500.000₫",
    "priceNumber": 1500000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp",
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-10-108",
    "name": "Gửi Trọn Yêu Thương #108",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "2.900.000₫",
    "priceNumber": 2900000,
    "image": "/images/list-sum-vay.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Cha Mẹ",
      "Cha Mẹ"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-11-109",
    "name": "Ơn Thầy Nghĩa Cô #109",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "1.000.000₫",
    "priceNumber": 1000000,
    "image": "/images/list-van-su.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-110",
    "name": "Duyên Định Trăm Năm #110",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "2.500.000₫",
    "priceNumber": 2500000,
    "image": "/images/product-vang-ngot.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Người Yêu",
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-trung-thu-111",
    "name": "Thưởng Nguyệt Tinh Hoa #111",
    "description": "Bánh Trung Thu Thập Cẩm, Bánh Dẻo Đậu Xanh, Trà Mạn Tân Cương",
    "price": "900.000₫",
    "priceNumber": 900000,
    "image": "/images/list-loc-xuan.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "trung-thu"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-doanh-nghiep-112",
    "name": "Đối Tác Chiến Lược #112",
    "description": "Sổ Da Thật Cao Cấp, Bút Ký Bọc Vàng, Rượu Whisky 18 Năm",
    "price": "1.200.000₫",
    "priceNumber": 1200000,
    "image": "/images/list-an-khang.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Gia Đình & Người Thân",
      "Người Yêu"
    ],
    "occasions": [
      "doanh-nghiep"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-20-11-113",
    "name": "Tri Ân Thầm Lặng #113",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "1.900.000₫",
    "priceNumber": 1900000,
    "image": "/images/list-van-su.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Gia Đình & Người Thân",
      "Cha Mẹ"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-114",
    "name": "Duyên Định Trăm Năm #114",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "2.500.000₫",
    "priceNumber": 2500000,
    "image": "/images/list-tam-giao.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Gia Đình & Người Thân"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-115",
    "name": "Tri Kỷ Giao Thoa #115",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "3.200.000₫",
    "priceNumber": 3200000,
    "image": "/images/product-vang-ngot.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-20-10-116",
    "name": "Sắc Hồng Kiêu Sa #116",
    "description": "Trà Hoa Hồng Organic, Mỹ Phẩm Cao Cấp, Bánh Macaron Artisan",
    "price": "1.600.000₫",
    "priceNumber": 1600000,
    "image": "/images/list-sum-vay.jpg",
    "category": "Giỏ Quà Mây Tre Đan",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "20-10"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-117",
    "name": "Tri Kỷ Giao Thoa #117",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "3.200.000₫",
    "priceNumber": 3200000,
    "image": "/images/product-vang-ngot.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-doanh-nghiep-118",
    "name": "Đối Tác Chiến Lược #118",
    "description": "Sổ Da Thật Cao Cấp, Bút Ký Bọc Vàng, Rượu Whisky 18 Năm",
    "price": "2.700.000₫",
    "priceNumber": 2700000,
    "image": "/images/list-phu-quy.jpg",
    "category": "Hộp Quà Gỗ Sơn Mai",
    "recipient": [
      "Bạn Bè & Đồng Nghiệp"
    ],
    "occasions": [
      "doanh-nghiep"
    ],
    "topics": [
      "doanh-nghiep"
    ]
  },
  {
    "slug": "qua-tang-20-11-119",
    "name": "Tri Ân Thầm Lặng #119",
    "description": "Bộ Văn Phòng Phẩm Sành Điệu, Trà Tịnh Tâm Cao Cấp, Sách Nghệ Thuật Sống",
    "price": "500.000₫",
    "priceNumber": 500000,
    "image": "/images/product-tra-xuan.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Cha Mẹ"
    ],
    "occasions": [
      "20-11"
    ],
    "topics": []
  },
  {
    "slug": "qua-tang-valentine-120",
    "name": "Duyên Định Trăm Năm #120",
    "description": "Socola Artisan Pháp, Vang Hồng Chile, Nến Thơm Tinh Dầu",
    "price": "3.400.000₫",
    "priceNumber": 3400000,
    "image": "/images/product-vang-ngot.jpg",
    "category": "Bộ Trà & Rượu",
    "recipient": [
      "Đối Tác Kinh Doanh"
    ],
    "occasions": [
      "valentine"
    ],
    "topics": [
      "doanh-nghiep"
    ]
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
