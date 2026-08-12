import { Suspense } from "react";
import Spinner from "./Spinner";
import LastShootList from "./LastShootList";

export default function LastShoots({
  lastShoots,
}: {
  lastShoots: {
    title: string;
    lang: string;
  };
}) {
  return (
    <div className="w-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.35)] relative z-10 -mt-[7vw]">
      <section className="w-full bg-beige-200 pt-[calc(6vw+5rem)] pb-24 md:pb-[calc(6vw+4rem)] animate-fade-up [clip-path:polygon(0_6vw,100%_0,100%_calc(100%-6vw),0_100%)]">
        <div className="mx-auto max-w-7xl px-6 md:px-20 text-4xl md:text-5xl text-espresso-950 flex flex-col justify-items-end">
          <h2 className="mb-16 md:mb-20 text-center md:text-left">
            {lastShoots.title}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
            <Suspense fallback={<Spinner />}>
              <LastShootList lang={lastShoots.lang} />
            </Suspense>
          </div>
        </div>
      </section>
    </div>
  );
}
