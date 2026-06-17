import { getCategories } from "../../services/category.service";
import CategoryCard from "./CategoryCard";

export default async function CategoriesSection() {
  const categories = await getCategories();

  return (
    <section className="py-24 bg-[#F7F2EB]">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-20">
        
        <div className="text-center mb-16">
          <div
            className="mx-auto mb-5"
            style={{
              width: 48,
              height: 1,
              background:
                "linear-gradient(90deg, transparent, #CBA135, transparent)",
            }}
          />

          <span className="section-label mb-3 block">
            Categories
          </span>

          <h2 className="heading-xl mb-4">
            Discover Our
            <br />
            <span className="font-normal">
              Signature Collections
            </span>
          </h2>

          <p className="body-m max-w-2xl mx-auto">
            Explore handcrafted jewellery categories
            designed to celebrate every moment,
            tradition and expression.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((category: any) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}