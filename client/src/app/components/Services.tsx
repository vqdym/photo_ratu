import Service from "./Service";

interface ServiceItem {
  number: string;
  title: string;
  description: string;
  altText: string;
}

interface ServicesProps {
  dict: {
    services: {
      servicesText: string;
      sectionTitle: string;
      list: ServiceItem[];
    };
  };
}

export default function Services({ dict }: ServicesProps) {
  const servicePhotos = [
    "/images/service/IMG_individual_service.JPG",
    "/images/service/IMG_couple_service2.jpg",
    "/images/service/IMG_family_service.jpg",
  ];
  return (
    <section className="w-full bg-beige-50 pt-24 pb-32 md:pt-32 md:pb-40 animate-fade-up relative z-0">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-[12px] tracking-[0.4em] uppercase text-[#736858] mb-4">
            {dict.services.servicesText}
          </h2>
          <h3 className="text-4xl md:text-6xl text-espresso-950 font-serif">
            {dict.services.sectionTitle}
          </h3>
        </div>

        <div className="flex flex-col md:gap-6">
          {dict.services.list.map((item: ServiceItem, index: number) => (
            <Service
              key={item.number}
              number={item.number}
              name={item.title}
              description={item.description}
              imgUrl={servicePhotos[index]}
              altText={item.altText}
              imagePosition={index % 2 === 0 ? "right" : "left"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
