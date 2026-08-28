import { jwtCookie } from "../_lib/actions/auth";
import { getActiveServices, getAllServices } from "../_lib/data-services";
import InteractivePricesGrid from "./InteractivePricesGrid";

export default async function PricesList({
  buttonText,
}: {
  buttonText: string;
}) {
  const isAdmin = await jwtCookie();
  const services = isAdmin ? await getAllServices() : await getActiveServices();
  console.log("SERVICES -----------", services);
  return (
    <div className="space-y-24">
      <InteractivePricesGrid
        buttonText={buttonText}
        services={services}
        isAdmin={isAdmin}
      />
    </div>
  );
}
