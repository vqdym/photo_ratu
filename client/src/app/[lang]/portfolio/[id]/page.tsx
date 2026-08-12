import BackButton from "@/app/components/BackButton";

import PortfolioItemPageHeader from "@/app/components/PortfolioItemPageHeader";
import PortfolioItemPageImagesList from "@/app/components/PortfolioItemPageImagesList";

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

        <PortfolioItemPageImagesList id={id} />
      </div>
    </section>
  );
}
