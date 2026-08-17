import BackButton from "@/app/components/BackButton";

import PortfolioItemPageHeader from "@/app/components/PortfolioItemPageHeader";
import PortfolioItemPageImagesList from "@/app/components/PortfolioItemPageImagesList";
import SpinnerMini from "@/app/components/SpinnerMini";
import { getDictionary } from "@/dictionaries";
import DictProps from "@/types/DictProps";
import { Suspense } from "react";

export async function generateMetadata({ params }: DictProps) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  return {
    title: dict.portfolioHeader.title,
  };
}

export default async function PortfolioItemPage({
  params,
}: {
  params: Promise<{ lang: string; id: string }>;
}) {
  const { lang, id } = await params;

  return (
    <section className="w-full bg-beige-50">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-20 pb-24">
        <PortfolioItemPageHeader lang={lang} id={id} />
        <div className="flex justify-end">
          <BackButton lang={lang} path="portfolio" />
        </div>

        <Suspense
          fallback={
            <div className="w-full py-32 flex flex-col items-center justify-center gap-4">
              <SpinnerMini />
              <p className="text-espresso-950/60 uppercase tracking-widest text-xs">
                Завантаження фотографій...
              </p>
            </div>
          }
        >
          <PortfolioItemPageImagesList id={id} />
        </Suspense>
      </div>
    </section>
  );
}
