import PricesConditions from "@/app/components/PricesConditions";
import PricesHeader from "@/app/components/PricesHeader";
import PricesList from "@/app/components/PricesList";
import PricesMore from "@/app/components/PricesMore";
import Spinner from "@/app/components/Spinner";
import { getDictionary } from "@/dictionaries";
import DictProps from "@/types/DictProps";
import { Suspense } from "react";

export async function generateMetadata({ params }: DictProps) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  return {
    title: dict.prices.headTitle,
  };
}

export default async function PricingVisualPage({ params }: DictProps) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);
  return (
    <section className="min-h-screen bg-beige-50 text-espresso-950 pt-32 px-6 py-24">
      <div className="max-w-6xl mx-auto w-full">
        <PricesHeader
          subtitle={dict.prices.subtitle}
          title={dict.prices.title}
          titlePrice={dict.prices.titlePrice}
        />
        <Suspense fallback={<Spinner />}>
          <PricesList buttonText={dict.prices.buttonRes} />
        </Suspense>
        <PricesConditions
          title={dict.prices.conditionsTitle}
          subtitle={dict.prices.conditionsSubtitle}
        />
        <PricesMore
          title={dict.prices.footerTitle}
          subtitle={dict.prices.footerSubtitle}
        />
      </div>
    </section>
  );
}
