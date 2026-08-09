import PortfolioItemPageHeader from "@/components/PortfolioItemPageHeader";
import PortfolioItemPageImagesList from "@/components/PortfolioItemPageImagesList";
import Spinner from "@/components/Spinner";
import { Suspense } from "react";

export default async function PortfolioItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <section className="w-full bg-beige-50">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-20 pb-24">
        <PortfolioItemPageHeader id={id} />

        <Suspense fallback={<Spinner />}>
          <PortfolioItemPageImagesList id={id} />
        </Suspense>
      </div>
    </section>
  );
}
