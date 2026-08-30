import { jwtCookie } from "../_lib/actions/auth";
import { getActiveServices, getAllServices } from "../_lib/data-services";
import InteractivePricesGrid from "./InteractivePricesGrid";
import NoDataMessage from "./NoDataMessage";

export default async function PricesList({
  buttonText,
  lang,
}: {
  buttonText: string;
  lang: string;
}) {
  const isAdmin = await jwtCookie();
  const services = isAdmin ? await getAllServices() : await getActiveServices();
  const noServicesMessage =
    lang === "en" ? "No services available." : "Наразі послуги відсутні.";

  if (!services || services.length === 0) {
    return <NoDataMessage message={noServicesMessage} />;
  }

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
