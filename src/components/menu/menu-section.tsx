import React, { useMemo } from "react";
import { Heart } from "lucide-react";
import { products } from "@/data/restaurant-data";
import { useCart } from "@/context/use-cart";
import { MenuCategoryFilter } from "@/components/menu/menu-category-filter";
import { MenuCard } from "@/components/menu/menu-card";

type MenuSectionProps = {
  category: string;
  onSelectCategory: (category: string) => void;
};

export const MenuSection = React.memo(function MenuSection({
  category,
  onSelectCategory,
}: MenuSectionProps) {
  const { cartMap, addToCart, updateQuantity } = useCart();

  const visibleProducts = useMemo(
    () => (category === "All" ? products : products.filter((item) => item.category === category)),
    [category],
  );

  return (
    <section id="menu" className="menu-section section-pad">
      <div className="page-width">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow">
              <span /> FROM OUR KITCHEN
            </p>
            <h2>
              Good things, <em>cooking.</em>
            </h2>
            <p className="section-intro">
              Street-side favourites and the comfort of a proper home-cooked meal.
            </p>
          </div>
          <span className="section-index">
            01 <i>—</i> THE MENU
          </span>
        </div>
        <div className="menu-toolbar reveal">
          <span className="menu-count">
            {visibleProducts.length} {visibleProducts.length === 1 ? "dish" : "dishes"} · Made
            fresh, every day <Heart size={14} />
          </span>
          <MenuCategoryFilter activeCategory={category} onSelectCategory={onSelectCategory} />
        </div>
        <div className="menu-grid reveal">
          {visibleProducts.map((item, index) => (
            <MenuCard
              key={item.name}
              item={item}
              index={index}
              productNumber={products.indexOf(item) + 1}
              quantity={cartMap.get(item.name)?.quantity ?? 0}
              onAddToCart={addToCart}
              onUpdateQuantity={updateQuantity}
            />
          ))}
        </div>
      </div>
    </section>
  );
});
