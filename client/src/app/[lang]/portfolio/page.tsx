import { Suspense } from "react";
import PortfolioGallery from "../../../components/PortfolioGallery";
import PortfolioHeader from "../../../components/PortfolioHeader";
import Spinner from "../../../components/Spinner";
import { getDictionary } from "@/dictionaries";
import DictProps from "@/types/DictProps";

export const metadata = {
  title: "/ Портфоліо",
};

export default async function PortfolioPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ category?: string }>;
  params: DictProps["params"];
}) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams?.lang);

  return (
    <section className="w-full bg-beige-50">
      <div className="max-w-screen-2xl mx-auto text-espresso-950 pt-32 pb-24 px-6 md:px-20">
        <PortfolioHeader dict={dict.portfolioHeader} />
        <Suspense fallback={<Spinner />}>
          <PortfolioGallery
            lang={resolvedParams.lang}
            searchParams={searchParams}
          />
        </Suspense>
      </div>
    </section>
  );
}
