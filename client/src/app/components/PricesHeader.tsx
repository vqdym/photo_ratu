export default function PricesHeader({
  subtitle,
  title,
  titlePrice,
}: {
  subtitle: string;
  title: string;
  titlePrice: string;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto mb-24">
      <span className="text-xs uppercase tracking-[0.3em] text-espresso-950/40 mb-4 block">
        {subtitle}
      </span>
      <h1 className="text-4xl md:text-6xl font-light tracking-tight">
        {title} <span className="italic">{titlePrice}</span>
      </h1>
    </div>
  );
}
