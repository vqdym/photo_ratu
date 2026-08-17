export default function PortfolioHeader({
  dict,
}: {
  dict: {
    title: string;
    description: string;
  };
}) {
  return (
    <div className="flex flex-col items-center mb-16 animate-fade-up">
      <h1 className="text-5xl md:text-7xl font-light mb-6">{dict.subtitle}</h1>
      <p className="text-sm font-light text-espresso-950/70 max-w-lg text-center">
        {dict.description}
      </p>
    </div>
  );
}
