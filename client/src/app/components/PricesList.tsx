import { jwtCookie } from "../_lib/actions/auth";
import { getService } from "../_lib/data-services";
import InteractivePricesGrid from "./InteractivePricesGrid";
import PricesCard from "./PricesCard";

interface ServiceProps {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  features: string[];
  __v: number;
}

export default async function PricesList() {
  const { data } = await getService();
  const isAdmin = await jwtCookie();
  return (
    <div className="space-y-24">
      <InteractivePricesGrid services={data} isAdmin={isAdmin} />
    </div>
  );
}
