import React from "react";
import { Button } from "@/components/ui/button";
import { categories } from "@/data/restaurant-data";

type MenuCategoryFilterProps = {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
};

export const MenuCategoryFilter = React.memo(function MenuCategoryFilter({
  activeCategory,
  onSelectCategory,
}: MenuCategoryFilterProps) {
  return (
    <div className="filter-row" role="group" aria-label="Filter menu by category">
      {categories.map((item) => (
        <Button
          key={item}
          type="button"
          variant={activeCategory === item ? "default" : "ghost"}
          size="sm"
          aria-pressed={activeCategory === item}
          onClick={() => onSelectCategory(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
});
