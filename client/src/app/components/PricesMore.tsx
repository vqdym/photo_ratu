import Link from "next/link";

export default function PricesMore() {
  return (
    <div className="mt-20 text-center border-t border-espresso-950/10 pt-16">
      <p className="text-lg text-espresso-950/70 font-light mb-6">
        Маєте нестандартну ідею, плануєте вінчання чи масштабний івент?
      </p>
      <Link
        target="_blank"
        href="https://www.instagram.com/photo_g_ratu_/"
        className="inline-block border-b border-espresso-950 pb-1 text-sm uppercase tracking-[0.1em] hover:text-espresso-950/60 hover:border-espresso-950/60 transition-colors"
      >
        Напишіть мені для індивідуального розрахунку ↗
      </Link>
    </div>
  );
}
