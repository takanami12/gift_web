import { allProducts } from "@/lib/data";
import ProductFilters from "@/components/ProductFilters";
import Link from "next/link";

const collectionNames: Record<string, string> = {
  "tet": "Quà Tết Nguyên Đán",
  "valentine": "Quà Valentine 14-2",
  "8-3": "Quà Ngày Phụ Nữ 8-3",
  "trung-thu": "Quà Trung Thu",
  "20-10": "Quà Phụ Nữ Việt Nam 20-10",
  "20-11": "Quà Ngày Nhà Giáo Việt Nam 20-11",
  "giang-sinh": "Quà Giáng Sinh",
  "doanh-nghiep": "Quà Tặng Doanh Nghiệp",
  "nguoi-yeu": "Quà Tặng Người Yêu",
  "cha-me": "Quà Tặng Cha Mẹ",
  "doi-tac": "Quà Tặng Đối Tác",
  "dong-nghiep": "Quà Tặng Đồng Nghiệp",
};

const collectionSubtitles: Record<string, string> = {
  "trung-thu":
    "Gói ghém một chút hương vị mùa trăng vào những món quà nhỏ, để tình thân thêm tròn đầy và ấm áp như ánh rằm.",
  "tet":
    "Mỗi món quà Tết là một lời chúc bình an. Hy vọng những hộp quà chỉn chu này sẽ thay bạn gửi gắm niềm vui cho một khởi đầu vẹn tròn.",
  "valentine":
    "Gửi trao tâm ý, giữ trọn yêu thương. Mỗi món quà là một lời tỏ tình ngọt ngào mà Gift Glamorous muốn cùng bạn viết nên câu chuyện của riêng mình.",
  "8-3":
    "Dành tặng những điều dịu dàng nhất cho phái đẹp. Hãy để chúng mình giúp bạn chọn một món quà nhỏ thay lời cảm ơn sâu sắc gửi đến 'một nửa thế giới' tuyệt vời xung quanh bạn.",
  "20-11":
    "Những đóa hoa có thể phai, nhưng lòng biết ơn sẽ còn mãi. Gift Glamorous giúp bạn chọn lựa những món quà trang trọng nhất để gửi lời tri ân tới người lái đò tận tụy.",
  "giang-sinh":
    "Mang phép màu đêm Noel đến gần hơn với những món quà mang đậm dấu ấn cá nhân, để hơi ấm tình thân luôn hiện hữu trong từng khoảnh khắc.",
  "20-10":
    "Gửi chút dịu dàng đến những người phụ nữ thân thương nhất. Chúc cho những người phụ nữ bạn yêu thương luôn tỏa sáng và hạnh phúc theo cách của riêng mình.",
};


export default async function CollectionPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  const title = collectionNames[slug] || "Bộ Sưu Tập Quà Tặng";
  const subtitle = collectionSubtitles[slug];

  const products = allProducts.filter(p => 
    p.occasions?.includes(slug) || 
    p.topics?.includes(slug) ||
    p.recipient?.includes(title.replace("Quà Tặng ", "")) ||
    p.slug === slug
  );

  return (
    <div className="pt-0 pb-20 min-h-screen" style={{ backgroundColor: "#fffcf5" }}>
      <div className="max-w-7xl mx-auto px-8 text-center mb-16 pt-5">
        {/* Breadcrumbs */}
        <header>
          <h1 style={{ fontFamily: "var(--font-playfair)", color: "#433b30"}} className="text-4xl md:text-6xl font-bold mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-stone-500 max-w-2xl mx-auto leading-relaxed text-lg font-light italic">
              &ldquo;{subtitle}&rdquo;
            </p>
          )}
        </header>
      </div>

      <div className="max-w-7xl mx-auto px-8">
        {products.length > 0 ? (
          <ProductFilters products={products} slug={slug} />
        ) : (
          <div className="bg-white rounded-2xl p-20 text-center border border-stone-100 shadow-sm max-w-3xl mx-auto">
            <span className="material-symbols-outlined text-6xl text-stone-200 mb-4 block">
              inventory_2
            </span>
            <h3 className="text-xl font-serif font-medium text-stone-900 mb-2">
              Chưa có sản phẩm nào
            </h3>
            <p className="text-stone-500 mb-8">
              Bộ sưu tập này đang được chúng tôi cập nhật. Vui lòng quay lại sau nhé!
            </p>
            <Link 
              href="/san-pham"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-sm font-bold hover:bg-primary-container transition-all"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}


export async function generateStaticParams() {
  const slugs = [
    "tet", "valentine", "8-3", "trung-thu", "20-10", "20-11", "giang-sinh",
    "doanh-nghiep", "nguoi-yeu", "cha-me", "doi-tac", "dong-nghiep"
  ];
  return slugs.map((slug) => ({ slug }));
}
