import PricesConditions from "@/app/components/PricesConditions";
import PricesHeader from "@/app/components/PricesHeader";
import PricesList from "@/app/components/PricesList";
import PricesMore from "@/app/components/PricesMore";

export const metadata = {
  title: "/ Послуги та ціни",
};

export default async function PricingVisualPage() {
  return (
    <section className="min-h-screen bg-beige-50 text-espresso-950 pt-32 px-6 py-24">
      <div className="max-w-6xl mx-auto w-full">
        <PricesHeader />
        <PricesList />
        <PricesConditions />
        <PricesMore />
      </div>
    </section>
  );
}
