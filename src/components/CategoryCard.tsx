import Image from "next/image";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  slug: string;
  imageUrl?: string;
}

export default function CategoryCard({ category }: { category: Category }) {
  return (
    <div className="group overflow-hidden rounded-3xl bg-white">
      <div className="relative aspect-square bg-[#F7F2EB]">
        <Image
          src={category.imageUrl || "/images/category-placeholder.jpg"}
          alt={category.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="product-title">{category.name}</h3>

        <div className="mt-3 flex items-center justify-between">
          <span className="product-price">Explore</span>
        </div>
      </div>
    </div>
  );
}
