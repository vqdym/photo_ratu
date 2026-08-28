import Link from "next/link";

interface CategoryButtonProps {
  categoryVal: string;
  categoryLab: string;
  activeCategory: string;
}

export default function CategoryButton({
  categoryVal,
  categoryLab,
  activeCategory,
}: CategoryButtonProps) {
  const href =
    categoryVal === "all" ? "/portfolio" : `/portfolio?category=${categoryVal}`;
  return (
    <Link
      href={href}
      scroll={false}
      className={`text-sm tracking-[0.2em] uppercase transition-colors duration-300 pb-1 border-b ${
        activeCategory === categoryVal
          ? "border-espresso-950 text-espresso-950"
          : "border-transparent text-espresso-950/40 hover:text-espresso-950"
      }`}
    >
      {categoryLab}
    </Link>
  );
}
