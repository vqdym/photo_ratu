import Service from "./Service";

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  altText: string;
}

interface LegacyServiceItem {
  id: number;
  name: string;
  category: string;
  text: string;
}

interface ServicesProps {
  dict: {
    services: {
      servicesText: string;
      sectionTitle: string;
      list: (ServiceItem | LegacyServiceItem)[];
    };
  };
}

export default function Services({ dict }: ServicesProps) {
  const servicePhotos = [
    "/images/service/IMG_individual_service.JPG",
    "/images/service/IMG_couple_service2.JPG",
    "/images/service/IMG_family_service.jpg",
  ];
  return (
    <section className="w-full bg-beige-50 pt-24 md:pb-24 md:pt-32 animate-fade-up relative z-0">
      <div className="max-w-7xl mx-auto sm:px-16 md:px-12 lg:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[12px] tracking-[0.4em] uppercase text-[#736858] mb-4">
            {dict.services.servicesText}
          </h2>
          <h3 className="text-4xl md:text-6xl text-espresso-950 font-serif">
            {dict.services.sectionTitle}
          </h3>
        </div>

        <div className="flex flex-col md:gap-6">
          {dict.services.list.map((item, index) => {
            const serviceItem = item as ServiceItem;

            return (
              <Service
                key={serviceItem.number}
                number={serviceItem.number}
                name={serviceItem.title}
                description={serviceItem.description}
                imgUrl={servicePhotos[index]}
                altText={serviceItem.altText}
                imagePosition={index % 2 === 0 ? "right" : "left"}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
