export type BoxType = "basic" | "premium";
export type BoxSize = "small" | "medium" | "large";
export type BoxColor =
  | "do"
  | "hong"
  | "luc-bao"
  | "nau-xam"
  | "navy"
  | "nga"
  | "vang";
export type WrapColor = "den" | "gold" | "kem" | "nau" | null;
export type ProductCategory = "tat-ca" | "ruou-tra" | "banh-keo" | "my-pham";

export interface BoxTypeOption {
  id: BoxType;
  label: string;
  hint: string;
  photo: string;
}

export const BOX_TYPE_OPTIONS: BoxTypeOption[] = [
  {
    id: "basic",
    label: "Cơ bản",
    hint: "Có nắp rời / Màng co",
    photo: "/decorator/photos/type-basic.png",
  },
  {
    id: "premium",
    label: "Cao cấp",
    hint: "Có nắp hít nam châm",
    photo: "/decorator/photos/type-premium.png",
  },
];

export interface BoxSizeOption {
  id: BoxSize;
  label: string;
  hint: string;
  cols: number;
  rows: number;
  maxItems: number;
  photo: string;
  popular?: boolean;
}

export const BOX_SIZE_OPTIONS: BoxSizeOption[] = [
  {
    id: "small",
    label: "Hộp nhỏ",
    hint: "≤ 4 món · 5×5 ô",
    cols: 5,
    rows: 5,
    maxItems: 4,
    photo: "/decorator/inside/box-small-do.png",
  },
  {
    id: "medium",
    label: "Hộp vừa",
    hint: "≤ 8 món · 7×9 ô",
    cols: 7,
    rows: 9,
    maxItems: 8,
    photo: "/decorator/inside/box-medium-do.png",
    popular: true,
  },
  {
    id: "large",
    label: "Hộp lớn",
    hint: "≤ 12 món · 11×9 ô",
    cols: 11,
    rows: 9,
    maxItems: 12,
    photo: "/decorator/inside/box-large-do.png",
  },
];

export interface BoxColorOption {
  id: BoxColor;
  label: string;
  swatch: string;
  outerHex: string;
  innerHex: string;
  gridLineHex: string;
}

export const BOX_COLOR_OPTIONS: BoxColorOption[] = [
  {
    id: "do",
    label: "Đỏ Gift Glamorous",
    swatch: "#b91c1c",
    outerHex: "#a13123",
    innerHex: "#b8553e",
    gridLineHex: "#7a2818",
  },
  {
    id: "hong",
    label: "Hồng phấn",
    swatch: "#e8a4b5",
    outerHex: "#c97a8e",
    innerHex: "#e3a3b6",
    gridLineHex: "#9a4d5e",
  },
  {
    id: "luc-bao",
    label: "Lục bảo",
    swatch: "#0f8b76",
    outerHex: "#10745f",
    innerHex: "#1ea487",
    gridLineHex: "#075444",
  },
  {
    id: "nau-xam",
    label: "Nâu xám",
    swatch: "#857569",
    outerHex: "#7a675a",
    innerHex: "#a18d7c",
    gridLineHex: "#5a4a3f",
  },
  {
    id: "navy",
    label: "Navy",
    swatch: "#1e3a5f",
    outerHex: "#1c324f",
    innerHex: "#34568a",
    gridLineHex: "#0f1f3a",
  },
  {
    id: "nga",
    label: "Ngà",
    swatch: "#e9dcc5",
    outerHex: "#cdbf9f",
    innerHex: "#e3d2b3",
    gridLineHex: "#a39378",
  },
  {
    id: "vang",
    label: "Vàng gold",
    swatch: "#d6a23c",
    outerHex: "#b9842a",
    innerHex: "#d6a23c",
    gridLineHex: "#8d6519",
  },
];

export interface WrapColorOption {
  id: NonNullable<WrapColor>;
  label: string;
  hex: string;
  pillBg: string;
  pillText: string;
  bedHex: string;
  strandHexes: [string, string, string, string];
}

export type LidStyle = "plain" | "image" | "transparent" | "shrink";

export type RibbonColor = "do" | "vang" | "den" | "hong" | "trang";

export interface RibbonColorOption {
  id: RibbonColor;
  label: string;
  hex: string;
  shadeHex: string;
  highlightHex: string;
  photo: string;
}

export const RIBBON_COLOR_OPTIONS: RibbonColorOption[] = [
  {
    id: "do",
    label: "Đỏ ruby",
    hex: "#a4202b",
    shadeHex: "#6e1018",
    highlightHex: "#d94d59",
    photo: "/decorator/photos/no/no-do.png",
  },
  {
    id: "vang",
    label: "Vàng gold",
    hex: "#d6a23c",
    shadeHex: "#8d6519",
    highlightHex: "#f3cd65",
    photo: "/decorator/photos/no/no-vang.png",
  },
  {
    id: "den",
    label: "Đen huyền",
    hex: "#2a2a2a",
    shadeHex: "#0a0a0a",
    highlightHex: "#5a5a5a",
    photo: "/decorator/photos/no/no-den.png",
  },
  {
    id: "hong",
    label: "Hồng đào",
    hex: "#e07a92",
    shadeHex: "#a04057",
    highlightHex: "#f4adba",
    photo: "/decorator/photos/no/no-hong.png",
  },
  {
    id: "trang",
    label: "Trắng tinh",
    hex: "#f5f5f4",
    shadeHex: "#bdb6ad",
    highlightHex: "#ffffff",
    photo: "/decorator/photos/no/no-trang.png",
  },
];

export interface RibbonState {
  enabled: boolean;
  color: RibbonColor;
}

export const RIBBON_PRICE = 10000;
export const LID_IMAGE_PRICE = 25000;
export const LID_TRANSPARENT_PRICE = 20000;
export const LID_SHRINK_PRICE = 15000;

export const WRAP_COLOR_OPTIONS: WrapColorOption[] = [
  {
    id: "den",
    label: "Đen",
    hex: "#2a2a2a",
    pillBg: "#e7e5e4",
    pillText: "#1c1917",
    bedHex: "#3a3a3a",
    strandHexes: ["#1a1a1a", "#3a3a3a", "#0a0a0a", "#5a5a5a"],
  },
  {
    id: "gold",
    label: "Vàng gold",
    hex: "#f5c451",
    pillBg: "#fef3c7",
    pillText: "#92400e",
    bedHex: "#fde68a",
    strandHexes: ["#fde68a", "#f5c451", "#d97706", "#fff7d6"],
  },
  {
    id: "kem",
    label: "Kem",
    hex: "#f5e6c8",
    pillBg: "#fefce8",
    pillText: "#854d0e",
    bedHex: "#fcecbc",
    strandHexes: ["#fcecbc", "#f3d896", "#a87a3b", "#fff8e7"],
  },
  {
    id: "nau",
    label: "Nâu",
    hex: "#8b6f47",
    pillBg: "#f5e6d3",
    pillText: "#5a3e1d",
    bedHex: "#a88562",
    strandHexes: ["#a88562", "#8b6f47", "#5a3e1d", "#c4a37d"],
  },
];

export interface Footprint {
  cols: number;
  rows: number;
}

export interface ProductDef {
  id: string;
  name: string;
  shortName: string;
  price: number;
  photo: string;
  category: Exclude<ProductCategory, "tat-ca">;
  footprint: Footprint;
}

export const PRODUCT_CATALOG: ProductDef[] = [
  {
    id: "ruou-mo-mat-ong-750-tru",
    name: "Rượu Mơ Mật Ong 750ml — chai trụ",
    shortName: "Mơ Mật Ong 750ml (Trụ)",
    price: 230000,
    photo: "/decorator/photos/ruou-p1/21-mo-mat-ong-tru.png",
    category: "ruou-tra",
    footprint: { cols: 2, rows: 7 },
  },
  {
    id: "ruou-mo-sam-500",
    name: "Rượu Mơ Sâm 500ml",
    shortName: "Mơ Sâm 500ml",
    price: 419000,
    photo: "/decorator/photos/ruou-p1/22-mo-sam-500.png",
    category: "ruou-tra",
    footprint: { cols: 2, rows: 6 },
  },
  {
    id: "ruou-mo-mat-ong-750-cao",
    name: "Rượu Mơ Mật Ong 750ml — chai cao",
    shortName: "Mơ Mật Ong 750ml (Cao)",
    price: 230000,
    photo: "/decorator/photos/ruou-p1/23-mo-mat-ong-cao.png",
    category: "ruou-tra",
    footprint: { cols: 3, rows: 9 },
  },
  {
    id: "ruou-mo-sam-360",
    name: "Rượu Mơ Sâm 360ml",
    shortName: "Mơ Sâm 360ml",
    price: 90000,
    photo: "/decorator/photos/ruou-p1/24-mo-sam-360.png",
    category: "ruou-tra",
    footprint: { cols: 2, rows: 6 },
  },
  {
    id: "nui-tan-brandy-750",
    name: "Núi Tản Premium Brandy 750ml",
    shortName: "Núi Tản Brandy 750ml",
    price: 690000,
    photo: "/decorator/photos/ruou-p1/25-nui-tan-brandy.png",
    category: "ruou-tra",
    footprint: { cols: 3, rows: 6 },
  },
  {
    id: "ruou-mo-mat-ong-350",
    name: "Rượu Mơ Mật Ong 350ml",
    shortName: "Mơ Mật Ong 350ml",
    price: 100000,
    photo: "/decorator/photos/ruou-p1/26-mo-mat-ong-350.png",
    category: "ruou-tra",
    footprint: { cols: 2, rows: 6 },
  },
  {
    id: "banh-quy-biscotti-kirkland",
    name: "Bánh Quy Hạnh Nhân Biscotti Kirkland Ý Hộp 1kg",
    shortName: "Biscotti Kirkland 1kg",
    price: 560000,
    photo: "/decorator/photos/banh/27-biscotti-kirkland.png",
    category: "banh-keo",
    footprint: { cols: 3, rows: 5 },
  },
  {
    id: "banh-quy-afternoon-tea-jacobs",
    name: "Bánh quy Afternoon Tea Jacobs 1kg",
    shortName: "Afternoon Tea Jacobs 1kg",
    price: 680000,
    photo: "/decorator/photos/banh/28-afternoon-tea-jacobs.png",
    category: "banh-keo",
    footprint: { cols: 5, rows: 4 },
  },
  {
    id: "banh-xop-millefoglie-vicenzi",
    name: "Bánh xốp Millefoglie Vicenzi Ý hộp 250g",
    shortName: "Millefoglie 250g",
    price: 290000,
    photo: "/decorator/photos/banh/29-millefoglie-vicenzi.png",
    category: "banh-keo",
    footprint: { cols: 3, rows: 3 },
  },
  {
    id: "banh-xop-ladyfinger-vicenzovo",
    name: "Bánh xốp Ladyfinger Vicenzovo Ý hộp 400g",
    shortName: "Ladyfinger 400g",
    price: 290000,
    photo: "/decorator/photos/banh/30-ladyfinger-vicenzovo.png",
    category: "banh-keo",
    footprint: { cols: 3, rows: 3 },
  },
  {
    id: "banh-quy-matilde-vicenzi",
    name: "Bánh Quy Ngàn Lớp Nhân Kem Hạt Phỉ Matilde Vicenzi Ý Hộp 150g",
    shortName: "Matilde Vicenzi 150g",
    price: 160000,
    photo: "/decorator/photos/banh/31-matilde-vicenzi.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 3 },
  },
  {
    id: "banh-quy-bo-danesita",
    name: "Hộp Bánh Quy Bơ Danesita Nature Collection 454g",
    shortName: "Danesita 454g",
    price: 193000,
    photo: "/decorator/photos/banh/32-danesita-nature.png",
    category: "banh-keo",
    footprint: { cols: 4, rows: 4 },
  },
  {
    id: "banh-que-naturgreen",
    name: "Bánh Quế Socola Hữu Cơ NaturGreen hộp 140g",
    shortName: "NaturGreen Quế 140g",
    price: 149000,
    photo: "/decorator/photos/banh/33-naturgreen-que-socola.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 4 },
  },
  {
    id: "banh-quy-st-michel-coco",
    name: "Bánh Quy Bơ St Michel Sablés Coco Pháp Hộp Thiếc 144g",
    shortName: "St Michel Coco 144g",
    price: 152000,
    photo: "/decorator/photos/banh/34-st-michel-sables-coco.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 3 },
  },
  {
    id: "banh-quy-gullon-cheddar",
    name: "Bánh Quy Mặn Mini Vị Phô Mai Cheddar Gullon 250G",
    shortName: "Gullon Cheddar 250g",
    price: 88000,
    photo: "/decorator/photos/banh/35-gullon-cheddar.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 3 },
  },
  {
    id: "banh-quy-yakangle-sua",
    name: "Bánh Quy Yakangle Cookie 120g Sữa Truyền Thống",
    shortName: "Yakangle Sữa 120g",
    price: 50000,
    photo: "/decorator/photos/banh/36-yakangle-sua.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 4 },
  },
  {
    id: "banh-quy-yakangle-socola",
    name: "Bánh Quy Yakangle Cookie 120g Socola",
    shortName: "Yakangle Socola 120g",
    price: 50000,
    photo: "/decorator/photos/banh/37-yakangle-socola.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 4 },
  },
  {
    id: "banh-quy-yakangle-dau",
    name: "Bánh Quy Yakangle Cookie 120g Dâu",
    shortName: "Yakangle Dâu 120g",
    price: 50000,
    photo: "/decorator/photos/banh/38-yakangle-dau.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 4 },
  },
  {
    id: "banh-quy-bourbon-roanne-vani",
    name: "Bánh Quy Bourbon Roanne Nhật Hương Vani",
    shortName: "Bourbon Roanne Vani",
    price: 70000,
    photo: "/decorator/photos/banh/39-bourbon-roanne-vani.png",
    category: "banh-keo",
    footprint: { cols: 3, rows: 5 },
  },
  {
    id: "banh-quy-levain-tra-xanh",
    name: "Bánh Quy Vị Trà Xanh Levain Nhật Hộp 56g",
    shortName: "Levain Trà Xanh 56g",
    price: 60000,
    photo: "/decorator/photos/banh/40-levain-tra-xanh.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 4 },
  },
  {
    id: "banh-quy-levain-dao",
    name: "Bánh Quy Vị Đào Levain Nhật Hộp 56g",
    shortName: "Levain Đào 56g",
    price: 60000,
    photo: "/decorator/photos/banh/41-levain-dao.png",
    category: "banh-keo",
    footprint: { cols: 3, rows: 4 },
  },
  {
    id: "keo-werther-caramel-160",
    name: "Kẹo Caramel Selection Werther Original hộp 160g",
    shortName: "Werther Caramel 160g",
    price: 188000,
    photo: "/decorator/photos/keo/01-werther-caramel-160.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 3 },
  },
  {
    id: "keo-ricola-thao-duoc",
    name: "Kẹo Ngậm Thảo Dược Ricola Đức 250g",
    shortName: "Ricola Thảo Dược 250g",
    price: 185000,
    photo: "/decorator/photos/keo/02-ricola-thao-duoc-250.png",
    category: "banh-keo",
    footprint: { cols: 4, rows: 5 },
  },
  {
    id: "keo-cavendish-harvey-mixed",
    name: "Kẹo Đức Hũ Thủy Tinh Cavendish & Harvey Mixed 300g",
    shortName: "Cavendish & Harvey 300g",
    price: 148000,
    photo: "/decorator/photos/keo/03-cavendish-harvey-mixed-300.png",
    category: "banh-keo",
    footprint: { cols: 3, rows: 5 },
  },
  {
    id: "keo-werthers-90",
    name: "Kẹo Caramen Werther's Original hộp 90g",
    shortName: "Werther's 90g",
    price: 89000,
    photo: "/decorator/photos/keo/04-werthers-90.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 3 },
  },
  {
    id: "keo-nimm2-trai-cay",
    name: "Kẹo Trái Cây Mêm Nimm2 Hộp Thiếc 110g",
    shortName: "Nimm2 Trái Cây 110g",
    price: 89000,
    photo: "/decorator/photos/keo/05-nimm2-trai-cay-110.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 3 },
  },
  {
    id: "keo-foxs-fruits-170",
    name: "Kẹo Trái Cây FOX'S Crystal Clear Fruits Hộp Thiếc 170g",
    shortName: "FOX'S Fruits 170g",
    price: 69000,
    photo: "/decorator/photos/keo/06-foxs-fruits-170.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 3 },
  },
  {
    id: "keo-foxs-berries-170",
    name: "Kẹo Trái Cây FOX'S Crystal Clear Berrie Hộp Thiếc 170g",
    shortName: "FOX'S Berries 170g",
    price: 69000,
    photo: "/decorator/photos/keo/07-foxs-berries-170.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 3 },
  },
  {
    id: "keo-haribo-happy-cola",
    name: "Kẹo Dẻo Haribo Happy Cola Hộp 150g",
    shortName: "Haribo Happy Cola 150g",
    price: 65000,
    photo: "/decorator/photos/keo/08-haribo-happy-cola-150.png",
    category: "banh-keo",
    footprint: { cols: 4, rows: 5 },
  },
  {
    id: "socola-merci-finest-400",
    name: "Chocola Hỗn Hợp Merci Finest Selection Hộp 400g",
    shortName: "Merci Finest 400g",
    price: 433000,
    photo: "/decorator/photos/socola/09-merci-finest-400.png",
    category: "banh-keo",
    footprint: { cols: 4, rows: 2 },
  },
  {
    id: "socola-lindt-lindor-mix-137",
    name: "Chocola Hỗn Hợp Lindt Lindor Hộp 137g",
    shortName: "Lindt Lindor Mix 137g",
    price: 352000,
    photo: "/decorator/photos/socola/10-lindt-lindor-mix-137.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 2 },
  },
  {
    id: "socola-lindt-lindor-sua-137",
    name: "Chocola Sữa Lindt Lindor Hộp 137g",
    shortName: "Lindt Lindor Sữa 137g",
    price: 352000,
    photo: "/decorator/photos/socola/11-lindt-lindor-sua-137.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 2 },
  },
  {
    id: "socola-marou-thanh-210",
    name: "Quà Tặng Sô-Cô-La Thanh Marou Hộp 210 Gram",
    shortName: "Marou Thanh 210g",
    price: 345000,
    photo: "/decorator/photos/socola/12-marou-thanh-210.png",
    category: "banh-keo",
    footprint: { cols: 3, rows: 2 },
  },
  {
    id: "socola-merci-finest-250",
    name: "Hộp Chocolate Hỗn Hợp Merci Finest Selection 250G",
    shortName: "Merci Finest 250g",
    price: 249000,
    photo: "/decorator/photos/socola/13-merci-finest-250.png",
    category: "banh-keo",
    footprint: { cols: 3, rows: 2 },
  },
  {
    id: "socola-beryls-raisin-350",
    name: "Chocolate Raisin Milk (Tím) Beryls Hộp 350g",
    shortName: "Beryl's Raisin 350g",
    price: 244000,
    photo: "/decorator/photos/socola/14-beryls-raisin-milk-350.png",
    category: "banh-keo",
    footprint: { cols: 3, rows: 4 },
  },
  {
    id: "socola-marou-xoai-100",
    name: "Xoài Phủ Sô-Cô-La Đen Marou Hộp 100g",
    shortName: "Marou Xoài 100g",
    price: 165000,
    photo: "/decorator/photos/socola/15-marou-xoai-100.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 4 },
  },
  {
    id: "socola-marou-dua-100",
    name: "Dứa Phủ Sô-Cô-La Đen Marou Hộp 100g",
    shortName: "Marou Dứa 100g",
    price: 165000,
    photo: "/decorator/photos/socola/16-marou-dua-100.png",
    category: "banh-keo",
    footprint: { cols: 2, rows: 4 },
  },
  {
    id: "socola-mascot-dang-hanh-nhan",
    name: "Chocolate Viên Đắng Hạnh Nhân Mascot Việt Nam Hộp Thiếc 110g",
    shortName: "Mascot Hạnh Nhân 110g",
    price: 135000,
    photo: "/decorator/photos/socola/17-mascot-dang-hanh-nhan-110.png",
    category: "banh-keo",
    footprint: { cols: 3, rows: 3 },
  },
  {
    id: "socola-ritter-sport-trai-tim",
    name: "Sô-Cô-La Trái Tim Ritter Sport Hộp 80g",
    shortName: "Ritter Trái Tim 80g",
    price: 130000,
    photo: "/decorator/photos/socola/18-ritter-sport-trai-tim-80.png",
    category: "banh-keo",
    footprint: { cols: 3, rows: 3 },
  },
  {
    id: "socola-meiji-milk-120",
    name: "Hộp Chocolate Meiji Milk 120g",
    shortName: "Meiji Milk 120g",
    price: 165000,
    photo: "/decorator/photos/socola/19-meiji-milk-120.png",
    category: "banh-keo",
    footprint: { cols: 4, rows: 3 },
  },
  {
    id: "socola-pamiriter-thoi-vang-200",
    name: "Hộp Chocolate Thỏi Vàng Pamiriter Đài Loan (200g)",
    shortName: "Pamiriter Thỏi Vàng 200g",
    price: 75000,
    photo: "/decorator/photos/socola/20-pamiriter-thoi-vang-200.png",
    category: "banh-keo",
    footprint: { cols: 4, rows: 4 },
  },
];

export const PRODUCT_BY_ID: Record<string, ProductDef> = PRODUCT_CATALOG.reduce(
  (acc, p) => {
    acc[p.id] = p;
    return acc;
  },
  {} as Record<string, ProductDef>,
);

export const PRODUCT_FILTER_PILLS: Array<{ id: ProductCategory; label: string }> = [
  { id: "tat-ca", label: "Tất cả" },
  { id: "ruou-tra", label: "Rượu trà" },
  { id: "banh-keo", label: "Bánh kẹo" },
];

export interface DecorationItem {
  id: string;
  productId: string;
  gridX: number;
  gridY: number;
  rotation: 0 | 90;
  z: number;
}

export function effectiveFootprint(
  product: ProductDef,
  rotation: 0 | 90,
): Footprint {
  if (rotation === 90) {
    return { cols: product.footprint.rows, rows: product.footprint.cols };
  }
  return product.footprint;
}

export interface DesignFrame {
  ts: number;
  items: DecorationItem[];
}

export interface ExtraCounts {
  flower: number;
  ribbon: number;
}

export const EXTRA_PRICES = {
  flower: 25000,
  ribbon: 20000,
} as const;

export interface DesignDraft {
  id: string;
  name: string;
  previewDataUrl: string;
  boxType: BoxType;
  boxSize: BoxSize;
  boxColor: BoxColor;
  wrapColor: WrapColor;
  lidStyle: LidStyle;
  lidImage: string | null;
  ribbon: RibbonState;
  extras: ExtraCounts;
  items: DecorationItem[];
  frames: DesignFrame[];
  basePrice: number;
  totalPrice: number;
  createdAt: number;
}

export const DESIGN_BASE_PRICE = 80000;

export interface QrPayload {
  designId: string;
  ts: number;
}

export function getBoxSizeOption(size: BoxSize): BoxSizeOption {
  const found = BOX_SIZE_OPTIONS.find((s) => s.id === size);
  if (!found) throw new Error(`Unknown box size: ${size}`);
  return found;
}

export function getBoxColorOption(color: BoxColor): BoxColorOption {
  const found = BOX_COLOR_OPTIONS.find((c) => c.id === color);
  if (!found) throw new Error(`Unknown box color: ${color}`);
  return found;
}

export function getRibbonColorOption(color: RibbonColor): RibbonColorOption {
  const found = RIBBON_COLOR_OPTIONS.find((c) => c.id === color);
  if (!found) throw new Error(`Unknown ribbon color: ${color}`);
  return found;
}

export function computeOutsideAddOns(
  ribbon: RibbonState,
  lidStyle: LidStyle,
): number {
  let sum = 0;
  if (ribbon.enabled) sum += RIBBON_PRICE;
  if (lidStyle === "image") sum += LID_IMAGE_PRICE;
  if (lidStyle === "transparent") sum += LID_TRANSPARENT_PRICE;
  if (lidStyle === "shrink") sum += LID_SHRINK_PRICE;
  return sum;
}

export function computeTotalPrice(
  items: DecorationItem[],
  extras: ExtraCounts,
  base: number,
  ribbon?: RibbonState,
  lidStyle?: LidStyle,
): number {
  const itemsSum = items.reduce((sum, it) => sum + (PRODUCT_BY_ID[it.productId]?.price ?? 0), 0);
  const extrasSum =
    extras.flower * EXTRA_PRICES.flower + extras.ribbon * EXTRA_PRICES.ribbon;
  const outsideSum =
    ribbon && lidStyle ? computeOutsideAddOns(ribbon, lidStyle) : 0;
  return base + itemsSum + extrasSum + outsideSum;
}

export function rectsOverlap(
  a: { x: number; y: number; w: number; h: number },
  b: { x: number; y: number; w: number; h: number },
): boolean {
  return a.x < b.x + b.w && b.x < a.x + a.w && a.y < b.y + b.h && b.y < a.y + a.h;
}

export interface PlacementCheck {
  ok: boolean;
  reason?: "overflow" | "overlap";
}

export function canPlaceItem(
  items: DecorationItem[],
  size: BoxSize,
  product: ProductDef,
  gridX: number,
  gridY: number,
  ignoreItemId?: string,
  rotation: 0 | 90 = 0,
): PlacementCheck {
  const box = getBoxSizeOption(size);
  const fp = effectiveFootprint(product, rotation);
  if (gridX < 0 || gridY < 0) return { ok: false, reason: "overflow" };
  if (gridX + fp.cols > box.cols) return { ok: false, reason: "overflow" };
  if (gridY + fp.rows > box.rows) return { ok: false, reason: "overflow" };
  const placement = { x: gridX, y: gridY, w: fp.cols, h: fp.rows };
  for (const it of items) {
    if (ignoreItemId && it.id === ignoreItemId) continue;
    const other = PRODUCT_BY_ID[it.productId];
    if (!other) continue;
    const otherFp = effectiveFootprint(other, it.rotation);
    const otherRect = { x: it.gridX, y: it.gridY, w: otherFp.cols, h: otherFp.rows };
    if (rectsOverlap(placement, otherRect)) return { ok: false, reason: "overlap" };
  }
  return { ok: true };
}

export function findFirstFreeSlot(
  items: DecorationItem[],
  size: BoxSize,
  product: ProductDef,
  rotation: 0 | 90 = 0,
): { gridX: number; gridY: number } | null {
  const box = getBoxSizeOption(size);
  const fp = effectiveFootprint(product, rotation);
  for (let y = 0; y <= box.rows - fp.rows; y += 1) {
    for (let x = 0; x <= box.cols - fp.cols; x += 1) {
      const check = canPlaceItem(items, size, product, x, y, undefined, rotation);
      if (check.ok) return { gridX: x, gridY: y };
    }
  }
  return null;
}
