interface footerBrandProps {
  dict: {
    subtitle: string;
    description: string;
  };
}

export default function FooterBrand({ dict }: footerBrandProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-3xl italic text-beige-100">Сукар Галина</h2>
      <p className="text-xs tracking-[0.4em] uppercase text-beige-100/40 mb-6">
        {dict.subtitle}
      </p>
      <p className="text-sm font-light leading-relaxed text-beige-100/70 max-w-sm">
        {dict.description}
      </p>
    </div>
  );
}
