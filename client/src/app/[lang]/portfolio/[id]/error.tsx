"use client";

export default function PortfolioItemError({ reset }: { reset: () => void }) {
  return (
    <section className="flex min-h-screen w-full items-center justify-center bg-beige-50 px-6 text-center text-espresso-950">
      <div className="flex max-w-md flex-col items-center gap-5">
        <p className="text-sm uppercase tracking-widest text-espresso-950/50">
          Не вдалося завантажити галерею
        </p>
        <p className="text-espresso-950/70">
          Перевірте підключення до сервера та спробуйте ще раз.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="bg-espresso-950 px-6 py-3 text-xs uppercase tracking-widest text-beige-50 transition-colors hover:bg-espresso-800"
        >
          Спробувати ще раз
        </button>
      </div>
    </section>
  );
}
