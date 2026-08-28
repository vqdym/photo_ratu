import { categoryLabels } from "@/utils/categoryLabels";
import CategoryButton from "./CategoryButton";
import { ServiceProps } from "@/types/Service";

interface PortfolioFilterProps {
  lang: string;
  activeCategory: string;
  services: { name: string; nameEn: string }[];
  usedCategories: string[];
}

export default function PortfolioFilter({
  lang,
  activeCategory,
  services,
  usedCategories,
}: PortfolioFilterProps) {
  const activeServices = services.filter((service) =>
    usedCategories.includes(service.nameEn.toLowerCase()),
  );

  const allLabel = lang === "en" ? "All" : "Усі";
  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
      <CategoryButton
        categoryVal="all"
        categoryLab={allLabel}
        activeCategory={activeCategory}
      />
      {activeServices.map((service) => {
        const label =
          lang === "en"
            ? service.nameEn.charAt(0).toUpperCase() + service.nameEn.slice(1)
            : service.name.endsWith("а")
              ? service.name.slice(0, -1) + "і"
              : service.name;

        return (
          <CategoryButton
            key={service.nameEn}
            categoryVal={service.nameEn.toLowerCase()}
            categoryLab={label}
            activeCategory={activeCategory}
          />
        );
      })}
    </div>
  );
}
