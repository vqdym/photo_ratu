export default function Review({
  text,
  name,
  category,
}: {
  text: string;
  name: string;
  category: string;
}) {
  return (
    <div className="group relative flex flex-col justify-between bg-white/5 border border-white/10 p-8 md:p-10 hover:bg-white/10 transition-colors duration-500 rounded-sm animate-fade-up">
      <span className="absolute top-4 left-6 text-8xl font-serif text-white/5 select-none transition-transform duration-700 group-hover:-translate-y-2">
        “
      </span>
      <p className="relative z-10 text-sm md:text-base font-light leading-relaxed text-white/80 mb-12 mt-4">
        {text}
      </p>
      <div className="relative z-10 border-t border-white/10 pt-6">
        <h4 className="text-xl font-serif italic mb-2">{name}</h4>
        <p className="text-[9px] tracking-[0.2em] uppercase text-white/40">
          {category}
        </p>
      </div>
    </div>
  );
}
