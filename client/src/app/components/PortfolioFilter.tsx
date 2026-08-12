import { categoryLabels } from "@/utils/categoryLabels";
import CategoryButton from "./CategoryButton";

interface PortfolioFilterProps {
  lang: string;
  activeCategory: string;
}

export default function PortfolioFilter({
  lang,
  activeCategory,
}: PortfolioFilterProps) {
  const currentCategories = categoryLabels[lang];
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
      {Object.entries(currentCategories).map(([value, label]) => (
        <CategoryButton
          key={value}
          categoryVal={value}
          categoryLab={label}
          activeCategory={activeCategory}
        />
      ))}
    </div>
  );
}
